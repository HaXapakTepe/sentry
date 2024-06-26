<?php

$name = "...";
$email = "...";

if (isset($_POST['name'])) {
    $name = $_POST['name'];
}

if (isset($_POST['mail'])) {
    $email = $_POST['email'];
}

$verify = mail("sentry@sentry.ru", "Заявка с сайта", "ник в Telegeram: " . $name . "\r\n" . "Почтовый адрес: " . $email . "\r\n", "From: sentry@sentry.ru");

header("Location: /");
exit;