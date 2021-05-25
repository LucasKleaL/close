var dados;

$(document).ready(function() {

    //ajaxHoodies();

});

function ajaxHoodies() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../../php/recoverBags.php',
        success: function (retorno) {
            dados = retorno;
            listarBags(retorno);
            console.log(dados)
        },
        error: function () {
            alert("Erro ao recuperar produtos");
        }
    })

}

function listarBags(retorno) {

    var length = Object.keys(retorno).length;
    var content = "";

    for (var i = 0; i < length - 1; i++) {

        content = '<div class="card-produto">';
        content += '<img src="../../'+retorno[i].foto+'" alt="produto" class="card-imagem-produto" onclick="productClick('+retorno[i].id+')">';
        content += '<h1 class="card-titulo-produto">'+retorno[i].nome+'</h1>';
        content += '<h2 class="card-preco-produto">R$ '+retorno[i].preco+'</h2>';
        content += '</div>';

        $("#divBags").append(content);
    }

}

function productClick(idProduto) {
    sessionStorage.setItem("id_produto", idProduto);
    console.log("redirecionando para produto")
    window.location.href = "../../html/product.html";
}