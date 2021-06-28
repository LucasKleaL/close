<?php

require "config.php";

$idProdutos = $_POST['idProdutos'];
$nomeCliente = $_POST['nomeCliente'];
$bairroCliente = $_POST['bairroCliente'];
$ruaCliente = $_POST['ruaCliente'];
$numeroCliente = $_POST['numeroCliente'];
$cidadeCliente = $_POST['cidadeCliente'];
$federacaoCliente = $_POST['federacaoCliente'];

    $resultado = mysqli_query($link, "INSERT INTO pedidos (id_produtos, nome_cliente, bairro_cliente, rua_cliente, numero_complemento_cliente, cidade_cliente, federacao_cliente) 
    VALUES ('$idProdutos', '$nomeCliente', '$bairroCliente', '$ruaCliente', '$numeroCliente', '$cidadeCliente', '$federacaoCliente')");

    if ($resultado == true) {
        echo "Pedido enviado para o banco de dados com sucesso";
    }
    else {
        echo "Algo de errado aconteceu, tente novamente";
    }

?>