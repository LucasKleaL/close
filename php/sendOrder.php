<?php

require "config.php";

$protocolo = $_POST['protocolo'];
$idProdutos = $_POST['idProdutos'];
$nomeCliente = $_POST['nomeCliente'];
$emailCliente = $_POST['emailCliente'];
$cpfCliente = $_POST['cpfCliente'];
$cepCliente = $_POST['cepCliente'];
$bairroCliente = $_POST['bairroCliente'];
$ruaCliente = $_POST['ruaCliente'];
$numeroCliente = $_POST['numeroCliente'];
$cidadeCliente = $_POST['cidadeCliente'];
$federacaoCliente = $_POST['federacaoCliente'];

    $resultado = mysqli_query($link, "INSERT INTO pedidos (protocolo, id_produtos, nome_cliente, email_cliente, cpf_cliente, cep_cliente, bairro_cliente, rua_cliente, numero_complemento_cliente, cidade_cliente, federacao_cliente) 
    VALUES ('$protocolo', '$idProdutos', '$nomeCliente', '$emailCliente', '$cpfCliente', '$cepCliente', '$bairroCliente', '$ruaCliente', '$numeroCliente', '$cidadeCliente', '$federacaoCliente')");

    if ($resultado) {
        $response_array['status'] = 'success';
    }
    else {
        $response_array['status'] = 'error';
    }

    echo json_encode($response_array);

?>