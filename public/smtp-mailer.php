<?php
// Minimal SMTP client — no external libraries required.
// Sends one plain-text email via STARTTLS + AUTH LOGIN.

function smtp_send($config, $to, $from, $replyTo, $subject, $body) {
    $host = $config["host"];
    $port = $config["port"];
    $user = $config["user"];
    $pass = $config["pass"];

    $errno = 0;
    $errstr = "";
    $sock = @fsockopen($host, $port, $errno, $errstr, 15);
    if (!$sock) {
        return [false, "Could not connect to mail server: $errstr"];
    }
    stream_set_timeout($sock, 15);

    $read = function () use ($sock) {
        $data = "";
        while (($line = fgets($sock, 515)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === " ") break;
        }
        return $data;
    };

    $expect = function ($code) use ($read, $sock) {
        $resp = $read();
        if (substr($resp, 0, 3) !== (string) $code) {
            fclose($sock);
            return [false, "Unexpected SMTP response: " . trim($resp)];
        }
        return [true, $resp];
    };

    $send = function ($cmd) use ($sock) {
        fwrite($sock, $cmd . "\r\n");
    };

    [$ok, $err] = $expect(220);
    if (!$ok) return [false, $err];

    $send("EHLO " . $host);
    [$ok, $err] = $expect(250);
    if (!$ok) return [false, $err];

    $send("STARTTLS");
    [$ok, $err] = $expect(220);
    if (!$ok) return [false, $err];

    if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fclose($sock);
        return [false, "TLS negotiation failed"];
    }

    $send("EHLO " . $host);
    [$ok, $err] = $expect(250);
    if (!$ok) return [false, $err];

    $send("AUTH LOGIN");
    [$ok, $err] = $expect(334);
    if (!$ok) return [false, $err];

    $send(base64_encode($user));
    [$ok, $err] = $expect(334);
    if (!$ok) return [false, $err];

    $send(base64_encode($pass));
    [$ok, $err] = $expect(235);
    if (!$ok) return [false, "Authentication failed"];

    $send("MAIL FROM:<$user>");
    [$ok, $err] = $expect(250);
    if (!$ok) return [false, $err];

    $send("RCPT TO:<$to>");
    [$ok, $err] = $expect(250);
    if (!$ok) return [false, $err];

    $send("DATA");
    [$ok, $err] = $expect(354);
    if (!$ok) return [false, $err];

    $bodyEscaped = preg_replace("/\n\./", "\n..", str_replace("\r\n", "\n", $body));
    $message = "From: $from\r\n";
    $message .= "To: $to\r\n";
    $message .= "Reply-To: $replyTo\r\n";
    $message .= "Subject: $subject\r\n";
    $message .= "Date: " . date("r") . "\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "\r\n";
    $message .= str_replace("\n", "\r\n", $bodyEscaped);
    $message .= "\r\n.";

    $send($message);
    [$ok, $err] = $expect(250);
    if (!$ok) return [false, $err];

    $send("QUIT");
    fclose($sock);

    return [true, null];
}
