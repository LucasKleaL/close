var idProdutos;
var nomeCliente;
var bairroCliente;
var ruaCliente;
var numeroCliente;
var cidadeCliente;
var federacaoCliente;

$(document).ready(function() {

    //
    $(".modal").modal('show');

});

function prosseguirPedido() {

    idProdutos = localStorage.getItem("cartProducts");
    nomeCliente = $("#inputNome").val();
    bairroCliente = $("#inputBairro").val();
    ruaCliente = $("#inputRua").val();
    numeroCliente = $("#inputNumero").val();
    cidadeCliente = $("#inputCidade").val();
    federacaoCliente = $("#inputFederacao").val();

    ajaxEnviarPedido();

}

function ajaxEnviarPedido() {
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            idProdutos: idProdutos,
            nomeCliente: nomeCliente,
            bairroCliente: bairroCliente,
            ruaCliente: ruaCliente,
            numeroCliente: numeroCliente,
            cidadeCliente: cidadeCliente,
            federacaoCliente: federacaoCliente,
        },
        url: './php/sendOrder.php',
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

}