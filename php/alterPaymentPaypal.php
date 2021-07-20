<?php

require "config.php";

    $paymentMetod = 'Paypal';
    $orderProtocol = $_POST['orderProtocol'];

    echo "orderProtocol ".$orderProtocol;

    $resultado = mysqli_query($link, "UPDATE pedidos SET metodo_pagamento = '$paymentMetod', pedido_pago = 1 WHERE protocolo = '$orderProtocol'");

    if ($resultado) {
        $response_array['status'] = 'success';
    }
    else {
        $response_array['status'] = 'error';
    }

    echo json_encode($response_array);

?>