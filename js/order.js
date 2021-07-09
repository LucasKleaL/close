var idProdutos;
var nomeCliente;
var bairroCliente;
var ruaCliente;
var numeroCliente;
var cidadeCliente;
var federacaoCliente;

var min = 10000000;
var max = 1000000000;
var protocoloHexa;

$(document).ready(function() {

    //

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
        success: function () {
            orderSendSucess()
            console.log("ajax enviado com sucesso")
        },
        error: function () {
            orderSendFailure()
            console.log("Erro ao recuperar produtos")
        }
    })

}

function orderSendSucess() {

    $("#tituloModal").text("Pedido efetuado com sucesso!");
    $("#textoModal").text("Por favor prossiga com o pagamento para finalizar seu pedido!");
    $("#protocoloModal").text("Este é o protocolo do seu pedido: "+protocoloHexa)
    $("#botaoModal").text("PAGAR");
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
    //
}