var idProdutos;
var nomeCliente;
var bairroCliente;
var ruaCliente;
var numeroCliente;
var cidadeCliente;
var federacaoCliente;

$(document).ready(function() {

    //

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
        url: '../php/sendOrder.php',
        success: function () {
            console.log("ajax enviado com sucesso")
        },
        error: function () {
            console.log("Erro ao recuperar produtos")
        }
    })

}
