<?php

include_once "config.php";

$result = "SELECT * FROM produtos WHERE ativo = 's'";

$resultado = mysqli_query($link, $result);
$produto['id'] = "";
$retorno['id'] = "";
if(($resultado) && ($resultado -> num_rows) != 0){
    while($row_produto = mysqli_fetch_assoc($resultado)){
        $produto['id'] = $row_produto['id'];
        $produto['nome'] = $row_produto['nome'];
        $produto['descricao'] = $row_produto['descricao'];
        $produto['preco'] = $row_produto['preco'];
        $produto['foto'] = $row_produto['foto'];
        $produto['tipo'] = $row_produto['tipo'];
        $produto['ativo'] = $row_produto['ativo'];  

        array_push($retorno, $produto);
    }
}
else{
    echo "Nenhum produto foi encontrado!";
}
echo json_encode($retorno);
?>