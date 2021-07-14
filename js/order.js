
var dadosOrders;
var dadosProducts;

var protocoloHexa;
var idProdutos;
var nomeCliente;
var bairroCliente;
var ruaCliente;
var numeroCliente;
var cidadeCliente;
var federacaoCliente;

var min = 10000000;
var max = 1000000000;

$(document).ready(function() {

    recoverOrdersDatabase();
    recoverProducts();

});

function prosseguirPedido() {

    //var numeroProtocolo = getRandomInt(min, max);

    idProdutos = localStorage.getItem("cartProducts");
    nomeCliente = $("#inputNome").val();
    bairroCliente = $("#inputBairro").val();
    ruaCliente = $("#inputRua").val();
    numeroCliente = $("#inputNumero").val();
    cidadeCliente = $("#inputCidade").val();
    federacaoCliente = $("#inputFederacao").val();

    console.log("textOrder: "+getTextOrder())

    var sha256 = sjcl.hash.sha1.hash(getTextOrder());
    protocoloHexa = sjcl.codec.base32.fromBits(sha256);
    
    console.log("numero protocolo hash "+protocoloHexa)

    ajaxEnviarPedido();


}

function getTextOrder() { //responsavel por gerar uma string com base nos atributos do pedido para ser cifrada posteriormente em forma de hash

    var textOrder;
    var randomNum = Math.random(1000, 10000);
    var jsonString = JSON.parse(idProdutos);
    var lengthCart = Object.keys(jsonString).length;

    for (var i = 0; i < lengthCart; i++) {
        textOrder += jsonString[i].id;
        textOrder += jsonString[i].quantidade;
        textOrder += jsonString[i].tamanho;
        textOrder += jsonString[i].preco;
    }

    textOrder += nomeCliente;
    textOrder += bairroCliente;
    textOrder += ruaCliente;
    textOrder += numeroCliente;
    textOrder += cidadeCliente;
    textOrder += federacaoCliente;
    textOrder += randomNum;

    return textOrder;
}

function ajaxEnviarPedido() {
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            idProdutos: idProdutos,
            protocolo: protocoloHexa,
            nomeCliente: nomeCliente,
            bairroCliente: bairroCliente,
            ruaCliente: ruaCliente,
            numeroCliente: numeroCliente,
            cidadeCliente: cidadeCliente,
            federacaoCliente: federacaoCliente,
        },
        url: '../php/sendOrder.php',
        success: function (retorno) {
            console.log("ajax enviado com sucesso")
            if (retorno.status === 'success') {
                orderSendSucess();
            }
            else if (retorno.status === 'error') {
                orderSendFailure();
            }
        }
    })

}

function orderSendSucess() {

    localStorage.setItem("lastOrderProtocol", protocoloHexa);

    $("#tituloModal").text("Pedido efetuado com sucesso!");
    $("#textoModal").text("Por favor prossiga para escolher seu método de pagamento e finalizar seu pedido!");
    $("#protocoloModal").text("Este é o protocolo do seu pedido: "+protocoloHexa)
    $("#botaoModal").text("PROSSEGUIR");
    $("#botaoModal").attr("onclick", "chamarPagamento()");
    $("#botaoModal").attr("data-dismiss", "");

    $(".modal").modal('show');

}

function orderSendFailure() {

    $("#tituloModal").text("Erro ao enviar pedido");
    $("#textoModal").text("Algo de errado aconteceu ao solicitar o envio do seu pedido. Por favor tente novamente dentro de alguns minutos.");
    $("#botaoModal").text("FECHAR");
    $("#botaoModal").attr("onclick", "");
    $("#botaoModal").attr("data-dismiss", "modal");

    $(".modal").modal('show');

}

function chamarPagamento() {

    window.location.href = "../html/chosePayment.html";

    /*
    recoverOrdersDatabase();
    recoverProducts();

    var ordersLenght = Object.keys(dadosOrders).length;
    var productsLenght = Object.keys(dadosProducts).length;
    
    for (var i = 0; i < ordersLenght-1; i++) {
        if (dadosOrders[i].protocolo === protocoloHexa) {

            var idProdutosInOrder = dadosOrders[i].id_produtos;
            var nomeProdutosOrder;

            for (var y = 0; y < productsLenght-1; y++) {
                if (idProdutosInOrder[i].id === dadosProducts[y].id) {
                    nomeProdutosOrder.push(dadosProducts[y].nome);
                }
            }

            var idProdutosOrder = dadosOrders[i].id_produtos;
            var protocoloOrder = dadosOrders[i].protocolo;
            var nomeClienteOrder = dadosOrders[i].nome_cliente;

            console.log("antes do ajax de pagamento")

            
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {
                    nomeProdutosOrder: nomeProdutosOrder,
                    idProdutosOrder: idProdutosOrder,
                    protocoloOrder: protocoloOrder,
                    nomeClienteOrder: nomeClienteOrder
                },
                url: '../php/sendPayment.php',
                success: function () {
                    console.log("ajax de payment enviado com sucesso")
                },
                error: function () {
                    console.log("Erro ao enviar ajax payment")
                }
            })
            

        }
    }
    */

}

function recoverOrdersDatabase() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../php/recoverOrders.php',
        success: function (retorno) {
            dadosOrders = retorno;
        },
        error: function () {
            alert("Erro ao recuperar orders");
        }
    })
}

function recoverProducts() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../php/recoverAllProducts.php',
        success: function (retorno) {
            dadosProducts = retorno;
        },
        error: function () {
            alert("Erro ao recuperar produtos");
        }
    })
}