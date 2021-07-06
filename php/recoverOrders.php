<?php

include_once "config.php";

$id_produto = $_POST["id_produto"];

$result = "SELECT * FROM pedidos";

$resultado = mysqli_query($link, $result);
$pedido['id'] = "";
$retorno['id'] = "";
if(($resultado) && ($resultado -> num_rows) != 0){
    while($row_pedido = mysqli_fetch_assoc($resultado)){
        $pedido['id'] = $row_pedido['id'];
        $pedido['id_produtos'] = $row_pedido['id_produtos'];
        $pedido['nome_cliente'] = $row_pedido['nome_cliente'];
        $pedido['bairro_cliente'] = $row_pedido['bairro_cliente'];
        $pedido['rua_cliente'] = $row_pedido['rua_cliente'];
        $pedido['numero_complemento_cliente'] = $row_pedido['numero_complemento_cliente'];
        $pedido['cidade_cliente'] = $row_pedido['cidade_cliente'];  
        $pedido['federacao_cliente'] = $row_pedido['federacao_cliente'];
        $pedido['pedido_pago'] = $row_pedido['pedido_pago'];
        $pedido['pedido_enviado'] = $row_pedido['pedido_enviado'];
        $pedido['pedido_entregue'] = $row_pedido['pedido_entregue'];
        $pedido['pedido_finalizado'] = $row_pedido['pedido_finalizado'];

        array_push($retorno, $pedido);
    }
}
else{
    echo "Nenhum produto foi encontrado!";
}
echo json_encode($retorno);

?>