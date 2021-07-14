<?php

    $acess_token = "TEST-8729600497268434-070817-1b735339a4bf0f7a0847ac10d81456c2-786312623";

    include("vendor/autoload.php");

    MercadoPago\SDK::setAccessToken($acess_token);
    
    /*$nomeProdutosOrder = $_POST['nomeProdutosOrder'];
    $idProdutosOrder = $_POST['idProdutosOrder'];
    $protocoloOrder = $_POST['protocoloOrder'];
    $nomeClienteOrder = $_POST['nomeClienteOrder'];*/

    //$produtosOrder = json_decode($idProdutosOrder);

    //$produtosLenght = count($idProdutosOrder);

    //$preference = new MercadoPago\Preference();
    
    /*$item = new MercadoPago\Item();
    $item->title = "close teste";
    $item->quantity = 1;
    $item->unit_price = 1.99;

    $preference->items = array($item);*/

    /*$preference->back_urls = array(
        "sucess" => "http://localhost:8888/feedback",
        "failure" => "http://localhost:8888/feedback",
        "pending" => "http://localhost:8888/feedback"
    );*/

    /*
    for ($i = 0; $i < $produtosLenght; $i++) {
        
        $item = new MercadoPago\Item();
        $item->title = $nomeProdutosOrder[$i];
        $item->quantity = $produtosOrder[$i]->quantidade;
        $item->unit_price = (double)$produtosOrder[$i]->preco;

        $preference->items = array($item);

    }
    */

    //$preference->external_reference = 1;
    //$preference->save();

    
?>