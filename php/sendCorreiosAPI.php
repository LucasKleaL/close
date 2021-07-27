<?php 

    $cepDestino = $_POST['cepDestino'];
    $servico = $_POST['servico'];
    $cepOrigem = '01153000';

    $url = 'https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?';

    $url .= 'nCdEmpresa=&';
    $url .= 'sDsSenha=&';

    if ($servico == "SEDEX") {
        $url .= 'nCdServico=04014&';
    }
    elseif ($servico == "PAC") {
        $url .= 'nCdServico=04510&';
    }
    
    $url .= 'sCepOrigem='.$cepOrigem.'&';
    $url .= 'sCepDestino='.$cepDestino.'&';
    $url .= 'nVlPeso=0.5&';
    $url .= 'nCeFormato=1&';
    $url .= 'nVlComprimento=17.0&';
    $url .= 'nVlAltura=16.0&';
    $url .= 'nVlLargura=21.0&';
    $url .= 'nVlDiametro=11&';
    $url .= 'sCdMaoPropria=N&';
    $url .= 'nVlValorDeclarado=0&';
    $url .= 'sCdAvisoRecebimento=N';
    //$url .= 'StrRetorno=xml&';
    //$url .= 'nIndicaCalculo=3';

    echo $url;

    //https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=04510&sCepOrigem=83730000&sCepDestino=8370000&nVlPeso=0.5&nCeFormato=1&nVlComprimento=11&nVlAltura=16&nVlLargura=21&nVlDiametro=11&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N&StrRetorno=xml&nIndicaCalculo=3

    $xml = file_get_contents($url);
    $result = simplexml_load_string($xml);

    $retorno = array(
        'preco' => strval($result->cServico->Valor),
        'prazo' => strval($result->cServico->PrazoEntrega)
    );

    if ($result) {
        $retorno['status'] = 'success';
        $retorno['url'] = $url;
    }
    else {
        $retorno['status'] = 'error';
    }

    echo json_encode($retorno);
    echo $valor;

?>