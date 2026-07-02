<?php
header("Content-Type: application/json");

require __DIR__ . "/smtp-mailer.php";

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
$durationDetail = trim($_POST["durationDetail"] ?? "");
$locationType = clean($_POST["locationType"] ?? "");
$locationDetail = clean($_POST["locationDetail"] ?? "");
$verificationType = clean($_POST["verificationType"] ?? "");
$verificationDetail = trim($_POST["verificationDetail"] ?? "");

// Honeypot — if this hidden field is filled, silently pretend success
if (!empty($_POST["website"] ?? "")) {
    echo json_encode(["ok" => true]);
    exit;
}

if ($name === "" || $email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $verificationDetail === "") {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Missing or invalid required fields"]);
    exit;
}

$dateTypeLabels = [
    "phoenix-incall" => "Phoenix Local - Incall",
    "phoenix-outcall" => "Phoenix Local - Outcall",
    "touring" => "Touring Request",
    "flytome" => "Fly Me To You (4+ hrs)",
];
$dateTypeSubjectLabels = [
    "phoenix-incall" => "Phoenix - Incall",
    "phoenix-outcall" => "Phoenix - Outcall",
    "touring" => "Touring Request",
    "flytome" => "FMTY",
];
$durationLabels = [
    "1hour" => "1 Hour",
    "90min" => "90 Minutes",
    "2hours" => "2 Hours",
    "3hours" => "3 Hours",
    "dinner" => "Dinner Date (4 hrs)",
    "evening" => "Evening (6 hrs)",
    "overnight" => "Overnight (12 hrs)",
    "fullday" => "Full Day (24 hrs)",
    "weekend" => "Weekend (48 hrs)",
    "custom" => "Custom Request",
];

$dateTypeLabel = $dateTypeLabels[$locationType] ?? "-";
$durationLabel = $durationLabels[$duration] ?? "-";

$formattedDate = "-";
if ($date !== "") {
    $dateObj = DateTime::createFromFormat("Y-m-d", $date);
    if ($dateObj) {
        $formattedDate = $dateObj->format("l, F j, Y");
    }
}

$subjectType = $dateTypeSubjectLabels[$locationType] ?? $dateTypeLabel;
$subject = "New Booking Inquiry — " . ($subjectType !== "-" ? $subjectType : $name);

$body = "New booking inquiry received:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: " . ($phone !== "" ? $phone : "-") . "\n";
$body .= "Preferred date: $formattedDate\n";
$body .= "Date Type: $dateTypeLabel\n";
if ($locationDetail !== "") {
    $body .= "Location: $locationDetail\n";
}
$body .= "Duration: $durationLabel\n";
if ($durationDetail !== "") {
    $body .= "Duration detail:\n$durationDetail\n";
}
$body .= "Verification method: " . ($verificationType !== "" ? $verificationType : "-") . "\n";
$body .= "Verification details:\n" . $verificationDetail . "\n";

$state["last"] = $now;
$state["count"] += 1;
file_put_contents($rateFile, json_encode($state));

$configPath = __DIR__ . "/smtp-config.php";
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Mail is not configured on the server."]);
    exit;
}
$smtpConfig = require $configPath;

[$sent, $smtpError] = smtp_send($smtpConfig, $to, $smtpConfig["user"], $email, $subject, $body);

if ($sent) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    error_log("Contact form SMTP error: " . $smtpError);
    echo json_encode(["ok" => false, "error" => "Failed to send"]);
}
