<?php

$name = "...";
$email = "...";

if (isset($_POST['name'])) {
    $name = $_POST['name'];
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];
}

$verify = mail("sales@sentrytag.tech", "Заявка с сайта", "Ник в Telegeram: " . $name . "\r\n" . "Почтовый адрес: " . $email . "\r\n", "From: sales@sentrytag.tech");

header("Location: /");
exit;