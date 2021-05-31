var localCart;
var dados;
var id_produto = new Array();

$(document).ready(function() {
    
    getLocalStorageCart();
    ajaxBuscarProdutosCart();

});

function getLocalStorageCart() {
    localCart = JSON.parse(localStorage.getItem("cartProducts"));
}

function ajaxBuscarProdutosCart() {

    for (var i = 0; i < localCart.length; i++) {
        id_produto.push(localCart[i].id);
    }

    console.log("id do ajax:"+id_produto)

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {id_produto: id_produto},
        url: '../php/recoverCart.php',
        success: function (retorno) {
            dados = retorno;
            imprimirCart(retorno);
            //console.log(dados)
            console.log("ajax enviado com sucesso")
        },
        error: function () {
            alert("Erro ao recuperar produtos");
            console.log("Erro ao recuperar produtos")
        }
    })
}

function imprimirCart(retorno) {

    var length = Object.keys(retorno).length;
    var content = "";

    console.log("length retorno: "+length);

    for (var i = 0; i < length-1; i++) {
        content = '<div class="div-produto-cart">';
        content += '<img class="imagem-produto-cart" src="../'+retorno[i].foto+'">';
        content += '<h1 class="titulo-produto-cart">'+retorno[i].nome+'</h1>';
        content += '<p class="p-quantidade-produto-cart">Quantidade:</p>';
        content += '<div class="div-quantidade">';
        content += '<img src="../public/icons/black_minus_icon.png" class="quantidade-icon" style="margin-right: 0.3rem;" onclick="diminuirQuantidade(this.id)" id="'+retorno[i].id+'" title="Decrease quantity">';
        content += '<input type="text" class="input-quantidade-produto-cart" value="1" id="inputQuantidade'+retorno[i].id+'">';
        content += '<img src="../public/icons/add_icon.png" class="quantidade-icon" style="margin-left: 0.3rem;" onclick="aumentarQuantidade(this.id)" id="'+retorno[i].id+'" title="Increase quantity">';
        content += '<p class="p-remover-produto-cart" id="removerProdutoCart'+retorno[i].id+'" onclick="removerProdutoCart(this.id)" title="Remove '+retorno[i].nome+ ' from cart">Remover do carrinho</p>';
        content += '</div>';
        content += '</div>';
        $(".div-cart").append(content);
        content = "";
        console.log("imprimiu um produto")
    }

    content += '<button class="botao-comprar" title="Buy">COMPRAR</button>';

    $(".div-cart").append(content);

    content = "";

}

function aumentarQuantidade(id) {
    var quantidadeValue = document.getElementById("inputQuantidade"+id).value;
    $(".input-quantidade-produto-cart").val(parseInt(quantidadeValue) + 1);
}

function diminuirQuantidade(id) {
    var quantidadeValue = document.getElementById("inputQuantidade"+id).value;
    if (quantidadeValue > 1) {
        $(".input-quantidade-produto-cart").val(parseInt(quantidadeValue) - 1);
    }
}

function removerProdutoCart() {

}

function clearCart() {
    localStorage.clear();
    $(".div-cart").html("");
    var content = '<a href="../"><p class="p-voltar-shop">Ver mais produtos</p></a>';
    $(".div-cart").append(content)
}