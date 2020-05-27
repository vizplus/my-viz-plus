<?php
error_reporting(0);
include('autoloader.php');
ob_start();
$admin=false;
$user=array();
$menu_addon='';

if(isset($_COOKIE['my_vizplus_login'])){
	if($_COOKIE['my_vizplus_password']==md5($users_arr[$_COOKIE['my_vizplus_login']])){
		$admin=true;
		$user=$_COOKIE['my_vizplus_login'];
		$menu_addon='<a class="menu-el color1" href="/admin.php?action=logout">Выход</a>';
	}
}

$ip='';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
}
else{
	if(isset($_SERVER['REMOTE_ADDR'])){
		$ip=$_SERVER['REMOTE_ADDR'];
	}
}

$title='Администрирование';
$action=$_GET['action'];
if($admin){
	if('paid_subscriptions'==$action){
		$title='Записи в таблице «Платные подписки»';
		if($_GET['hide']){
			$db->sql('UPDATE `paid_subscriptions` SET `status`=1 WHERE `creator`=\''.$db->prepare($_GET['hide']).'\' LIMIT 1');
			header('location:/admin.php?action=paid_subscriptions&caption=ok');
			exit;
		}
		if($_GET['show']){
			$db->sql('UPDATE `paid_subscriptions` SET `status`=0 WHERE `creator`=\''.$db->prepare($_GET['show']).'\' LIMIT 1');
			header('location:/admin.php?action=paid_subscriptions&caption=ok');
			exit;
		}
		print '<a class="right" href="/admin.php">&larr; вернуться</a>';
		if('ok'==$_GET['caption'])
		print '<p class="green">Операция успешно выполнена</p>';

		print 'Список скрытых подписок:';
		$q=$db->sql('SELECT * FROM `paid_subscriptions` WHERE `status`=1 ORDER BY `creator` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&show='.$m['creator'].'" class="inline-button small no-margin" style="font-size:14px;margin-right:10px !important;">показывать</a> '.$m['creator'].($m['sub_count']?'<span class="green"> &mdash; подписчиков: '.$m['sub_count'].'</span>':'').'</div>';
		}

		print '<hr>Список отображаемых подписок:';
		$q=$db->sql('SELECT * FROM `paid_subscriptions` WHERE `status`=0 ORDER BY `creator` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&hide='.$m['creator'].'" class="inline-button small no-margin red" style="font-size:14px;margin-right:10px !important;">скрыть</a> '.$m['creator'].($m['sub_count']?'<span class="green"> &mdash; подписчиков: '.$m['sub_count'].'</span>':'').'</div>';
		}
	}
	else
	if('accounts_on_sale'==$action){
		$title='Записи в таблице «Аккаунты на продаже»';
		if($_GET['hide']){
			$db->sql('UPDATE `accounts_on_sale` SET `status`=1 WHERE `account`=\''.$db->prepare($_GET['hide']).'\' LIMIT 1');
			header('location:/admin.php?action=accounts_on_sale&caption=ok');
			exit;
		}
		if($_GET['show']){
			$db->sql('UPDATE `accounts_on_sale` SET `status`=0 WHERE `account`=\''.$db->prepare($_GET['show']).'\' LIMIT 1');
			header('location:/admin.php?action=accounts_on_sale&caption=ok');
			exit;
		}
		print '<a class="right" href="/admin.php">&larr; вернуться</a>';
		if('ok'==$_GET['caption'])
		print '<p class="green">Операция успешно выполнена</p>';

		print 'Список скрытых аккаунтов:';
		$q=$db->sql('SELECT * FROM `accounts_on_sale` WHERE `status`=1 ORDER BY `account` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&show='.$m['account'].'" class="inline-button small no-margin" style="font-size:14px;margin-right:10px !important;">показывать</a> '.$m['account'].($m['length']<8?'<span class="green"> &mdash; длина '.$m['length'].' символов</span>':'').'</div>';
		}

		print '<hr>Список отображаемых аккаунтов:';
		$q=$db->sql('SELECT * FROM `accounts_on_sale` WHERE `status`=0 ORDER BY `account` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&hide='.$m['account'].'" class="inline-button small no-margin red" style="font-size:14px;margin-right:10px !important;">скрыть</a> '.$m['account'].($m['length']>8?'<span class="red"> &mdash; длина '.$m['length'].' символов</span>':'').'</div>';
		}
	}
	else
	if('subaccounts_on_sale'==$action){
		$title='Записи в таблице «Субаккаунты на продаже»';
		if($_GET['hide']){
			$db->sql('UPDATE `subaccounts_on_sale` SET `status`=1 WHERE `account`=\''.$db->prepare($_GET['hide']).'\' LIMIT 1');
			header('location:/admin.php?action=subaccounts_on_sale&caption=ok');
			exit;
		}
		if($_GET['show']){
			$db->sql('UPDATE `subaccounts_on_sale` SET `status`=0 WHERE `account`=\''.$db->prepare($_GET['show']).'\' LIMIT 1');
			header('location:/admin.php?action=subaccounts_on_sale&caption=ok');
			exit;
		}
		print '<a class="right" href="/admin.php">&larr; вернуться</a>';
		if('ok'==$_GET['caption'])
		print '<p class="green">Операция успешно выполнена</p>';

		print 'Список скрытых субаккаунтов:';
		$q=$db->sql('SELECT * FROM `subaccounts_on_sale` WHERE `status`=1 ORDER BY `account` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&show='.$m['account'].'" class="inline-button small no-margin" style="font-size:14px;margin-right:10px !important;">показывать</a> '.$m['account'].($m['length']<8?'<span class="green"> &mdash; длина '.$m['length'].' символов</span>':'').'</div>';
		}

		print '<hr>Список отображаемых субаккаунтов:';
		$q=$db->sql('SELECT * FROM `subaccounts_on_sale` WHERE `status`=0 ORDER BY `account` ASC');
		while($m=$db->row($q)){
			print '<div style="margin-top:5px;line-height:25px;"><a href="/admin.php?action='.$action.'&hide='.$m['account'].'" class="inline-button small no-margin red" style="font-size:14px;margin-right:10px !important;">скрыть</a> '.$m['account'].($m['length']>8?'<span class="red"> &mdash; длина '.$m['length'].' символов</span>':'').'</div>';
		}
	}
	else
	if('logout'==$action){
		@setcookie('my_vizplus_login','',time()+8*3600,'/');
		@setcookie('my_vizplus_password','',time()+8*3600,'/');
		header('location:/admin.php');
		exit;
	}
	else{
		print '<p>Привет, '.$user.', ваш IP: '.$ip.'</p>';
		print '<p><a href="/admin.php?action=paid_subscriptions">Записи в таблице «Платные подписки»</a></p>';
		print '<p><a href="/admin.php?action=accounts_on_sale">Записи в таблице «Аккаунты на продаже»</a></p>';
		print '<p><a href="/admin.php?action=subaccounts_on_sale">Записи в таблице «Субаккаунты на продаже»</a></p>';
	}
}
else{
	$error=false;
	if(isset($_POST['my_login'])){
		if(isset($users_arr[$_POST['my_login']])){
			if($_POST['my_password']==$users_arr[$_POST['my_login']]){
				@setcookie('my_vizplus_login',$_POST['my_login'],time()+8*3600,'/');
				@setcookie('my_vizplus_password',md5($_POST['my_password']),time()+8*3600,'/');
				header('location:/admin.php');
				exit;
			}
			else{
				$error='Пароль не подходит';
			}
		}
		else{
			$error='Пользователь не найден';
		}
	}
	$title='Вход';
	print '<form action="?" method="POST">';
	if($error)
	print '<p class="red">Ошибка: '.$error.'</p>';
	print '<p><input type="text" name="my_login"> &mdash; логин</p>';
	print '<p><input type="password" name="my_password"> &mdash; пароль</p>';
	print '<p><input type="submit" value="Выполнить вход"></p>';
	print '</form>';
}

$content=ob_get_contents();
ob_end_clean();

print '<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>'.$title.' — VIZ+</title>
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="/app.css?'.filemtime('app.css').'">
</head>
<body>
<div class="header shadow unselectable">
	<div class="horizontal-view">
		<div class="menu-button menu-button-action"><img class="menu-button-action" src="/menu.svg"></div>
		<div class="logo">
			<a href="/" class="prefix">my.</a><a href="https://viz.plus/"><img src="/logo_20.png" alt="VIZ+"></a>
		</div>
		<div class="menu-list captions">
			<div class="menu-bg">
				<a class="menu-el color1 selected" href="/admin.php">Администрирование</a>
				'.$menu_addon.'
			</div>
		</div>
	</div>
</div>

<div class="horizontal-view vertical-view">
	<div class="cards-view">
		<div class="cards-container">
			<div class="card captions">
				<h3>'.$title.'</h3>';
print $content;
print '
			</div>
		</div>
	</div>
</div>
';