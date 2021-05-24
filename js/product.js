var dados;

$(document).ready(function() {

    ajaxBuscarProduto();



});

function ajaxBuscarProduto() {

    var id_produto = sessionStorage.getItem("id_produto");

    console.log("id do ajax:"+id_produto)

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {id_produto: id_produto},
        url: '../php/recoverProduct.php',
        success: function (retorno) {
            dados = retorno;
            imprimirProduto(retorno);
            //console.log(dados)
            console.log("ajax enviado com sucesso")
        },
        error: function () {
            alert("Erro ao recuperar produtos");
            console.log("Erro ao recuperar produtos")
        }
    })
}

function imprimirProduto(retorno) {

    var length = Object.keys(retorno).length;
    var content = "";

    for (var i = 0; i < length-1; i++) {
        content = '<div class="div-imagem-produto">';
        content += '<img class="img-produto" src="../'+retorno[i].foto+'">';
        content += '</div>';
        content += '<div class="div-infos-produto">';
        content += '<h1 class="h1-titulo-produto">'+retorno[i].nome+'</h1>';
        content += '<h2 class="h2-descricao-produto">'+retorno[i].descricao+'</h2>';
        content += '<h3 class="h3-preco-produto">R$ '+retorno[i].preco+'</h3>';
        content += '<button class="botao-comprar" value="'+retorno[i].id+'">COMPRAR</button>';
        content += '</div>';
    }

    $(".div-produto").append(content);

    content = "";

}


                    
                

                
                    
                    
                    
                