<?php
include('autoloader.php');
set_time_limit(10);
header("Content-type:text/html; charset=UTF-8");
header('HTTP/1.1 200 Ok');

$data_cache_ttl=30;//30 sec for cache
$data_cache_file='exchange_api_cache.json';
$data_cache_time=filemtime('./'.$data_cache_file);
if((time()-$data_cache_ttl)>$data_cache_time){
	$eth_gate='https://mainnet.infura.io/v3/'.$config['infura_key'];
	$erc20_contract='0xdac17f958d2ee523a2206206994597c13d831ec7';
	$erc20_call='70a08231';
	$erc20_precision_div=1000000;//precision=6
	$erc20_amount=[];
	$request_id=0;

	$erc20_owners=[
		//'0xDB72511a73E22A01c592a8D62Fc366917390CA1c',//cold
		//'0x51126a95480948F5034e047499E544c7F13E879E',//hot
		//'0xcbc3736eddf113ca6713cf503944ab845e0b0f93',//garantex for tests
	];

	$exchange_account='data.exch.bank.viz.plus';
	$result=$api->execute_method('get_accounts',array(array($exchange_account,'raw'=>true)));
	$block_num=$result[0]['custom_sequence_block_num'];
	$result=$api->execute_method('get_block',array($block_num));
	$find=false;
	foreach($result['transactions'] as $tx){
		foreach($tx['operations'] as $op){
			if('custom'==$op[0]){
				if('vizplus_exchanger'==$op[1]['id']){
					if(in_array($exchange_account,$op[1]['required_regular_auths'])){
						$find=json_decode($op[1]['json'],true);
					}
				}
			}
		}
	}
	if(false!==$find){
		if('exchanger_data'==$find[0]){
			$erc20_owners[]=$find[1]['eth_wallet'];
			$erc20_owners[]=$find[1]['eth_wallet_cold'];
		}
		foreach($erc20_owners as $erc20_owner){
			$erc20_owner=strtolower($erc20_owner);
			$request_id++;
			$request_str='{"method":"eth_call","id":'.$request_id.',"jsonrpc":"2.0","params":[{"to":"'.$erc20_contract.'","data":"0x'.$erc20_call.'000000000000000000000000'.substr($erc20_owner,2).'"},"latest"]}';
			$opts=array('http'=>
				array(
					'method'=>'POST',
					'header'=>'Content-type: application/json',
					'content'=>$request_str,
					'timeout'=>5,
				)
			);
			$context=stream_context_create($opts);
			$response=file_get_contents($eth_gate,false,$context);
			$result=json_decode($response,true);
			if($result['result']){
				$hex=substr($result['result'],2);
				$dec=hexdec($hex);
				$erc20_amount[$erc20_owner]=$dec/$erc20_precision_div;
			}
		}
		$data=json_encode($erc20_amount);
		file_put_contents('./'.$data_cache_file,$data);
		print $data;
	}
}
else{
	print file_get_contents('./'.$data_cache_file);
}
exit;