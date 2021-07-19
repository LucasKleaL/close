var dadosOrders;
var approvedPaymentProtocol = localStorage.getItem("paymentApprovedProtocol");
var emailDestinatario;

$(document).ready(function() {

    recoverOrdersDatabase();
    

});

function getEmailFromOrder(retorno) {

    var ordersLenght = Object.keys(retorno).length;

    console.log("lenght "+ordersLenght)

    console.log("approvedPaymentProtocol "+approvedPaymentProtocol)

    console.log(retorno)

    for (var i = 0; i < ordersLenght - 1; i++) {

        if (String(retorno[i].protocolo) === String(approvedPaymentProtocol)) {
            console.log("achou correspondente no banco")
            console.log("email do banco "+retorno[i].email_cliente)
            emailDestinatario = String(retorno[i].email_cliente);
            console.log("emailDestinatario "+emailDestinatario)
            ajaxSendMail(emailDestinatario);
        } 

    }

}

function ajaxSendMail(emailDestinario) {
    console.log("emailDestinario pre ajax "+emailDestinatario)
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            emailDestinatario: emailDestinatario
        },
        url: '../php/successfulOrderMail.php',
        success: function (response_array) {
            if (response_array.status === "success") {
                console.log("ajax send mail successful");
            }
            else if (response_array.status === "error") {
                console.log("ajax send mail error");
            }
        },
        error: function (response_array) {
            console.log("falha ao enviar ajax de email")
        }
    })
}

function recoverOrdersDatabase() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../php/recoverOrders.php',
        success: function (retorno) {

            if (retorno.status === "success") {
                console.log("ajax recover orders database successful");
                dadosOrders = retorno;
                getEmailFromOrder(retorno);
            }
            else if (retorno.status === "error") {
                console.log("ajax recover orders database error");
            }
            
        },
        error: function () {
            alert("Erro ao recuperar orders");
        }
    })
}