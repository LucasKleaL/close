<?php

require "config.php";

$idProdutos = $_POST['idProdutos'];
$protocolo = $_POST['protocolo'];
$nomeCliente = $_POST['nomeCliente'];
$bairroCliente = $_POST['bairroCliente'];
$ruaCliente = $_POST['ruaCliente'];
$numeroCliente = $_POST['numeroCliente'];
$cidadeCliente = $_POST['cidadeCliente'];
$federacaoCliente = $_POST['federacaoCliente'];

    $resultado = mysqli_query($link, "INSERT INTO pedidos (id_produtos, protocolo, nome_cliente, bairro_cliente, rua_cliente, numero_complemento_cliente, cidade_cliente, federacao_cliente) 
    VALUES ('$idProdutos', '$protocolo', '$nomeCliente', '$bairroCliente', '$ruaCliente', '$numeroCliente', '$cidadeCliente', '$federacaoCliente')");

    if ($resultado) {
        $response_array['status'] = 'success';
    }
    else {
        $response_array['status'] = 'error';
    }

    echo json_encode($response_array);

?>