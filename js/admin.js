var dados;

$(document).ready(function() {

    ajaxRecuperarPedidos();

});

function ajaxRecuperarPedidos() {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../../php/recoverOrders.php',
        success: function (retorno) {
            dados = retorno;
            listarPedidos(retorno);
            console.log(dados)
        },
        error: function () {
            alert("Erro ao recuperar produtos");
        }
    })

}

function listarPedidos(retorno) {

    var length = Object.keys(retorno).length;
    var content = "";

    for (var i = 0; i < length - 1; i++) {

        var produtos = JSON.parse(retorno[i].id_produtos);
        var precoTotal = 0;

        var lengthProdutos = Object.keys(produtos).length;

        content += '<div class="div-pedido">';
        content += '<p class="p-atributo-pedido">ID do pedido: '+retorno[i].id+'</p>';

        for (var l = 0; l < lengthProdutos; l++) { //responsavel por somar o preco de cada item e obter o valor total da compra
            precoTotal += parseFloat(produtos[l].preco);
        }

        content += '<p class="p-atributo-pedido">Preço total do pedido: R$ '+precoTotal+'</p>'

        content += '<p class="p-atributo-pedido">ID dos produtos: ';
        for (var j = 0; j < lengthProdutos; j++) {
            content += produtos[j].id;
            if (j != lengthProdutos-1) {
                content += ", ";
            }
        }
        content += '</p>';

        content += '<p class="p-atributo-pedido">Quantidade dos produtos: ';
        for (var y = 0; y < lengthProdutos; y++) {
            content += produtos[y].quantidade;
            if (y != lengthProdutos-1) {
                content += ", ";
            }
        }
        content += '</p>';

        content += '<p class="p-atributo-pedido">Tamanho dos produtos: ';
        for (var w = 0; w < lengthProdutos; w++) {
            content += produtos[w].tamanho;
            if (w != lengthProdutos-1) {
                content += ", ";
            }
        }
        content += '</p>';
        
        content += '<p class="p-atributo-pedido">Nome do cliente: '+retorno[i].nome_cliente+'</p>';

        var endereco = retorno[i].cidade_cliente + ", " + retorno[i].federacao_cliente + " - " + retorno[i].rua_cliente + ", " + retorno[i].bairro_cliente + ", "
        + retorno[i].numero_complemento_cliente;
        content += '<p class="p-atributo-pedido">Endereço cliente: '+endereco+'</p>';

        var pago;
        if (retorno[i].pedido_pago === 1) {
            pago = "True";
        }
        else {
            pago = "False";
        }
        content += '<p class="p-atributo-pedido">Pedido pago: '+pago+'</p>';
        
        var enviado;
        if (retorno[i].pedido_enviado === 1) {
            enviado = "True";
        }
        else {
            enviado = "False";
        }
        content += '<p class="p-atributo-pedido">Pedido enviado: '+enviado+'</p>';

        var entregue;
        if (retorno[i].pedido_entregue === 1) {
            entregue = "True";
        }
        else {
            entregue = "False";
        }
        content += '<p class="p-atributo-pedido">Pedido entregue: '+entregue+'</p>';

        var finalizado;
        if (retorno[i].pedido_finalizado === 1) {
            finalizado = "True";
        }
        else {
            finalizado = "False";
        }
        content += '<p class="p-atributo-pedido">Pedido finalizado: '+finalizado+'</p>';

        content += '<p class="p-link-pedido" id="'+retorno[i].id+'" onclick="abrirDetalhes(this.id)">Mais detalhes</p>';

        content += '</div>';
   
    }

    

    $("#divInterna").append(content);

}

function abrirDetalhes(clickId) {
    localStorage.setItem("idDetalhePedido", clickId)
}