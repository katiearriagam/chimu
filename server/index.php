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

$params = ['client_id'=>'9b6d887428aaab26ce5b', 'client_secret'=>'86572a379a828ed0451c26f4f41a56fc6a0b0d34', 'code' => $code];
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

