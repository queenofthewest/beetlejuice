import { writeFileSync } from "fs";

const pass = process.env.SMTP_PASSWORD;
if (!pass) {
  console.error("SMTP_PASSWORD env var is not set — skipping smtp-config.php generation.");
  process.exit(1);
}

const config = {
  host: "mail.infomaniak.com",
  port: 587,
  user: "hi@alyssamay.ch",
  pass,
};

const escape = (s) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

const php = `<?php
return [
    "host" => '${escape(config.host)}',
    "port" => ${config.port},
    "user" => '${escape(config.user)}',
    "pass" => '${escape(config.pass)}',
];
`;

writeFileSync("dist/smtp-config.php", php);
console.log("Wrote dist/smtp-config.php");
