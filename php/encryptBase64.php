<?php 

    //modelo de encode/decode para as credenciais armazenadas no banco de dados

    $email = '';
    $senha = '';

    $crypto = base64_encode($email);
    $senhaCrypto = base64_encode($senha);

    echo $crypto.'  ';
    echo $senhaCrypto.'  ';

?>