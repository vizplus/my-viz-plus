<?php
error_reporting(0);
include('autoloader.php');

$end=false;
$sql_arr=[];
$sql_arr[]='TRUNCATE TABLE `paid_subscriptions`';
$counter=0;
$offset=0;
$perpage=10;
while(!$end){
	$result=$api->execute_method('get_paid_subscriptions',array($offset,$perpage));
	$page_counter=0;
	foreach($result as $k=>$v){
		$counter++;
		$page_counter++;
		$info=$api->execute_method('get_paid_subscription_options',array($v['creator']));
		if($info['creator']){
			$available=true;
			if(0==$v['levels']){
				$available=false;
			}
			$status=$db->select_one('paid_subscriptions','`status`',"WHERE `id`='".(int)$v['id']."'");
			if(!$status){
				$status=0;
			}
			$sql="INSERT INTO `paid_subscriptions` (`id`,`time`,`creator`,`period`,`levels`,`url`,`amount`,`available`,`sub_count`,`sub_amount`,`sub_auto_count`,`sub_auto_amount`,`status`) VALUES ('".(int)$v['id']."','".time()."','".$db->prepare($v['creator'])."','".(int)$v['period']."','".(int)$v['levels']."','".$db->prepare($v['url'])."','".(int)$v['amount']."','".$available."','".(int)$info['active_subscribers_count']."','".(int)$info['active_subscribers_summary_amount']."','".(int)$info['active_subscribers_with_auto_renewal_count']."','".(int)$info['active_subscribers_with_auto_renewal_summary_amount']."','".$status."')";
			$sql_arr[]=$sql;
		}
	}
	if($page_counter<$perpage){
		$end=true;
	}
	else{
		$offset+=$page_counter;
	}
}
if($counter){
	foreach($sql_arr as $sql){
		$db->sql($sql);
	}
}

$end=false;
$sql_arr=[];
$sql_arr[]='TRUNCATE TABLE `accounts_on_sale`';
$counter=0;
$offset=0;
$perpage=10;
$ignore=[];
while(!$end){
	$result=$api->execute_method('get_accounts_on_sale',array($offset,$perpage));
	$page_counter=0;
	foreach($result as $k=>$v){
		$counter++;
		$page_counter++;
		if(!in_array($v['account'],$ignore)){
			$ignore[]=$v['account'];

			$seller=$v['account_seller'];
			$length=strlen($v['account']);
			$levels_arr=explode('.',$v['account']);
			$level=count($levels_arr);
			$status=$db->select_one('accounts_on_sale','`status`',"WHERE `account`='".$db->prepare($v['account'])."'");
			if(!$status){
				$status=0;
			}
			$sql="INSERT INTO `accounts_on_sale` (`id`,`time`,`account`,`length`,`level`,`seller`,`price`,`status`) VALUES ('".(int)$v['id']."','".time()."','".$db->prepare($v['account'])."','".(int)$length."','".(int)$level."','".$db->prepare($seller)."','".(int)(floatval($v['account_offer_price'])*1000)."','".$status."')";
			$sql_arr[]=$sql;
		}
	}
	if($page_counter<$perpage){
		$end=true;
	}
	else{
		$offset+=$page_counter;
	}
}
if($counter){
	foreach($sql_arr as $sql){
		$db->sql($sql);
	}
}

$end=false;
$sql_arr=[];
$sql_arr[]='TRUNCATE TABLE `subaccounts_on_sale`';
$counter=0;
$offset=0;
$perpage=10;
$ignore=[];
while(!$end){
	$result=$api->execute_method('get_subaccounts_on_sale',array($offset,$perpage));
	$page_counter=0;
	foreach($result as $k=>$v){
		$counter++;
		$page_counter++;
		if(!in_array($v['account'],$ignore)){
			$ignore[]=$v['account'];

			$seller=$v['subaccount_seller'];
			$length=strlen($v['account']);
			$levels_arr=explode('.',$v['account']);
			$level=count($levels_arr);
			$status=$db->select_one('subaccounts_on_sale','`status`',"WHERE `account`='".$db->prepare($v['account'])."'");
			if(!$status){
				$status=0;
			}
			$sql="INSERT INTO `subaccounts_on_sale` (`id`,`time`,`account`,`length`,`level`,`seller`,`price`,`status`) VALUES ('".(int)$v['id']."','".time()."','".$db->prepare($v['account'])."','".(int)$length."','".(int)$level."','".$db->prepare($seller)."','".(int)(floatval($v['subaccount_offer_price'])*1000)."','".$status."')";
			$sql_arr[]=$sql;
		}
	}
	if($page_counter<$perpage){
		$end=true;
	}
	else{
		$offset+=$page_counter;
	}
}
if($counter){
	foreach($sql_arr as $sql){
		$db->sql($sql);
	}
}
exit;