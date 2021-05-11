<?php
include('autoloader.php');
set_time_limit(10);
header("Content-type:application/json; charset=UTF-8");
header('HTTP/1.1 200 Ok');
$code=trim($db->prepare($_POST['code']),"\n\r\t ");
$login=trim($db->prepare($_POST['login']),"\n\r\t ");
if($code){
	if($login){
		$api_url='http://'.$config['booster_api'].'/booster/code/'.$code.'/'.$login;
		print file_get_contents($api_url);
	}
	else{
		print json_encode(['error'=>true,'data'=>false]);
	}
}
else{
	print json_encode(['error'=>true,'data'=>false]);
}
exit;