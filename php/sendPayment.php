<?php

    $acess_token = "TEST-8729600497268434-070817-1b735339a4bf0f7a0847ac10d81456c2-786312623";

    require_once 'vendor/autoload.php';

    MercadoPago\SDK::setAcessToken($acess_token);

    $preference = new MercadoPago\Preference();

    $item = new MercadoPago\Item();
    $item->title = '';
    $item->quantity = 1;


?>