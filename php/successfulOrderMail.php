<?php

    date_default_timezone_set('Etc/UTC');
    require 'config.php';
    require 'PHPMailer/PHPMailerAutoload.php';

    $emailDestinatario = $_POST['emailDestinatario'];

    $tituloEmail = "Pedido Close!";

    $message = 'Olá seu pedido Close! foi efetuado com sucesso! Assim que seu pedido for enviado iremos enviar o código de rastreamento neste mesmo email.
    A Close agradece pela preferência!';

    $mail= new PHPMailer;
    $mail->IsSMTP(); 
    $mail->CharSet = 'UTF-8';   
    $mail->SMTPDebug = 2;       // 0 = nao mostra o debug, 2 = mostra o debug
    $mail->SMTPAuth = true;     
    $mail->SMTPSecure = 'ssl';  
    $mail->Host = 'smtp.gmail.com'; 
    $mail->Port = 465; 
    $mail->Username = 'closestore.contato@gmail.com'; 
    $mail->Password = 'close4521';
    $mail->SetFrom('closestore.contato@gmail.com', 'Close!');
    $mail->addAddress($emailDestinatario,'');
    $mail->Subject = $tituloEmail;
    $mail->msgHTML($message);

    $enviado = $mail->send();

    if ($enviado) { 
        $response_array['status'] = 'success';
        echo "Seu email foi enviado com sucesso!"; 
    } 
    else {
        $response_array['status'] = 'error';
        echo "Houve um erro enviando o email: ".$mail->ErrorInfo; 
    } 

    echo json_encode($response_array);

?>