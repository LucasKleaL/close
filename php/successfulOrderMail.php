<?php

    date_default_timezone_set('Etc/UTC');
    require 'config.php';
    require 'PHPMailer/PHPMailerAutoload.php';

    $result = "SELECT * FROM credentials";

    $resultado = mysqli_query($link, $result);
    $credentials['id'] = "";
    if(($resultado) && ($resultado -> num_rows) != 0){
        while($row_credentials = mysqli_fetch_assoc($resultado)){
            $credentials['id'] = $row_credentials['id'];
            $credentials['email_contato'] = $row_credentials['email_contato'];
            $credentials['senha_contato'] = $row_credentials['senha_contato'];

            array_push($produto);
        }
    }
    else{
        echo "Impossível recuperar as credenciais para o envio de email.";
    }

    $originEmail = base64_decode($credentials['email_contato']);
    $originPassword = base64_decode($credentials['senha_contato']);

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
    $mail->Username = $originEmail; 
    $mail->Password = $originPassword;
    $mail->SetFrom($originEmail, 'Close!');
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