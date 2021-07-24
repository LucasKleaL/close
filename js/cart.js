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

    var cartItems = JSON.parse(localStorage.getItem("cartProducts"));
    var cartLenght = Object.keys(cartItems).length;

    for (var i = 0; i < length-1; i++) {
        content = '<div class="div-produto-cart" id="'+retorno[i].id+'">';
        content += '<img class="imagem-produto-cart" src="../'+retorno[i].foto+'">';
        content += '<h1 class="titulo-produto-cart">'+retorno[i].nome+'</h1>';
        content += '<p class="p-quantidade-produto-cart">Quantidade:</p>';
        content += '<div class="div-quantidade">';
        content += '<img src="../public/icons/black_minus_icon.png" class="quantidade-icon" style="margin-right: 0.3rem;" onclick="diminuirQuantidade(this.id)" id="'+retorno[i].id+'" title="Decrease quantity">';

        var quantityValue;
        for (var j = 0; j < cartLenght; j++) {
            if (String(retorno[i].id) === String(cartItems[j].id)) {
                quantityValue = cartItems[j].quantidade;
            }
        }
        content += '<input type="text" class="input-quantidade-produto-cart" value="'+quantityValue+'" id="inputQuantidade'+retorno[i].id+'" readonly="true">';

        content += '<img src="../public/icons/add_icon.png" class="quantidade-icon" style="margin-left: 0.3rem;" onclick="aumentarQuantidade(this.id)" id="'+retorno[i].id+'" title="Increase quantity">';
        content += '<p class="p-remover-produto-cart" id="removerProdutoCart'+retorno[i].id+'" onclick="removerProdutoCart(this.id)" title="Remove '+retorno[i].nome+ ' from cart" value="'+retorno[i].id+'">Remover do carrinho</p>';
        content += '</div>';
        content += '</div>';
        $(".div-cart").append(content);
        content = "";
        console.log("imprimiu um produto")
    }

    content += '<button class="botao-comprar" title="Buy" onclick="comprarCarrinho()">COMPRAR</button>';

    $(".div-cart").append(content);

    content = "";

}

function aumentarQuantidade(id) {
    var quantidadeValue = document.getElementById("inputQuantidade"+id).value;
    $("#inputQuantidade"+id).val(parseInt(quantidadeValue) + 1);

    var cartArray = JSON.parse(localStorage.getItem("cartProducts"));
    var lengthCart = Object.keys(cartArray).length;

    for (var i = 0; i < lengthCart; i++) {
        if (String(id) === String(cartArray[i].id)) {
            quantidadeValue = document.getElementById("inputQuantidade"+id).value;
            cartArray[i].quantidade = quantidadeValue;
            console.log("aumentou a quantidade no localStorage")
        }
    }

    localStorage.setItem("cartProducts", JSON.stringify(cartArray))
}

function diminuirQuantidade(id) {
    var quantidadeValue = document.getElementById("inputQuantidade"+id).value;
    if (quantidadeValue > 1) {
        $("#inputQuantidade"+id).val(parseInt(quantidadeValue) - 1);
    }
}

function removerProdutoCart(clickId) {

    var getValue = document.getElementById(clickId).getAttribute("value");
    
    var cartArray = JSON.parse(localStorage.getItem("cartProducts"));
    var lengthCart = Object.keys(cartArray).length;

    for (var i = 0; i < lengthCart-1; i++) {
        if (String(getValue) === String(cartArray[i].id)) {
            cartArray.splice(i, 1);
        }
    }

    localStorage.setItem("cartProducts", JSON.stringify(cartArray))

}

function clearCart() {
    localStorage.clear();
    $(".div-cart").html("");
    var content = '<a href="../"><p class="p-voltar-shop">Ver mais produtos</p></a>';
    $(".div-cart").append(content)
}

function comprarCarrinho() {
    window.location.href = "../html/order.html";
}

function ajaxCalcularFrete() {
    
    var cepDestino = $("#inputCepDestino").val();
    var servico = $("#selectServicoFrete").val();

    if (cepDestino != "") {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: {
                cepDestino: cepDestino,
                servico: servico
            },
            url: '../php/sendCorreiosAPI.php',
            success: function (retorno) {
                if (retorno.status === "success") {
                    var content = '<p class="p-retorno-frete">Preço: R$ <b>'+retorno.preco+'</b></p>';
                    content += '<p class="p-retorno-frete">Prazo de entrega: <b>'+retorno.prazo+'</b> dias úteis</p>';
                    $("#divInputFrete").append(content);
                } 
                else if (retorno.status === "error"){
                    var content = '<p class="p-retorno-frete">Preço: R$ <b>'+retorno.preco+'</b></p>';
                    content += '<p class="p-retorno-frete">Prazo de entrega: <b>'+retorno.prazo+'</b> dias úteis</p>';
                    $("#divInputFrete").append(content);
                }
            },
            error: function () {
                console.log("erro ao enviar ajax correios api")
            }
        })
    }

}

function chamarCalcularFrete() {
    //window.location.href = "../html/calcularFreteCart.html";

    console.log("chamou o frete")

    var display = document.getElementById("divInputFrete").style.display;

    if (display == "none") {
        $("#divInputFrete").attr("style", "display: block;");
        //document.getElementById("divInputFrete").style.display = 'block';
    }
    else {
        $("#divInputFrete").attr("style", "display: none;");
        //document.getElementById("divInputFrete").style.display = 'none';
    }

}