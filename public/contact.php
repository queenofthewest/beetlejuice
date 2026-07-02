<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$to = "victoriawestvip@gmail.com";

function clean($value) {
    $value = trim($value ?? "");
    return str_replace(["\r", "\n"], " ", $value);
}

// Rate limit: one submission per 30s, max 10 per day, per IP
$ip = $_SERVER["REMOTE_ADDR"] ?? "unknown";
$rateDir = sys_get_temp_dir() . "/vw_contact_rl";
if (!is_dir($rateDir)) {
    mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . "/" . md5($ip) . ".json";

$now = time();
$state = ["last" => 0, "day" => date("Y-m-d"), "count" => 0];
if (is_file($rateFile)) {
    $decoded = json_decode(file_get_contents($rateFile), true);
    if (is_array($decoded)) {
        $state = array_merge($state, $decoded);
    }
}
if ($state["day"] !== date("Y-m-d")) {
    $state["day"] = date("Y-m-d");
    $state["count"] = 0;
}

if ($now - $state["last"] < 30) {
    http_response_code(429);
    echo json_encode(["ok" => false, "error" => "Please wait a moment before submitting again."]);
    exit;
}
if ($state["count"] >= 10) {
    http_response_code(429);
    echo json_encode(["ok" => false, "error" => "Daily submission limit reached. Please email directly."]);
    exit;
}

$name = clean($_POST["name"] ?? "");
$email = clean($_POST["email"] ?? "");
$phone = clean($_POST["phone"] ?? "");
$date = clean($_POST["date"] ?? "");
$duration = clean($_POST["duration"] ?? "");
$locationType = clean($_POST["locationType"] ?? "");
$outcallType = clean($_POST["outcallType"] ?? "");
$outcallLocation = clean($_POST["outcallLocation"] ?? "");
$verificationType = clean($_POST["verificationType"] ?? "");
$verificationDetail = trim($_POST["verificationDetail"] ?? "");

// Honeypot — if this hidden field is filled, silently pretend success
if (!empty($_POST["website"] ?? "")) {
    echo json_encode(["ok" => true]);
    exit;
}

if ($name === "" || $email === "" || $phone === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $verificationDetail === "") {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Missing or invalid required fields"]);
    exit;
}

$host = clean($_SERVER["HTTP_HOST"] ?? "victoriawest.com");
$fromDomain = preg_replace("/^www\./", "", $host);
$from = "no-reply@" . $fromDomain;

$subject = "New Booking Inquiry — $name";

$body = "New booking inquiry received:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Preferred date: " . ($date !== "" ? $date : "-") . "\n";
$body .= "Duration: " . ($duration !== "" ? $duration : "-") . "\n";
$body .= "Location: " . ($locationType !== "" ? $locationType : "-") . "\n";
if ($locationType === "outcall") {
    $body .= "Outcall type: " . ($outcallType !== "" ? $outcallType : "-") . "\n";
    $body .= "Outcall location: " . ($outcallLocation !== "" ? $outcallLocation : "-") . "\n";
}
$body .= "Verification method: " . ($verificationType !== "" ? $verificationType : "-") . "\n";
$body .= "Verification details:\n" . $verificationDetail . "\n";

$headers = [];
$headers[] = "From: $from";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$state["last"] = $now;
$state["count"] += 1;
file_put_contents($rateFile, json_encode($state));

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Failed to send"]);
}
