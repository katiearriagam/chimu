<?php 
header('Content-type: application/json');
header('Accept: application/json');
header("Access-Control-Allow-Origin: *");


// Do oauth

if($_SERVER['REQUEST_METHOD'] !== "POST") {
	die('Method disallowed');
}



$code = $_POST['code'];
$access_token = "";

$params = ['client_id'=>'6e245fffc482d35bca47', 'client_secret'=>'38af9345b096129b756c3a54ad7384a9cd8dadc8', 'code' => $code];
$defaults = [
	CURLOPT_URL => 'https://github.com/login/oauth/access_token',
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => $params,
	CURLOPT_RETURNTRANSFER => true
];

$headers = ["Accept: application/json"];
$ch = curl_init();
curl_setopt_array($ch, $defaults);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($ch);
curl_close($ch);

$json = json_decode($result, true);

$access_token = $json['access_token'];

echo $result;

/*

$params = ['access_token'=>$access_token];
$defaults = [
	CURLOPT_URL => 'https://api.github.com/user',
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => $params,
	CURLOPT_RETURNTRANSFER => true
];

$headers = ["Accept: application/json", "User-Agent: request"];
$ch = curl_init();
curl_setopt_array($ch, $defaults);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($ch);
curl_close($ch);


echo json_encode($result);
*/

// echo "Done";

