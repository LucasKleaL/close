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
        content += '<h3 class="h3-preco-produto">R$ '+retorno[i].preco+'</h3>';
        content += '<h2 class="h2-descricao-produto">'+retorno[i].descricao+'</h2>';
        content += '<select class="select-tamanho">';
        content += '<option>small (P)</option>';
        content += '<option>medium (M)</option>';
        content += '<option>large (G)</option>';
        content += '<option>xlarge (GG)</option>';
        content += '</select>';
        content += '<h1 class="h1-tamanho-produto">Tamanhos</h1>';
        content += '<p class="p-tamanho-produto">small 55x68cm</p>';
        content += '<p class="p-tamanho-produto">medium 60x69cm</p>';
        content += '<p class="p-tamanho-produto">large 69x74cm</p>';
        content += '<p class="p-tamanho-produto">xlarge 72x74cm</p>';
        content += '<p class="p-tamanho-produto"></p>';
        content += '<button class="botao-comprar" value="'+retorno[i].id+'" onclick="chamarCompra('+retorno[i].id+')">COMPRAR</button>';
        content += '</div>';
    }

    $(".div-produto").append(content);

    content = "";

}

function chamarCompra(id) {

    var cart;
    var tamanho;
    var auxTamanho = $(".select-tamanho").val();

    if (auxTamanho === "small (P)") {
        tamanho = "P";
    }
    else if (auxTamanho === "medium (M)") {
        tamanho = "M";
    }
    else if (auxTamanho === "large (G)") {
        tamanho = "G";
    }
    else if (auxTamanho === "xlarge (GG)") {
        tamanho = "GG";
    }

    if (localStorage.hasOwnProperty("cartProducts")) {
        cart = JSON.parse(localStorage.getItem("cartProducts"))
    }
    else {
        cart = new Array();
    }

    for (var i = 0; i < cart.length; i++) {
        var productIdCart = cart[i].id;
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
        quantidade: 1,
        tamanho: tamanho,
        preco: dados[0].preco
        });
        
        localStorage.setItem("cartProducts", JSON.stringify(cart))
        
        alert("Produto adicionado ao cart");
    }
    
}


                    
                

                
                    
                    
                    
                