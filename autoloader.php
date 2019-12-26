<?php
include('config.php')
$site_root=$_SERVER['DOCUMENT_ROOT'];
putenv('TZ='.$config['server_timezone']);
date_default_timezone_set($config['server_timezone']);
include($site_root.'/class/viz_jsonrpc.php');
include($site_root.'/class/db.php');

$db=new DataManagerDatabase($config['db_host'],$config['db_login'],$config['db_password']);
$db->db($config['db_base'],'utf8mb4');
if(!$db->link){
	print '<html><head></head><body>Server restarting... <!-- '.$config['db_host'].'  --></body></html>';
	exit;
}
$api=new viz_jsonrpc_web($config['jsonrpc_node']);

$time=time();

$ip='';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
}
else{
	if(isset($_SERVER['REMOTE_ADDR'])){
		$ip=$_SERVER['REMOTE_ADDR'];
	}
}