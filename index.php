<?php
$langs_arr=['rus'];
$default_lang='rus';
$lang=$default_lang;
if(isset($_GET['lang'])){
	if(in_array($_GET['lang'],$langs_arr)){
		setcookie('lang',$_GET['lang'],time()+31536000,'/');//1 year
		header('location:/');
		exit;
	}
}
if(isset($_COOKIE['lang'])){
	if(!in_array($_COOKIE['lang'],$langs_arr)){
		setcookie('lang','',time()+31536000,'/');//clear if lang not exist
		header('location:/');
		exit;
	}
	else{
		$lang=$_COOKIE['lang'];
	}
}
if(!in_array($lang,$langs_arr)){
	$lang=$default_lang;
}
include('index.'.$lang.'.php');