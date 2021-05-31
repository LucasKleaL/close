<?php

include_once "config.php";

$id_produto = $_POST["id_produto"];
$produto['id'] = "";
$retorno['id'] = "";

$lenght = count($id_produto);

for ($i = 0; $i < $lenght; $i++) {
    $result = "SELECT * FROM produtos WHERE ativo = 's' AND id = '$id_produto[$i]'";

    $resultado = mysqli_query($link, $result);
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
    
}


echo json_encode($retorno);

?>