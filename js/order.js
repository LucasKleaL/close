
var dadosOrders;
var dadosProducts;

var protocoloHexa;
var idProdutos;
var nomeCliente;
var emailCliente;
var cpfCliente
var cepCliente;
var bairroCliente;
var ruaCliente;
var numeroCliente;
var cidadeCliente;
var federacaoCliente;
var splitCpf;
var splitCep;

var nomeInvalido = false;
var emailInvalido = false;
var cpfInvalido = false;
var cepInvalido = false;
var bairroInvalido = false;
var ruaInvalida = false;
var numeroInvalido = false;
var cidadeInvalida = false;

var variaveisInvalidas = [
    nomeInvalido,
    emailInvalido,
    cpfInvalido,
    cepInvalido,
    bairroInvalido,
    ruaInvalida,
    numeroInvalido,
    cidadeInvalida
];

var prosseguir = false;

var min = 10000000;
var max = 1000000000;

$(document).ready(function() {

    recoverOrdersDatabase();
    recoverProducts();

});

function prosseguirPedido() {

    var invalidInputText = "";

    idProdutos = localStorage.getItem("cartProducts");

    nomeCliente = $("#inputNome").val();
    emailCliente = $("#inputEmail").val();

    cpfCliente = $("#inputCpf").val();
    splitCpf = cpfCliente.replace(".", "").replace(".", "").replace("-", "");
    cpfCliente = splitCpf;

    cepCliente = $("#inputCep").val();
    splitCep = cepCliente.replace("-", "");
    cepCliente = splitCep;

    bairroCliente = $("#inputBairro").val();
    ruaCliente = $("#inputRua").val();
    numeroCliente = $("#inputNumero").val();
    cidadeCliente = $("#inputCidade").val();
    federacaoCliente = $("#inputFederacao").val();

    var array = [nomeCliente, emailCliente, splitCpf, splitCep, bairroCliente, ruaCliente, numeroCliente, cidadeCliente];
    var arrayMessages = [
        "Por favor insira seu nome completo.",
        "Por favor insira um email válido.",
        "Por favor insira um CPF válido.",
        "Por favor insira um CEP válido.",
        "Por favor insira seu bairro.",
        "Por favor insira sua rua.",
        "Por favor insira seu número e complemento.",
        "Por favor insira sua cidade."
    ];
    var arrayDivs = [
        "divNome",
        "divEmail",
        "divCpf",
        "divCep",
        "divBairro",
        "divRua",
        "divNumero",
        "divCidade",
    ];
    

    for (var i = 0; i < array.length; i++) {

        if (i === 2) { //verificação apenas para cpf
            if (variaveisInvalidas[i] === false && array[i].length < 11) {
                prosseguir = false;
                variaveisInvalidas[i] = true;
                invalidInputText += '<p class="invalid-input-text" id="'+arrayDivs[i]+'Invalid">'+arrayMessages[i]+'</p>';
                $("#"+arrayDivs[i]).append(invalidInputText);
                $("#"+arrayDivs[i]).removeAttr('style');
                invalidInputText = "";
            }
            else if (array[i].length === 11){
                prosseguir = true;

                if (variaveisInvalidas[i] === true) {
                    $("#"+arrayDivs[i]+"Invalid").hide();
                    $("#"+arrayDivs[i]).attr("style", "padding-bottom: 2rem;");
                }

            }

        }
        else if (i === 3) { //verificação apenas para cep
            if (variaveisInvalidas[i] === false && array[i].length < 8) {
                prosseguir = false;
                variaveisInvalidas[i] = true;
                invalidInputText += '<p class="invalid-input-text" id="'+arrayDivs[i]+'Invalid">'+arrayMessages[i]+'</p>';
                $("#"+arrayDivs[i]).append(invalidInputText);
                $("#"+arrayDivs[i]).removeAttr('style');
                invalidInputText = "";
            }
            else if (array[i].length === 8) {
                prosseguir = true;

                if (variaveisInvalidas[i] === true) {
                    $("#"+arrayDivs[i]+"Invalid").hide();
                    $("#"+arrayDivs[i]).attr("style", "padding-bottom: 2rem;");
                }

            }

        }
        else if (array[i] != "") { //verificação geral
            prosseguir = true;

            if (variaveisInvalidas[i] === true) {
                $("#"+arrayDivs[i]+"Invalid").hide();
                $("#"+arrayDivs[i]).attr("style", "padding-bottom: 2rem;");
            }
            
        }
        else {

            prosseguir = false;

            if (variaveisInvalidas[i] === false) {
                variaveisInvalidas[i] = true;
                invalidInputText += '<p class="invalid-input-text" id="'+arrayDivs[i]+'Invalid">'+arrayMessages[i]+'</p>';
                $("#"+arrayDivs[i]).append(invalidInputText);
                $("#"+arrayDivs[i]).removeAttr('style');
                invalidInputText = "";
            }
            
            //break;
        }
    }

    if (prosseguir === true) {
        $(".invalid-input-text").hide();
        $("#divNome").attr("style", "padding-bottom: 2rem;");
        $("#divEmail").attr("style", "padding-bottom: 2rem;");
        $("#divBairro").attr("style", "padding-bottom: 2rem;");
        $("#divRua").attr("style", "padding-bottom: 2rem;");
        var sha256 = sjcl.hash.sha1.hash(getTextOrder());
        protocoloHexa = sjcl.codec.base32.fromBits(sha256);
        ajaxEnviarPedido();
    }
    else {
        $("#tituloModal").text("Formulário inválido");
        $("#textoModal").text("Por favor preencha os campos do pedido corretamente.");
        $("#botaoModal").text("CONTINUAR");
        $("#botaoModal").attr("onclick", "");
        $("#botaoModal").attr("data-dismiss", "modal");

        $(".modal").modal('show');
    }
    
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
            protocolo: protocoloHexa,
            idProdutos: idProdutos,
            nomeCliente: nomeCliente,
            emailCliente: emailCliente,
            cpfCliente: cpfCliente,
            cepCliente: cepCliente,
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