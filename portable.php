<?php
$langs_arr=['rus'];
$default_lang='rus';
$lang=$default_lang;
if(isset($_GET['lang'])){
	if(in_array($_GET['lang'],$langs_arr)){
		$lang=$_GET['lang'];
	}
}
else
if(isset($_COOKIE['lang'])){
	if(in_array($_COOKIE['lang'],$langs_arr)){
		$lang=$_COOKIE['lang'];
	}
}
if(!in_array($lang,$langs_arr)){
	$lang=$default_lang;
}
$filename='myvizplus-'.$lang.'.html';
$output_filename='myvizplus-'.$lang.'.html';
if(file_exists($filename)){
	header("Cache-Control: public");
	header("Content-Description: File Transfer");
	header("Content-Disposition: attachment; filename=".$output_filename);
	header("Content-Type: text/html");
	header("Content-Transfer-Encoding: binary");
	readfile($filename);
}
else{
	header('HTTP/1.1 404 Not Found');
	print '<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<TITLE>404 Not Found</TITLE>
</head>
<body>
<h1>Not Found</h1>
The requested URL was not found on this server.<P>
</body>
</html>';
}
exit;