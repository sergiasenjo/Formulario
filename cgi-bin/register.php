<?php

if(isset($_POST['full_name'])) {
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $url = $_POST['url'];
    $address = $_POST['address'];
    $comments = $_POST['comments'];
    $fp = fopen(time() . ".txt", 'w');
    $strWrite = "Nombre y Apellidos: " . $full_name . "\n"          
                . "Email: " . $email . "\n" 
                . "Password: " . sha1($password) . "\n"
                . "URL: " . $url . "\n"
                . "Dirección: " . $address . "\n"
                . "Comentarios: " . $comments . "\n";

    if (isset($_POST['country'])) {
        $country = $_POST['country'];
        $postal_code = $_POST['postal_code'];
        $strWrite = $strWrite . "País: " . $country . "\n"
                    . "Código Postal: " . $postal_code . "\n";
    }

    fwrite($fp, $strWrite);
    fclose($fp);
}

include '../html/index.html';