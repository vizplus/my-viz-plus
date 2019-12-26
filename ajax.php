<?php
error_reporting(0);
include('autoloader.php');
$action=$_GET['action'];
function show_price_in_tokens($tokens,$ticker=false){
	$true_tokens=floatval($tokens);
	$ceil_tokens=ceil($true_tokens*100)/100;
	return number_format($ceil_tokens,2,'.',' ').($ticker?' viz':'');
}
if('get_accounts_on_sale'==$action){
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html; charset=UTF-8");
	header('HTTP/1.1 200 Ok');
	$offset=0;
	if(isset($_GET['offset'])){
		$offset=(int)$_GET['offset'];
	}
	$perpage=10;
	$page=0;
	if(isset($_GET['page'])){
		$page=(int)$_GET['page'];
	}
	if($page<0){
		$page=0;
	}
	$query=' WHERE `status`=0';
	if(isset($_GET['search'])){
		if(''!=$_GET['search']){
			$query.=' AND `account` LIKE \'%'.$db->prepare($_GET['search']).'%\'';
		}
	}
	$count=$db->table_count('accounts_on_sale',$query);
	$pages=ceil($count/$perpage);
	if($page>$pages){
		$page=$pages-1;
	}
	$offset=$page*$perpage;
	$order='`price` ASC';
	if(isset($_GET['order'])){
		if('+price'==$_GET['order']){
			$order='`price` ASC';
		}
		if('-price'==$_GET['order']){
			$order='`price` DESC';
		}
	}
	$result=array();
	$sql='SELECT * FROM `accounts_on_sale`'.$query.' ORDER BY '.$order.' LIMIT '.$perpage.' OFFSET '.$offset;//`level` ASC, `length` ASC,
	$q=$db->sql($sql);
	while($m=$db->row($q)){
		$result[]=['account'=>$m['account'],'price'=>($m['price']/1000)];
	}
	print json_encode($result);
}
if('get_subaccounts_on_sale'==$action){
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html; charset=UTF-8");
	header('HTTP/1.1 200 Ok');
	$offset=0;
	if(isset($_GET['offset'])){
		$offset=(int)$_GET['offset'];
	}
	$perpage=10;
	$page=0;
	if(isset($_GET['page'])){
		$page=(int)$_GET['page'];
	}
	if($page<0){
		$page=0;
	}
	$query=' WHERE `status`=0';
	if(isset($_GET['search'])){
		if(''!=$_GET['search']){
			$query.=' AND `account` LIKE \'%'.$db->prepare($_GET['search']).'%\'';
		}
	}
	$count=$db->table_count('subaccounts_on_sale',$query);
	$pages=ceil($count/$perpage);
	if($page>$pages){
		$page=$pages-1;
	}
	$offset=$page*$perpage;
	$order='`price` ASC';
	if(isset($_GET['order'])){
		if('+price'==$_GET['order']){
			$order='`price` ASC';
		}
		if('-price'==$_GET['order']){
			$order='`price` DESC';
		}
	}
	$result=array();
	$sql='SELECT * FROM `subaccounts_on_sale`'.$query.' ORDER BY '.$order.' LIMIT '.$perpage.' OFFSET '.$offset;//`level` ASC, `length` ASC,
	$q=$db->sql($sql);
	while($m=$db->row($q)){
		$result[]=['account'=>$m['account'],'price'=>($m['price']/1000)];
	}
	print json_encode($result);
}
if('get_paid_subscriptions'==$action){
	header("Access-Control-Allow-Origin:*");
	header("Content-type:text/html; charset=UTF-8");
	header('HTTP/1.1 200 Ok');
	$offset=0;
	if(isset($_GET['offset'])){
		$offset=(int)$_GET['offset'];
	}
	$perpage=10;
	$page=0;
	if(isset($_GET['page'])){
		$page=(int)$_GET['page'];
	}
	if($page<0){
		$page=0;
	}
	$query=' WHERE `status`=0';
	if(isset($_GET['search'])){
		if(''!=$_GET['search']){
			$query.=' AND `creator` LIKE \'%'.$db->prepare($_GET['search']).'%\'';
		}
	}
	if(isset($_GET['descr'])){
		if(''!=$_GET['descr']){
			$query.=' AND `url` LIKE \'%'.$db->prepare($_GET['descr']).'%\'';
		}
	}
	$count=$db->table_count('paid_subscriptions',$query);
	$pages=ceil($count/$perpage);
	if($page>$pages){
		$page=$pages-1;
	}
	$offset=$page*$perpage;
	$order='`creator` ASC';
	if(isset($_GET['order'])){
		if('+provider'==$_GET['order']){
			$order='`creator` ASC';
		}
		if('-provider'==$_GET['order']){
			$order='`creator` DESC';
		}
		if('+amount'==$_GET['order']){
			$order='`amount` ASC';
		}
		if('-amount'==$_GET['order']){
			$order='`amount` DESC';
		}
		if('+sub_count'==$_GET['order']){
			$order='`sub_count` ASC';
		}
		if('-sub_count'==$_GET['order']){
			$order='`sub_count` DESC';
		}
		if('+sub_amount'==$_GET['order']){
			$order='`sub_amount` ASC';
		}
		if('-sub_amount'==$_GET['order']){
			$order='`sub_amount` DESC';
		}

		if(('+provider'==$_GET['order'])||('-provider'==$_GET['order'])){
			$order.=', `creator` ASC';
		}
	}
	$result=array();
	$sql='SELECT * FROM `paid_subscriptions`'.$query.' ORDER BY '.$order.' LIMIT '.$perpage.' OFFSET '.$offset;//`level` ASC, `length` ASC,
	$q=$db->sql($sql);
	while($m=$db->row($q)){
		$result[]=['account'=>$m['creator'],'descr'=>$m['url'],'period'=>$m['period'],'levels'=>$m['levels'],'amount'=>($m['amount']/1000),'sub_count'=>$m['sub_count'],'sub_amount'=>$m['sub_amount']];
	}
	print json_encode($result);
}
exit;