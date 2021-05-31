var dados;

var arrayCarrinho = JSON.parse(localStorage.getItem("cartProducts"));
var found; //responsavel por armazenar se um item já foi adicionado ao cart

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
        content += '<button class="botao-comprar" value="'+retorno[i].id+'" onclick="chamarCompra('+retorno[i].id+')">COMPRAR</button>';
        content += '</div>';
    }

    $(".div-produto").append(content);

    content = "";

}

function chamarCompra(id) {

    var cart;

    if (localStorage.hasOwnProperty("cartProducts")) {
        cart = JSON.parse(localStorage.getItem("cartProducts"))
    }
    else {
        cart = new Array();
    }

    for (var i = 0; i < cart.length; i++) {
        var productIdCart = cart[i].id;
        console.log("cart: "+cart)
        console.log("productIdCart "+productIdCart);
        if (productIdCart === id) {
            found = true;
        }
        else {
            found = false;
        }
    }

    if (found === true) {
        alert("Este produto já está no carrinho. Por favor acesse a página Cart e finalize sua compra!")
    }
    else {
        cart.push({id: id,
        quantidade: 1});
        
        localStorage.setItem("cartProducts", JSON.stringify(cart))
        
        alert("Produto adicionado ao cart");
    }
    
}


                    
                

                
                    
                    
                    
                