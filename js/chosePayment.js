var dadosOrdersDefault;
var dadosProductsDefault;
var lastOrderProtocol = localStorage.getItem("lastOrderProtocol");
var precoTotal = 0;

$(document).ready(function() {

    paypalRender();

    recoverOrdersDatabase();
    recoverProducts();

});

function paypalRender() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: precoTotal,
                        currency_code: 'BRL'
                    }
                }]
            })
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                localStorage.setItem("paymentApprovedProtocol", lastOrderProtocol)
                window.location.href="../html/paymentSuccessful.html";
            })
        },
        onCancel: function() {
            $("#tituloModal").text("O pagamento Paypal foi cancelado");
            $("#textoModal").text("Você pode reiniciar seu pagamento.");
            $("#botaoModal").text("FECHAR");
            $("#botaoModal").attr("onclick", "");
            $("#botaoModal").attr("data-dismiss", "modal");
            $(".modal").modal("show");
        },
        onError: function() {
            $("#tituloModal").text("Erro ao processar pagamento Paypal");
            $("#textoModal").text("Por favor atualize a página e tente novamente. Você também pode mudar a forma de pagamento.");
            $("#botaoModal").text("FECHAR");
            $("#botaoModal").attr("onclick", "");
            $("#botaoModal").attr("data-dismiss", "modal");
            $(".modal").modal("show");
        }
    }).render(".div-paypal");
}

function printOrderDetails(dadosOrders, dadosProducts) {

    var ordersLenght = Object.keys(dadosOrders).length;

    for (var i = 0; i < ordersLenght - 1; i++) {

        if (dadosOrders[i].protocolo === lastOrderProtocol) {

            var content = "";
            var productsOnCart = JSON.parse(dadosOrders[i].id_produtos);
            var productsOnCartLengh = Object.keys(productsOnCart).length;
            

            content += '<h2 class="h2-order-detail">ID do pedido (protocolo):</h2>';
            content += '<p class="p-order-detail">'+dadosOrders[i].protocolo+'</p>';
            content += '<h2 class="h2-order-detail">Nome do cliente:</h2>';
            content += '<p class="p-order-detail">'+dadosOrders[i].nome_cliente+'</p>';
            
            for (var y = 0; y < productsOnCartLengh; y++) {
                console.log(productsOnCart[y].preco)
                precoTotal += parseFloat(productsOnCart[y].preco);
            }

            content += '<h2 class="h2-order-detail">Valor total do pedido:</h2>';
            content += '<p class="p-order-detail">R$ '+precoTotal+'</p>';

            content += '<h2 class="h2-order-detail">Produdos do pedido:</h2>';

            for (var z = 0; z < productsOnCartLengh; z++) {

                var allProducstLenght = Object.keys(dadosProducts).length;

                for (var p = 0; p < allProducstLenght - 1; p++) {

                    console.log("id product on cart "+productsOnCart[z].id)

                    if (String(productsOnCart[z].id) === String(dadosProducts[p].id)) {
                        content += '<p class="p-product-name">'+dadosProducts[p].nome+' x'+productsOnCart[z].quantidade+'</p>';
                        content += '<p class="p-product-price">Preço: R$ '+dadosProducts[p].preco+'</p>'
                    }

                }

            }

            $(".div-order-details").append(content);

        }

    }

}

function recoverOrdersDatabase() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '../php/recoverOrders.php',
        success: function (retorno) {
            dadosOrdersDefault = retorno;
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
            dadosProductsDefault = retorno;
            printOrderDetails(dadosOrdersDefault, dadosProductsDefault);
        },
        error: function () {
            alert("Erro ao recuperar produtos");
        }
    })
}