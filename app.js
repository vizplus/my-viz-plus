var api_nodes=[
	'https://node.viz.plus/',
	'https://vizrpc.lexai.host/',
	'https://viz-node.dpos.space/',
	'https://node.viz.media/',
	'https://viz.lexai.host/',
	'https://node.viz.cx/',
	'https://api.viz.world/',
];
var default_api_node=api_nodes[0];
var api_nodes_addon={'list':[]};

var dao_request_ranges=[[1,999999]];

var invite_user='invite';
var invite_active_key='5KcfoRuDfkhrLCxVcE9x51J6KN9aM9fpb78tLrvvFckxVV6FyFW';

var standalone=false;
var standalone_fullpath='';
var standalone_path='';
var standalone_search='';
function parse_standalone_fullpath(){
	standalone_fullpath=window.location.hash.substr(1);
	standalone_path='';
	standalone_search='';
	if(-1==standalone_fullpath.indexOf('?')){
		standalone_path=standalone_fullpath;
	}
	else{
		standalone_path=standalone_fullpath.substring(0,standalone_fullpath.indexOf('?'));
		standalone_search=standalone_fullpath.substring(standalone_fullpath.indexOf('?'));
	}
	if(''==standalone_path){
		standalone_path='/';
	}
}

if(null!=localStorage.getItem('api_nodes_addon')){
	api_nodes_addon=JSON.parse(localStorage.getItem('api_nodes_addon'));
	for(i in api_nodes_addon.list){
		if(null!=api_nodes_addon.list[i]){
			if(-1==api_nodes.indexOf(api_nodes_addon.list[i])){
				api_nodes.push(api_nodes_addon.list[i]);
			}
		}
		else{
			delete api_nodes_addon.list[i];
		}
	}
	if(typeof api_nodes_addon.default != 'undefined'){
		default_api_node=api_nodes_addon.default;
	}
}
console.log('using node',default_api_node);
viz.config.set('websocket',default_api_node);

function select_api_node(node){
	node=typeof node==='undefined'?api_nodes[0]:node;
	default_api_node=node;
	api_nodes_addon.default=default_api_node;
	console.log('using node',default_api_node);
	viz.config.set('websocket',default_api_node);
	save_session();
	if(standalone){
		parse_standalone_fullpath();
		change_state(standalone_path+encodeURIComponent(standalone_search),{},false);
	}
	else{
		change_state(document.location.pathname+document.location.search,{},false);
	}
}
function approved_api_node(node,latency){
	clearTimeout(check_node_timer);
	let i=api_nodes_addon.list.indexOf(node);
	if(-1==i){
		api_nodes_addon.list.push(node);
		let j=api_nodes.indexOf(node);
		if(-1==j){
			api_nodes.push(node);
		}
	}
	default_api_node=node;
	api_nodes_addon.default=default_api_node;
	viz.config.set('websocket',default_api_node);
	save_session();
	if(standalone){
		parse_standalone_fullpath();
		change_state(standalone_path+encodeURIComponent(standalone_search),{},false);
	}
	else{
		change_state(document.location.pathname+document.location.search,{},false);
	}
}
/* Localisation Template*/
function ltmp(ltmp_str,ltmp_args){
	let ltmp_includes_pattern = /%%([a-zA-Z_0-9]*)%%/gi;
	let ltmp_includes=ltmp_str.match(ltmp_includes_pattern);
	if(null!=ltmp_includes){
		for(let ltmp_i in ltmp_includes){
			let var_name=ltmp_includes[ltmp_i].substr(2);
			var_name=var_name.substr(0,var_name.length - 2);
			if(typeof ltmp_arr[var_name] !== 'undefined'){
				ltmp_str=ltmp_str.split(ltmp_includes[ltmp_i]).join(ltmp(ltmp_arr[var_name]));
			}
		}
	}

	for(let ltmp_i in ltmp_args){
		ltmp_str=ltmp_str.split('{'+ltmp_i+'}').join(ltmp_args[ltmp_i]);
	}
	//remove empty args
	let ltmp_prop_arr=ltmp_str.match(/\{[a-z_\-]*\}/gm);
	for(let ltmp_i in ltmp_prop_arr){
		ltmp_str=ltmp_str.split(ltmp_prop_arr[ltmp_i]).join('');
	}
	return ltmp_str;
}
function select_lang(lang){
	if(typeof available_langs[lang] !== 'undefined'){
		selected_lang=lang;
		localStorage.setItem('lang',selected_lang);
		ltmp_arr=window['ltmp_'+lang+'_arr'];
		preset_template(function(){
			dom_bindings(function(){
				if(standalone){
					parse_standalone_fullpath();
					change_state(standalone_path+encodeURIComponent(standalone_search),{},false);
				}
				else{
					change_state(document.location.pathname+document.location.search,{},false);
				}
			});
		});
	}
}

var langs_arr={
	'en-US':'en',
	'en':'en',
	'ru-RU':'ru',
	'ru':'ru',
};
var available_langs={
	'en':'English',
	'ru':'Русский',
};
var default_lang='ru';
var selected_lang=default_lang;
if(null!=localStorage.getItem('lang')){
	if(typeof available_langs[localStorage.getItem('lang')] !== 'undefined'){
		selected_lang=langs_arr[localStorage.getItem('lang')];
	}
}
else{
	for(let i in window.navigator.languages){
		if(typeof langs_arr[window.navigator.languages[i]] !== 'undefined'){
			let try_lang=langs_arr[window.navigator.languages[i]];
			if(typeof available_langs[try_lang] !== 'undefined'){
				selected_lang=langs_arr[try_lang];
				break;
			}
		}
	}
}
var ltmp_arr=window['ltmp_'+selected_lang+'_arr'];

function plural_str(number,one,two,five){
	let n=Math.abs(number);
	n%=100;
	if(n>=5&&n<=20){
		return five;
	}
	n%=10;
	if(n===1) {
		return one;
	}
	if(n>=2&&n<=4){
		return two;
	}
	return five;
}
var check_node_timer=0;
function add_api_node(node){
	$('.nodes .add-api-node-error').html('');
	if(''!=node){
		let protocol='none';
		let node_protocol=node.substring(0,node.indexOf(':'));
		//console.log('node_protocol',node_protocol);
		if('http'==node_protocol||'https'==node_protocol){
			protocol='http';
		}
		if('ws'==node_protocol||'wss'==node_protocol){
			protocol='websocket';
		}
		if('websocket'==protocol){
			$('.nodes .add-api-node-error').html(ltmp_arr.node_request);
			let socket=new WebSocket(node);
			clearTimeout(check_node_timer);
			check_node_timer=setTimeout(function(){
				$('.nodes .add-api-node-error').html(ltmp_arr.node_not_respond);
			},1000);
			let latency_start=new Date().getTime();
			let latency=-1;
			socket.onmessage=function(event){
				latency=new Date().getTime() - latency_start;
				//console.log(event);
				try{
					json=JSON.parse(event.data);
					if((typeof json.result!='undefined')&&(typeof json.result.head_block_number!='undefined')){
						approved_api_node(node,latency);
					}
					else{
						$('.nodes .add-api-node-error').html(ltmp_arr.node_wrong_response);
						console.log(json);
					}
				}
				catch(err){
					$('.nodes .add-api-node-error').html(ltmp_arr.node_wrong_response);
					console.log(err);
				}
				socket.close();
			}
			socket.onopen=function(){
				socket.send('{"id":1,"method":"call","jsonrpc":"2.0","params":["database_api","get_dynamic_global_properties",[]]}');
			};
		}
		if('http'==protocol){
			$('.nodes .add-api-node-error').html(ltmp_arr.node_request);
			let xhr=new XMLHttpRequest();
			clearTimeout(check_node_timer);
			check_node_timer=setTimeout(function(){
				$('.nodes .add-api-node-error').html(ltmp_arr.node_not_respond);
			},1000);
			let latency_start=new Date().getTime();
			let latency=-1;
			xhr.overrideMimeType('text/plain');
			xhr.open('POST',node);
			xhr.setRequestHeader('accept','application/json, text/plain, */*');
			xhr.setRequestHeader('content-type','application/json');
			xhr.onreadystatechange = function() {
				if(4==xhr.readyState && 200==xhr.status){
					latency=new Date().getTime() - latency_start;
					try{
						json=JSON.parse(xhr.responseText);
						if((typeof json.result!='undefined')&&(typeof json.result.head_block_number!='undefined')){
							approved_api_node(node,latency);
						}
						else{
							$('.nodes .add-api-node-error').html(ltmp_arr.node_wrong_response);
							console.log(json);
							console.log(xhr);
						}
					}
					catch(err){
						$('.nodes .add-api-node-error').html(ltmp_arr.node_wrong_response);
						console.log(err);
					}
				}
			}
			xhr.send('{"id":1,"method":"call","jsonrpc":"2.0","params":["database_api","get_dynamic_global_properties",[]]}');
		}
		if('none'==protocol){
			$('.nodes .add-api-node-error').html(ltmp_arr.node_protocol_error);
		}
	}
	else{
		$('.nodes .add-api-node-error').html(ltmp_arr.node_empty_error);
	}
}
function remove_api_node(node){
	if(''!=node){
		let i=api_nodes_addon.list.indexOf(node);
		if(-1!=i){
			delete api_nodes_addon.list[i];
			let j=api_nodes.indexOf(node);
			if(-1!=j){
				delete api_nodes[j];
			}
		}
		if(default_api_node==node){
			default_api_node=api_nodes[0];
		}
		api_nodes_addon.default=default_api_node;
		viz.config.set('websocket',default_api_node);
		save_session();
		if(standalone){
			parse_standalone_fullpath();
			change_state(standalone_path+encodeURIComponent(standalone_search),{},false);
		}
		else{
			change_state(document.location.pathname+document.location.search,{},false);
		}
	}
}
function pass_gen(length,to_wif){
	length=typeof length==='undefined'?100:length;
	to_wif=typeof to_wif==='undefined'?true:to_wif;
	let charset='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-=_:;.,@!^&*$';
	let ret='';
	for (var i=0,n=charset.length;i<length;++i){
		ret+=charset.charAt(Math.floor(Math.random()*n));
	}
	if(!to_wif){
		return ret;
	}
	let wif=viz.auth.toWif('',ret,'');
	return wif;
}

var keys=[];
keys=viz.auth.getPrivateKeys('',pass_gen(100),['master','active','regular','memo']);
var witness_props_captions={
	'account_creation_fee':ltmp_arr.witness_props_captions.account_creation_fee,
	'create_account_delegation_ratio':ltmp_arr.witness_props_captions.create_account_delegation_ratio,
	'create_account_delegation_time':ltmp_arr.witness_props_captions.create_account_delegation_time,
	'bandwidth_reserve_percent':ltmp_arr.witness_props_captions.bandwidth_reserve_percent,
	'bandwidth_reserve_below':ltmp_arr.witness_props_captions.bandwidth_reserve_below,
	'committee_request_approve_min_percent':ltmp_arr.witness_props_captions.committee_request_approve_min_percent,
	'min_delegation':ltmp_arr.witness_props_captions.min_delegation,
	'vote_accounting_min_rshares':ltmp_arr.witness_props_captions.vote_accounting_min_rshares,
	'maximum_block_size':ltmp_arr.witness_props_captions.maximum_block_size,
	'inflation_witness_percent':ltmp_arr.witness_props_captions.inflation_witness_percent,
	'inflation_ratio_committee_vs_reward_fund':ltmp_arr.witness_props_captions.inflation_ratio_committee_vs_reward_fund,
	'inflation_recalc_period':ltmp_arr.witness_props_captions.inflation_recalc_period,
	'data_operations_cost_additional_bandwidth':ltmp_arr.witness_props_captions.data_operations_cost_additional_bandwidth,
	'witness_miss_penalty_percent':ltmp_arr.witness_props_captions.witness_miss_penalty_percent,
	'witness_miss_penalty_duration':ltmp_arr.witness_props_captions.witness_miss_penalty_duration,
	'create_invite_min_balance':ltmp_arr.witness_props_captions.create_invite_min_balance,
	'committee_create_request_fee':ltmp_arr.witness_props_captions.committee_create_request_fee,
	'create_paid_subscription_fee':ltmp_arr.witness_props_captions.create_paid_subscription_fee,
	'account_on_sale_fee':ltmp_arr.witness_props_captions.account_on_sale_fee,
	'subaccount_on_sale_fee':ltmp_arr.witness_props_captions.subaccount_on_sale_fee,
	'witness_declaration_fee':ltmp_arr.witness_props_captions.witness_declaration_fee,
	'withdraw_intervals':ltmp_arr.witness_props_captions.withdraw_intervals,
};
var witness_props_percent=['bandwidth_reserve_percent','committee_request_approve_min_percent','inflation_witness_percent','inflation_ratio_committee_vs_reward_fund','data_operations_cost_additional_bandwidth','witness_miss_penalty_percent'];
var request_status_arr={
	'0':ltmp_arr.request_status_arr['0'],
	'1':ltmp_arr.request_status_arr['1'],
	'2':ltmp_arr.request_status_arr['2'],
	'3':ltmp_arr.request_status_arr['3'],
	'4':ltmp_arr.request_status_arr['4'],
	'5':ltmp_arr.request_status_arr['5'],
}
var dgp={};
var update_dgp_timer=0;
function update_dgp(auto){
	auto=typeof auto==='undefined'?false:auto;
	viz.api.getDynamicGlobalProperties(function(err,response){
		if(!err){
			dgp=response;
			if('block'==$('.page-award').css('display')){
				$('.page-award .range-slider-input').change();
			}
			if('block'==$('.page-fund-requests').css('display')){
				$('.page-fund-requests .fund-balance').html(number_thousands(show_balance_in_tokens(dgp.committee_fund,true)));
			}
		}
	});
	if(auto){
		clearTimeout(update_dgp_timer);
		update_dgp_timer=setTimeout("update_dgp(true)",3000);
	}
}
var update_chain_properties_timer=0;
function update_chain_properties(){
	viz.api.getChainProperties(function(err,response){
		if(!err){
			if('block'==$('.section-fund-request').css('display')){
				$('.section-fund-request .chain-properties[rel=committee_request_approve_min_percent]').html(parseInt(response.committee_request_approve_min_percent)/100);
			}
			if('block'==$('.page-checks').css('display')){
				$('.page-checks .create-invite-min-balance').html(show_balance_in_tokens(response.create_invite_min_balance,true));
			}
		}
	});
}
var check_invite_timer=0;
var check_invite=function(code,el){
	el.css('display','block');
	if(viz.auth.isWif(code)){
		el.find('.invites-claim-code-balance').removeClass('red');
		el.find('.invites-claim-code-balance').html('&hellip;');
		let public_key=viz.auth.wifToPublic(code);
		viz.api.getInviteByKey(public_key,function(err,response){
			if(!err){
				if(0==response.status){
					el.find('.invites-claim-code-balance').html(show_balance_in_tokens(response.balance,true));
				}
				else{
					el.find('.invites-claim-code-balance').addClass('red');
					el.find('.invites-claim-code-balance').html(ltmp(ltmp_arr.invites_code_already_claimed,{amount:show_balance_in_tokens(response.claimed_balance,true),receiver:response.receiver}));
				}
			}
			else{
				el.find('.invites-claim-code-balance').addClass('red');
				el.find('.invites-claim-code-balance').html(ltmp_arr.invites_code_not_found);

				console.log(err);
			}
		});
	}
	else{
		if(viz.auth.isPubkey(code)){
			el.find('.invites-claim-code-balance').removeClass('red');
			el.find('.invites-claim-code-balance').html('&hellip;');
			viz.api.getInviteByKey(code,function(err,response){
				if(!err){
					if(0==response.status){
						el.find('.invites-claim-code-balance').html(show_balance_in_tokens(response.balance,true));
					}
					else{
						el.find('.invites-claim-code-balance').addClass('red');
						el.find('.invites-claim-code-balance').html(ltmp(ltmp_arr.invites_code_already_claimed,{amount:show_balance_in_tokens(response.claimed_balance,true),receiver:response.receiver}));
					}
				}
				else{
					el.find('.invites-claim-code-balance').addClass('red');
					el.find('.invites-claim-code-balance').html(ltmp_arr.invites_code_not_found);

					console.log(err);
				}
			});
		}
		else{
			el.find('.invites-claim-code-balance').addClass('red');
			el.find('.invites-claim-code-balance').html(ltmp_arr.invites_invalid_code);
		}
	}
}
var check_login_timer=0;
var check_login=function(el,el2){
	var account_login=el.val();
	if(account_login.length>2){
		var first_char=account_login.substr(0,1);
		var last_char=account_login.substr(-1,1);
		var parent_login='';
		if(-1!=account_login.indexOf('.')){
			parent_login=account_login.substr(account_login.indexOf('.')+1);
		}
		if(''!=parent_login && parent_login!=current_user){
			el.css('border-color','#ef1c1c');
			el2.html(ltmp(ltmp_arr.check_login_subaccount_error,{account:current_user}));
		}
		else
		if(!/^([a-z])$/.test(first_char)){
			el.css('border-color','#ef1c1c');
			el2.html(ltmp_arr.check_login_starting_error);
		}
		else
		if(!/^([a-z0-9])$/.test(last_char)){
			el.css('border-color','#ef1c1c');
			el2.html(ltmp_arr.check_login_ending_error);
		}
		else{
			viz.api.getAccounts([account_login],function(err,response){
				if(response[0]){
					el.css('border-color','#ef1c1c');
					el2.html(ltmp_arr.check_login_already_exist);
				}
				else{
					el.css('border-color','#0db11e');
					el2.html('');
				}
			});
		}
	}
	else{
		el.css('border-color','#ccc');
		el2.html('');
	}
}
jQuery.fn.selText = function() {
	var obj=this[0];
	if(document.body.createTextRange){
		var range=obj.offsetParent.createTextRange();
		range.moveToElementText(obj);
		range.select();
	}
	else
	if(window.getSelection){
		var selection=obj.ownerDocument.defaultView.getSelection();
		var range=obj.ownerDocument.createRange();
		range.selectNodeContents(obj);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	else{
		var selection=obj.ownerDocument.defaultView.getSelection();
		selection.setBaseAndExtent(obj,0,obj,1);
	}
	return this;
}
function escape_html(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g,function(m){return map[m];});
}
$(window).on('hashchange',function(e){
	e.preventDefault();
	if(''!=window.location.hash){
		if($(window.location.hash).length>0){
			$('body,html').animate({scrollTop:parseInt($('.index[data-index='+window.location.hash+']').offset().top) - 64 - 10},1000);
		}
	}
	else{
		$(window).scrollTop(0);
	}
});
function app_keyboard(e){
	if(!e)e=window.event;
	var key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
	let char=String.fromCharCode(key);
	//console.log(key,char);
	/*
	if(key==27){
		e.preventDefault();
	}
	*/
}

function number_thousands(n){
	str=''+n;
	str_arr=str.split('.');
	let minus=false;
	if(n<0){
		str_arr[0]=str_arr[0].substr(1);
		minus=true;
	}
	lstr_len=str_arr[0].length;

	for(i=lstr_len;i>0;--i){
		if(0==(-lstr_len+i)%3){
			str_arr[0]=str_arr[0].substr(0,i)+' '+str_arr[0].substr(i);
		}
	}

	str_arr[0]=str_arr[0].trim();
	return (minus?'&minus;':'')+str_arr[0]+(str_arr[1]?'.'+str_arr[1]:'');
}

function download(filename,text) {
	var link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	link.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		link.dispatchEvent(event);
	}
	else {
		link.click();
	}
}

var users={};
var current_user='';
var current_user_active_paid_subscribes=[];
var current_view='';

var calc_max_delegation_timer=0;
function calc_max_delegation(){
	let max_delegation=parseFloat($('.page-delegate-shares .shares-balance .vesting-shares').data('available-vesting-shares')).toFixed(2);
	max_delegation-=parseFloat($('.page-delegate-shares .shares-balance .vesting-shares').data('withdraw-amount')).toFixed(2);
	max_delegation=Math.max(0,max_delegation);
	$('.page-delegate-shares .delegate-shares-max-tokens-amount').html(number_thousands(show_balance_in_tokens(max_delegation,true)));
	$('.page-delegate-shares .delegate-shares-max-tokens-amount').attr('data-vesting-shares',max_delegation);
	let delegatee=$('.page-delegate-shares input[name=delegate-shares-account]').val();
	viz.api.getVestingDelegations(current_user,delegatee,1,0,function(err,response){
		if(!err){
			console.log(response);
			if(typeof response[0] !== 'undefined'){
				if(delegatee==response[0].delegatee){
					max_delegation-=parseFloat(response[0].vesting_shares).toFixed(2);
					max_delegation=Math.max(0,max_delegation);
					$('.page-delegate-shares .delegate-shares-max-tokens-amount').html(number_thousands(show_balance_in_tokens(max_delegation,true)));
					$('.page-delegate-shares .delegate-shares-max-tokens-amount').attr('data-vesting-shares',max_delegation);
				}
			}
		}
	});
}
function update_delegations_tables(){
	viz.api.getVestingDelegations(current_user,0,1000,0,function(err,response){
		if(!err){
			let result='';
			if(0==response.length){
				result+='<div class="columns-view"><div class="column-view column-1">'+ltmp_arr.default_no_items+'</div></div>';
			}
			for(delegation in response){
				result+='<div class="columns-view">'
					+'<div class="column-view column-3"><span class="adaptive-show">'+ltmp_arr.delegations_account_adaptive_caption+'&nbsp;</span>'+response[delegation].delegatee+'</div>'
					+'<div class="column-view column-3"><span class="adaptive-show">'+ltmp_arr.delegations_social_capital_adaptive_caption+'&nbsp;</span>'+number_thousands(show_balance_in_tokens(parseFloat(response[delegation].vesting_shares),true))+'</div>'
					+'<div class="column-view column-flex">'+(new Date().getTime()>Date.parse(response[delegation].min_delegation_time)?'<a class="inline-button no-margin undelegate-shares-action" data-account="'+response[delegation].delegatee+'">'+ltmp_arr.delegations_revocation_button+'</a>':ltmp(ltmp_arr.delegations_revocation_info,{date:show_date(response[delegation].min_delegation_time,true)+ltmp_arr.default_date_utc}))+'</div>'
					+'</div>';
			}
			$('.page-delegate-shares .outcome-delegations .table-data').html(result);
			viz.api.getExpiringVestingDelegations(current_user,new Date().toISOString().substr(0,19),1000,function(err,response){
				if(!err){
					let result='';
					let summary_expiring_shares=0;
					for(expiration in response){
						summary_expiring_shares+=parseFloat(response[expiration].vesting_shares);
					}
					if(0<summary_expiring_shares){
						result+='<div class="columns-view">'
							+'<div class="column-view column-3">'+ltmp_arr.delegations_awaiting_return+'</div>'
							+'<div class="column-view column-3">'+number_thousands(show_balance_in_tokens(summary_expiring_shares,true))+'</div>'
							+'<div class="column-view column-flex">&mdash;</div>'
							+'</div>';
						$('.page-delegate-shares .outcome-delegations .table-data').append(result);
					}
				}
			});
		}
		else{
			$('.page-delegate-shares .outcome-delegations .table-data').html('<p>'+ltmp_arr.default_node_error+'</p>');
		}
	});
	viz.api.getVestingDelegations(current_user,0,1000,1,function(err,response){
		if(!err){
			let result='';
			if(0==response.length){
				result+='<div class="columns-view"><div class="column-view column-1">'+ltmp_arr.default_no_items+'</div></div>';
			}
			for(delegation in response){
				result+='<div class="columns-view">'
					+'<div class="column-view column-3"><span class="adaptive-show">'+ltmp_arr.delegations_account_adaptive_caption+'&nbsp;</span>'+response[delegation].delegator+'</div>'
					+'<div class="column-view column-flex"><span class="adaptive-show">'+ltmp_arr.delegations_social_capital_adaptive_caption+'&nbsp;</span>'+number_thousands(show_balance_in_tokens(parseFloat(response[delegation].vesting_shares),true))+'</div>'
					//+'<div class="column-view column-flex">'+response[delegation].min_delegation_time+ltmp_arr.default_date_utc+'</div>'
					+'</div>';
			}
			$('.page-delegate-shares .income-delegations .table-data').html(result);
		}
		else{
			$('.page-delegate-shares .income-delegations .table-data').html('<div class="columns-view"><div class="column-view column-1">'+ltmp_arr.default_node_error+'</div></div>');
		}
	});
}
function update_shares_balance(el,data){
	let true_balance=parseFloat(data.balance);
	let floor_balance=Math.floor(100*true_balance)/100;

	let vesting_shares=parseFloat(data.vesting_shares);
	let floor_vesting_shares=Math.floor(100*vesting_shares)/100;

	let delegated_vesting_shares=parseFloat(data.delegated_vesting_shares);
	let floor_delegated_vesting_shares=Math.floor(100*delegated_vesting_shares)/100;

	let received_vesting_shares=parseFloat(data.received_vesting_shares);
	let floor_received_vesting_shares=Math.floor(100*received_vesting_shares)/100;

	let effective_vesting_shares=vesting_shares + received_vesting_shares - delegated_vesting_shares;
	let floor_effective_vesting_shares=Math.floor(100*effective_vesting_shares)/100;

	let available_vesting_shares=vesting_shares - delegated_vesting_shares;
	let floor_available_vesting_shares=Math.floor(100*available_vesting_shares)/100;

	let withdrawn=parseFloat(data.withdrawn);
	let to_withdraw=parseFloat(data.to_withdraw);
	let withdraw_amount=to_withdraw-withdrawn;

	let last_vote_time=Date.parse(data.last_vote_time);
	let delta_time=parseInt((new Date().getTime() - last_vote_time+(new Date().getTimezoneOffset()*60000))/1000);
	let energy=data.energy;
	let new_energy=parseInt(energy+(delta_time*10000/432000));//CHAIN_ENERGY_REGENERATION_SECONDS 5 days
	if(new_energy>10000){
		new_energy=10000;
	}

	el.find('.vesting-shares').html('');
	el.find('.delegated-vesting-shares').html('');
	el.find('.received-vesting-shares').html('');
	el.find('.effective-vesting-shares').html('');

	el.find('.vesting-shares').data('vesting-shares',(floor_vesting_shares).toFixed(2));
	el.find('.vesting-shares').data('available-vesting-shares',(floor_available_vesting_shares).toFixed(2));
	el.find('.vesting-shares').data('withdraw-amount',(withdraw_amount/1000000).toFixed(2));

	el.find('.vesting-shares').append('<span class="adaptive-show">'+ltmp_arr.social_capital_own_adaptive_caption+'&nbsp;</span>'+number_thousands((floor_vesting_shares).toFixed(2))+' viz');

	el.find('.delegated-vesting-shares').data('delegated-vesting-shares',(floor_delegated_vesting_shares).toFixed(2));
	if(floor_delegated_vesting_shares>0){
		el.find('.delegated-vesting-shares').append('<div><span class="adaptive-show">'+ltmp_arr.social_capital_delegated_adaptive_caption+'&nbsp;</span>&minus;'+number_thousands((floor_delegated_vesting_shares).toFixed(2))+' viz</div>');
	}

	el.find('.received-vesting-shares').data('received-vesting-shares',(floor_received_vesting_shares).toFixed(2));
	if(floor_received_vesting_shares>0){
		el.find('.received-vesting-shares').append('<div><span class="adaptive-show">'+ltmp_arr.social_capital_received_adaptive_caption+'&nbsp;</span>&plus;'+number_thousands((floor_received_vesting_shares).toFixed(2))+' viz</div>');
	}
	if(''==el.find('.received-vesting-shares').html()){
		el.find('.received-vesting-shares').html('&mdash;');
	}

	el.find('.effective-vesting-shares').data('effective-vesting-shares',(floor_effective_vesting_shares).toFixed(2));
	el.find('.effective-vesting-shares').append('<span class="adaptive-show">'+ltmp_arr.social_capital_effective_adaptive_caption+'&nbsp;</span>'+number_thousands((floor_effective_vesting_shares).toFixed(2))+' viz');
}

function view_login(path,params,title){
	title=ltmp_arr.login_title+' - '+title;
	document.title=title;
	$('.view').css('display','none');
	if(''==current_user){
		$('.header').css('display','none');
	}
	else{
		$('.header').css('display','block');
	}
	$('.view-login').css('display','block');
	$('.view-login input[name=back]').val('');
	$('.view-login input[name=login]').val('');
	$('.view-login input[name=active-key]').val('');
	$('.view-login input[name=memo-key]').val('');
	$('.view-login .authorized').css('display','none');
	if(typeof params.back != 'undefined'){
		$('.view-login input[name=back]').val(params.back);
	}
	if(Object.keys(users).length>0){
		$('.view-login .authorized span').html('');
		$('.view-login .authorized span').html(Object.keys(users).sort().join(', '));
		$('.view-login .authorized').css('display','block');
	}
}

function view_memo(path,params,title){
	title=ltmp_arr.memo_title+' - '+title;
	document.title=title;
	$('.view').css('display','none');
	if(''==current_user){
		$('.header').css('display','none');
	}
	else{
		$('.header').css('display','block');
	}
	$('.view-memo .submit-button-ring').css('display','none');
	$('.view-memo .error').html('');
	$('.view-memo .success').html('');
	$('.view-memo .icon-check').css('display','none');

	$('.view-memo input[name=login]').val(current_user);
	$('.view-memo input[name=memo-key]').val('');
	$('.view-memo input[name=memo-key]').removeAttr('data-public-key');
	$('.view-memo .save-memo-key-action').html(ltmp_arr.memo_save_key);
	if(typeof users[current_user].memo_key !== 'undefined'){
		$('.view-memo input[name=memo-key]').val(users[current_user].memo_key);
	}
	$('.view-memo input[name=back]').val('');
	if(typeof params.back != 'undefined'){
		$('.view-memo input[name=back]').val(params.back);
	}

	$('.view-memo').css('display','block');
}

function save_session(){
	let users_json=JSON.stringify(users);
	localStorage.setItem('users',users_json);
	localStorage.setItem('current_user',current_user);

	let api_nodes_addon_json=JSON.stringify(api_nodes_addon);
	localStorage.setItem('api_nodes_addon',api_nodes_addon_json);
}

function remove_user(login,location=''){
	if(login!=current_user){
		delete users[login];
	}
	save_session();
	change_user(location);
}

function logout(user,location){
	user=typeof user==='undefined'?current_user:user;
	location=typeof location==='undefined'?'':location;
	if(''!=user){
		delete users[user];
		if(user==current_user){
			if(typeof Object.keys(users)[0] !== 'undefined'){
				current_user=Object.keys(users)[0];
			}
			else{
				current_user='';
			}
		}
	}
	save_session();
	change_user(location);
}

function change_user(location){
	location=typeof location==='undefined'?'':location;
	if(''!=current_user){
		$('.header').css('display','block');
		$('.header .user-menu .login').html(current_user);
		$('.users-drop-down').html('');
		let user_list=Object.keys(users);
		user_list.sort();
		let user_list_html='';
		for(i in user_list){
			if(current_user!=user_list[i]){
				user_list_html+='<a class="select-user" rel="'+user_list[i]+'">'+user_list[i]+'</a>';
			}
		}
		$('.users-drop-down').html(user_list_html);
		if(Object.keys(users).length>1){
			$('.header .user-menu .user-buttons .drop-down').css('display','inline-block');
		}
		else{
			$('.header .user-menu .user-buttons .drop-down').css('display','none');
		}
		$('.header .user-menu .user-buttons').css('display','inline-block');
		if(standalone){
			parse_standalone_fullpath();
			change_state(''!=location?location:''+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state(''!=location?location:''+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
	}
	else{
		if(typeof Object.keys(users)[0] !== 'undefined'){
			current_user=Object.keys(users)[0];
			change_user();
		}
		else{
			$('.header').css('display','none');
			if(standalone){
				parse_standalone_fullpath();
				change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
			}
			else{
				change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
			}
		}
	}
}

function view_index(path,params,title){
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
	}
	if(''==current_user){
		$('.view-index div.login').css('display','block');
		$('.view-index div.session-manage').css('display','none');
	}
	else{
		$('.view-index div.login').css('display','none');
		$('.view-index div.session-manage').css('display','block');
	}
	$('.view-index .sessions').html('');
	if(Object.keys(users).length>0){
		let data='';
		data+=`
		<div class="accounts-on-sale section table-view captions">
			<div class="table-header columns-view adaptive-hide-flex">
				<div class="column-view column-5">`+ltmp_arr.index_account_caption+`</div>
				<div class="column-view column-5 text-right">`+ltmp_arr.index_social_capital_caption+`</div>
				<div class="column-view column-5 text-right">`+ltmp_arr.index_balance_caption+`</div>
				<div class="column-view column-5 text-right">`+ltmp_arr.index_energy_caption+`</div>
				<div class="column-view column-flex">`+ltmp_arr.index_info_caption+`</div>
			</div>
			<div class="table-header columns-view adaptive-show-flex">
				<div class="column-view column-flex"></div>
			</div>
			<div class="table-data">`
		data+='<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>';
		data+=`</div>
			<div class="table-footer"> <a class="inline-button" data-href="/login/?back=/">`+ltmp_arr.index_add_account_button+`</a></div>
		</div>`;
		$('.view-index .sessions').html(data);
		let accounts_arr=Object.keys(users);
		accounts_arr.sort();
		viz.api.getAccounts(accounts_arr,function(err,response){
			let data='';
			if(!err){
				for(i in response){
					//console.log(response[i]);
					let account=response[i];
					let info='';
					if(account.account_on_sale){
						info+='<span class="account-on-sale">'+ltmp_arr.index_info_acc_on_sale+'</span> ';
					}
					if(account.subaccount_on_sale){
						info+='<span class="subaccount-on-sale">'+ltmp_arr.index_info_subacc_on_sale+'</span> ';
					}
					if(parseInt(account.to_withdraw)>parseInt(account.withdrawn)){
						info+='<span class="on-withdraw">'+ltmp_arr.index_info_withdraw+'</span> ';
					}
					if(''==info){
						info='&mdash;';
					}
					info='<span class="adaptive-show">'+ltmp_arr.index_info_adaptive_caption+'&nbsp;</span>'+info;
					let account_manage='';
					if(current_user==account.name){
						account_manage+='<span class="icon icon-16px icon-vtop icon-color-blue icon-check" title="'+ltmp_arr.index_selected_account+'"></span> <span class="select-user bold" rel="'+account.name+'">'+account.name+'</span>';
					}
					else{
						account_manage+='<span class="select-user bold" rel="'+account.name+'" title="'+ltmp(ltmp_arr.index_login_account_caption,{account:account.name})+'">'+account.name+'</span>';
					}
					account_manage+='<div class="user-actions"><span class="icon icon-circle-cross icon-color-red icon-18px remove-user" rel="'+account.name+'" title="'+ltmp(ltmp_arr.index_logout_account_caption,{account:account.name})+'"></span></div>';

					let last_vote_time=Date.parse(account.last_vote_time);
					let delta_time=parseInt((new Date().getTime() - last_vote_time+(new Date().getTimezoneOffset()*60000))/1000);
					let energy=account.energy;
					let new_energy=parseInt(energy+(delta_time*10000/432000));//CHAIN_ENERGY_REGENERATION_SECONDS 5 days
					if(new_energy>10000){
						new_energy=10000;
					}
					let vesting_shares=number_thousands(show_balance_in_tokens(account.vesting_shares));
					let received_vesting_shares=number_thousands(show_balance_in_tokens(account.received_vesting_shares));
					if('0.00'==received_vesting_shares){
						received_vesting_shares='';
					}
					else{
						received_vesting_shares='<br><span class="green">&plus;'+received_vesting_shares+'</span>';
					}
					let delegated_vesting_shares=number_thousands(show_balance_in_tokens(account.delegated_vesting_shares));
					if('0.00'==delegated_vesting_shares){
						delegated_vesting_shares='';
					}
					else{
						delegated_vesting_shares='<br><span class="red">&minus;'+delegated_vesting_shares+'</span>';
					}
					data+=`
					<div class="columns-view">
						<div class="column-view column-5">${account_manage}</div>
						<div class="column-view column-5 text-right"><span class="adaptive-show adaptive-float-left">`+ltmp_arr.index_social_capital_adaptive_caption+`&nbsp;</span><span class="adaptive-bold">${vesting_shares}${received_vesting_shares}${delegated_vesting_shares}</span></div>
						<div class="column-view column-5 text-right"><span class="adaptive-show adaptive-float-left">`+ltmp_arr.index_balance_adaptive_caption+`&nbsp;</span><span class="adaptive-bold">${number_thousands(show_balance_in_tokens(account.balance))}</span></div>
						<div class="column-view column-5 text-right"><span class="adaptive-show adaptive-float-left">`+ltmp_arr.index_energy_adaptive_caption+`&nbsp;</span><span class="adaptive-bold">${(parseInt(new_energy)/100).toFixed(2)}%</span></div>
						<div class="column-view column-flex">${info}</div>
					</div>`;
				}
			}
			else{
				data+=`
				<div class="columns-view">
					<div class="column-view column-flex red">`+ltmp_arr.default_node_error+`</div>
				</div>`;
			}
			$('.view-index .sessions .table-data').html(data);
		});
	}
	let nodes='';
	for(i in api_nodes){
		nodes+='<p><a class="inline-button no-margin select-api-node captions" rel="'+escape_html(api_nodes[i])+'">'+escape_html(api_nodes[i])+'</a>'+(api_nodes[i]==default_api_node?'<span class="icon icon-margin icon-color-blue icon-check" title="'+ltmp_arr.index_selected_node+'"></span>':'')+(-1!=api_nodes_addon.list.indexOf(api_nodes[i])?'<a class="inline-button small grey captions remove-api-node" rel="'+escape_html(api_nodes[i])+'">'+ltmp_arr.index_remove_node+'</a>':'')+'</p>';
	}
	nodes+=`
	<p>
		<label class="input-descr">
			<span class="input-caption">`+ltmp_arr.index_add_node_caption+`</span>
			<input type="text" name="api-node-url" class="simple-rounded" placeholder="https://">
		</label>
	</p>
	<p class="red add-api-node-error"></p>
	<p>
		<input class="add-api-node-action blue-button captions" type="button" value="`+ltmp_arr.index_add_node_button+`">
	</p>`;
	$('.view-index .nodes').html(nodes);
}
function fast_str_replace(search,replace,str){
	return str.split(search).join(replace);
}
function show_date(str,add_time,add_seconds,remove_today){
	str=typeof str==='undefined'?false:str;
	add_time=typeof add_time==='undefined'?false:add_time;
	add_seconds=typeof add_seconds==='undefined'?false:add_seconds;
	remove_today=typeof remove_today==='undefined'?false:remove_today;
	var str_date;
	if(!str){
		str_date=new Date();
	}
	else{
		let str_time=0;
		if(str==parseInt(str)){
			str_time=str;
		}
		else{
			str_time=Date.parse(str);
		}
		str_date=new Date(str_time);
	}
	//let str_time=parseInt(str_date/1000);
	//let time_offset=parseInt((new Date().getTime() - str_date+(new Date().getTimezoneOffset()*60000))/1000);
	var day=str_date.getDate();
	if(day<10){
		day='0'+day;
	}
	var month=str_date.getMonth()+1;
	if(month<10){
		month='0'+month;
	}
	var minutes=str_date.getMinutes();
	if(minutes<10){
		minutes='0'+minutes;
	}
	var hours=str_date.getHours();
	if(hours<10){
		hours='0'+hours;
	}
	var seconds=str_date.getSeconds();
	if(seconds<10){
		seconds='0'+seconds;
	}
	var datetime_str=day+'.'+month+'.'+str_date.getFullYear();
	if(add_time){
		datetime_str=datetime_str+' '+hours+':'+minutes;
		if(add_seconds){
			datetime_str=datetime_str+':'+seconds;
		}
	}
	if(remove_today){
		datetime_str=fast_str_replace(show_date()+' ','',datetime_str);
	}
	return datetime_str;
}
function show_amount_in_tokens(tokens,ticker){
	ticker=typeof ticker==='undefined'?false:ticker;
	let true_tokens=parseFloat(tokens);
	let ceil_tokens=Math.ceil(true_tokens*1000)/1000;
	return ''+ceil_tokens.toFixed(3)+(ticker?' viz':'');
}
function show_price_in_tokens(tokens,ticker){
	ticker=typeof ticker==='undefined'?false:ticker;
	let true_tokens=parseFloat(tokens);
	let ceil_tokens=Math.ceil(true_tokens*100)/100;
	return ''+ceil_tokens.toFixed(2)+(ticker?' viz':'');
}
function show_balance_in_tokens(tokens,ticker){
	ticker=typeof ticker==='undefined'?false:ticker;
	let true_tokens=parseFloat(tokens);
	let ceil_tokens=Math.floor(true_tokens*100)/100;
	return ''+ceil_tokens.toFixed(2)+(ticker?' viz':'');
}
function update_balances(el){
	el.css('display','block');
	el.find('span[rel=token]').html('&hellip;');
	el.find('span[rel=shares]').html('&hellip;');
	viz.api.getAccounts([current_user],function(err,response){
		if(err){
			el.html('<p class="red">'+ltmp_arr.default_node_not_respond+'</p>');
		}
		else{
			if(current_user==response[0].name){
				let data=response[0];
				let true_balance=parseFloat(data.balance);
				let floor_balance=Math.floor(100*true_balance)/100;

				let vesting_shares=parseFloat(data.vesting_shares);
				let floor_vesting_shares=Math.floor(100*vesting_shares)/100;

				let delegated_vesting_shares=parseFloat(data.delegated_vesting_shares);
				let floor_delegated_vesting_shares=Math.floor(100*delegated_vesting_shares)/100;

				let received_vesting_shares=parseFloat(data.received_vesting_shares);
				let floor_received_vesting_shares=Math.floor(100*received_vesting_shares)/100;

				let effective_vesting_shares=vesting_shares + received_vesting_shares - delegated_vesting_shares;
				let floor_effective_vesting_shares=Math.floor(100*effective_vesting_shares)/100;

				let last_vote_time=Date.parse(data.last_vote_time);
				let delta_time=parseInt((new Date().getTime() - last_vote_time+(new Date().getTimezoneOffset()*60000))/1000);

				let energy=data.energy;
				let new_energy=parseInt(energy+(delta_time*10000/432000));//CHAIN_ENERGY_REGENERATION_SECONDS 5 days
				if(new_energy>10000){
					new_energy=10000;
				}

				el.find('span[rel=token]').attr('data-raw',(floor_balance).toFixed(2));
				el.find('span[rel=token]').html(number_thousands((floor_balance).toFixed(2)));

				el.find('span[rel=shares]').attr('data-raw',(floor_vesting_shares).toFixed(2));
				el.find('span[rel=shares]').html(number_thousands((floor_vesting_shares).toFixed(2)));

				el.find('span[rel=effective_shares]').attr('data-raw',(effective_vesting_shares).toFixed(2));
				el.find('span[rel=effective_shares]').html(number_thousands((effective_vesting_shares).toFixed(2)));

				el.find('span[rel=energy]').attr('data-raw',new_energy);
				el.find('span[rel=energy]').html((new_energy/100).toFixed(2));
			}
		}
	});
}
var load_paid_subscriptions_timer=0;
function load_paid_subscriptions(page){
	page=typeof page==='undefined'?0:page;
	if(page<0){
		page=0;
	}
	let per_page=10;
	let offset=page*per_page;
	let search=$('.page-paid-subscriptions .view-paid-subscriptions input[name=provider-filter]').val().trim();
	let descr=$('.page-paid-subscriptions .view-paid-subscriptions input[name=descr-filter]').val().trim();
	let order=$('.page-paid-subscriptions .view-paid-subscriptions select[name=order] option:selected').val();
	$('.page-paid-subscriptions .view-paid-subscriptions .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
	$.ajax({
		type:'GET',
		url:'https://my.viz.plus/ajax.php',
		data:{'action':'get_paid_subscriptions',page,search,descr,order},
		success:function(response_data){
			let data='';
			try{
				response=JSON.parse(response_data);
			}
			catch(err){
				data='<p class="red">'+ltmp_arr.default_incorrect_response+'</p>';

				console.log(err);
			}
			for(i in response){
				let provider=response[i];
				let active=false;
				if(-1!=current_user_active_paid_subscribes.indexOf(provider.account)){
					active=true;
				}
				let descr='';
				let url='';
				if(-1!=provider.descr.indexOf('https://')){
					descr=provider.descr.substring(0,provider.descr.indexOf('https://'));
					url=provider.descr.substring(provider.descr.indexOf('https://'));
				}
				else{
					if(-1!=provider.descr.indexOf('http://')){
						descr=provider.descr.substring(0,provider.descr.indexOf('http://'));
						url=provider.descr.substring(provider.descr.indexOf('http://'));
					}
					else{
						descr=provider.descr;
					}
				}
				if(''!=descr){
					descr=escape_html(descr);
					descr='<div>'+descr+'</div>';
				}
				if(0!=provider.sub_count){
					descr+='<div>'+ltmp_arr.ps_sub_count_caption+provider.sub_count+'</div>';
				}
				if(0!=provider.sub_amount){
					descr+='<div>'+ltmp_arr.ps_sub_amount_caption+number_thousands(show_price_in_tokens(provider.sub_amount/1000,true))+'</div>';
				}
				if(''!=url){
					descr+='<div><a href="'+escape_html(url)+'" class="small inline-button red no-margin" target="_blank">'+ltmp_arr.ps_agreement_link+'</a></div>';
				}
				descr+='<div><a data-href="/market/paid-subscriptions/'+provider.account+'/" class="small inline-button red no-margin" target="_blank">'+ltmp_arr.ps_view_link+'</a></div>';
				data+='<div class="columns-view">';
				data+='<div class="column-view column-flex column-overflow-scroll">';
					data+='<div class="desktop-view-list"><span class="desktop-float-left">'+ltmp_arr.ps_adaptive_provider+'&nbsp;</span><div class="desktop-after-float-left-margin"><span class="bold">'+provider.account+'</span>'+(active?'<span class="icon icon-18px icon-small-margin icon-vtop icon-color-red icon-check" title="'+ltmp_arr.ps_icon_signed_caption+'"></span> ':'')+'</div></div>';
					data+='<div class="desktop-view-list"><span class="desktop-float-left">'+ltmp_arr.ps_adaptive_period+'&nbsp;</span><div class="desktop-after-float-left-margin"><span class="bold">'+provider.period+plural_str(provider.period,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5)+'</span></div></div>';
					data+='<div class="desktop-view-list"><span class="desktop-float-left">'+ltmp_arr.ps_adaptive_levels+'&nbsp;</span><div class="desktop-after-float-left-margin"><span class="bold">'+provider.levels+'</span></div></div>';
					data+='<div class="desktop-view-list"><span class="desktop-float-left">'+ltmp_arr.ps_adaptive_amount+'&nbsp;</span><div class="desktop-after-float-left-margin"><span class="bold">'+show_price_in_tokens(provider.amount,true)+'</span></div></div>';
					data+='<div class="desktop-view-list"><span class="desktop-float-left">'+ltmp_arr.ps_adaptive_descr+'&nbsp;</span><div class="desktop-after-float-left-margin">'+descr+'</div></div>';
				data+='</div>';
				data+='</div>';
			}
			if(''==data){
				data+='<div class="columns-view"><div class="column-view column-1">';
				data+=ltmp_arr.default_no_items;
				data+=(page!=0?ltmp_arr.default_no_items_try_other_page+(''!=search?ltmp_arr.default_no_items_try_other_search:''):'')+ltmp_arr.default_no_items_try_other_end;
				data+='</div></div>';
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				if(prev_page){
					$('.page-paid-subscriptions .view-paid-subscriptions .table-footer').html((prev_page?'<a class="view-paid-subscriptions-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':''));
				}
				else{
					$('.page-paid-subscriptions .view-paid-subscriptions .table-footer').html('');
				}
			}
			else{
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				let next_page=false;
				if(response.length>=per_page){
					next_page=true;
				}
				$('.page-paid-subscriptions .view-paid-subscriptions .table-footer').html(
					(prev_page?'<a class="view-paid-subscriptions-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':'')+
					ltmp_arr.default_list_items_counter+': '+(offset+1)+'-'+(offset+response.length)+
					(next_page?' <a class="view-paid-subscriptions-page-action inline-button red" data-page="'+(2+page)+'">'+ltmp_arr.default_next_page+'</a>':'')
				);
			}
			$('.page-paid-subscriptions .view-paid-subscriptions .table-data').attr('data-page',page);
			$('.page-paid-subscriptions .view-paid-subscriptions .table-data').html(data);
		}
	});
}
var load_accounts_on_sale_timer=0;
function load_accounts_on_sale(page){
	page=typeof page==='undefined'?0:page;
	if(page<0){
		page=0;
	}
	let per_page=10;
	let offset=page*per_page;
	let search=$('.page-buy-account .accounts-on-sale input[name=account-filter]').val().trim();
	let order=$('.page-buy-account .accounts-on-sale select[name=order] option:selected').val();
	$('.page-buy-account .accounts-on-sale .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
	$.ajax({
		type:'GET',
		url:'https://my.viz.plus/ajax.php',
		data:{'action':'get_accounts_on_sale',page,search,order},
		success:function(response_data){
			let data='';
			try{
				response=JSON.parse(response_data);
			}
			catch(err){
				data='<p class="red">'+ltmp_arr.default_incorrect_response+'</p>';

				console.log(err);
			}
			for(i in response){
				data+='<div class="columns-view">';
				data+='<div class="column-view column-4">'+response[i].account+'</div>';
				//data+='<div class="column-view column-4">'+response[i].account_seller+'</div>';
				data+='<div class="column-view column-flex"><a data-href="/market/buy-account/'+response[i].account+'/" class="inline-button red no-margin">'+show_price_in_tokens(response[i].price,true)+'</a></div>';
				data+='</div>';
			}
			if(''==data){
				data+='<div class="columns-view"><div class="column-view column-1">';
				data+=ltmp_arr.default_no_items;
				data+=(page!=0?ltmp_arr.default_no_items_try_other_page+(''!=search?ltmp_arr.default_no_items_try_other_search:''):'')+ltmp_arr.default_no_items_try_other_end;
				data+='</div></div>';
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				if(prev_page){
					$('.page-buy-account .accounts-on-sale .table-footer').html((prev_page?'<a class="accounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':''));
				}
				else{
					$('.page-buy-account .accounts-on-sale .table-footer').html('');
				}
			}
			else{
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				let next_page=false;
				if(response.length>=per_page){
					next_page=true;
				}
				$('.page-buy-account .accounts-on-sale .table-footer').html(
					(prev_page?'<a class="accounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':'')+
					ltmp_arr.default_list_items_counter+': '+(offset+1)+'-'+(offset+response.length)+
					(next_page?' <a class="accounts-on-sale-page-action inline-button red" data-page="'+(2+page)+'">'+ltmp_arr.default_next_page+'</a>':'')
				);
			}
			$('.page-buy-account .accounts-on-sale .table-data').attr('data-page',page);
			$('.page-buy-account .accounts-on-sale .table-data').html(data);
		}
	});
}
var load_short_accounts_on_sale_timer=0;
function load_short_accounts_on_sale(page){
	page=typeof page==='undefined'?0:page;
	if(page<0){
		page=0;
	}
	let per_page=10;
	let offset=page*per_page;
	let search=$('.page-buy-short-account .accounts-on-sale input[name=account-filter]').val().trim();
	$('.page-buy-short-account .accounts-on-sale .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
	$.ajax({
		type:'GET',
		url:'https://my.viz.plus/ajax.php',
		data:{'action':'get_short_accounts_on_sale',page,search},
		success:function(response_data){
			let data='';
			try{
				response=JSON.parse(response_data);
			}
			catch(err){
				data='<p class="red">'+ltmp_arr.default_incorrect_response+'</p>';

				console.log(err);
			}
			for(i in response){
				data+='<div class="columns-view">';
				data+='<div class="column-view column-4">'+response[i].account+'</div>';
				//data+='<div class="column-view column-4">'+response[i].account_seller+'</div>';
				data+='<div class="column-view column-flex"><a data-href="/market/buy-short-account/'+response[i].account+'/" class="inline-button red no-margin">'+show_price_in_tokens(response[i].price,true)+'</a></div>';
				data+='</div>';
			}
			if(''==data){
				data+='<div class="columns-view"><div class="column-view column-1">';
				data+=ltmp_arr.default_no_items;
				data+=(page!=0?ltmp_arr.default_no_items_try_other_page+(''!=search?ltmp_arr.default_no_items_try_other_search:''):'')+ltmp_arr.default_no_items_try_other_end;
				data+='</div></div>';
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				if(prev_page){
					$('.page-buy-short-account .accounts-on-sale .table-footer').html((prev_page?'<a class="short-accounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':''));
				}
				else{
					$('.page-buy-short-account .accounts-on-sale .table-footer').html('');
				}
			}
			else{
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				let next_page=false;
				if(response.length>=per_page){
					next_page=true;
				}
				$('.page-buy-short-account .accounts-on-sale .table-footer').html(
					(prev_page?'<a class="short-accounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':'')+
					ltmp_arr.default_list_items_counter+': '+(offset+1)+'-'+(offset+response.length)+
					(next_page?' <a class="short-accounts-on-sale-page-action inline-button red" data-page="'+(2+page)+'">'+ltmp_arr.default_next_page+'</a>':'')
				);
			}
			$('.page-buy-short-account .accounts-on-sale .table-data').attr('data-page',page);
			$('.page-buy-short-account .accounts-on-sale .table-data').html(data);
		}
	});
}
var load_subaccounts_on_sale_timer=0;
function load_subaccounts_on_sale(page){
	page=typeof page==='undefined'?0:page;
	if(page<0){
		page=0;
	}
	let per_page=10;
	let offset=page*per_page;
	let search=$('.page-buy-subaccount .subaccounts-on-sale input[name=subaccount-filter]').val().trim();
	let order=$('.page-buy-subaccount .subaccounts-on-sale select[name=order] option:selected').val();
	$('.page-buy-subaccount .subaccounts-on-sale .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
	$.ajax({
		type:'GET',
		url:'https://my.viz.plus/ajax.php',
		data:{'action':'get_subaccounts_on_sale',page,search,order},
		success:function(response_data){
			let data='';
			try{
				response=JSON.parse(response_data);
			}
			catch(err){
				data='<p class="red">'+ltmp_arr.default_incorrect_response+'</p>';

				console.log(err);
			}
			for(i in response){
				data+='<div class="columns-view">';
				data+='<div class="column-view column-4">'+response[i].account+'</div>';
				//data+='<div class="column-view column-4">'+response[i].account_seller+'</div>';
				data+='<div class="column-view column-flex"><a data-href="/market/buy-subaccount/'+response[i].account+'/" class="inline-button red no-margin">'+show_price_in_tokens(response[i].price,true)+'</a></div>';
				data+='</div>';
			}
			if(''==data){
				data+='<div class="columns-view"><div class="column-view column-1">';
				data+=ltmp_arr.default_no_items
				data+=(page!=0?ltmp_arr.default_no_items_try_other_page+(''!=search?ltmp_arr.default_no_items_try_other_search:''):'')+ltmp_arr.default_no_items_try_other_end;
				data+='</div></div>';
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				if(prev_page){
					$('.page-buy-subaccount .subaccounts-on-sale .table-footer').html((prev_page?'<a class="subaccounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':''));
				}
				else{
					$('.page-buy-subaccount .subaccounts-on-sale .table-footer').html('');
				}
			}
			else{
				let prev_page=false;
				if(offset>=per_page){
					prev_page=true;
				}
				let next_page=false;
				if(response.length>=per_page){
					next_page=true;
				}
				$('.page-buy-subaccount .subaccounts-on-sale .table-footer').html(
					(prev_page?'<a class="subaccounts-on-sale-page-action inline-button red" data-page="'+(page)+'">'+ltmp_arr.default_prev_page+'</a> ':'')+
					ltmp_arr.default_list_items_counter+': '+(offset+1)+'-'+(offset+response.length)+
					(next_page?' <a class="subaccounts-on-sale-page-action inline-button red" data-page="'+(2+page)+'">'+ltmp_arr.default_next_page+'</a>':'')
				);
			}
			$('.page-buy-subaccount .subaccounts-on-sale .table-data').attr('data-page',page);
			$('.page-buy-subaccount .subaccounts-on-sale .table-data').html(data);
		}
	});
}
function load_inactive_paid_subscriptions(){
	$('.page-active-paid-subscriptions .inactive-paid-subscriptions .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
	viz.api.getInactivePaidSubscriptions(current_user,function(err,response){
		let data='';
		let provider_arr=[];
		if(!err){
			for(i in response){
				let provider=response[i];
				provider_arr.push(provider);
				data+=`
				<div class="columns-view" data-provider="${provider}">
					<div class="column-view column-5 provider"><span class="adaptive-show">`+ltmp_arr.ps_provider_adaptive_caption+`&nbsp;</span><a data-href="/market/paid-subscriptions/${provider}/">${provider}</a></div>
					<div class="column-view column-5 period">&hellip;</div>
					<div class="column-view column-5 level">&hellip;</div>
					<div class="column-view column-5 amount">&hellip;</div>
					<div class="column-view column-flex end-date">&hellip;</div>
				</div>`;
			}
		}
		else{
			data+=`
			<div class="columns-view">
				<div class="column-view column-flex red">`+ltmp_arr.default_node_error+`</div>
			</div>`;
			console.log(err);
		}
		$('.page-active-paid-subscriptions .inactive-paid-subscriptions .table-data').html(data);
		for(i in provider_arr){
			viz.api.getPaidSubscriptionStatus(current_user,provider_arr[i],function(err,response){
				if(!err){
					let el=$('.page-active-paid-subscriptions .inactive-paid-subscriptions .table-data .columns-view[data-provider="'+response.creator+'"]');
					//console.log(response,el);
					el.find('.level').html('<span class="adaptive-show">'+ltmp_arr.ps_level_adaptive_caption+'&nbsp;</span>'+response.level);
					el.find('.amount').html('<span class="adaptive-show">'+ltmp_arr.ps_amount_adaptive_caption+'&nbsp;</span>'+number_thousands(show_price_in_tokens(response.level*response.amount/1000,true)));
					el.find('.period').html('<span class="adaptive-show">'+ltmp_arr.ps_period_adaptive_caption+'&nbsp;</span>'+response.period+plural_str(response.period,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5));
					el.find('.end-date').html('<span class="adaptive-show">'+ltmp_arr.ps_end_date_adaptive_caption+'&nbsp;</span>'+show_date(response.end_time,true)+ltmp_arr.default_date_utc);
					if(response.auto_renewal){//if must be auto renewal, color to red
						el.find('.end-date').addClass('red');
						//el.find('.end-date').addClass('green');
					}
					else{
						//el.find('.end-date').addClass('red');
					}
				}
				else{
					$('.page-active-paid-subscriptions .inactive-paid-subscriptions .table-data .columns-view[data-provider='+response.creator+']').addClass('red');
				}
			});
		}
	});
}
function view_market(path,params,title){
	if(''==current_user){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
		return false;
	}
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
		if(typeof path[2] != 'undefined'){
			if(0<$('.view-'+path[1]+' .page-'+path[2]).length){
				$('.view-'+path[1]+' .page-'+path[2]).css('display','block');

				if(0<$('.view-'+path[1]+' .page-'+path[2]+' .account-balance').length){
					$('.account-balance').css('display','none');

					update_balances($('.view-'+path[1]+' .page-'+path[2]+' .account-balance'));
				}
				if('paid-subscriptions'==path[2]){
					if(''!=path[3]){
						$('.page-paid-subscriptions .section').css('display','none');
						viz.api.getPaidSubscriptionOptions(path[3],function(err,response){
							let provider=response;
							$('.page-paid-subscriptions .view-paid-subscription .provider-account').html(escape_html(provider.creator));
							title=provider.creator+' - '+title;
							document.title=title;
							let descr='';
							let url='';
							if(-1!=provider.url.indexOf('https://')){
								descr=provider.url.substring(0,provider.url.indexOf('https://'));
								descr=descr.trim();
								url=provider.url.substring(provider.url.indexOf('https://'));
								url=url.trim();
							}
							else
							if(-1!=provider.url.indexOf('http://')){
								descr=provider.url.substring(0,provider.url.indexOf('http://'));
								descr=descr.trim();
								url=provider.url.substring(provider.url.indexOf('http://'));
								url=url.trim();
							}
							else{
								descr=provider.url;
							}
							if(!err){
								viz.api.getPaidSubscriptionStatus(current_user,path[3],function(err,response){
									let agreement=false;
									let agreement_closed=false;
									let changed_conditions=false;
									let changed_conditions_good=false;
									let start_time=0;
									let next_time=0;
									let end_time=0;
									let auto_renewal=false;
									let level=0;
									let amount=0;
									let period=0;
									if(!err){
										agreement=true;
										start_time=Date.parse(response.start_time);
										next_time=Date.parse(response.next_time);
										end_time=Date.parse(response.end_time);
										if(end_time>0){
											agreement_closed=true;
										}
										auto_renewal=response.auto_renewal;
										level=response.level;
										amount=response.amount;
										period=response.period;
									}
									//console.log(start_time,next_time,end_time)
									if(agreement){
										if(provider.levels<level){
											changed_conditions=true;
										}
										if(provider.amount!=amount){
											changed_conditions=true;
										}
										if(provider.period!=period){
											changed_conditions=true;
										}
										let spending=amount*level/period;
										let new_spending=provider.amount*((provider.levels>level)?level:provider.levels)/provider.period;
										if(new_spending<=spending){
											changed_conditions_good=true;
										}
									}

									let data='';
									if(agreement){
										data+='<p>'+ltmp_arr.ps_agreement_status_caption+': '+(agreement_closed?'<span class="red bold">'+ltmp_arr.ps_agreement_status_ended+'</span>':'<span class="green bold">'+ltmp_arr.ps_agreement_status_active+'</span>')+'</p>';
										if(changed_conditions){
											if(agreement_closed){
												data+='<p>'+ltmp_arr.ps_agreement_closed_changed_conditions+'</p>';
											}
											else{
												data+='<p>'+ltmp_arr.ps_agreement_active_changed_conditions+(changed_conditions_good?ltmp_arr.ps_agreement_active_changed_conditions_good:ltmp_arr.ps_agreement_active_changed_conditions_bad)+'</p>';
											}
										}
										if(agreement_closed){
											data+='<p>'+ltmp_arr.ps_end_date_caption+': '+show_date(end_time,true)+ltmp_arr.default_date_utc+'</p>';
										}
										else{
											if(auto_renewal){
												data+='<p class="green">'+ltmp_arr.ps_auto_renewal_active+'</p>';
												if(changed_conditions){
													if(changed_conditions_good){
														data+='<p>'+ltmp_arr.ps_next_date_caption+': '+show_date(next_time,true)+ltmp_arr.default_date_utc+'</p>';
													}
													else{
														data+='<p>'+ltmp_arr.ps_next_end_date_caption+': '+show_date(next_time,true)+ltmp_arr.default_date_utc+'</p>';
													}
												}
												else{
													data+='<p>'+ltmp_arr.ps_next_date_caption+': '+show_date(next_time,true)+ltmp_arr.default_date_utc+'</p>';
												}
											}
											else{
												data+='<p>'+ltmp_arr.ps_next_end_date_caption+': '+show_date(next_time,true)+ltmp_arr.default_date_utc+'</p>';
											}
										}
									}
									if(0==provider.levels){
										data+='<p class="red">'+ltmp_arr.ps_agreement_closed+'</p>';
									}
									else{
										if(''!=descr){
											data+=`<p>`+ltmp_arr.ps_agreement_descr_caption+`: `+escape_html(descr)+`</p>`;
										}
										if(''!=url){
											data+=`<p>`+ltmp_arr.ps_agreement_url_caption+`: <a href="`+escape_html(url)+`" target="_blank">`+escape_html(url)+`</a></p>`;
										}
										data+=`<p>`+ltmp_arr.ps_agreement_amount_caption+`: `+number_thousands(show_price_in_tokens(provider.amount/1000,true))+`</p>`;
										data+=`<p>`+ltmp_arr.ps_agreement_levels_caption+`: `+provider.levels+`</p>`;
										data+=`<p>`+ltmp_arr.ps_agreement_period_caption+`: `+provider.period+plural_str(provider.period,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5)+`</p>`;
										data+=`<hr>
										<p>
											<label class="input-descr">
												<span class="input-caption">`+ltmp_arr.ps_agreement_form_level_caption+`:</span>
												<input type="text" name="paid-subscribe-level" class="simple-rounded" placeholder="0%" data-result-element="input[name=fund-vote-request-percent-range]" value="`+(Math.min(level,provider.levels))+`" data-period="`+provider.period+`" data-amount="`+provider.amount+`">
												<span class="range-slider">
													<input class="range-slider-input range-slider-color-green simple-rounded-size" name="paid-subscribe-level-range" data-result-element="input[name=paid-subscribe-level]" type="range" value="`+(Math.min(level,provider.levels))+`" min="0" max="`+provider.levels+`" step="1">
													<span class="range-slider-value captions" rel="amount" title="`+ltmp_arr.ps_agreement_form_sum_amount_caption+`">&hellip;</span>
												</span>
											</label>
										</p>`;
										data+='<label class="check color-red">'+ltmp_arr.ps_agreement_form_auto_renewal_caption+'<input type="checkbox" name="paid-subscribe-auto-renewal" '+(auto_renewal?' checked="checked"':'')+'><span class="mark"></span></label>';
										data+=`<p><label class="radio color-red">`+ltmp_arr.ps_agreement_sign_caption+`<input type="radio" name="paid-subscribe-agreement" value="true"><span class="mark"></span></label></p>`
										if(agreement&&!agreement_closed&&auto_renewal){
											//data+=`<p><label class="radio color-red">`+ltmp_arr.ps_agreement_sign_off_caption+`<input type="radio" name="paid-subscribe-agreement" value="false"><span class="mark"></span></label></p>`;
										}
										data+=`<p class="red paid-subscribe-error"></p>
										<p class="green paid-subscribe-success"></p>
										<p>
											<input class="paid-subscribe-action red-button captions" type="button" value="`+ltmp_arr.ps_agreement_button_caption+`">
											<span class="submit-button-ring"></span>
											<span class="icon icon-margin hidden icon-color-red icon-check"></span>
										</p>`;
									}
									$('.page-paid-subscriptions .view-paid-subscription .edit-paid-subscription').html(data);
									$('.page-paid-subscriptions .range-slider').each(function(i,el){
										$(el).find('.range-slider-value').each(function(){
											let value=$(this).prev().attr('value');
											let amount=$($(this).prev().attr('data-result-element')).attr('data-amount');
											$(this).html(number_thousands(show_balance_in_tokens(parseInt(value)*parseInt(amount)/1000,true)));
										});
										$(el).find('.range-slider-input').unbind('input');
										$(el).find('.range-slider-input').bind('input',function(){
											$($(this).attr('data-result-element')).val(this.value);
											$(this).change();
										});
										$(el).find('.range-slider-input').unbind('change');
										$(el).find('.range-slider-input').bind('change',function(){
											let amount=$($(this).attr('data-result-element')).attr('data-amount');
											let value_el=$(this).next('.range-slider-value');
												value_el.html(number_thousands(show_balance_in_tokens(parseInt($(this).val())*parseInt(amount)/1000,true)));
										});
									});
									$('.page-paid-subscriptions input[name=paid-subscribe-level]').unbind('keyup');
									$('.page-paid-subscriptions input[name=paid-subscribe-level]').bind('keyup',function(){
										let value=parseInt($(this).val());
										if(!isNaN(value)){
											let range_slider=$(this).parent().find('.range-slider');
											if(value<0){
												value=0;
											}
											if(value>parseInt(range_slider.find('.range-slider-input').attr('max'))){
												value=parseInt(range_slider.find('.range-slider-input').attr('max'));
											}
											$(this).val(value);
											range_slider.find('.range-slider-input').val(value);
											range_slider.find('.range-slider-input').change();
										}
									});
								});
							}
							else{
								$('.page-paid-subscriptions .view-paid-subscription .edit-paid-subscription').html('<p class="red">'+ltmp_arr.default_node_error+'</p>');

								console.log(err);
							}
							$('.page-paid-subscriptions .view-paid-subscription').css('display','block');
						});
					}
					else{
						$('.page-paid-subscriptions .section').css('display','none');
						$('.page-paid-subscriptions .view-paid-subscriptions').css('display','block');
						let page=0;
						if(typeof params.page != 'undefined'){
							page=parseInt(params.page)-1;
						}
						viz.api.getActivePaidSubscriptions(current_user,function(err,response){
							if(!err){
								current_user_active_paid_subscribes=response;
								load_paid_subscriptions(page);
							}
							else{
								load_paid_subscriptions(page);
							}
						});

						$('.page-paid-subscriptions .view-paid-subscriptions input[name=provider-filter]').unbind('keyup');
						$('.page-paid-subscriptions .view-paid-subscriptions input[name=provider-filter]').bind('keyup',function(){
							clearTimeout(load_paid_subscriptions_timer);
							load_paid_subscriptions_timer=setTimeout(load_paid_subscriptions,200,0);
						});

						$('.page-paid-subscriptions .view-paid-subscriptions input[name=descr-filter]').unbind('keyup');
						$('.page-paid-subscriptions .view-paid-subscriptions input[name=descr-filter]').bind('keyup',function(){
							clearTimeout(load_paid_subscriptions_timer);
							load_paid_subscriptions_timer=setTimeout(load_paid_subscriptions,200,0);
						});
						$('.page-paid-subscriptions .view-paid-subscriptions select[name=order]').unbind('change');
						$('.page-paid-subscriptions .view-paid-subscriptions select[name=order]').bind('change',function(){
							load_paid_subscriptions(0);
						});
					}
				}
				if('create-paid-subscribe'==path[2]){
					$('.create-edit-paid-subscribe-caption').html('&hellip;');
					viz.api.getPaidSubscriptionOptions(current_user,function(err,response){
						if(err){
							$('.create-edit-paid-subscribe-caption').html(ltmp_arr.create_paid_subscribe_caption);
						}
						else{
							$('.create-edit-paid-subscribe-caption').html(ltmp_arr.edit_paid_subscribe_caption);
						}
					});

					$('.page-create-paid-subscribe .fee-checkbox').css('display','none');
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="create_paid_subscription_fee"]').html(show_price_in_tokens(response.create_paid_subscription_fee,true));
						}
					});

					$('.page-create-paid-subscribe .current_user').html(current_user);
					$('.page-create-paid-subscribe .create-paid-subscribe-error').html('');
					$('.page-create-paid-subscribe .create-paid-subscribe-success').html('');
					$('.page-create-paid-subscribe input[type=text]').val('');
					$('.page-create-paid-subscribe input[type=radio]:checked').prop('checked','');
					viz.api.getPaidSubscriptionOptions(current_user,function(err,response){
						if(!err){
							let descr='';
							let url='';
							if(-1!=response.url.indexOf('https://')){
								descr=response.url.substring(0,response.url.indexOf('https://'));
								descr=descr.trim();
								url=response.url.substring(response.url.indexOf('https://'));
								url=url.trim();
							}
							else
							if(-1!=response.url.indexOf('http://')){
								descr=response.url.substring(0,response.url.indexOf('http://'));
								descr=descr.trim();
								url=response.url.substring(response.url.indexOf('http://'));
								url=url.trim();
							}
							else{
								descr=response.url;
							}
							$('.page-create-paid-subscribe input[name=create-paid-subscribe-descr]').val(descr);
							$('.page-create-paid-subscribe input[name=create-paid-subscribe-url]').val(url);

							$('.page-create-paid-subscribe input[name=create-paid-subscribe-levels]').val(response.levels);
							$('.page-create-paid-subscribe input[name=create-paid-subscribe-amount]').val(number_thousands(show_price_in_tokens(response.amount/1000,true)));
							$('.page-create-paid-subscribe input[name=create-paid-subscribe-period]').val(response.period);

							if(response.levels>0){
								$('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement][value=true]').prop('checked','true');
							}
							else{
								$('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement][value=false]').prop('checked','true');
							}
						}
						else{
							//console.log(JSON.stringify(err));
							if(-1!=JSON.stringify(err).indexOf('Paid subscription not found')){
								$('.page-create-paid-subscribe .fee-checkbox').css('display','block');
							}
						}
					});
				}
				if('active-paid-subscriptions'==path[2]){
					$('.page-active-paid-subscriptions .show-inactive-paid-subscriptions-action').css('display','inline-block');
					$('.page-active-paid-subscriptions .inactive-paid-subscriptions').css('display','none');
					$('.page-active-paid-subscriptions .current_user').html(current_user);
					$('.page-active-paid-subscriptions .active-paid-subscriptions .table-data').html('<div class="columns-view"><div class="column-view column-flex"><p><span class="submit-button-ring" style="display:inline-block"></span> '+ltmp_arr.default_loading+'</p></div></div>');
					viz.api.getActivePaidSubscriptions(current_user,function(err,response){
						let data='';
						let provider_arr=[];
						if(!err){
							for(i in response){
								let provider=response[i];
								provider_arr.push(provider);
								data+=`
								<div class="columns-view" data-provider="${provider}">
									<div class="column-view column-5 provider"><span class="adaptive-show">`+ltmp_arr.ps_adaptive_provider+`&nbsp;</span><a data-href="/market/paid-subscriptions/${provider}/">${provider}</a></div>
									<div class="column-view column-5 period">&hellip;</div>
									<div class="column-view column-5 level">&hellip;</div>
									<div class="column-view column-5 amount">&hellip;</div>
									<div class="column-view column-flex next-date">&hellip;</div>
								</div>`;
							}
						}
						else{
							data+=`
							<div class="columns-view">
								<div class="column-view column-flex red">`+ltmp_arr.default_node_error+`</div>
							</div>`;
							console.log(err);
						}
						$('.page-active-paid-subscriptions .active-paid-subscriptions .table-data').html(data);
						for(i in provider_arr){
							viz.api.getPaidSubscriptionStatus(current_user,provider_arr[i],function(err,response){
								if(!err){
									let el=$('.page-active-paid-subscriptions .active-paid-subscriptions .table-data .columns-view[data-provider="'+response.creator+'"]');
									//console.log(response,el);
									el.find('.level').html('<span class="adaptive-show">'+ltmp_arr.ps_level_adaptive_caption+'&nbsp;</span>'+response.level);
									el.find('.amount').html('<span class="adaptive-show">'+ltmp_arr.ps_amount_adaptive_caption+'&nbsp;</span>'+number_thousands(show_price_in_tokens(response.level*response.amount/1000,true)));
									el.find('.period').html('<span class="adaptive-show">'+ltmp_arr.ps_period_adaptive_caption+'&nbsp;</span>'+response.period+plural_str(response.period,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5));
									el.find('.next-date').html('<span class="adaptive-show">'+ltmp_arr.ps_next_date_adaptive_caption+'&nbsp;</span>'+show_date(response.next_time,true)+ltmp_arr.default_date_utc);
									if(response.auto_renewal){
										el.find('.next-date').addClass('green');
									}
									else{
										el.find('.next-date').addClass('red');
									}
								}
								else{
									$('.page-active-paid-subscriptions .active-paid-subscriptions .table-data .columns-view[data-provider='+response.creator+']').addClass('red');
								}
							});
						}
					});
				}

				if('buy-account'==path[2]){
					if(''!=path[3]){
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						viz.api.getAccounts([path[3]],function(err,response){
							let login='';
							let offer_price='';
							let on_sale=false;
							let error=false;
							if(err){
								error=ltmp_arr.ba_response_error;
								console.log(err);
							}
							if(typeof response[0] == 'undefined'){
								error=ltmp_arr.ba_account_not_found;
							}
							if(!response[0].account_on_sale){
								error=ltmp_arr.ba_account_not_on_sale;
							}
							if(!error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation input[name=buy-account-login]').val(response[0].name);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation input[name=buy-account-offer-price]').attr('data-offer-price',response[0].account_offer_price);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation input[name=buy-account-offer-price]').val(show_price_in_tokens(response[0].account_offer_price,true));
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation .buy-account-action').removeAttr('disabled');
							}
							if(error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation .buy-account-action').attr('disabled','disabled');
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-error').html(error);
							}
							$('.view-'+path[1]+' .page-'+path[2]+' .buy-account-confirmation').css('display','block');
						});
					}
					else{
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						$('.view-'+path[1]+' .page-'+path[2]+' .accounts-on-sale').css('display','block');

						let page=0;
						if(typeof params.page != 'undefined'){
							page=parseInt(params.page)-1;
						}
						load_accounts_on_sale(page);
						$('.page-buy-account .accounts-on-sale input[name=account-filter]').unbind('keyup');
						$('.page-buy-account .accounts-on-sale input[name=account-filter]').bind('keyup',function(){
							clearTimeout(load_accounts_on_sale_timer);
							load_accounts_on_sale_timer=setTimeout(load_accounts_on_sale,200,0);
						});
						$('.page-buy-account .accounts-on-sale select[name=order]').unbind('change');
						$('.page-buy-account .accounts-on-sale select[name=order]').bind('change',function(){
							load_accounts_on_sale(0);
						});
					}
				}

				if('buy-short-account'==path[2]){
					if(''!=path[3]){
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						viz.api.getAccounts([path[3]],function(err,response){
							let login='';
							let offer_price='';
							let on_sale=false;
							let error=false;
							if(err){
								error=ltmp_arr.ba_response_error;
								console.log(err);
							}
							if(typeof response[0] == 'undefined'){
								error=ltmp_arr.ba_account_not_found;
							}
							if(!response[0].account_on_sale){
								error=ltmp_arr.ba_account_not_on_sale;
							}
							if(!error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation input[name=buy-short-account-login]').val(response[0].name);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation input[name=buy-short-account-offer-price]').attr('data-offer-price',response[0].account_offer_price);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation input[name=buy-short-account-offer-price]').val(show_price_in_tokens(response[0].account_offer_price,true));
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation .buy-short-account-action').removeAttr('disabled');
							}
							if(error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation .buy-short-account-action').attr('disabled','disabled');
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-error').html(error);
							}
							$('.view-'+path[1]+' .page-'+path[2]+' .buy-short-account-confirmation').css('display','block');
						});
					}
					else{
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						$('.view-'+path[1]+' .page-'+path[2]+' .accounts-on-sale').css('display','block');

						let page=0;
						if(typeof params.page != 'undefined'){
							page=parseInt(params.page)-1;
						}
						load_short_accounts_on_sale(page);
						$('.page-buy-short-account .accounts-on-sale input[name=account-filter]').unbind('keyup');
						$('.page-buy-short-account .accounts-on-sale input[name=account-filter]').bind('keyup',function(){
							clearTimeout(load_short_accounts_on_sale_timer);
							load_short_accounts_on_sale_timer=setTimeout(load_short_accounts_on_sale,200,0);
						});
					}
				}

				if('buy-subaccount'==path[2]){
					if(''!=path[3]){
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						viz.api.getAccounts([path[3]],function(err,response){
							viz.api.getChainProperties(function(err,response){
								if(!err){
									$('.median-props[rel="account_creation_fee"]').html(show_price_in_tokens(response.account_creation_fee,true));
									//$('.median-props[rel="create_account_delegation_fee"]').html(show_price_in_tokens(parseFloat(response.account_creation_fee) * response.create_account_delegation_ratio,true));
									$('.page-buy-subaccount .buy-subaccount-confirmation input[name=buy-subaccount-token-to-shares]').val(show_price_in_tokens(response.account_creation_fee,true));
								}
							});
							let login='';
							let offer_price='';
							let on_sale=false;
							let error=false;
							if(err){
								error=ltmp_arr.bsa_response_error;
							}
							if(typeof response[0] == 'undefined'){
								error=ltrm_arr.bsa_account_not_found;
							}
							if(!response[0].subaccount_on_sale){
								error=ltmp_arr.bsa_accounts_not_on_sale;
							}
							if(!error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation .account-login').html(response[0].name);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation input[name=buy-subaccount-login]').val('');
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation input[name=buy-subaccount-login]').attr('data-suffix',response[0].name);

								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation input[name=buy-subaccount-offer-price]').attr('data-offer-price',response[0].subaccount_offer_price);
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation input[name=buy-subaccount-offer-price]').val(show_price_in_tokens(response[0].subaccount_offer_price,true));
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation .buy-subaccount-action').removeAttr('disabled');
							}
							if(error){
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation .buy-subaccount-action').attr('disabled','disabled');
								$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-error').html(error);
							}
							$('.view-'+path[1]+' .page-'+path[2]+' .buy-subaccount-confirmation').css('display','block');
						});
					}
					else{
						$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
						$('.view-'+path[1]+' .page-'+path[2]+' .subaccounts-on-sale').css('display','block');
						let page=0;
						if(typeof params.page != 'undefined'){
							page=parseInt(params.page)-1;
						}
						load_subaccounts_on_sale(page);
						$('.page-buy-subaccount .subaccounts-on-sale input[name=subaccount-filter]').unbind('keyup');
						$('.page-buy-subaccount .subaccounts-on-sale input[name=subaccount-filter]').bind('keyup',function(){
							clearTimeout(load_subaccounts_on_sale_timer);
							load_subaccounts_on_sale_timer=setTimeout(load_subaccounts_on_sale,200,0);
						});
						$('.page-buy-subaccount .subaccounts-on-sale select[name=order]').unbind('change');
						$('.page-buy-subaccount .subaccounts-on-sale select[name=order]').bind('change',function(){
							load_subaccounts_on_sale(0);
						});
					}
				}

				if('sell-account'==path[2]){
					$('.view-'+path[1]+' .page-'+path[2]+' .current_user').html(current_user);
					//$('.view-'+path[1]+' .page-'+path[2]+' input[name="set-account-login"]').val(current_user);

					$('.page-sell-account .fee-checkbox').css('display','none');
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="account_on_sale_fee"]').html(show_price_in_tokens(response.account_on_sale_fee,true));
						}
					});
					$('.page-sell-account input[name="set-account-login"]').val(current_user);
					$('.page-sell-account input[name="set-account-master-key"]').val('');
					$('.page-sell-account input[name="set-account-seller"]').val('');
					$('.page-sell-account input[name="set-account-price"]').val('');
					viz.api.getAccounts([current_user],function(err,response){
						if(typeof response[0] != 'undefined'){
							if(response[0].name==current_user){
								if(''==response[0].account_seller){
									$('.page-sell-account .fee-checkbox').css('display','block');
								}
								else{
									$('.page-sell-account input[name="set-account-seller"]').val(response[0].account_seller);
									$('.page-sell-account input[name="set-account-price"]').val(response[0].account_offer_price);
								}
							}
						}
					});

					$('.page-sell-account input[name=set-account-seller]').unbind('keypress');
					$('.page-sell-account input[name=set-account-seller]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-sell-account input[name=set-account-login]').unbind('keypress');
					$('.page-sell-account input[name=set-account-login]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-sell-account input[name=set-account-master-key]').val('');
				}

				if('sell-subaccount'==path[2]){
					$('.view-'+path[1]+' .page-'+path[2]+' .current_user').html(current_user);

					$('.page-sell-subaccount .fee-checkbox').css('display','none');
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="subaccount_on_sale_fee"]').html(show_price_in_tokens(response.subaccount_on_sale_fee,true));
						}
					});
					$('.page-sell-subaccount input[name="set-subaccount-login"]').val(current_user);
					$('.page-sell-subaccount input[name="set-subaccount-master-key"]').val('');
					$('.page-sell-subaccount input[name="set-subaccount-seller"]').val('');
					$('.page-sell-subaccount input[name="set-subaccount-price"]').val('');
					viz.api.getAccounts([current_user],function(err,response){
						if(typeof response[0] != 'undefined'){
							if(response[0].name==current_user){
								if(''==response[0].subaccount_seller){
									$('.page-sell-subaccount .fee-checkbox').css('display','block');
								}
								else{
									$('.page-sell-subaccount input[name="set-subaccount-seller"]').val(response[0].subaccount_seller);
									$('.page-sell-subaccount input[name="set-subaccount-price"]').val(response[0].subaccount_offer_price);
								}
							}
						}
					});

					$('.page-sell-subaccount input[name=set-subaccount-seller]').unbind('keypress');
					$('.page-sell-subaccount input[name=set-subaccount-seller]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-sell-subaccount input[name=set-subaccount-login]').unbind('keypress');
					$('.page-sell-subaccount input[name=set-subaccount-login]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-sell-subaccount input[name=set-subaccount-master-key]').val('');
				}
				return true;
			}
		}
		if(0<$('.view-'+path[1]+' .page-index').length){
			$('.view-'+path[1]+' .page-index').css('display','block');

			$('.create-edit-paid-subscribe-caption').html('&hellip;');
			viz.api.getPaidSubscriptionOptions(current_user,function(err,response){
				if(err){
					$('.create-edit-paid-subscribe-caption').html(ltmp_arr.create_paid_subscribe_caption);
				}
				else{
					$('.create-edit-paid-subscribe-caption').html(ltmp_arr.edit_paid_subscribe_caption);
				}
			});
		}
	}
}
function view_portable(path,params,title){
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
	}
}
function view_accounts(path,params,title){
	if(''==current_user){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
		return false;
	}
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
		if(typeof path[2] != 'undefined'){
			if(0<$('.view-'+path[1]+' .page-'+path[2]).length){
				$('.view-'+path[1]+' .page-'+path[2]).css('display','block');

				if(0<$('.view-'+path[1]+' .page-'+path[2]+' .account-balance').length){
					$('.account-balance').css('display','none');

					update_balances($('.view-'+path[1]+' .page-'+path[2]+' .account-balance'));
				}

				if('create-account'==path[2]){
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="account_creation_fee"]').html(show_price_in_tokens(response.account_creation_fee,true));
							$('.median-props[rel="create_account_delegation_fee"]').html(show_price_in_tokens(parseFloat(response.account_creation_fee) * response.create_account_delegation_ratio,true));
						}
					});
					$('.page-create-account input[name=create-account-login]').unbind('keypress');
					$('.page-create-account input[name=create-account-login]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-create-account input[name=create-account-login]').unbind('keyup');
					$('.page-create-account input[name=create-account-login]').bind('keyup',function(e){
						clearTimeout(check_login_timer);
						check_login_timer=setTimeout(check_login,500,$('.page-create-account input[name=create-account-login]'),$('.page-create-account .create-account-available'));
					});
				}

				if('create-subaccount'==path[2]){
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="account_creation_fee"]').html(show_price_in_tokens(response.account_creation_fee,true));
							$('.median-props[rel="create_account_delegation_fee"]').html(show_price_in_tokens(parseFloat(response.account_creation_fee) * response.create_account_delegation_ratio,true));
						}
					});
					$('.view-'+path[1]+' .page-'+path[2]+' .current_user').html(current_user);
					$('.page-create-subaccount input[name=create-subaccount-login]').unbind('keypress');
					$('.page-create-subaccount input[name=create-subaccount-login]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
					$('.page-create-account input[name=create-subaccount-login]').unbind('keyup');
					$('.page-create-account input[name=create-subaccount-login]').bind('keyup',function(e){
						clearTimeout(check_login_timer);
						check_login_timer=setTimeout(check_login,500,$('.page-create-subaccount input[name=create-subaccount-login]'),$('.page-create-subaccount .create-subaccount-available'));
					});
				}
				if('manage-profile'==path[2]){
					$('.page-manage-profile input[name=manage-profile-nickname]').val('');
					$('.page-manage-profile input[name=manage-profile-about]').val('');
					$('.page-manage-profile input[name=manage-profile-avatar]').val('');
					$('.page-manage-profile select[name=manage-profile-gender]').val('').change();

					$('.page-manage-profile input[name=manage-profile-location]').val('');
					$('.page-manage-profile input[name=manage-profile-interests]').val('');
					$('.page-manage-profile input[name=manage-profile-site]').val('');
					$('.page-manage-profile input[name=manage-profile-mail]').val('');

					$('.page-manage-profile input[name=manage-profile-facebook]').val('');
					$('.page-manage-profile input[name=manage-profile-instagram]').val('');
					$('.page-manage-profile input[name=manage-profile-twitter]').val('');
					$('.page-manage-profile input[name=manage-profile-vk]').val('');

					$('.page-manage-profile input[name=manage-profile-telegram]').val('');
					$('.page-manage-profile input[name=manage-profile-skype]').val('');
					$('.page-manage-profile input[name=manage-profile-viber]').val('');
					$('.page-manage-profile input[name=manage-profile-whatsapp]').val('');

					$('.page-manage-profile .submit-button-ring').css('display','none');
					$('.page-manage-profile .manage-profile-error').html('');
					$('.page-manage-profile .manage-profile-success').html('');
					$('.page-manage-profile .icon-check').css('display','none');

					viz.api.getAccounts([current_user],function(err,response){
						if(err){
							$('.page-manage-profile .manage-profile-error').html('<p class="red">'+ltmp_arr.default_node_not_respond+'</p>');
						}
						else{
							if(current_user==response[0].name){
								let json_metadata={};
								if(''!=response[0].json_metadata){
									json_metadata=JSON.parse(response[0].json_metadata);
								}
								console.log(json_metadata);
								if(typeof json_metadata.profile !== 'undefined'){
									if(typeof json_metadata.profile.nickname !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-nickname]').val(json_metadata.profile.nickname);
									}
									if(typeof json_metadata.profile.about !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-about]').val(json_metadata.profile.about);
									}
									if(typeof json_metadata.profile.avatar !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-avatar]').val(json_metadata.profile.avatar);
									}
									if(typeof json_metadata.profile.gender !== 'undefined'){
										$('.page-manage-profile select[name=manage-profile-gender]').val(json_metadata.profile.gender);
									}

									if(typeof json_metadata.profile.location !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-location]').val(json_metadata.profile.location);
									}
									if(typeof json_metadata.profile.interests !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-interests]').val(json_metadata.profile.interests.join(', '));
									}
									if(typeof json_metadata.profile.site !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-site]').val(json_metadata.profile.site);
									}
									if(typeof json_metadata.profile.mail !== 'undefined'){
										$('.page-manage-profile input[name=manage-profile-mail]').val(json_metadata.profile.mail);
									}

									if(typeof json_metadata.profile.services !== 'undefined'){
										if(typeof json_metadata.profile.services.facebook !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-facebook]').val(json_metadata.profile.services.facebook);
										}
										if(typeof json_metadata.profile.services.instagram !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-instagram]').val(json_metadata.profile.services.instagram);
										}
										if(typeof json_metadata.profile.services.twitter !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-twitter]').val(json_metadata.profile.services.twitter);
										}
										if(typeof json_metadata.profile.services.vk !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-vk]').val(json_metadata.profile.services.vk);
										}
										if(typeof json_metadata.profile.services.telegram !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-telegram]').val(json_metadata.profile.services.telegram);
										}
										if(typeof json_metadata.profile.services.skype !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-skype]').val(json_metadata.profile.services.skype);
										}
										if(typeof json_metadata.profile.services.viber !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-viber]').val(json_metadata.profile.services.viber);
										}
										if(typeof json_metadata.profile.services.whatsapp !== 'undefined'){
											$('.page-manage-profile input[name=manage-profile-whatsapp]').val(json_metadata.profile.services.whatsapp);
										}
									}
								}
							}
						}
					});
				}
				if('manage-access'==path[2]){
					$('.page-manage-access input[name=manage-access-login]').val(current_user);
					$('.page-manage-access input[name=manage-access-login]').unbind('keypress');
					$('.page-manage-access input[name=manage-access-login]').bind('keypress',function(e){
						if(!e)e=window.event;
						let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
						let char=String.fromCharCode(key);
						if(/^([A-Z])$/.test(char)){
							$(this).val(''+$(this).val()+char.toLowerCase());
							return false;
						}
						if(0==$(this).val().length){
							if(/^([a-z])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						else{
							if(/^([a-z0-9\-\.])$/.test(char)){
								return true;
							}
							else{
								return false;
							}
						}
						return true;
					});
				}

				return true;
			}
		}
		if(0<$('.view-'+path[1]+' .page-index').length){
			$('.view-'+path[1]+' .page-index').css('display','block');
			$('.nodes-config').css('display','none');
			$('.nodes-config-action').css('display','inline-block');
			//$('.portable-version').css('display','none');
			//$('.portable-version-action').css('display','inline-block');
		}
	}
}
function load_history(el,back,clear){
	back=typeof back==='undefined'?false:back;
	clear=typeof clear==='undefined'?false:clear;
	if('none'!=el.parent().find('.loading').css('display')){
		return;
	}
	if(clear){
		el.attr('data-lower-bound','');
		el.attr('data-upper-bound','');
		el.find('div').remove();
	}
	el.parent().find('.loading').css('display','inline-block');
	let operations=el.attr('data-operations');
	let operations_arr=operations.split(',');
	let lower_bound=el.attr('data-lower-bound');
	let upper_bound=el.attr('data-upper-bound');
	let offset=-1;
	let limit=100;
	if(''==lower_bound){
		offset=-1;
		lower_bound=-1;
	}
	else{
		lower_bound=parseInt(lower_bound);
	}
	if(''==upper_bound){
		offset=-1;
		upper_bound=0;
	}
	else{
		upper_bound=parseInt(upper_bound);
		offset=upper_bound+limit+1;
	}
	if(back){
		offset=lower_bound-1;
	}
	viz.api.getAccountHistory(current_user,offset,limit,function(err,response){
		if(!err){
			if(back){
				response.reverse();
			}
			for(i in response){
				let history_id=response[i][0]
				if(0==el.find('div[data-id='+history_id+']').length){
					let op_name=response[i][1].op[0];
					if(-1!=operations_arr.indexOf(op_name)){
						let op_date=response[i][1].timestamp;
						let op_date_str=show_date(op_date,true)+ltmp_arr.default_date_utc;
						op_date_str='<span class="adaptive-show">'+ltmp_arr.history_adaptive_data+'&nbsp;</span>'+op_date_str;
						let op=response[i][1].op[1];
						let data='';
						if('award'==op_name){
							let decode_memo=false;
							if(0==op.memo.indexOf('#')){
								decode_memo=true;
							}
							data=ltmp(ltmp_arr.history_award,{receiver:op.receiver,energy:op.energy/100});
							if(''!=op.memo){
								let memo=escape_html(op.memo);
								if(memo.length<=50){
									data+=ltmp_arr.history_award_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'">'+memo+'</span>';
								}
								else{
									data+=ltmp_arr.history_award_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'" data-text="'+memo+'">'+memo.substr(0,50)+'&hellip;</span>';
								}
							}
						}
						if('receive_award'==op_name){
							let decode_memo=false;
							if(0==op.memo.indexOf('#')){
								decode_memo=true;
							}
							data=ltmp(ltmp_arr.history_receive_award,{shares:show_price_in_tokens(op.shares,true),initiator:op.initiator});
							if(''!=op.memo){
								let memo=escape_html(op.memo);
								if(memo.length<=50){
									data+=ltmp_arr.history_award_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'">'+memo+'</span>';
								}
								else{
									data+=ltmp_arr.history_award_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'" data-text="'+memo+'">'+memo.substr(0,50)+'&hellip;</span>';
								}
							}
						}
						if('create_invite'==op_name){
							data=ltmp(ltmp_arr.history_create_invite,{tokens:show_price_in_tokens(op.balance,true),key:op.invite_key});
						}
						if('claim_invite_balance'==op_name){
							if(current_user==op.receiver){
								data=ltmp(ltmp_arr.history_claim_invite_balance,{key:op.invite_secret});
							}
						}
						if('use_invite_balance'==op_name){
							if(current_user==op.receiver){
								data=ltmp(ltmp_arr.history_use_invite_balance,{key:op.invite_secret});
							}
						}
						if('transfer'==op_name){
							let decode_memo=false;
							if(0==op.memo.indexOf('#')){
								decode_memo=true;
							}
							if(current_user==op.from){
								data=ltmp(ltmp_arr.history_transfer_from,{tokens:show_price_in_tokens(op.amount,true),to:op.to});
								if(''!=op.memo){
									let memo=escape_html(op.memo);
									if(memo.length<=50){
										data+=ltmp_arr.history_transfer_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'">'+memo+'</span>';
									}
									else{
										data+=ltmp_arr.history_transfer_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'" data-text="'+memo+'">'+memo.substr(0,50)+'&hellip;</span>';
									}
								}
							}
							else{
								data=ltmp(ltmp_arr.history_transfer_to,{tokens:show_price_in_tokens(op.amount,true),from:op.from});
								if(''!=op.memo){
									let memo=escape_html(op.memo);
									if(memo.length<=50){
										data+=ltmp_arr.history_transfer_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'">'+memo+'</span>';
									}
									else{
										data+=ltmp_arr.history_transfer_memo+'<span class="view-memo'+(decode_memo?' decode-memo-action':'')+'" data-text="'+memo+'">'+memo.substr(0,50)+'&hellip;</span>';
									}
								}
							}
						}
						if('transfer_to_vesting'==op_name){
							if(current_user==op.from){
								data=ltmp(ltmp_arr.history_transfer_to_vesting_from,{tokens:show_price_in_tokens(op.amount,true),to:op.to});
							}
							else{
								data=ltmp(ltmp_arr.history_transfer_to_vesting_to,{tokens:show_price_in_tokens(op.amount,true),from:op.from});
							}
						}
						if('withdraw_vesting'==op_name){
							if('0.000000 SHARES'==op.vesting_shares){
								data=ltmp_arr.history_withdraw_vesting_stop;
							}
							else{
								data=ltmp(ltmp_arr.history_withdraw_vesting,{shares:show_price_in_tokens(op.vesting_shares,true)});
							}
						}
						if('fill_vesting_withdraw'==op_name){
							if(op.from_account==op.to_account){
								data=ltmp(ltmp_arr.history_fill_vesting_withdraw,{tokens:show_price_in_tokens(op.deposited,true)});
							}
							else{
								if(current_user==op.from_account){
									data=ltmp(ltmp_arr.history_fill_vesting_withdraw_from,{to:op.to_account,tokens:show_price_in_tokens(op.deposited,true)});
								}
								else{
									data=ltmp(ltmp_arr.history_fill_vesting_withdraw_to,{from:op.from_account,tokens:show_price_in_tokens(op.deposited,true)});
								}
							}
						}

						data='<span class="adaptive-show">'+ltmp_arr.history_adaptive_item+'&nbsp;</span>'+data;
						if(back){
							el.append('<div class="columns-view" data-id="'+history_id+'" data-operation="'+op_name+'"><div class="column-view column-5">'+op_date_str+'</div><div class="column-view column-flex">'+data+'</div></div>');
						}
						else{
							el.prepend('<div class="columns-view" data-id="'+history_id+'" data-operation="'+op_name+'"><div class="column-view column-5">'+op_date_str+'</div><div class="column-view column-flex">'+data+'</div></div>');
						}
					}
				}
				if(history_id<lower_bound || -1==lower_bound){
					lower_bound=history_id;
				}
				if(history_id>upper_bound){
					upper_bound=history_id
				}
			}
			el.attr('data-lower-bound',lower_bound);
			el.attr('data-upper-bound',upper_bound);
			el.parent().find('.loading').css('display','none');
			if(0==el.find('div.columns-view').length){
				el.prepend('<div class="columns-view no-results"><div class="column-view column-flex">'+ltmp_arr.default_no_items+'</div></div>');
			}
			else{
				if(1==el.find('div.columns-view').length && 1==el.find('.no-results').length){
					//none to do, it's only no-results here
				}
				else{
					el.find('.no-results').remove();
				}
			}
		}
	});
}

function view_assets(path,params,title){
	if(''==current_user){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
		return false;
	}
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
		if(typeof path[2] != 'undefined'){
			if(0<$('.view-'+path[1]+' .page-'+path[2]).length){
				if('booster'==path[2]){
					//check exchange canary state
					if(typeof window['booster_init'] === 'function'){
						setTimeout(function(){booster_init();},1);
					}
				}
				if('exchange'==path[2]){
					//check exchange canary state
					if(typeof window['load_exchange_data'] === 'function'){
						setTimeout(function(){load_exchange_data();},1);
					}
				}
				$('.view-'+path[1]+' .page-'+path[2]).css('display','block');
				if('unstake-shares'==path[2]){
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="withdraw_intervals"]').html(response.withdraw_intervals);
						}
					});

					$('.page-unstake-shares .submit-button-ring[rel=unstake]').css('display','none');
					$('.page-unstake-shares .unstake-shares-error').html('');
					$('.page-unstake-shares .unstake-shares-success').html('');

					let balance_el=$('.view-'+path[1]+' .page-'+path[2]+' .shares-balance');
					balance_el.find('.vesting-shares').html('&hellip;');
					balance_el.find('.delegated-vesting-shares').html('&hellip;');
					balance_el.find('.received-vesting-shares').html('&hellip;');
					balance_el.find('.effective-vesting-shares').html('&hellip;');

					let withdraw_status=$('.page-unstake-shares .account-withdraw-status');
					withdraw_status.addClass('hidden');
					viz.api.getAccounts([current_user],function(err,response){
						if(err){
							withdraw_status.html('<p class="red">'+ltmp_arr.default_node_not_respond+'</p>');
							withdraw_status.removeClass('hidden');
						}
						else{
							if(current_user==response[0].name){

								update_shares_balance(balance_el,response[0]);

								let to_withdraw=parseFloat(response[0].to_withdraw/1000000);
								to_withdraw=Math.floor(to_withdraw*100)/100;
								let withdrawn=parseFloat(response[0].withdrawn/1000000);
								withdrawn=Math.floor(withdrawn*100)/100;
								let left_to_withdraw=parseFloat((response[0].to_withdraw - response[0].withdrawn)/1000000);
								left_to_withdraw=Math.floor(left_to_withdraw*100)/100;
								let vesting_withdraw_rate=parseFloat(response[0].vesting_withdraw_rate);
								vesting_withdraw_rate=Math.floor(vesting_withdraw_rate*100)/100;
								let next_vesting_withdrawal=response[0].next_vesting_withdrawal;
								let left_to_withdraw_duration=Math.ceil(left_to_withdraw/vesting_withdraw_rate);
								//let floor_balance=Math.floor(100*true_balance)/100;
								//let floor_shares=Math.floor(100*true_shares)/100;

								withdraw_status.find('span[rel=to_withdraw]').html(number_thousands(show_price_in_tokens(to_withdraw,true)));
								withdraw_status.find('span[rel=withdrawn]').html(number_thousands(show_price_in_tokens(withdrawn,true)));
								withdraw_status.find('span[rel=left_to_withdraw]').html(number_thousands(show_price_in_tokens(left_to_withdraw,true)));
								withdraw_status.find('span[rel=vesting_withdraw_rate]').html(number_thousands(show_price_in_tokens(vesting_withdraw_rate,true)));
								withdraw_status.find('span[rel=next_vesting_withdrawal]').html(next_vesting_withdrawal+ltmp_arr.default_date_utc);
								withdraw_status.find('span[rel=left_to_withdraw_duration]').html(left_to_withdraw_duration);
								//withdraw_status.find('span[rel=shares]').html((floor_shares).toFixed(2));
								if(left_to_withdraw>0.1){
									withdraw_status.removeClass('hidden');
								}
								$('.page-unstake-shares input[name=unstake-shares-tokens-amount]').val('0.00 viz');
								$('.page-unstake-shares input[name=unstake-shares-tokens-amount]').change();

								load_history($('.page-unstake-shares .history'),false,true);
							}
						}
					});
				}
				else{
					if(0<$('.view-'+path[1]+' .page-'+path[2]+' .account-balance').length){
						$('.account-balance').css('display','none');

						update_balances($('.view-'+path[1]+' .page-'+path[2]+' .account-balance'));
					}
				}
				if('award'==path[2]){
					clearTimeout(update_dgp_timer);
					update_dgp_timer=setTimeout(function(){
						update_dgp(true);
						$('.page-award input[name=award-account]').val('');
						$('.page-award input[name=award-memo]').val('');
						$('.page-award input[name=award-energy]').val(0);
						$('.page-award input[name=award-energy]').keyup();
						$('.page-award input[name=award-account]').focus();
					},100);
					load_history($('.page-award .history'),false,true);
				}
				if('checks'==path[2]){
					$('.page-checks .icon-check[rel=create]').css('display','none');
					$('.page-checks .submit-button-ring[rel=create]').css('display','none');
					$('.page-checks .invites-create-error').html('');
					$('.page-checks .invites-create-success').html('');
					$('.page-checks input[name=invites-create-amount]').val('');

					$('.page-checks .icon-check[rel=claim]').css('display','none');
					$('.page-checks .submit-button-ring[rel=claim]').css('display','none');
					$('.page-checks .invites-claim-error').html('');
					$('.page-checks .invites-claim-success').html('');
					$('.page-checks input[name=invites-claim-code]').val('');
					$('.page-checks .invites-claim-code-caption').css('display','none');

					clearTimeout(update_chain_properties_timer);
					update_chain_properties_timer=setTimeout("update_chain_properties()",100);

					load_history($('.page-checks .history'),false,true);
				}
				if('transfer'==path[2]){
					$('.page-transfer .submit-button-ring').css('display','none');
					$('.page-transfer .icon-check').css('display','none');
					$('.page-transfer .transfer-error').html('');
					$('.page-transfer .transfer-success').html('');
					$('.page-transfer select[name=transfer-template]').val(0);
					$('.page-transfer select[name=transfer-template]').change();
					$('.page-transfer input[name=transfer-account]').val('');
					$('.page-transfer input[name=transfer-tokens-amount]').val('');
					$('.page-transfer input[name=transfer-memo]').val('');

					load_history($('.page-transfer .history'),false,true);
				}
				if('deposit'==path[2]){
					$('.page-deposit .submit-button-ring').css('display','none');
					$('.page-deposit .icon-check').css('display','none');
					$('.page-deposit .deposit-error').html('');
					$('.page-deposit .deposit-success').html('');
					$('.page-deposit input[name=deposit-claim-code]').val('');
					$('.page-deposit .current_user').html(current_user);
					$('.page-deposit input[name=deposit-account]').val(current_user);
				}
				if('stake-shares'==path[2]){
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="withdraw_intervals"]').html(response.withdraw_intervals);
						}
					});

					$('.page-stake-shares .submit-button-ring[rel=stake]').css('display','none');
					$('.page-stake-shares .icon-check[rel=stake]').css('display','none');
					$('.page-stake-shares .stake-shares-error').html('');
					$('.page-stake-shares .stake-shares-success').html('');
					$('.page-stake-shares input[name=stake-shares-tokens-amount]').val('');
					if(standalone){
						$('.activate-viz-dollars').css('display','none');
					}
					else{
						$('.activate-viz-dollars').css('display','block');
						$('.page-stake-shares .submit-button-ring[rel=activate-viz-dollars]').css('display','none');
						$('.page-stake-shares .icon-check[rel=activate-viz-dollars]').css('display','none');
						$('.page-stake-shares .activate-viz-dollars-error').html('');
						$('.page-stake-shares .activate-viz-dollars-success').html('');
						$('.page-stake-shares input[name=activate-viz-dollars-code]').val('');
					}
					load_history($('.page-stake-shares .history'),false,true);
				}
				if('delegate-shares'==path[2]){
					$('.page-delegate-shares .submit-button-ring').css('display','none');
					$('.page-delegate-shares .icon-check').css('display','none');
					$('.page-delegate-shares .delegate-shares-error').html('');
					$('.page-delegate-shares .delegate-shares-success').html('');

					$('.page-delegate-shares input[name=delegate-shares-account]').val('');
					$('.page-delegate-shares input[name=delegate-shares-tokens-amount]').val('');

					$('.page-delegate-shares input[name=delegate-shares-account]').unbind('input');
					$('.page-delegate-shares input[name=delegate-shares-account]').bind('input',function(){
						clearTimeout(calc_max_delegation_timer);
						calc_max_delegation_timer=setTimeout(function(){calc_max_delegation();},1000);
					});
					$('.page-delegate-shares input[name=delegate-shares-account]').unbind('keypress');
					$('.page-delegate-shares input[name=delegate-shares-account]').bind('keypress',function(){
						clearTimeout(calc_max_delegation_timer);
						calc_max_delegation_timer=setTimeout(function(){calc_max_delegation();},1000);
					});

					let balance_el=$('.view-'+path[1]+' .page-'+path[2]+' .shares-balance');
					balance_el.find('.vesting-shares').html('&hellip;');
					balance_el.find('.delegated-vesting-shares').html('&hellip;');
					balance_el.find('.received-vesting-shares').html('&hellip;');
					balance_el.find('.effective-vesting-shares').html('&hellip;');
					$('.page-delegate-shares .delegate-shares-max-tokens-amount').html('&hellip;');
					$('.page-delegate-shares .delegate-shares-max-tokens-amount').attr('data-vesting-shares',0);

					viz.api.getAccounts([current_user],function(err,response){
						if(err){
							$('.page-delegate-shares .delegate-shares-error').html(ltmp_arr.default_node_error);
						}
						else{
							if(current_user==response[0].name){
								update_shares_balance(balance_el,response[0]);
								$('.page-delegate-shares .input-caption .effective-vesting-shares').attr('data-vesting-shares',parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')));
								$('.page-delegate-shares .input-caption .effective-vesting-shares').html(number_thousands(show_balance_in_tokens(parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')),true)));
								clearTimeout(calc_max_delegation_timer);
								calc_max_delegation_timer=setTimeout(function(){calc_max_delegation();},1000);
							}
						}
					});
					update_delegations_tables();
				}
				return true;
			}
		}
		if(0<$('.view-'+path[1]+' .page-index').length){
			$('.view-'+path[1]+' .page-index a.exchange-button').css('display','none');
			if(standalone){
				$('.view-'+path[1]+' .page-index .tokens-caption').addClass('standalone');
			}
			else{
				$('.view-'+path[1]+' .page-index a.exchange-button').css('display','block');
			}
			$('.view-'+path[1]+' .page-index').css('display','block');
			path[2]='index';
			viz.api.getAccounts([current_user],function(err,response){
				if(err){
					el.html('<p class="red">'+ltmp_arr.default_node_not_respond+'</p>');
				}
				else{
					if(current_user==response[0].name){
						let true_balance=parseFloat(response[0].balance);
						let true_shares=parseFloat(response[0].vesting_shares);
						let floor_balance=Math.floor(100*true_balance)/100;
						let floor_shares=Math.floor(100*true_shares)/100;

						let last_vote_time=Date.parse(response[0].last_vote_time);
						let delta_time=parseInt((new Date().getTime() - last_vote_time+(new Date().getTimezoneOffset()*60000))/1000);
						let energy=response[0].energy;
						let new_energy=parseInt(energy+(delta_time*10000/432000));//CHAIN_ENERGY_REGENERATION_SECONDS 5 days
						if(new_energy>10000){
							new_energy=10000;
						}

						$('.view-'+path[1]+' .page-'+path[2]).find('.shares-caption span.value').html(number_thousands((floor_shares).toFixed(2)));
						$('.view-'+path[1]+' .page-'+path[2]).find('.tokens-caption span.value').html(number_thousands((floor_balance).toFixed(2)));
						$('.view-'+path[1]+' .page-'+path[2]).find('.energy-percentage span.value').html((new_energy/100).toFixed(2));
						energy_radial.animate(new_energy/10000);
					}
				}
			});
		}
	}
}

function view_services(path,params,title){
	if(''==current_user){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
		return false;
	}
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
		if(typeof path[2] != 'undefined'){
			if(0<$('.view-'+path[1]+' .page-'+path[2]).length){
				$('.view-'+path[1]+' .page-'+path[2]).css('display','block');
				return true;
			}
		}
		if(0<$('.view-'+path[1]+' .page-index').length){
			$('.view-'+path[1]+' .page-index').css('display','block');
		}
	}
}
function witness_vote_action(e){
	let check=$(e.target);
	let el=$(e.target).closest('.witnesses-list');
	check.removeClass('red');
	viz.broadcast.accountWitnessVote(users[current_user]['active_key'],current_user,check.val(),check.prop('checked'),function(err, result){
		if(!err){
			update_witnesses_list();
		}
		else{
			check.addClass('red');
			check.prop('checked',!check.prop('checked'));
		}
	});
}
function update_witnesses_list(){
	$('.witnesses-list').find('div').remove();
	$('.witnesses-list').find('.loading').css('display','block');
	$('.inactive-witnesses-list').find('div').remove();
	viz.api.getAccounts([current_user],function(err,response){
		if(!err){
			if(current_user==response[0].name){
				let user_votes=response[0].witness_votes;
				let user_shares=parseFloat(response[0].vesting_shares);
				$('.witnesses-list').attr('data-shares',user_shares);
				viz.api.getWitnessesByVote('',100,function(err,response){
					if(!err){
						let data='';
						let inactive_data='';
						for(i in response){
							let item_arr=response[i];
							let item='';
							let active=true;
							if('VIZ1111111111111111111111111111111114T1Anm'==item_arr.signing_key){
								active=false;
							}
							let witness_account=item_arr.owner;
							item+='<div class="witness-item captions'+(active?'':' inactive')+'">';
							item+='<label class="check color-orange">'+witness_account+'<input type="checkbox" value="'+witness_account+'"'+(-1!=user_votes.indexOf(witness_account)?' checked="checked" title="'+ltmp(ltmp_arr.witness_unvote_caption,{witness:witness_account})+'"':' title="'+ltmp(ltmp_arr.witness_vote_caption,{witness:witness_account})+'"')+'><span class="mark"></span></label>';
							item+=' <span class="witness-props-action inline-button grey small">'+ltmp_arr.witness_props_caption+'</span>';
							if(-1==item_arr.url.indexOf('https://')){
								if(-1==item_arr.url.indexOf('http://')){
									item_arr.url='https://'+item_arr.url;
								}
								else{
									item_arr.url='http://'+item_arr.url;
								}
							}
							item+=' <a href="'+item_arr.url+'" target="_blank" class="inline-button color-orange small">'+ltmp_arr.witness_url_caption+'</a>';

							item+=' <span class="inline-button grey small" title="'+ltmp_arr.witness_votes_weight_caption+'">'+number_thousands(Math.round(parseInt(item_arr.votes/1000000)/100)/10)+'k</span>';
							if(-1!=user_votes.indexOf(witness_account)){
								item+=' <span class="inline-button color-green small vote-shares-value" title="'+ltmp_arr.witness_user_vote_weight_caption+'">+'+number_thousands(Math.round(parseInt(user_shares / user_votes.length)/100)/10)+'k</span>';
							}
							item+='<div class="witness-props">';
							let new_hardfork=(parseInt(fast_str_replace('.','',item_arr.running_version)) < parseInt(fast_str_replace('.','',item_arr.hardfork_version_vote)));
							item+=' <p>'+ltmp_arr.witness_node_version_caption+item_arr.running_version+'</p>';
							if(new_hardfork){
								item+=' <p>'+ltmp_arr.witness_hardfork_vote_caption+item_arr.hardfork_version_vote+ltmp(ltmp.witness_hardfork_vote_starting_caption,{date:show_date(item_arr.hardfork_time_vote,true)})+ltmp_arr.default_date_utc+'</p>';
							}
							item+='<p>'+ltmp_arr.witness_penalty_caption+'<strong>'+(parseInt(item_arr.penalty_percent)/100)+'%</strong></p>';
							let props_item=item_arr.props;
							for(let j_num in ltmp_arr.witness_props_order){
								let j=ltmp_arr.witness_props_order[j_num];
								if(typeof witness_props_captions[j] != 'undefined'){
									item+='<p>'+witness_props_captions[j]+': <strong data-prop="'+j+'" data-value="'+props_item[j]+'">'+(-1!==witness_props_percent.indexOf(j)?(parseFloat(props_item[j])/100)+'%':props_item[j])+'</strong></p>';
								}
							}
							/*
							//old order by props object sort
							delete(props_item['flag_energy_additional_cost']);
							delete(props_item['min_curation_percent']);
							delete(props_item['max_curation_percent']);
							for(j in props_item){
								item+='<p>'+witness_props_captions[j]+': <strong data-prop="'+j+'" data-value="'+props_item[j]+'">'+(-1!==witness_props_percent.indexOf(j)?(parseFloat(props_item[j])/100)+'%':props_item[j])+'</strong></p>';
							}
							*/
							item+='</div>';
							item+='</div>';
							if(active){
								data+=item;
							}
							else{
								inactive_data+=item;
							}
						}
						$('.witnesses-list').append(data);
						inactive_data='<div><a class="show-inactive-witnesses-action captions">'+ltmp_arr.witness_show_inactive_link+'</a></div><div class="inactive-witnesses hidden">'+inactive_data+'</div>';
						$('.inactive-witnesses-list').append(inactive_data);
						$('.page-witnesses .check input').unbind('change');
						$('.page-witnesses .check input').bind('change',witness_vote_action);
					}
					else{
						$('.witnesses-list').append('<div><p>'+ltmp_arr.default_node_error+'</p></div>');
					}
					$('.witnesses-list').find('.loading').css('display','none');
				});
			}
			else{
				$('.witnesses-list').append('<div><p>'+ltmp_arr.default_node_error+'</p></div>');
			}
		}
		else{
			$('.witnesses-list').append('<div><p>'+ltmp_arr.default_node_error+'</p></div>');
		}
	});
}
function update_witness_props(props){
	props=typeof props==='undefined'?false:props;
	let el=$('.page-witness-params .witness-set-props');
	if(false===props){
		viz.api.getWitnessByAccount(current_user,function(err,response){
			if(!err){
				if(null!==response){
					update_witness_props(response.props);
				}
			}
			else{
				el.html('<p class="red">'+ltmp_arr.default_node_error+'</p>');
				console.log(err);
			}
		});
	}
	else{
		let data='';
		for(j_num in ltmp_arr.witness_props_order){
			let j=ltmp_arr.witness_props_order[j_num];
		//for(j in props){//old order by props object sort
			if(typeof witness_props_captions[j] == 'undefined'){
				data+='<input type="hidden" name="witness-set-props-'+j+'" value="'+escape_html(''+props[j])+'">';
			}
			else{
				data+='<p><label class="input-descr"><span class="input-caption">'+witness_props_captions[j]+':</span>';
				data+='<input type="text" name="witness-set-props-'+j+'" class="simple-rounded" placeholder="'+(-1!==witness_props_percent.indexOf(j)?'0.00%':'')+'" ';
				data+='value="'+(-1!==witness_props_percent.indexOf(j)?((parseInt(props[j])/100)+'%'):escape_html(''+props[j]))+'">';
				data+='</label></p>';
			}
		}
		data+='<p class="red witness-set-props-error"></p>\
		<p class="green witness-set-props-success"></p>\
		<p>\
			<input class="witness-set-props-action orange-button captions" type="button" value="'+ltmp_arr.witness_set_props_button+'">\
			<span class="submit-button-ring" rel="set-props"></span>\
			<span class="icon icon-margin hidden icon-color-orange icon-check" rel="set-props"></span>\
		</p>';
		el.html(data);
	}
}
function update_fund_request(id,votes,votes_update){
	votes=typeof votes==='undefined'?false:votes;
	votes_update=typeof votes_update==='undefined'?false:votes_update;

	let in_range=false;
	for(let range_i in dao_request_ranges){
		if((id - dao_request_ranges[range_i][0])*(id - dao_request_ranges[range_i][1])<=0){
			in_range=true;
		}
	}
	if(in_range){
		viz.api.getCommitteeRequest(id,(!votes?0:-1),function(err,response){
			if(0<$('.fund-request[data-id='+response.request_id+']').length){
				$('.fund-request[data-id='+response.request_id+']').removeClass('hidden');
				if(!err){
					let data='';
					if(response.request_id)
					data+='<a data-href="/dao/fund-requests/'+response.request_id+'/">#'+response.request_id+' от '+response.creator+'</a>';
					let descr='';
					let url='';
					if(-1!=response.url.indexOf('https://')){
						descr=response.url.substring(0,response.url.indexOf('https://'));
						url=response.url.substring(response.url.indexOf('https://'));
					}
					else{
						if(-1!=response.url.indexOf('http://')){
							descr=response.url.substring(0,response.url.indexOf('http://'));
							url=response.url.substring(response.url.indexOf('http://'));
						}
						else{
							descr=response.url;
						}
					}
					if(''!=descr){
						descr=escape_html(descr);
						data+=' <span class="adaptive-show-block"></span><span class="view-memo">'+descr+'</span>';
					}
					data+='<span class="adaptive-show-block"></span><span class="inline-button date grey small">'+((0==response.status)?ltmp_arr.default_until+show_date(response.end_time,true):show_date(response.conclusion_time,true))+ltmp_arr.default_date_utc+'</span>\n';
					if(0==response.status){
						data+='<span class="inline-button grey small">'+number_thousands(show_balance_in_tokens(response.required_amount_min))+'&ndash;'+number_thousands(show_balance_in_tokens(response.required_amount_max,true))+'</span>';
					}
					if(3==response.status){
						data+='<span class="inline-button red small">'+number_thousands(show_balance_in_tokens(response.conclusion_payout_amount,true))+'</span>';
					}
					if(4==response.status){
						data+='<span class="inline-button color-orange small">'+number_thousands(show_balance_in_tokens(response.payout_amount,true))+ltmp_arr.default_out_of+number_thousands(show_balance_in_tokens(response.conclusion_payout_amount,true))+'</span>';
					}
					if(5==response.status){
						data+='<span class="inline-button color-green small">'+number_thousands(show_balance_in_tokens(response.payout_amount,true))+'</span>';
					}
					$('.fund-request[data-id='+response.request_id+']').html(data);
				}
				else{
					$('.fund-request[data-id='+response.request_id+']').html('<p><a data-href="/dao/fund-requests/'+response.request_id+'/">#'+response.request_id+' <span class="red">'+ltmp_arr.default_node_error+'</span></a></p>');
				}
			}
			if(0<$('.section-fund-request[data-id='+response.request_id+']').length){
				if(votes_update){
					let data='';
					data+='<h3>'+ltmp_arr.fund_request_votes_caption+'</h3>';
					if(0==response.votes.length){
						data+='<p>'+ltmp_arr.default_no_items+'</p>';
					}
					else{
						let voters_arr=[];
						let voters_percent_arr=[];
						for(i in response.votes){
							let vote=response.votes[i];
							data+='<div class="fund-request-vote captions" data-voter="'+vote.voter+'">';
							data+='<span class="view-date">'+show_date(vote.last_update,true)+ltmp_arr.default_date_utc+'</span>';
							voters_arr.push(vote.voter);
							voters_percent_arr[vote.voter]=parseInt(vote.vote_percent);
							let vote_percent=(parseInt(vote.vote_percent)/100);
							vote_percent=fast_str_replace('-','&minus;',''+vote_percent)+'%';
							data+=' <span class="view-percent">'+vote_percent+'</span>'+ltmp_arr.fund_request_vote_list_from+'<a class="view-account'+(current_user==vote.voter?' bold':'')+'" href="https://info.viz.plus/accounts/'+vote.voter+'/" target="_blank">'+vote.voter+'</a>';
							data+='<span class="shares"></span>';
							data+='</div>';
						}
						data+='<p class="fund-request-votes-summary">'+ltmp_arr.fund_request_votes_count+'<span class="fund-request-votes-count">'+response.votes.length+'</span></p>';

						if((0==response.status)/*||(3==response.status)||(2==response.status)*/){
							viz.api.getAccounts(voters_arr,function(err,response){
								if(!err){
									let summary='';
									summary+=ltmp_arr.fund_request_votes_count+'<span class="fund-request-votes-count">'+response.length+'</span>';
									let summary_effective_shares=0;
									let rshares=0;
									for(j in response){
										let voter=response[j];
										let effective_shares=parseFloat(voter.vesting_shares)-parseFloat(voter.delegated_vesting_shares)+parseFloat(voter.received_vesting_shares);
										$('.fund-request-vote[data-voter="'+voter.name+'"] .shares').html(ltmp_arr.fund_request_vote_list_shares_amount+'<span class="view-tokens">'+show_balance_in_tokens(effective_shares,true)+'</span>');
										summary_effective_shares+=effective_shares;
										rshares+=effective_shares*voters_percent_arr[voter.name]/10000;
									}
									summary+='<br>'+ltmp_arr.fund_request_votes_shares_amount+'~'+(summary_effective_shares/parseFloat(dgp.total_vesting_shares)*100).toFixed(2)+'% ('+ltmp_arr.fund_request_votes_shares_required+' >=<span class="chain-properties" rel="committee_request_approve_min_percent">&hellip;</span>%)';
									summary+='<br>'+ltmp_arr.fund_request_calculated_amount+'~'+number_thousands(show_balance_in_tokens(parseFloat(required_amount_max)*rshares/summary_effective_shares,true))+'';
									$('.fund-request-votes-summary').html(summary);
									clearTimeout(update_chain_properties_timer);
									update_chain_properties_timer=setTimeout("update_chain_properties()",100);
								}
								else{
									console.log(err);
								}
							});
						}
					}
					$('.section-fund-request[data-id='+response.request_id+'] .fund-request-votes').html(data);
				}
				else{
					let data='';
					data+='<h3>'+ltmp(ltmp_arr.fund_request_title_caption,{id})+'</h3>';
					if(!err){
						data+='<p>'+ltmp_arr.fund_request_start_time_caption+'<span class="request-start-date">'+show_date(response.start_time,true)+ltmp_arr.default_date_utc+'</span>'+(response.creator==current_user?' <span class="cancel-fund-request-action inline-button red captions">'+ltmp_arr.fund_request_cancel_caption+'</span>':'')+'</p>';
						let descr='';
						let url='';
						if(-1!=response.url.indexOf('https://')){
							descr=response.url.substring(0,response.url.indexOf('https://'));
							url=response.url.substring(response.url.indexOf('https://'));
						}
						else{
							if(-1!=response.url.indexOf('http://')){
								descr=response.url.substring(0,response.url.indexOf('http://'));
								url=response.url.substring(response.url.indexOf('http://'));
							}
							else{
								descr=response.url;
							}
						}
						if(''!=descr){
							data+='<p>'+ltmp_arr.fund_request_descr_caption+'<span class="request-descr">'+escape_html(descr)+'</span></p>';
						}
						if(''!=url){
							data+='<p>'+ltmp_arr.fund_request_url_caption+'<span class="request-url"><a href="'+escape_html(url)+'" target="_blank">'+escape_html(url)+'</a></span></p>';
						}
						data+='<p>'+ltmp_arr.fund_request_creator_caption+'<a class="view-account request-creator" href="https://info.viz.plus/accounts/'+response.creator+'/" target="_blank">'+response.creator+'</a></p>';
						if(response.worker!=response.creator){
							data+='<p>'+ltmp_arr.fund_request_worker_caption+'<a class="view-account request-worker" href="https://info.viz.plus/accounts/'+response.worker+'/" target="_blank">'+response.worker+'</a></p>';
						}
						data+='<p>'+ltmp_arr.fund_request_min_amount_caption+'<span class="request-required-amount-min">'+number_thousands(show_balance_in_tokens(response.required_amount_min,true))+'</span></p>';
						let required_amount_max=response.required_amount_max;
						data+='<p>'+ltmp_arr.fund_request_max_amount_caption+'<span class="request-required-amount-max">'+number_thousands(show_balance_in_tokens(response.required_amount_max,true))+'</span></p>';
						if(response.status>0){
							data+='<p>'+ltmp_arr.fund_request_conclusion_time_caption+'<span class="request-conclusion-date">'+show_date(response.conclusion_time,true)+ltmp_arr.default_date_utc+'</span></p>';
						}
						if(response.status>2){
							data+='<p>'+ltmp_arr.fund_request_conclusion_payout_amount_caption+'<span class="request-conclusion-payout-amount">'+number_thousands(show_balance_in_tokens(response.conclusion_payout_amount,true))+'</span></p>';
						}
						data+='<p>'+ltmp_arr.fund_request_status_caption+'<span class="request-status bold" rel="'+response.status+'">'+request_status_arr[response.status]+'</span></p>';
						if(0==response.status){
							data+='<p>'+ltmp_arr.fund_request_end_time_caption+'<span class="request-end-date">'+show_date(response.end_time,true)+ltmp_arr.default_date_utc+'</span></p>';
						}
						if(response.status>3){
							data+='<p>'+ltmp_arr.fund_request_payout_amount_caption+'<span class="request-payout-amount">'+number_thousands(show_balance_in_tokens(response.payout_amount,true))+'</span></p>';
						}
						if(4==response.status){
							data+='<p>'+ltmp_arr.fund_request_remain_payout_amount_caption+'<span class="request-remain-payout-amount">'+number_thousands(show_balance_in_tokens(response.remain_payout_amount,true))+'</span></p>';
							data+='<p>'+ltmp_arr.fund_request_last_payout_time_caption+'<span class="request-last-payout-time">'+show_date(response.last_payout_time,true)+ltmp_arr.default_date_utc+'</span></p>';
						}
						let current_user_percent=0;
						if(votes){
							for(i in response.votes){
								if(current_user==response.votes[i].voter){
									current_user_percent=response.votes[i].vote_percent;
								}
							}
						}
						if(0==response.status){
							data+=`
								<p>
									<label class="input-descr">
										<span class="input-caption">`+ltmp_arr.fund_request_vote_weight_caption+`</span>
										<input type="text" name="fund-vote-request-percent" class="simple-rounded" placeholder="0%" data-result-element="input[name=fund-vote-request-percent-range]" value="`+(0!=current_user_percent?parseFloat(current_user_percent/100).toFixed(2)+'%':'')+`">
										<span class="range-slider">
											<input class="range-slider-input range-slider-color-green simple-rounded-size" name="fund-vote-request-percent-range" data-result-element="input[name=fund-vote-request-percent]" type="range" value="`+(current_user_percent)+`" min="-10000" max="10000" step="1">
										</span>
									</label>
								</p>
								<p class="red fund-vote-request-error"></p>
								<p class="green fund-vote-request-success"></p>
								<p>
									<input class="fund-vote-request-action orange-button captions" type="button" value="`+ltmp_arr.fund_request_vote_button+`">
									<span class="submit-button-ring"></span>
									<span class="icon icon-margin hidden icon-color-orange icon-check"></span>
								</p>`;
						}
						if(votes){
							data+='<div class="fund-request-votes">';
							data+='<h3>'+ltmp_arr.fund_request_votes_caption+'</h3>';
							if(0==response.votes.length){
								data+='<p>'+ltmp_arr.default_no_items+'</p>';
							}
							else{
								let voters_arr=[];
								let voters_percent_arr=[];
								for(i in response.votes){
									let vote=response.votes[i];
									data+='<div class="fund-request-vote captions" data-voter="'+vote.voter+'">';
									data+='<span class="view-date">'+show_date(vote.last_update,true)+ltmp_arr.default_date_utc+'</span>';
									voters_arr.push(vote.voter);
									voters_percent_arr[vote.voter]=parseInt(vote.vote_percent);
									let vote_percent=(parseInt(vote.vote_percent)/100);
									vote_percent=fast_str_replace('-','&minus;',''+vote_percent)+'%';
									data+=' <span class="view-percent">'+vote_percent+'</span>'+ltmp_arr.fund_request_vote_list_from+'<a class="view-account'+(current_user==vote.voter?' bold':'')+'" href="https://info.viz.plus/accounts/'+vote.voter+'/" target="_blank">'+vote.voter+'</a>';
									data+='<span class="shares"></span>';
									data+='</div>';
								}
								data+='<p class="fund-request-votes-summary">'+ltmp_arr.fund_request_votes_count+'<span class="fund-request-votes-count">'+response.votes.length+'</span></p>';
								if((0==response.status)/*||(3==response.status)||(2==response.status)*/){
									viz.api.getAccounts(voters_arr,function(err,response){
										if(!err){
											let summary='';
											summary+=ltmp_arr.fund_request_votes_count+'<span class="fund-request-votes-count">'+response.length+'</span>';
											let summary_effective_shares=0;
											let rshares=0;
											for(j in response){
												let voter=response[j];
												let effective_shares=parseFloat(voter.vesting_shares)-parseFloat(voter.delegated_vesting_shares)+parseFloat(voter.received_vesting_shares);
												$('.fund-request-vote[data-voter="'+voter.name+'"] .shares').html(ltmp_arr.fund_request_vote_list_shares_amount+'<span class="view-tokens">'+show_balance_in_tokens(effective_shares,true)+'</span>');
												summary_effective_shares+=effective_shares;
												rshares+=effective_shares*voters_percent_arr[voter.name]/10000;
											}
											summary+='<br>'+ltmp_arr.fund_request_votes_shares_amount+'~'+(summary_effective_shares/parseFloat(dgp.total_vesting_shares)*100).toFixed(2)+'% ('+ltmp_arr.fund_request_votes_shares_required+' >=<span class="chain-properties" rel="committee_request_approve_min_percent">&hellip;</span>%)';
											summary+='<br>'+ltmp_arr.fund_request_calculated_amount+'~'+number_thousands(show_balance_in_tokens(parseFloat(required_amount_max)*rshares/summary_effective_shares,true))+'';
											$('.fund-request-votes-summary').html(summary);
											clearTimeout(update_chain_properties_timer);
											update_chain_properties_timer=setTimeout("update_chain_properties()",100);
										}
										else{
											console.log(err);
										}
									});
								}
							}
							data+='</div>';
						}
					}
					else{
						data+='<p class="red">'+ltmp_arr.default_node_error+'</p>';
					}
					data+='<hr><a data-href="/dao/fund-requests/">'+ltmp_arr.default_return_link+'</a>';
					$('.section-fund-request[data-id='+response.request_id+']').html(data);
					//binds
					if(0<$('input[name=fund-vote-request-percent]').length){
						$('input[name=fund-vote-request-percent]').unbind('keyup');
						$('input[name=fund-vote-request-percent]').bind('keyup',function(){
							$($(this).attr('data-result-element')).val(parseInt(this.value*100));
						});
					}
					if(0<$('input[name=fund-vote-request-percent-range]').length){
						$('input[name=fund-vote-request-percent-range]').unbind('input');
						$('input[name=fund-vote-request-percent-range]').bind('input',function(){
							$($(this).attr('data-result-element')).val(parseFloat(this.value/100).toFixed(2)+'%');
						});
					}
				}
			}
		});
	}
}
function update_fund_requests(status){
	status=typeof status==='undefined'?false:status;
	if(false===status){
		update_fund_requests(0);
		update_fund_requests(1);
		update_fund_requests(2);
		update_fund_requests(3);
		update_fund_requests(4);
		update_fund_requests(5);
	}
	else{
		$('.fund-requests[data-status='+status+'] div').remove();
		$('.fund-requests[data-status='+status+']').append('<div class="loading captions"><span class="submit-button-ring" style="display:inline-block;"></span>'+ltmp_arr.default_loading+'</div>');
		viz.api.getCommitteeRequestsList(status,function(err,response){
			if(!err){
				$('.fund-requests[data-status='+status+'] .loading').remove();
				let counter=0;
				let per_status=10;
				for(i in response){
					let req_id=i;
					//check request id in range (remove spam from list)
					let in_range=false;
					for(let range_i in dao_request_ranges){
						if((response[req_id] - dao_request_ranges[range_i][0])*(response[req_id] - dao_request_ranges[range_i][1])<=0){
							in_range=true;
						}
					}
					if(in_range){
						counter++;
					}
					if(counter<=per_status){
						if(in_range){
							$('.fund-requests[data-status='+status+']').append('<div class="fund-request captions" data-id="'+response[req_id]+'"><a data-href="/dao/fund-requests/'+response[req_id]+'/">#'+response[req_id]+'</a></div>');
							update_fund_request(response[req_id]);
						}
					}
					else{
						if(in_range){
							$('.fund-requests[data-status='+status+']').append('<div class="fund-request hidden captions" data-id="'+response[req_id]+'">#'+response[req_id]+'</div>');
						}
					}

				}
				if(counter>=per_status){
					$('.fund-requests[data-status='+status+']').append('<div class="load-more"><a class="inline-button color-orange no-margin fund-show-more-requests captions">'+ltmp_arr.fund_show_other_requests+'</a></div>');
				}
				if(0==response.length){
					$('.fund-requests[data-status='+status+']').append('<div class="no-results"><p class="captions">'+ltmp_arr.fund_none_requests+'</p></div>');
				}
			}
			else{
				$('.fund-requests[data-status='+status+'] .loading').remove();
				$('.fund-requests[data-status='+status+']').append('<div class="error"><p class="red captions">'+ltmp_arr.default_node_error+'</p></div>');
			}
		});
	}
}
function view_dao(path,params,title){
	if(''==current_user){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path+encodeURIComponent(standalone_search),{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname+encodeURIComponent(document.location.search),{},true);
		}
		return false;
	}
	$('.view').css('display','none');
	if(0<$('.view-'+path[1]).length){
		$('.view-'+path[1]).css('display','block');
		$('.view-'+path[1]+' .page').css('display','none');
		if(typeof path[2] != 'undefined'){
			if(0<$('.view-'+path[1]+' .page-'+path[2]).length){
				$('.view-'+path[1]+' .page-'+path[2]).css('display','block');
				if('fund-create-request'==path[2]){
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="committee_create_request_fee"]').html(show_price_in_tokens(response.create_paid_subscription_fee,true));
						}
					});
				}
				if('fund-requests'==path[2]){
					$('.view-'+path[1]+' .page-'+path[2]+' .section').css('display','none');
					if(''!=path[3]){
						let req_id=parseInt(path[3]);
						$('.page-fund-requests .section-fund-request').attr('data-id',req_id);
						update_fund_request(req_id,true);
						$('.page-fund-requests .section-fund-request').css('display','block');
					}
					else{
						$('.page-fund-requests .fund-show-others-requests').css('display','inline-block');
						$('.page-fund-requests .fund-others').css('display','none');
						clearTimeout(update_dgp_timer);
						update_dgp_timer=setTimeout(function(){
							update_dgp();
						},100);
						update_fund_requests(0);
						$('.page-fund-requests .section-fund-requests').css('display','block');
					}
				}
				if('witnesses'==path[2]){
					update_balances($('.page-witnesses .account-balance'));
					update_witnesses_list();
				}
				if('witness-params'==path[2]){
					$('.page-witness-params .witness-setup-error').html('');
					$('.page-witness-params .witness-setup-success').html('');
					$('.page-witness-params input[name=witness-setup-url]').val('');
					$('.page-witness-params input[name=witness-setup-signing-key]').val('');
					$('.page-witness-params .witness-setup-action').removeAttr('disabled');
					$('.page-witness-params .icon-check[rel=setup]').css('display','none');
					$('.page-witness-params .submit-button-ring[rel=setup]').css('display','none');
					$('.page-witness-params .witness-set-props').html('');

					$('.page-witness-params .fee-checkbox').css('display','none');
					viz.api.getChainProperties(function(err,response){
						if(!err){
							$('.median-props[rel="witness_declaration_fee"]').html(show_price_in_tokens(response.witness_declaration_fee,true));
						}
					});

					viz.api.getWitnessByAccount(current_user,function(err,response){
						if(!err){
							if(null==response){
								$('.page-witness-params .witness-setup-error').html(ltmp_arr.account_not_witness);
								$('.page-witness-params .fee-checkbox').css('display','block');
							}
							else{
								if(typeof response.owner != 'undefined' && current_user==response.owner){
									$('.page-witness-params input[name=witness-setup-url]').val(response.url);
									$('.page-witness-params input[name=witness-setup-signing-key]').val(response.signing_key);
								}
								else{
									$('.page-witness-params .witness-setup-error').html(ltmp_arr.account_not_witness);
								}
								update_witness_props(response.props);
							}
						}
						else{
							$('.page-witness-params .witness-setup-error').html(ltmp_arr.default_node_error);
						}
					});
				}
				return true;
			}
		}
		if(0<$('.view-'+path[1]+' .page-index').length){
			$('.view-'+path[1]+' .page-index').css('display','block');
		}
	}
}

function change_state(location,state,save_state){
	save_state=typeof save_state==='undefined'?false:save_state;
	clearTimeout(update_dgp_timer);
	$('.view').css('display','none');
	$('body,html').animate({scrollTop:0},0);
	var params=[];
	var path=[];
	var title='my VIZ+';

	if(typeof state.path == 'undefined'){
		if(-1!=location.indexOf('?')){
			let params_str=location.substr(1+location.indexOf('?'));
			let params_arr=params_str.split('&');
			for(i in params_arr){
				if(-1!=location.indexOf('=')){
					let param_arr=params_arr[i].split('=');
					params[decodeURIComponent(param_arr[0])]=decodeURIComponent(param_arr[1]);
				}
				else{
					params[decodeURIComponent(params_arr[i])]=true;
				}
			}
			path=location.substr(0,location.indexOf('?')).split('/');
		}
		else{
			path=location.split('/');
		}
	}
	else{
		path=state.path;
		if(typeof state.path != 'undefined'){
			params=state.params;
		}
	}

	if(typeof state.title == 'undefined'){
		if(''==path[1]){
			path[1]='index';
			title=ltmp_arr.default_index+' - '+title;
		}
		else{
			if(0<$('.menu-el[data-href="/'+path[1]+'/"]').length){
				title=$('.menu-el[data-href="/'+path[1]+'/"]').html()+' - '+title;
			}
			if((0<$('.view-'+path[1]+'').length) && (typeof $('.view-'+path[1]+'').attr('data-title') !== 'undefined')){
				title=$('.view-'+path[1]+'').attr('data-title')+' - '+title;
			}
			if((0<$('.view-'+path[1]+' .page-'+path[2]+'').length) && (typeof $('.view-'+path[1]+' .page-'+path[2]+'').attr('data-title') !== 'undefined')){
				title=$('.view-'+path[1]+' .page-'+path[2]+'').attr('data-title')+' - '+title;
			}
		}
	}
	else{
		title=state.title;
	}

	//select menu-el from header
	$('.menu-el').removeClass('selected');
	$('.header .logo .prefix').removeClass('selected');
	if('index'==path[1]){
		$('.header .logo .prefix').addClass('selected');
	}
	else{
		if(0<$('.menu-el[data-href="/'+path[1]+'/"]').length){
			$('.menu-el[data-href="/'+path[1]+'/"]').addClass('selected');
		}
	}

	if(save_state){
		if(standalone){
			history.pushState({path,params,title},'','#'+location);
		}
		else{
			history.pushState({path,params,title},'',location);
		}
	}
	document.title=title;
	//exec function from path
	if(typeof window['view_'+path[1]] === 'function'){
		//stop exchange data updates
		if(typeof window['stop_booster_updates'] === 'function'){
			setTimeout(window['stop_booster_updates'],1);
		}
		//stop exchange data updates
		if(typeof window['stop_load_exchange_data'] === 'function'){
			setTimeout(window['stop_load_exchange_data'],1);
		}
		current_view=path[1];
		setTimeout(window['view_'+path[1]],1,path,params,title);
		setTimeout(function(){
			$('.absolute-view.menu-list').css('display','none');
			/*
			if('none'==$('.menu-list').css('float')){
				$('.menu-list').css('display','none');
			}
			*/
			$('.users-drop-down').css('display','none');
		},2);
	}
}
function claim_invite(code,el){
	let page=$(el).closest('.page');
	page.find('.invites-claim-action').attr('disabled','disabled');
	page.find('.invites-use-action').attr('disabled','disabled');
	page.find('.icon-check[rel=claim]').css('display','none');
	page.find('.submit-button-ring[rel=claim]').css('display','inline-block');

	page.find('.invites-claim-error').html('');
	page.find('.invites-claim-success').html('');
	if(viz.auth.isWif(code)){
		viz.broadcast.claimInviteBalance(users[current_user].active_key,current_user,current_user,code,function(err,result){
			if(!err){
				page.find('.invites-claim-success').html(ltmp(ltmp_arr.invites_claim_success,{account:current_user}));

				page.find('.invites-claim-action').removeAttr('disabled');
				page.find('.invites-use-action').removeAttr('disabled');
				page.find('.submit-button-ring[rel=claim]').css('display','none');
				page.find('.icon-check[rel=claim]').css('display','inline-block');

				page.find('input[name=invites-claim-code]').val('');
				page.find('.invites-claim-code-caption').css('display','none');
				//update balances info
				update_balances($('.page-checks .account-balance'));

				setTimeout(load_history,3000,page.find('.history'));
			}
			else{
				page.find('.invites-claim-error').html(ltmp_arr.default_operation_error);

				page.find('.invites-claim-action').removeAttr('disabled');
				page.find('.invites-use-action').removeAttr('disabled');
				page.find('.submit-button-ring[rel=claim]').css('display','none');

				console.log(err);
			}
		});
	}
	else{
		if(viz.auth.isPubkey(code)){
			page.find('.invites-claim-error').html(ltmp_arr.invites_claim_code_not_private);
		}
		else{
			page.find('.invites-claim-error').html(ltmp_arr.invites_claim_code_incorrect);
		}
		page.find('.invites-claim-action').removeAttr('disabled');
		page.find('.invites-use-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel=claim]').css('display','none');
	}
}
function use_invite(code,el){
	let page=$(el).closest('.page');
	page.find('.invites-claim-action').attr('disabled','disabled');
	page.find('.invites-use-action').attr('disabled','disabled');
	page.find('.icon-check[rel=claim]').css('display','none');
	page.find('.submit-button-ring[rel=claim]').css('display','inline-block');

	page.find('.invites-claim-error').html('');
	page.find('.invites-claim-success').html('');
	if(viz.auth.isWif(code)){
		viz.broadcast.useInviteBalance(users[current_user].active_key,current_user,current_user,code,function(err,result){
			if(!err){
				page.find('.invites-claim-success').html(ltmp(ltmp_arr.invites_claim_success,{account:current_user}));

				page.find('.invites-claim-action').removeAttr('disabled');
				page.find('.invites-use-action').removeAttr('disabled');
				page.find('.submit-button-ring[rel=claim]').css('display','none');
				page.find('.icon-check[rel=claim]').css('display','inline-block');

				page.find('input[name=invites-claim-code]').val('');
				page.find('.invites-claim-code-caption').css('display','none');
				//update balances info
				update_balances($('.page-checks .account-balance'));

				setTimeout(load_history,3000,page.find('.history'));
			}
			else{
				page.find('.invites-claim-error').html(ltmp_arr.default_operation_error);

				page.find('.invites-claim-action').removeAttr('disabled');
				page.find('.invites-use-action').removeAttr('disabled');
				page.find('.submit-button-ring[rel=claim]').css('display','none');

				console.log(err);
			}
		});
	}
	else{
		if(viz.auth.isPubkey(code)){
			page.find('.invites-claim-error').html(ltmp_arr.invites_claim_code_not_private);
		}
		else{
			page.find('.invites-claim-error').html(ltmp_arr.invites_claim_code_incorrect);
		}
		page.find('.invites-claim-action').removeAttr('disabled');
		page.find('.invites-use-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel=claim]').css('display','none');
	}
}
function cancel_fund_request(req_id,el){
	let page=$(el).closest('.page');
	var ask=confirm(ltmp_arr.fund_cancel_request_confirmation);
	if(true==ask){
		viz.broadcast.committeeWorkerCancelRequest(users[current_user].active_key,current_user,parseInt(req_id),function(err,result){
			if(!err){
				page.find('.fund-vote-request-success').html(ltmp_arr.fund_request_canceled_successfully);

				//update request votes
				setTimeout(update_fund_request,3000,req_id,true,true);
			}
			else{
				page.find('.fund-vote-request-error').html(ltmp_arr.default_operation_error);

				console.log(err);
			}
		});
	}
}
function fund_vote_request(req_id,percent,el){
	let page=$(el).closest('.page');
	page.find('.fund-vote-request-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.fund-vote-request-error').html('');
	page.find('.fund-vote-request-success').html('');
	percent=parseInt(parseFloat(percent)*100);
	if(isNaN(percent)){
		percent=0;
	}
	if(percent>10000){
		percent=10000;
	}
	if(percent<-10000){
		percent=-10000;
	}
	viz.broadcast.committeeVoteRequest(users[current_user].active_key,current_user,req_id,percent,function(err,result){
		if(!err){
			page.find('.fund-vote-request-success').html(ltmp_arr.fund_request_vote);

			page.find('.fund-vote-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			page.find('.icon-check').css('display','inline-block');

			//update request votes
			setTimeout(update_fund_request,3000,req_id,true,true);
		}
		else{
			page.find('.fund-vote-request-error').html(ltmp_arr.default_operation_error);

			page.find('.fund-vote-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function set_paid_subscribe(provider,level,amount,period,auto_renewal,agreement,el){
	let page=$(el).closest('.page');
	page.find('.paid-subscribe-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.paid-subscribe-error').html('');
	page.find('.paid-subscribe-success').html('');
	if(!agreement){
		//level=0;
		auto_renewal=false;
	}
	let summary_amount=parseFloat(amount) * level;
	if(summary_amount>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
		page.find('.paid-subscribe-error').html(ltmp_arr.default_insufficient_funds);

		page.find('.paid-subscribe-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	viz.broadcast.paidSubscribe(users[current_user].active_key,current_user,provider,level,amount,period,auto_renewal,function(err,result){
		if(!err){
			page.find('.paid-subscribe-success').html(ltmp_arr.default_successful_operation);

			page.find('.paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			page.find('.icon-check').css('display','inline-block');

			//update balances info
			update_balances($('.page-checks .account-balance'));
		}
		else{
			page.find('.paid-subscribe-error').html(ltmp_arr.default_node_error);

			page.find('.paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);

			if(-1!=err.cause.data.stack[0].format.indexOf('o.level > 0:')){
				page.find('.paid-subscribe-error').html(ltmp(ltmp_arr.default_error,{text:ltmp_arr.ps_sign_off_error}));
			}
			if(-1!=err.cause.data.stack[0].format.indexOf('_db.get_balance(subscriber, TOKEN_SYMBOL) >= summary_amount:')){
				page.find('.paid-subscribe-error').html(ltmp(ltmp_arr.default_error,{text:ltmp_arr.default_insufficient_funds}));
			}
		}
	});
}
function create_paid_subscribe(url_summary,levels,amount,period,agreement,el){
	let page=$(el).closest('.page');
	page.find('.create-paid-subscribe-action').attr('disabled','disabled');
	page.find('.cancel-paid-subscribe-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','none');
	if(agreement){
		page.find('.submit-button-ring[rel=create]').css('display','inline-block');
	}
	else{
		page.find('.submit-button-ring[rel=cancel]').css('display','inline-block');
	}

	page.find('.create-paid-subscribe-error').html('');
	page.find('.create-paid-subscribe-success').html('');
	if('block'==page.find('.fee-checkbox').css('display')){
		if(!page.find('.fee-checkbox input[name="create-paid-subscribe-fee"]').prop('checked')){
			page.find('.create-paid-subscribe-error').html(ltmp_arr.default_fee_confirmation);

			page.find('.create-paid-subscribe-action').removeAttr('disabled');
			page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
	}
	if(''==url_summary){
		page.find('input[name=create-paid-subscribe-url]').addClass('red');
		page.find('input[name=create-paid-subscribe-url]').focus();
		page.find('.create-paid-subscribe-error').html(ltmp_arr.ps_empty_agreement);

		page.find('.create-paid-subscribe-action').removeAttr('disabled');
		page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	if(!agreement){
		levels=0;
	}
	else{
		if(levels<=0){
			page.find('input[name=create-paid-subscribe-levels]').addClass('red');
			page.find('input[name=create-paid-subscribe-levels]').focus();
			page.find('.create-paid-subscribe-error').html(ltmp_arr.ps_levels_must_be_positive_number);

			page.find('.create-paid-subscribe-action').removeAttr('disabled');
			page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
	}
	amount=fast_str_replace(' ','',amount);
	if(-1==amount.indexOf('.')){
		if(2<amount.split(',').length){
			page.find('input[name=create-paid-subscribe-amount]').addClass('red');
			page.find('input[name=create-paid-subscribe-amount]').focus();
			page.find('.transfer-error').html(ltmp_arr.ps_sum_amount_error);

			page.find('.create-paid-subscribe-action').removeAttr('disabled');
			page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
		amount=fast_str_replace(',','.',amount);
	}
	if(2<amount.split('.').length){
		page.find('input[name=create-paid-subscribe-amount]').addClass('red');
		page.find('.create-paid-subscribe-error').html(ltmp_arr.ps_sum_amount_error);

		page.find('.create-paid-subscribe-action').removeAttr('disabled');
		page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	amount=fast_str_replace(',','',amount);
	page.find('input[name=create-paid-subscribe-amount]').val(parseFloat(amount).toFixed(2));
	if(parseFloat(amount)<=0){
		page.find('input[name=create-paid-subscribe-amount]').addClass('red');
		page.find('.create-paid-subscribe-error').html(ltmp_arr.ps_sum_amount_error);

		page.find('.create-paid-subscribe-action').removeAttr('disabled');
		page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	if(period<=0){
		page.find('input[name=create-paid-subscribe-period]').addClass('red');
		page.find('input[name=create-paid-subscribe-period]').focus();
		page.find('.create-paid-subscribe-error').html(ltmp_arr.ps_period_must_be_positive_number);

		page.find('.create-paid-subscribe-action').removeAttr('disabled');
		page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	let fixed_amount=parseFloat(amount).toFixed(3);
	fixed_amount=fixed_amount+' VIZ';
	viz.broadcast.setPaidSubscription(users[current_user].active_key,current_user,url_summary,levels,fixed_amount,period,function(err,result){
		if(!err){
			if(agreement){
				page.find('.create-paid-subscribe-success').html(ltmp_arr.ps_agreement_sign_success);
				page.find('.icon-check[rel=create]').css('display','inline-block');
			}
			else{
				page.find('.create-paid-subscribe-success').html(ltmp_arr.ps_agreement_sign_off_success);
				page.find('.icon-check[rel=cancel]').css('display','inline-block');
			}
			page.find('.submit-button-ring').css('display','none');
			page.find('.create-paid-subscribe-action').removeAttr('disabled');
			page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
		}
		else{
			page.find('.create-paid-subscribe-error').html(ltmp_arr.default_node_error);

			page.find('.create-paid-subscribe-action').removeAttr('disabled');
			page.find('.cancel-paid-subscribe-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function award(account,energy,memo,encode,el){
	let page=$(el).closest('.page');
	page.find('.award-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.award-error').html('');
	page.find('.award-success').html('');

	//account=account.replace(/[^a-z0-9\-\.]/g,'');
	page.find('input[name=award-account]').val(account);
	page.find('input[name=award-account]').removeClass('red');
	if((''==account) || (!(/^([a-z0-9\-\.]*)$/).test(account))){
		page.find('input[name=award-account]').addClass('red');
		page.find('input[name=award-account]').focus();
		page.find('.award-error').html(ltmp_arr.default_recipient_error);

		page.find('.award-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	energy=fast_str_replace(',','.',energy);
	energy=parseFloat(energy).toFixed(2);
	energy=Math.floor(energy*100);
	page.find('input[name=award-energy]').removeClass('red');
	if(energy>parseInt($('.page-award .account-balance span[rel=energy]').attr('data-raw'))){
		page.find('input[name=award-energy]').addClass('red');
		page.find('input[name=award-energy]').focus();
		page.find('.award-error').html(ltmp_arr.default_not_enough_energy);

		page.find('.award-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			let recipient_memo=response[0].memo_key;
			if(encode){
				page.find('input[name=memo-key]').removeClass('red');
				let encoded_memo=false;
				let memo_key_input=page.find('input[name=memo-key]').val().trim();
				if(''!=memo_key_input){
					try{
						encoded_memo=viz.memo.encode(memo_key_input,recipient_memo,'#'+memo);
					}
					catch(e){
						page.find('input[name=memo-key]').addClass('red');
						page.find('input[name=memo-key]').focus();

						page.find('.award-error').html(ltmp_arr.default_incorrect_private_key_try_again);
						page.find('.award-action').removeAttr('disabled');
						page.find('.submit-button-ring').css('display','none');
						return;
					}
				}
				else{
					page.find('input[name=memo-key]').addClass('red');
					page.find('input[name=memo-key]').focus();

					page.find('.award-error').html(ltmp_arr.default_type_memo_key);
					page.find('.award-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					return;
				}
				if(false!==encoded_memo){
					users[current_user].memo_key=memo_key_input;
					save_session();
					memo=encoded_memo;
				}
				else{
					page.find('.award-error').html(ltmp_arr.default_memo_encode_error);
					page.find('.award-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					return;
				}
			}
			let beneficiaries_list=[];
			viz.broadcast.award(users[current_user].active_key,current_user,account,energy,0,memo,beneficiaries_list,function(err,result){
				if(!err){
					page.find('.award-success').html(ltmp(ltmp_arr.award_info_success,{account:account,energy:(energy/100)}));

					page.find('.award-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					page.find('.icon-check').css('display','inline-block');

					page.find('input[name=award-energy]').val(0);
					page.find('input[name=award-energy]').keyup();
					page.find('input[name=award-memo]').val('');
					page.find('input[name=encode-memo]').prop('checked',false);
					page.find('input[name=memo-key]').val('');
					page.find('.memo-key-optional').css('display','none');

					//update balances info
					update_balances($('.page-award .account-balance'));

					setTimeout(load_history,3000,page.find('.history'));
				}
				else{
					page.find('.award-error').html(ltmp_arr.default_operation_error);

					page.find('.award-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');

					console.log(err);
				}
			});
		}
		else{
			page.find('input[name=award-account]').addClass('red');
			page.find('input[name=award-account]').focus();
			page.find('.award-error').html(ltmp_arr.default_recipient_error);

			page.find('.award-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
		}
	});
}
function create_invite(amount,el){
	let page=$(el).closest('.page');
	page.find('.invites-create-action').attr('disabled','disabled');
	page.find('.icon-check[rel=create]').css('display','none');
	page.find('.submit-button-ring[rel=create]').css('display','inline-block');

	page.find('.invites-create-error').html('');
	page.find('.invites-create-success').html('');

	page.find('input[name=invites-create-amount]').removeClass('red');
	amount=amount.replace(/[^0-9\,\.]/g,'');
	page.find('input[name=invites-create-amount]').val(amount);
	amount=fast_str_replace(' ','',amount);
	if(-1==amount.indexOf('.')){
		if(2<amount.split(',').length){
			page.find('input[name=invites-create-amount]').addClass('red');
			page.find('input[name=invites-create-amount]').focus();
			page.find('.invites-create-error').html(ltmp_arr.default_check_amount);

			page.find('.invites-create-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=create]').css('display','none');
			return;
		}
		amount=fast_str_replace(',','.',amount);
	}
	if(2<amount.split('.').length){
		page.find('input[name=invites-create-amount]').addClass('red');
		page.find('.invites-create-error').html(ltmp_arr.default_check_amount);

		page.find('.invites-create-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel=create]').css('display','none');
		return;
	}
	amount=fast_str_replace(',','',amount);
	page.find('input[name=invites-create-amount]').val(amount);
	if(parseFloat(amount)<=0){
		page.find('input[name=invites-create-amount]').addClass('red');
		page.find('.invites-create-error').html(ltmp_arr.default_check_amount);

		page.find('.invites-create-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel=create]').css('display','none');
		return;
	}
	let fixed_tokens_amount=''+parseFloat(amount).toFixed(3)+' VIZ';
	if(''==amount){
		fixed_tokens_amount='0.000 VIZ';
	}
	let private_key=pass_gen(100,true);
	let public_key=viz.auth.wifToPublic(private_key);
	viz.broadcast.createInvite(users[current_user].active_key,current_user,fixed_tokens_amount,public_key,function(err,result){
		if(!err){
			page.find('.invites-create-success').html(ltmp(ltmp_arr.invite_amount_success,{amount:show_balance_in_tokens(fixed_tokens_amount,true)}));

			page.find('.invites-create-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=create]').css('display','none');
			page.find('.icon-check[rel=create]').css('display','inline-block');

			page.find('input[name=invites-create-amount]').val('');

			page.find('.invites-create').removeClass('hidden');

			page.find('.invites-create').html('<p>'+ltmp(ltmp_arr.invite_info_success,{amount:show_balance_in_tokens(fixed_tokens_amount,true),private_key:private_key})+'</p>');
			download('viz-check.txt','my.VIZ.plus\r\n\r\Check balance: '+fixed_tokens_amount+'\r\nActivation code: '+private_key+'');

			//update balances info
			update_balances($('.page-checks .account-balance'));
		}
		else{
			page.find('.invites-create-error').html(ltmp_arr.default_operation_error);

			page.find('.invites-create-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=create]').css('display','none');

			console.log(err);
		}
	});
}
function fund_create_request(url,worker,min,max,duration,el){
	let page=$(el).closest('.page');
	page.find('.fund-create-request-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.fund-create-request-error').html('');
	page.find('.fund-create-request-success').html('');

	if(!page.find('.fee-checkbox input[name="committee-create-request-fee"]').prop('checked')){
		page.find('.fund-create-request-error').html(ltmp_arr.default_fee_confirmation);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	page.find('input[name=fund-create-request-min-amount]').removeClass('red');
	min=min.replace(/[^0-9\,\.]/g,'');
	page.find('input[name=fund-create-request-min-amount]').val(min);

	page.find('input[name=fund-create-request-max-amount]').removeClass('red');
	max=max.replace(/[^0-9\,\.]/g,'');
	page.find('input[name=fund-create-request-max-amount]').val(max);

	page.find('input[name=fund-create-request-worker]').removeClass('red');
	worker=worker.replace(/[^a-z0-9\-\.]/g,'');
	page.find('input[name=fund-create-request-worker]').val(worker);

	page.find('input[name=fund-create-request-url]').removeClass('red');
	page.find('input[name=fund-create-request-duration]').removeClass('red');

	if(''==url){
		page.find('input[name=fund-create-request-url]').addClass('red');
		page.find('input[name=fund-create-request-url]').focus();
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_url_needed);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	if(url.length>256){
		page.find('input[name=fund-create-request-url]').addClass('red');
		page.find('input[name=fund-create-request-url]').focus();
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_url_limit);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	if((''==worker) || (!(/^([a-z0-9\-\.]*)$/).test(worker))){
		page.find('input[name=fund-create-request-worker]').addClass('red');
		page.find('input[name=fund-create-request-worker]').focus();
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_worker_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	if(-1==min.indexOf('.')){
		if(2<min.split(',').length){
			page.find('input[name=fund-create-request-min-amount]').addClass('red');
			page.find('input[name=fund-create-request-min-amount]').focus();
			page.find('.fund-create-request-error').html(ltmp_arr.fund_request_min_amount_check);

			page.find('.fund-create-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
		min=fast_str_replace(',','.',min);
	}
	if(2<min.split('.').length){
		page.find('input[name=fund-create-request-min-amount]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_min_amount_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	min=fast_str_replace(',','',min);
	page.find('input[name=fund-create-request-min-amount]').val(min);
	if(parseFloat(min)<0){
		page.find('input[name=fund-create-request-min-amount]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_min_amount_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	if(-1==max.indexOf('.')){
		if(2<max.split(',').length){
			page.find('input[name=fund-create-request-max-amount]').addClass('red');
			page.find('input[name=fund-create-request-max-amount]').focus();
			page.find('.fund-create-request-error').html(ltmp_arr.fund_request_max_amount_check);

			page.find('.fund-create-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
		max=fast_str_replace(',','.',max);
	}
	if(2<max.split('.').length){
		page.find('input[name=fund-create-request-max-amount]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_max_amount_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	max=fast_str_replace(',','',max);
	page.find('input[name=fund-create-request-max-amount]').val(max);
	if(parseFloat(max)<=0){
		page.find('input[name=fund-create-request-max-amount]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_max_amount_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	if(min>=max){
		page.find('input[name=fund-create-request-min-amount]').addClass('red');
		page.find('input[name=fund-create-request-max-amount]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_min_lt_max_needed);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	duration=parseInt(duration);
	if(isNaN(duration) || (duration<5) || (duration>30)){
		page.find('input[name=fund-create-request-duration]').addClass('red');
		page.find('.fund-create-request-error').html(ltmp_arr.fund_request_duration_check);

		page.find('.fund-create-request-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	page.find('input[name=fund-create-request-duration]').val(duration);

	let fixed_min=''+parseFloat(min).toFixed(3)+' VIZ';
	if(''==min){
		fixed_min='0.000 VIZ';
	}
	let fixed_max=''+parseFloat(max).toFixed(3)+' VIZ';
	if(''==max){
		fixed_max='0.000 VIZ';
	}
	duration=duration*3600*24;
	viz.broadcast.committeeWorkerCreateRequest(users[current_user].active_key,current_user,url,worker,fixed_min,fixed_max,duration,function(err,result) {
		if(!err){
			page.find('.fund-create-request-success').html(ltmp_arr.fund_request_success);
			page.find('.fund-create-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			page.find('.icon-check').css('display','inline-block');
		}
		else{
			page.find('.fund-create-request-error').html(ltmp_arr.default_operation_error);

			page.find('.fund-create-request-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function transfer(account,amount,memo,encode,el){
	let page=$(el).closest('.page');
	page.find('.transfer-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.transfer-error').html('');
	page.find('.transfer-success').html('');

	page.find('input[name=transfer-tokens-amount]').removeClass('red');
	amount=amount.replace(/[^0-9\,\.]/g,'');
	page.find('input[name=transfer-tokens-amount]').val(amount);

	page.find('input[name=transfer-account]').removeClass('red');
	account=account.replace(/[^a-z0-9\-\.]/g,'');
	page.find('input[name=transfer-account]').val(account);

	page.find('input[name=transfer-memo]').removeClass('red');
	if((''==account) || (!(/^([a-z0-9\-\.]*)$/).test(account))){
		page.find('input[name=transfer-account]').addClass('red');
		page.find('input[name=transfer-account]').focus();
		page.find('.transfer-error').html(ltmp_arr.default_recipient_error);

		page.find('.transfer-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	amount=fast_str_replace(' ','',amount);
	if(-1==amount.indexOf('.')){
		if(2<amount.split(',').length){
			page.find('input[name=transfer-tokens-amount]').addClass('red');
			page.find('input[name=transfer-tokens-amount]').focus();
			page.find('.transfer-error').html(ltmp_arr.default_check_amount);

			page.find('.transfer-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
		amount=fast_str_replace(',','.',amount);
	}
	if(2<amount.split('.').length){
		page.find('input[name=transfer-tokens-amount]').addClass('red');
		page.find('.transfer-error').html(ltmp_arr.default_check_amount);

		page.find('.transfer-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	amount=fast_str_replace(',','',amount);
	page.find('input[name=transfer-tokens-amount]').val(amount);
	if(parseFloat(amount)<=0){
		page.find('input[name=transfer-tokens-amount]').addClass('red');
		page.find('.transfer-error').html(ltmp_arr.default_check_amount);

		page.find('.transfer-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}

	if(parseFloat(amount)>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
		page.find('input[name=transfer-tokens-amount]').addClass('red');
		page.find('.transfer-error').html(ltmp_arr.default_insufficient_funds);

		page.find('.transfer-action').removeAttr('disabled');
		page.find('.submit-button-ring').css('display','none');
		return;
	}
	let memo_check=page.find('input[name=transfer-memo]').attr('data-memo-check');
	if(typeof memo_check != 'undefined' && ''!=memo_check){
		memo_check_regexp=new RegExp(memo_check);
		if(!memo_check_regexp.test(memo)){
			page.find('input[name=transfer-memo]').addClass('red');
			page.find('.transfer-error').html(ltmp_arr.transfer_memo_not_match_template);

			page.find('.transfer-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
	}
	let fixed_tokens_amount=''+parseFloat(amount).toFixed(3)+' VIZ';
	if(''==amount){
		fixed_tokens_amount='0.000 VIZ';
	}

	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			let recipient_memo=response[0].memo_key;
			if(encode){
				page.find('input[name=memo-key]').removeClass('red');
				let encoded_memo=false;
				let memo_key_input=page.find('input[name=memo-key]').val().trim();
				if(''!=memo_key_input){
					try{
						encoded_memo=viz.memo.encode(memo_key_input,recipient_memo,'#'+memo);
					}
					catch(e){
						page.find('input[name=memo-key]').addClass('red');
						page.find('input[name=memo-key]').focus();

						page.find('.transfer-error').html(ltmp_arr.default_incorrect_private_key_try_again);
						page.find('.transfer-action').removeAttr('disabled');
						page.find('.submit-button-ring').css('display','none');
						return;
					}
				}
				else{
					page.find('input[name=memo-key]').addClass('red');
					page.find('input[name=memo-key]').focus();

					page.find('.transfer-error').html(ltmp_arr.default_type_memo_key);
					page.find('.transfer-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					return;
				}
				if(false!==encoded_memo){
					users[current_user].memo_key=memo_key_input;
					save_session();
					memo=encoded_memo;
				}
				else{
					page.find('.transfer-error').html(ltmp_arr.default_memo_encode_error);
					page.find('.transfer-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					return;
				}
			}
			viz.broadcast.transfer(users[current_user].active_key,current_user,account,fixed_tokens_amount,memo,function(err,result){
				if(!err){
					page.find('.transfer-success').html(ltmp(ltmp_arr.transfer_amount_success,{amount:show_amount_in_tokens(fixed_tokens_amount,true)}));

					page.find('.transfer-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
					page.find('.icon-check').css('display','inline-block');

					page.find('input[name=transfer-account]').val('');
					page.find('input[name=transfer-tokens-amount]').val('');
					page.find('input[name=transfer-memo]').val('');
					page.find('input[name=encode-memo]').prop('checked',false);
					page.find('input[name=memo-key]').val('');
					page.find('.memo-key-optional').css('display','none');

					update_balances($('.page-transfer .account-balance'));

					setTimeout(load_history,3000,page.find('.history'));
				}
				else{
					page.find('.transfer-error').html(ltmp_arr.default_operation_error);
					page.find('.transfer-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');

					console.log(err);
				}
			});
		}
		else{
			page.find('input[name=transfer-account]').addClass('red');
			page.find('input[name=transfer-account]').focus();
			page.find('.transfer-error').html(ltmp_arr.default_recipient_error);

			page.find('.transfer-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
	});
}
function witness_set_props(el){
	let page=$(el).closest('.page');
	page.find('.witness-set-props-action').attr('disabled','disabled');
	page.find('.icon-check[rel=set-props]').css('display','none');
	page.find('.submit-button-ring[rel=set-props]').css('display','inline-block');

	page.find('.witness-set-props-error').html('');
	page.find('.witness-set-props-success').html('');

	viz.api.getWitnessByAccount(current_user,function(err,response){
		if(!err){
			var props=response.props;
			for(i in props){
				props[i]=page.find('input[name="witness-set-props-'+i+'"]').val();
				if(-1!==witness_props_percent.indexOf(i)){
					props[i]=parseInt(parseFloat(props[i])*100);
					if(props[i]>100000){
						props[i]=100000;
					}
					if(0>props[i]){
						props[i]=0;
					}
				}
				else{
					if((props[i])==(''+parseInt(props[i]))){
						props[i]=parseInt(props[i]);
					}
				}
			}
			let props_version=3;//protocol properties version
			viz.broadcast.versionedChainPropertiesUpdate(users[current_user].active_key,current_user,[props_version,props],function(err,result){
				if(!err){
					page.find('.witness-set-props-success').html(ltmp_arr.witness_set_props_success);
					page.find('.witness-set-props-action').removeAttr('disabled');
					page.find('.submit-button-ring[rel=set-props]').css('display','none');
					page.find('.icon-check[rel=set-props]').css('display','inline-block');
				}
				else{
					page.find('.witness-set-props-error').html(ltmp_arr.witness_set_props_error);
					page.find('.witness-set-props-action').removeAttr('disabled');
					page.find('.submit-button-ring[rel=set-props]').css('display','none');

					console.log(err);
				}
			});
		}
		else{
			page.find('.witness-set-props-error').html(ltmp_arr.default_node_error);
			page.find('.witness-set-props-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=set-props]').css('display','none');

			console.log(err);
		}
	});
}
function witness_setup(url,public_key,private_key,el){
	private_key=typeof private_key==='undefined'?'':private_key;
	let page=$(el).closest('.page');
	page.find('.witness-setup-action').attr('disabled','disabled');
	page.find('.icon-check[rel=setup]').css('display','none');
	page.find('.submit-button-ring[rel=setup]').css('display','inline-block');

	page.find('.witness-setup-error').html('');
	page.find('.witness-setup-success').html('');

	if('block'==page.find('.fee-checkbox').css('display')){
		if(!page.find('.fee-checkbox input[name="witness-declaration-fee"]').prop('checked')){
			page.find('.witness-setup-error').html(ltmp_arr.default_fee_confirmation);

			page.find('.witness-setup-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			return;
		}
	}

	if(''==url){
		page.find('.witness-setup-error').html(ltmp_arr.witness_url_is_needed);
		page.find('.witness-setup-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel=setup]').css('display','none');
		return;
	}
	if(''!=private_key){
		if(viz.auth.wifToPublic(private_key)!=public_key){
			page.find('.witness-setup-error').html(ltmp_arr.witness_keys_dont_match);
			page.find('.witness-setup-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=setup]').css('display','none');
			return;
		}
	}
	let deactivation=false;
	if(''==public_key){
		public_key='VIZ1111111111111111111111111111111114T1Anm';
		deactivation=true;
	}
	viz.broadcast.witnessUpdate(users[current_user].active_key,current_user,url,public_key,function(err,result){
		if(!err){
			page.find('.witness-setup-success').html(ltmp_arr.default_successful_operation+(''!=private_key?ltmp_arr.witness_save_signing_key+private_key:'')+(deactivation?ltmp_arr.witness_was_disabled:''));

			page.find('.witness-setup-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=setup]').css('display','none');
			page.find('.icon-check[rel=setup]').css('display','inline-block');
		}
		else{
			page.find('.witness-setup-error').html(ltmp_arr.default_operation_error);

			page.find('.witness-setup-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=setup]').css('display','none');

			console.log(err);
		}
	});
}
function undelegate_shares(account,el){
	$(el).closest('.columns-view').css('box-shadow','inset 0px 0px 4px 1px #7af');
	viz.broadcast.delegateVestingShares(users[current_user].active_key,current_user,account,'0.000000 SHARES',function(err,result){
		if(!err){
			$(el).closest('.columns-view').remove();

			//update delegation info
			let balance_el=$('.page-delegate-shares .shares-balance');
			balance_el.find('.vesting-shares').html('&hellip;');
			balance_el.find('.delegated-vesting-shares').html('&hellip;');
			balance_el.find('.received-vesting-shares').html('&hellip;');
			balance_el.find('.effective-vesting-shares').html('&hellip;');
			viz.api.getAccounts([current_user],function(err,response){
				if(err){
					$('.page-delegate-shares .delegate-shares-error').html(ltmp_arr.default_node_error);
				}
				else{
					if(current_user==response[0].name){
						update_shares_balance(balance_el,response[0]);
						$('.page-delegate-shares .input-caption .effective-vesting-shares').attr('data-vesting-shares',parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')));
						$('.page-delegate-shares .input-caption .effective-vesting-shares').html(number_thousands(show_balance_in_tokens(parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')),true)));
						calc_max_delegation();
					}
				}
			});
			update_delegations_tables();
		}
		else{
			$(el).closest('.columns-view').css('box-shadow','inset 0px 0px 4px 1px #f33');

			console.log(err);
		}
	});
}
function delegate_shares(account,amount,el){
	let page=$(el).closest('.page');
	page.find('.delegate-shares-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.delegate-shares-error').html('');
	page.find('.delegate-shares-success').html('');
	let fixed_shares_amount=''+parseFloat(amount).toFixed(6)+' SHARES';
	if(''==amount){
		fixed_shares_amount='0.000000 SHARES';
	}
	viz.broadcast.delegateVestingShares(users[current_user].active_key,current_user,account,fixed_shares_amount,function(err,result){
		if(!err){
			page.find('.delegate-shares-success').html(ltmp_arr.delegation_success);

			page.find('.delegate-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			page.find('.icon-check').css('display','inline-block');

			page.find('input[name=delegate-shares-account]').val('');
			page.find('input[name=delegate-shares-tokens-amount]').val('');

			//update delegation info
			let balance_el=$('.page-delegate-shares .shares-balance');
			balance_el.find('.vesting-shares').html('&hellip;');
			balance_el.find('.delegated-vesting-shares').html('&hellip;');
			balance_el.find('.received-vesting-shares').html('&hellip;');
			balance_el.find('.effective-vesting-shares').html('&hellip;');
			viz.api.getAccounts([current_user],function(err,response){
				if(err){
					$('.page-delegate-shares .delegate-shares-error').html(ltmp_arr.default_node_error);
				}
				else{
					if(current_user==response[0].name){
						update_shares_balance(balance_el,response[0]);
						$('.page-delegate-shares .input-caption .effective-vesting-shares').attr('data-vesting-shares',parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')));
						$('.page-delegate-shares .input-caption .effective-vesting-shares').html(number_thousands(show_balance_in_tokens(parseFloat(balance_el.find('.vesting-shares').data('available-vesting-shares')),true)));
						calc_max_delegation();
					}
				}
			});
			update_delegations_tables();
		}
		else{
			page.find('.delegate-shares-error').html(ltmp_arr.default_operation_error);

			page.find('.delegate-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function stop_unstake_shares(el){
	let page=el.closest('.page');
	el.attr('disabled','disabled');
	page.find('.submit-button-ring[rel=stop]').css('display','inline-block');

	page.find('.stop-unstake-shares-error').html('');
	viz.broadcast.withdrawVesting(users[current_user].active_key,current_user,'0.000000 SHARES',function(err,result){
		if(!err){
			page.find('.account-withdraw-status').addClass('hidden');
			el.removeAttr('disabled');
			page.find('.submit-button-ring[rel=stop]').css('display','none');
		}
		else{
			page.find('.stop-unstake-shares-error').html(ltmp_arr.stop_withdraw_error);

			el.removeAttr('disabled');
			page.find('.submit-button-ring[rel=stop]').css('display','none');

			console.log(err);
		}
	});
}
function unstake_shares(tokens_amount,el){
	let page=el.closest('.page');
	page.find('.unstake-shares-action').attr('disabled','disabled');
	page.find('.icon-check[rel=unstake]').css('display','none');
	page.find('.submit-button-ring[rel=unstake]').css('display','inline-block');

	page.find('.unstake-shares-error').html('');
	page.find('.unstake-shares-success').html('');
	let fixed_shares_amount=''+parseFloat(tokens_amount).toFixed(6)+' SHARES';
	if(''==tokens_amount){
		fixed_shares_amount='0.000000 SHARES';
	}
	viz.broadcast.withdrawVesting(users[current_user].active_key,current_user,fixed_shares_amount,function(err,result){
		if(!err){
			page.find('.unstake-shares-success').html(ltmp_arr.withdraw_success);

			page.find('.unstake-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=unstake]').css('display','none');
			page.find('.icon-check[rel=unstake]').css('display','inline-block');
		}
		else{
			page.find('.unstake-shares-error').html(ltmp_arr.default_operation_error);

			page.find('.unstake-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel=unstake]').css('display','none');

			console.log(err);
		}
	});
}
function stake_shares(tokens_amount,el){
	let page=el.closest('.page');
	page.find('.stake-shares-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.stake-shares-error').html('');
	page.find('.stake-shares-success').html('');
	tokens_amount=fast_str_replace(',','.',tokens_amount);
	let fixed_tokens_amount=''+parseFloat(tokens_amount).toFixed(3)+' VIZ';
	if(''==tokens_amount){
		fixed_tokens_amount='0.000 VIZ';
	}
	viz.broadcast.transferToVesting(users[current_user].active_key,current_user,current_user,fixed_tokens_amount,function(err,result){
		if(!err){
			page.find('.stake-shares-success').html(ltmp_arr.transfer_success);

			page.find('.stake-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');
			page.find('.icon-check').css('display','inline-block');

			page.find('input[name=stake-shares-tokens-amount]').val('');

			update_balances(page.find('.account-balance'));
		}
		else{
			page.find('.stake-shares-error').html(ltmp_arr.transfer_error);

			page.find('.stake-shares-action').removeAttr('disabled');
			page.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function create_account(account_login,token_amount,shares_amount,login_el){
	let page=login_el.closest('.page');
	page.find('.create-account-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');
	let fixed_token_amount=''+parseFloat(token_amount).toFixed(3)+' VIZ';
	let fixed_shares_amount=''+parseFloat(shares_amount).toFixed(6)+' SHARES';
	if(''==token_amount){
		fixed_token_amount='0.000 VIZ';
	}
	if(''==shares_amount){
		fixed_shares_amount='0.000000 SHARES';
	}
	let auth_types=['regular','active','master','memo'];
	let keys=viz.auth.getPrivateKeys(account_login,pass_gen(100),auth_types);
	let master = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.masterPubkey, 1]
		]
	};
	let active = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.activePubkey, 1]
		]
	};
	let regular = {
		"weight_threshold": 1,
		"account_auths": [],
		"key_auths": [
			[keys.regularPubkey, 1]
		]
	};
	let memo_key=keys.memoPubkey;
	let json_metadata='';
	let referrer='';

	let account_success=function(result){
		page.find('.submit-button-ring').css('display','none');
		page.find('.icon-check').css('display','inline-block');
		$('.page-create-account .create-account-error').html('');
		$('.page-create-account .create-account-available').html('');
		login_el.val('');
		login_el.css('border-color','');
		page.find('.create-account-action').removeAttr('disabled');

		page.find('.account-keys .account-login').html(account_login);
		page.find('.account-keys .master-key').html(keys['master']);
		page.find('.account-keys .active-key').html(keys['active']);
		page.find('.account-keys .regular-key').html(keys['regular']);
		page.find('.account-keys .memo-key').html(keys['memo']);
		page.find('.account-keys').css('display','block');

		download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account_login+'\r\nMaster key: '+keys['master']+'\r\nActive key: '+keys['active']+'\r\nRegular key: '+keys['regular']+'\r\nMemo key: '+keys['memo']+'');

		update_balances(page.find('.account-balance'));
	}
	let account_failure=function(err){
		console.log(err);

		page.find('.submit-button-ring').css('display','none');
		page.find('.create-account-error').html(ltmp_arr.create_account_error);
		page.find('.create-account-available').html('');
		page.find('.create-account-action').removeAttr('disabled');

		if(account_login){
			viz.api.getAccounts([account_login],function(err,response){
				if(!err){
					page.find('.create-account-available').html(ltmp_arr.check_login_already_exist);
				}
			});
		}
		if(typeof err.cause !== 'undefined'){
			page.find('.create-account-error').html($('.page-create-account .create-account-error').html()+': '+err.cause.data.stack[0].format);
		}
	}
	viz.broadcast.accountCreate(users[current_user].active_key,fixed_token_amount,fixed_shares_amount,current_user,account_login,master,active,regular,memo_key,json_metadata,referrer,[],function(err,result){
		if(!err){
			account_success(result);
		}
		else{
			account_failure(err);
		}
	});
}

function buy_account(account_login,offer_price,tokens_amount,el){
	el.find('.buy-account-error').html('');
	el.find('.buy-account-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');
	if(''==tokens_amount){
		tokens_amount=0;
	}
	let fixed_tokens_amount=''+parseFloat(tokens_amount).toFixed(3)+' VIZ';
	let private_key=pass_gen(100,true);
	let public_key=viz.auth.wifToPublic(private_key);
	viz.api.getRecoveryRequest(account_login,function(err,response){
		if(null===response){
			viz.broadcast.buyAccount(users[current_user].active_key,current_user,account_login,offer_price,public_key,fixed_tokens_amount,function(err,result){
				if(!err){
					el.find('.submit-button-ring').css('display','none');
					el.find('.icon-check').css('display','inline-block');

					el.find('.account-keys .account-login').html(account_login);
					el.find('.account-keys .master-key').html(private_key);
					el.find('.account-keys .active-key').html(private_key);
					el.find('.account-keys .regular-key').html(private_key);
					el.find('.account-keys .memo-key').html(private_key);
					el.find('.account-keys').css('display','block');

					download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account_login+'\r\nMaster key: '+private_key+'\r\nActive key: '+private_key+'\r\nRegular key: '+private_key+'\r\nMemo key: '+private_key+'');

					update_balances(el.closest('.page').find('.account-balance'));
				}
				else{
					el.find('.buy-account-error').html(ltmp_arr.buy_account_error);
					el.find('.buy-account-action').removeAttr('disabled');
					el.find('.submit-button-ring').css('display','none');

					console.log(err);
				}
			});
		}
		else{
			el.find('.buy-account-error').html(ltmp_arr.buy_account_on_recovery);
			el.find('.buy-account-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
		}
	});
}
function buy_short_account(account_login,offer_price,tokens_amount,el){
	el.find('.buy-short-account-error').html('');
	el.find('.buy-short-account-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');
	if(''==tokens_amount){
		tokens_amount=0;
	}
	let fixed_tokens_amount=''+parseFloat(tokens_amount).toFixed(3)+' VIZ';
	let private_key=pass_gen(100,true);
	let public_key=viz.auth.wifToPublic(private_key);
	viz.api.getRecoveryRequest(account_login,function(err,response){
		if(null===response){
			viz.broadcast.buyAccount(users[current_user].active_key,current_user,account_login,offer_price,public_key,fixed_tokens_amount,function(err,result){
				if(!err){
					el.find('.submit-button-ring').css('display','none');
					el.find('.icon-check').css('display','inline-block');

					el.find('.account-keys .account-login').html(account_login);
					el.find('.account-keys .master-key').html(private_key);
					el.find('.account-keys .active-key').html(private_key);
					el.find('.account-keys .regular-key').html(private_key);
					el.find('.account-keys .memo-key').html(private_key);
					el.find('.account-keys').css('display','block');

					download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account_login+'\r\nMaster key: '+private_key+'\r\nActive key: '+private_key+'\r\nRegular key: '+private_key+'\r\nMemo key: '+private_key+'');

					update_balances(el.closest('.page').find('.account-balance'));
				}
				else{
					el.find('.buy-short-account-error').html(ltmp_arr.buy_account_error);
					el.find('.buy-short-account-action').removeAttr('disabled');
					el.find('.submit-button-ring').css('display','none');

					console.log(err);
				}
			});
		}
		else{
			el.find('.buy-short-account-error').html(ltmp_arr.buy_account_on_recovery);
			el.find('.buy-short-account-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
		}
	});
}
function set_account_price(account,master_key,seller,offer_price,on_sale,el){
	if(!viz.auth.isWif(master_key)){
		el.find('.sell-account-error').html(ltmp_arr.default_invalid_master_key);
		return;
	}
	el.find('.sell-account-error').html('');
	el.find('.sell-account-success').html('');
	el.find('.sell-account-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');

	if('block'==el.find('.fee-checkbox').css('display')){
		if(!el.find('.fee-checkbox input[name="account-on-sale-fee"]').prop('checked')){
			el.find('.sell-account-error').html(ltmp_arr.default_fee_confirmation);

			el.find('.sell-account-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
			return;
		}
	}
	if(''==offer_price){
		offer_price=0;
	}
	let fixed_tokens_amount=''+parseFloat(offer_price).toFixed(3)+' VIZ';
	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			viz.broadcast.setAccountPrice(master_key,account,seller,fixed_tokens_amount,on_sale,function(err,result){
				if(result){
					el.find('.sell-account-success').html(ltmp_arr.set_account_price_success);
					el.find('.submit-button-ring').css('display','none');
					el.find('.sell-account-action').removeAttr('disabled');
					el.find('.icon-check').css('display','inline-block');
				}
				else{
					el.find('.sell-account-error').html(ltmp_arr.default_incorrect_response);
					el.find('.submit-button-ring').css('display','none');
					el.find('.sell-account-action').removeAttr('disabled');

					console.log(err);
				}
			});
		}
		else{
			el.find('.sell-account-error').html(ltmp_arr.default_incorrect_response);
			el.find('.sell-account-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');

			console.log(err);
		}
	});
}
function manage_access_save(account,master_key,el){
	el.find('.manage-access-preload-error').html('');
	el.find('.manage-access-preload-success').html('');
	if(!viz.auth.isWif(master_key)){
		el.find('.manage-access-save-error').html(ltmp_arr.default_invalid_master_key);
		return;
	}
	let master_weight_threshold=parseInt(el.find('input[name=master-weight-threshold]').val());
	let active_weight_threshold=parseInt(el.find('input[name=active-weight-threshold]').val());
	let regular_weight_threshold=parseInt(el.find('input[name=regular-weight-threshold]').val());
	if((parseInt(master_weight_threshold)<=0)||(isNaN(parseInt(master_weight_threshold)))){
		el.find('.manage-access-save-error').html(ltmp_arr.access_invalid_master_weight_threshold);
		return;
	}
	if((parseInt(active_weight_threshold)<=0)||(isNaN(parseInt(active_weight_threshold)))){
		el.find('.manage-access-save-error').html(ltmp_arr.access_invalid_active_weight_threshold);
		return;
	}
	if((parseInt(regular_weight_threshold)<=0)||(isNaN(parseInt(regular_weight_threshold)))){
		el.find('.manage-access-save-error').html(ltmp_arr.access_invalid_regular_weight_threshold);
		return;
	}

	let master_weight_sum=0;
	let active_weight_sum=0;
	let regular_weight_sum=0;

	let master_account_auths=[];
	let active_account_auths=[];
	let regular_account_auths=[];

	let master_key_auths=[];
	let active_key_auths=[];
	let regular_key_auths=[];

	let to_save=[];

	el.find('.account-keys .master-accounts .account-auths').each(function(i,auth_el){
		master_account_auths.push([$(auth_el).attr('data-account'),parseInt($(auth_el).attr('data-weight'))]);
		master_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});
	el.find('.account-keys .active-accounts .account-auths').each(function(i,auth_el){
		active_account_auths.push([$(auth_el).attr('data-account'),parseInt($(auth_el).attr('data-weight'))]);
		active_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});
	el.find('.account-keys .regular-accounts .account-auths').each(function(i,auth_el){
		regular_account_auths.push([$(auth_el).attr('data-account'),parseInt($(auth_el).attr('data-weight'))]);
		regular_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});

	el.find('.account-keys .master-keys .key-auths').each(function(i,auth_el){
		master_key_auths.push([$(auth_el).attr('data-key'),parseInt($(auth_el).attr('data-weight'))]);
		if(typeof $(auth_el).attr('data-private-key') !== 'undefined'){
			to_save.push(['master',$(auth_el).attr('data-private-key')]);
		}
		master_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});
	el.find('.account-keys .active-keys .key-auths').each(function(i,auth_el){
		active_key_auths.push([$(auth_el).attr('data-key'),parseInt($(auth_el).attr('data-weight'))]);
		if(typeof $(auth_el).attr('data-private-key') !== 'undefined'){
			to_save.push(['active',$(auth_el).attr('data-private-key')]);
		}
		active_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});
	el.find('.account-keys .regular-keys .key-auths').each(function(i,auth_el){
		regular_key_auths.push([$(auth_el).attr('data-key'),parseInt($(auth_el).attr('data-weight'))]);
		if(typeof $(auth_el).attr('data-private-key') !== 'undefined'){
			to_save.push(['regular',$(auth_el).attr('data-private-key')]);
		}
		regular_weight_sum+=parseInt($(auth_el).attr('data-weight'));
	});

	if(master_weight_sum<master_weight_threshold){
		el.find('.manage-access-save-error').html(ltmp_arr.access_need_master_weight);
		return;
	}
	if(active_weight_sum<active_weight_threshold){
		el.find('.manage-access-save-error').html(ltmp_arr.access_need_active_weight);
		return;
	}
	if(regular_weight_sum<regular_weight_threshold){
		el.find('.manage-access-save-error').html(ltmp_arr.access_need_regular_weight);
		return;
	}

	let master = {
		'weight_threshold': master_weight_threshold,
		'account_auths': master_account_auths,
		'key_auths': master_key_auths
	};
	let active = {
		'weight_threshold': active_weight_threshold,
		'account_auths': active_account_auths,
		'key_auths': active_key_auths
	};
	let regular = {
		'weight_threshold': regular_weight_threshold,
		'account_auths': regular_account_auths,
		'key_auths': regular_key_auths
	};
	let json_metadata=el.find('input[name=manage-access-json-metadata]').val();
	let memo_key=el.find('input[name=manage-access-memo-key]').val();
	if(typeof el.find('input[name=manage-access-memo-key]').attr('data-private-key')){
		if(''!=el.find('input[name=manage-access-memo-key]').attr('data-private-key')){
			to_save.push(['memo',el.find('input[name=manage-access-memo-key]').attr('data-private-key')]);
		}
	}

	let txt_to_save='';
	if(0<to_save.length){
		txt_to_save='my.VIZ.plus\r\n\r\n';
		txt_to_save+='Account: '+account+'\r\n\r\n';
		txt_to_save+='New authorites\r\n';
		html_to_show='<p class="captions">Account: <strong>'+account+'</strong></p>';
		for(i in to_save){
			txt_to_save+=to_save[i][0]+': '+to_save[i][1]+'\r\n';
			html_to_show+='<p class="captions">'+to_save[i][0]+': <strong>'+to_save[i][1]+'</strong></p>';
		}
		txt_to_save=txt_to_save.trim();
	}

	el.find('.manage-access-save-action').attr('disabled','disabled');
	el.find('.icon-check[rel=save]').css('display','none');
	el.find('.submit-button-ring[rel=save]').css('display','inline-block');

	viz.broadcast.accountUpdate(master_key,account,master,active,regular,memo_key,json_metadata,function(err,result){
		if(result){
			el.find('.manage-access-save-success').html(ltmp_arr.access_saved_successfully+(0<to_save.length?ltmp_arr.access_save_keys:''));
			el.find('.manage-access-save-error').html('');

			el.find('.submit-button-ring[rel=save]').css('display','none');
			el.find('.icon-check[rel=save]').css('display','inline-block');
			el.find('input[name=manage-access-master-key]').val('');
			el.find('.manage-access-save-action').removeAttr('disabled');

			if(0<to_save.length){
				el.find('.manage-access-new-keys').html(html_to_show);
				download('viz-access.txt',txt_to_save);
			}
		}
		else{
			el.find('.manage-access-save-error').html(ltmp_arr.access_error);
			el.find('.submit-button-ring[rel=save]').css('display','none');
			el.find('.manage-access-save-action').removeAttr('disabled');

			console.log(err);
		}
	});

	return;
}
function manage_access_preload(account,el){
	el.find('.manage-access-preload-error').html('');
	el.find('.manage-access-preload-success').html('');

	el.find('.manage-access-preload-action').attr('disabled','disabled');
	el.find('.icon-check[rel=preload]').css('display','none');
	el.find('.submit-button-ring[rel=preload]').css('display','inline-block');

	el.find('.account-keys .master-accounts .account-auths').remove();
	el.find('.account-keys .master-keys .key-auths').remove();
	el.find('.account-keys .active-accounts .account-auths').remove();
	el.find('.account-keys .active-keys .key-auths').remove();
	el.find('.account-keys .regular-accounts .account-auths').remove();
	el.find('.account-keys .regular-keys .key-auths').remove();
	el.find('.account-keys input[name=manage-access-memo-key]').val('');
	el.find('.account-keys input[name=manage-access-memo-key]').attr('data-private-key','');
	el.find('.account-keys input[name=manage-access-master-key]').val('');
	el.find('.account-keys input[name=manage-access-master-key]').attr('data-account','');

	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			let counter=0;
			el.find('.manage-access-preload-success').html(ltmp_arr.access_loaded);
			el.find('.submit-button-ring[rel=preload]').css('display','none');
			el.find('.icon-check[rel=preload]').css('display','inline-block');
			el.find('.manage-access-preload-action').removeAttr('disabled');

			el.find('.account-keys .master-accounts .none-auths').css('display','none');
			el.find('.account-keys .master-keys .none-auths').css('display','none');
			el.find('.account-keys .active-accounts .none-auths').css('display','none');
			el.find('.account-keys .active-keys .none-auths').css('display','none');
			el.find('.account-keys .regular-accounts .none-auths').css('display','none');
			el.find('.account-keys .regular-keys .none-auths').css('display','none');

			el.find('.submit-button-ring[rel=save]').css('display','none');
			el.find('.icon-check[rel=save]').css('display','none');
			el.find('.manage-access-save-success').html('');
			el.find('.manage-access-save-error').html('');
			el.find('.manage-access-new-keys').html('');

			el.find('.account-keys').css('display','block');
			el.find('.account-keys .account-login').html(account);
			el.find('.account-keys input[name=manage-access-master-key]').attr('data-account',account);

			el.find('.account-keys input[name=master-weight-threshold]').val(response[0].master_authority.weight_threshold);
			el.find('.account-keys input[name=active-weight-threshold]').val(response[0].active_authority.weight_threshold);
			el.find('.account-keys input[name=regular-weight-threshold]').val(response[0].regular_authority.weight_threshold);
			el.find('.account-keys input[name=manage-access-memo-key]').val(response[0].memo_key);
			el.find('.account-keys input[name=manage-access-json-metadata]').val(response[0].json_metadata);

			counter=0;
			for(i in response[0].master_authority.account_auths){
				let new_el='<div class="account-auths" data-account="'+response[0].master_authority.account_auths[i][0]+'" data-weight="'+response[0].master_authority.account_auths[i][1]+'">';
				new_el+=response[0].master_authority.account_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+=' <span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].master_authority.account_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .master-accounts').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .master-accounts .none-auths').css('display','block');
			}
			counter=0;
			for(i in response[0].master_authority.key_auths){
				let new_el='<div class="key-auths" data-key="'+response[0].master_authority.key_auths[i][0]+'" data-weight="'+response[0].master_authority.key_auths[i][1]+'">';
				new_el+=response[0].master_authority.key_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+=' <span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].master_authority.key_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .master-keys').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .master-keys .none-auths').css('display','block');
			}

			counter=0;
			for(i in response[0].active_authority.account_auths){
				let new_el='<div class="account-auths" data-account="'+response[0].active_authority.account_auths[i][0]+'" data-weight="'+response[0].active_authority.account_auths[i][1]+'">';
				new_el+=response[0].active_authority.account_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+= '<span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].active_authority.account_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .active-accounts').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .active-accounts .none-auths').css('display','block');
			}
			counter=0;
			for(i in response[0].active_authority.key_auths){
				let new_el='<div class="key-auths" data-key="'+response[0].active_authority.key_auths[i][0]+'" data-weight="'+response[0].active_authority.key_auths[i][1]+'">';
				new_el+=response[0].active_authority.key_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+=' <span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].active_authority.key_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .active-keys').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .active-keys .none-auths').css('display','block');
			}

			counter=0;
			for(i in response[0].regular_authority.account_auths){
				let new_el='<div class="account-auths" data-account="'+response[0].regular_authority.account_auths[i][0]+'" data-weight="'+response[0].regular_authority.account_auths[i][1]+'">';
				new_el+=response[0].regular_authority.account_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+=' <span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].regular_authority.account_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .regular-accounts').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .regular-accounts .none-auths').css('display','block');
			}
			counter=0;
			for(i in response[0].regular_authority.key_auths){
				let new_el='<div class="key-auths" data-key="'+response[0].regular_authority.key_auths[i][0]+'" data-weight="'+response[0].regular_authority.key_auths[i][1]+'">';
				new_el+=response[0].regular_authority.key_auths[i][0];
				new_el+='<div class="adaptive-show-block"></div>';
				new_el+=' <span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:response[0].regular_authority.key_auths[i][1]})+'</span>';
				new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
				new_el+='</div>';
				el.find('.account-keys .regular-keys').append(new_el);
				++counter;
			}
			if(0==counter){
				el.find('.account-keys .regular-keys .none-auths').css('display','block');
			}
		}
		else{
			el.find('.manage-access-preload-error').html(ltmp_arr.default_account_not_found_or_incorrect_response);
			el.find('.submit-button-ring[rel=preload]').css('display','none');
			el.find('.manage-access-preload-action').removeAttr('disabled');
		}
	});
}
function save_profile(el){
	el.find('.manage-profile-error').html('');
	el.find('.manage-profile-success').html('');
	el.find('.manage-profile-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');

	viz.api.getAccounts([current_user],function(err,response){
		if(err){
			el.find('.manage-profile-error').html('<p class="red">'+ltmp_arr.default_node_not_respond+'</p>');
		}
		else{
			if(typeof response[0] !== 'undefined'){
				if(current_user==response[0].name){
					let json_metadata={};
					if(''!=response[0].json_metadata){
						json_metadata=JSON.parse(response[0].json_metadata);
					}
					console.log(json_metadata);
					if(typeof json_metadata.profile === 'undefined'){
						json_metadata.profile={};
					}
					json_metadata.profile.nickname=el.find('input[name=manage-profile-nickname]').val().trim();
					json_metadata.profile.about=el.find('input[name=manage-profile-about]').val().trim();
					json_metadata.profile.avatar=el.find('input[name=manage-profile-avatar]').val().trim();
					json_metadata.profile.gender=el.find('select[name=manage-profile-gender]').val().trim();

					json_metadata.profile.location=el.find('input[name=manage-profile-location]').val().trim();
					json_metadata.profile.interests=el.find('input[name=manage-profile-interests]').val().trim().split(',');

					for(var i=0;i<json_metadata.profile.interests.length;i++){
						json_metadata.profile.interests[i] = json_metadata.profile.interests[i].trim();
					}
					for(var i=(json_metadata.profile.interests.length - 1);i>0;--i){
						if(''==json_metadata.profile.interests[i]){
							json_metadata.profile.interests.splice(i,1);
						}
					}
					if(json_metadata.profile.interests.length==0){
						delete json_metadata.profile.interests;
					}

					json_metadata.profile.site=el.find('input[name=manage-profile-site]').val().trim();
					json_metadata.profile.mail=el.find('input[name=manage-profile-mail]').val().trim();
					if(typeof json_metadata.profile.services === 'undefined'){
						json_metadata.profile.services={};
					}

					if(''==el.find('input[name=manage-profile-facebook]').val().trim()){
						if(typeof json_metadata.profile.services.facebook !== 'undefined'){
							delete json_metadata.profile.services.facebook;
						}
					}
					else{
						json_metadata.profile.services.facebook=el.find('input[name=manage-profile-facebook]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-instagram]').val().trim()){
						if(typeof json_metadata.profile.services.instagram !== 'undefined'){
							delete json_metadata.profile.services.instagram;
						}
					}
					else{
						json_metadata.profile.services.instagram=el.find('input[name=manage-profile-instagram]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-twitter]').val().trim()){
						if(typeof json_metadata.profile.services.twitter !== 'undefined'){
							delete json_metadata.profile.services.twitter;
						}
					}
					else{
						json_metadata.profile.services.twitter=el.find('input[name=manage-profile-twitter]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-vk]').val().trim()){
						if(typeof json_metadata.profile.services.vk !== 'undefined'){
							delete json_metadata.profile.services.vk;
						}
					}
					else{
						json_metadata.profile.services.vk=el.find('input[name=manage-profile-vk]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-telegram]').val().trim()){
						if(typeof json_metadata.profile.services.telegram !== 'undefined'){
							delete json_metadata.profile.services.telegram;
						}
					}
					else{
						json_metadata.profile.services.telegram=el.find('input[name=manage-profile-telegram]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-skype]').val().trim()){
						if(typeof json_metadata.profile.services.skype !== 'undefined'){
							delete json_metadata.profile.services.skype;
						}
					}
					else{
						json_metadata.profile.services.skype=el.find('input[name=manage-profile-skype]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-viber]').val().trim()){
						if(typeof json_metadata.profile.services.viber !== 'undefined'){
							delete json_metadata.profile.services.viber;
						}
					}
					else{
						json_metadata.profile.services.viber=el.find('input[name=manage-profile-viber]').val().trim();
					}

					if(''==el.find('input[name=manage-profile-whatsapp]').val().trim()){
						if(typeof json_metadata.profile.services.whatsapp !== 'undefined'){
							delete json_metadata.profile.services.whatsapp;
						}
					}
					else{
						json_metadata.profile.services.whatsapp=el.find('input[name=manage-profile-whatsapp]').val().trim();
					}

					if(Object.keys(json_metadata.profile.services).length==0){
						delete json_metadata.profile.services;
					}

					if(''==json_metadata.profile.location){
						delete json_metadata.profile.location;
					}
					if(''==json_metadata.profile.site){
						delete json_metadata.profile.site;
					}
					if(''==json_metadata.profile.mail){
						delete json_metadata.profile.mail;
					}

					let new_json_metadata=JSON.stringify(json_metadata);

					console.log(new_json_metadata);
					viz.broadcast.accountMetadata(users[current_user].active_key,current_user,new_json_metadata,function(err,result){
						if(result){
							el.find('.manage-profile-success').html(ltmp_arr.save_profile_success);
							el.find('.manage-profile-error').html('');

							el.find('.submit-button-ring').css('display','none');
							el.find('.icon-check').css('display','inline-block');
							el.find('.manage-profile-action').removeAttr('disabled');

						}
						else{
							el.find('.manage-profile-error').html(ltmp_arr.default_operation_error);
							el.find('.submit-button-ring').css('display','none');
							el.find('.manage-profile-action').removeAttr('disabled');

							console.log(err);
						}
					});
				}
				else{
					el.find('.manage-profile-error').html(ltmp_arr.default_account_not_found_or_incorrect_response);
					el.find('.submit-button-ring').css('display','none');
					el.find('.manage-profile-action').removeAttr('disabled');
				}
			}
			else{
				el.find('.manage-profile-error').html(ltmp_arr.default_account_not_found_or_incorrect_response);
				el.find('.submit-button-ring').css('display','none');
				el.find('.manage-profile-action').removeAttr('disabled');
			}
		}
	});
	let nickname=$('.page-manage-profile input[name=manage-profile-nickname]').val().trim();
}
function reset_access(account,master_key,el){
	if(!viz.auth.isWif(master_key)){
		el.find('.reset-access-error').html(ltmp_arr.default_invalid_master_key);
		return;
	}
	el.find('.reset-access-error').html('');
	el.find('.reset-access-success').html('');
	el.find('.reset-access-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');

	let auth_types=['regular','active','master','memo'];
	let keys=viz.auth.getPrivateKeys(account,pass_gen(100),auth_types);
	let master = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.masterPubkey, 1]
		]
	};
	let active = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.activePubkey, 1]
		]
	};
	let regular = {
		"weight_threshold": 1,
		"account_auths": [],
		"key_auths": [
			[keys.regularPubkey, 1]
		]
	};
	let memo_key=keys.memoPubkey;

	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			let json_metadata=response[0].json_metadata;
			viz.broadcast.accountUpdate(master_key,account,master,active,regular,memo_key,json_metadata,function(err,result){
				if(result){
					el.find('.reset-access-success').html(ltmp_arr.access_reset_success);
					el.find('.reset-access-error').html('');

					el.find('.submit-button-ring').css('display','none');
					el.find('.icon-check').css('display','inline-block');
					el.find('input[name=reset-access-master-key]').val('');
					el.find('.reset-access-action').removeAttr('disabled');

					el.find('.account-keys .account-login').html(account);
					el.find('.account-keys .master-key').html(keys['master']);
					el.find('.account-keys .active-key').html(keys['active']);
					el.find('.account-keys .regular-key').html(keys['regular']);
					el.find('.account-keys .memo-key').html(keys['memo']);
					el.find('.account-keys').css('display','block');

					download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account+'\r\nMaster key: '+keys['master']+'\r\nActive key: '+keys['active']+'\r\nRegular key: '+keys['regular']+'\r\nMemo key: '+keys['memo']+'');
				}
				else{
					el.find('.reset-access-error').html(ltmp_arr.access_error);
					el.find('.submit-button-ring').css('display','none');
					el.find('.reset-access-action').removeAttr('disabled');

					console.log(err);
				}
			});
		}
		else{
			el.find('.reset-access-error').html(ltmp_arr.default_account_not_found_or_incorrect_response);
			el.find('.submit-button-ring').css('display','none');
			el.find('.reset-access-action').removeAttr('disabled');
		}
	});
}
function set_subaccount_price(account,master_key,seller,offer_price,on_sale,el){
	if(!viz.auth.isWif(master_key)){
		el.find('.sell-subaccount-error').html(ltmp_arr.default_invalid_master_key);
		return;
	}
	el.find('.sell-subaccount-error').html('');
	el.find('.sell-subaccount-success').html('');
	el.find('.sell-subaccount-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');

	if('block'==el.find('.fee-checkbox').css('display')){
		if(!el.find('.fee-checkbox input[name="subaccount-on-sale-fee"]').prop('checked')){
			el.find('.sell-subaccount-error').html(ltmp_arr.default_fee_confirmation);

			el.find('.sell-subaccount-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
			return;
		}
	}
	if(''==offer_price){
		offer_price=0;
	}
	let fixed_tokens_amount=''+parseFloat(offer_price).toFixed(3)+' VIZ';
	viz.api.getAccounts([account],function(err,response){
		if(typeof response[0] !== 'undefined'){
			viz.broadcast.setSubaccountPrice(master_key,account,seller,fixed_tokens_amount,on_sale,function(err,result){
				if(result){
					el.find('.sell-subaccount-success').html(ltmp_arr.sell_subaccount_success);
					el.find('.submit-button-ring').css('display','none');
					el.find('.sell-subaccount-action').removeAttr('disabled');
					el.find('.icon-check').css('display','inline-block');
				}
				else{
					el.find('.sell-subaccount-error').html(ltmp_arr.default_incorrect_response);
					el.find('.submit-button-ring').css('display','none');
					el.find('.sell-subaccount-action').removeAttr('disabled');

					console.log(err);
				}
			});
		}
		else{
			el.find('.sell-subaccount-error').html(ltmp_arr.default_incorrect_response);
			el.find('.sell-subaccount-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
		}
	});
}
function buy_subaccount(account_login,offer_price,tokens_amount,el){
	el.find('.buy-subaccount-error').html('');
	el.find('.buy-subaccount-action').attr('disabled','disabled');
	el.find('.icon-check').css('display','none');
	el.find('.submit-button-ring').css('display','inline-block');
	if(''==tokens_amount){
		tokens_amount=0;
	}
	let fixed_tokens_amount=''+parseFloat(tokens_amount).toFixed(3)+' VIZ';
	let private_key=pass_gen(100,true);
	let public_key=viz.auth.wifToPublic(private_key);
	viz.api.getAccounts([account_login],function(err,response){
		if(typeof response[0] !== 'undefined'){
			el.find('.buy-subaccount-error').html(ltmp_arr.buy_account_subaccount_is_busy);
			el.find('.buy-subaccount-action').removeAttr('disabled');
			el.find('.submit-button-ring').css('display','none');
		}
		else{
			viz.api.getRecoveryRequest(account_login,function(err,response){
				if(null===response){
					viz.broadcast.buyAccount(users[current_user].active_key,current_user,account_login,offer_price,public_key,fixed_tokens_amount,function(err,result){
						if(!err){
							el.find('.submit-button-ring').css('display','none');
							el.find('.icon-check').css('display','inline-block');

							el.find('.account-keys .account-login').html(account_login);
							el.find('.account-keys .master-key').html(private_key);
							el.find('.account-keys .active-key').html(private_key);
							el.find('.account-keys .regular-key').html(private_key);
							el.find('.account-keys .memo-key').html(private_key);
							el.find('.account-keys').css('display','block');

							download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account_login+'\r\nMaster key: '+private_key+'\r\nActive key: '+private_key+'\r\nRegular key: '+private_key+'\r\nMemo key: '+private_key+'');

							update_balances(el.closest('.page').find('.account-balance'));
						}
						else{
							el.find('.buy-subaccount-error').html(ltmp_arr.buy_account_error);
							el.find('.buy-subaccount-action').removeAttr('disabled');
							el.find('.submit-button-ring').css('display','none');

							console.log(err);
						}
					});
				}
				else{
					el.find('.buy-subaccount-error').html(ltmp_arr.buy_account_on_recovery);
					el.find('.buy-subaccount-action').removeAttr('disabled');
					el.find('.submit-button-ring').css('display','none');
				}
			});
		}
	});
}

function create_subaccount(account_login,token_amount,shares_amount,login_el){
	account_login=account_login+'.'+current_user;
	let page=login_el.closest('.page');
	page.find('.create-subaccount-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');
	let fixed_token_amount=''+parseFloat(token_amount).toFixed(3)+' VIZ';
	let fixed_shares_amount=''+parseFloat(shares_amount).toFixed(6)+' SHARES';
	if(''==token_amount){
		fixed_token_amount='0.000 VIZ';
	}
	if(''==shares_amount){
		fixed_shares_amount='0.000000 SHARES';
	}
	let auth_types=['regular','active','master','memo'];
	let keys=viz.auth.getPrivateKeys(account_login,pass_gen(100),auth_types);
	let master = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.masterPubkey, 1]
		]
	};
	let active = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [
			[keys.activePubkey, 1]
		]
	};
	let regular = {
		"weight_threshold": 1,
		"account_auths": [],
		"key_auths": [
			[keys.regularPubkey, 1]
		]
	};
	let memo_key=keys.memoPubkey;
	let json_metadata='';
	let referrer='';

	let account_success=function(result){
		page.find('.submit-button-ring').css('display','none');
		page.find('.icon-check').css('display','inline-block');
		page.find('.create-subaccount-error').html('');
		page.find('.create-subaccount-available').html('');
		login_el.val('');
		login_el.css('border-color','');
		page.find('.create-subaccount-action').removeAttr('disabled');

		page.find('.account-keys .account-login').html(account_login);
		page.find('.account-keys .master-key').html(keys['master']);
		page.find('.account-keys .active-key').html(keys['active']);
		page.find('.account-keys .regular-key').html(keys['regular']);
		page.find('.account-keys .memo-key').html(keys['memo']);
		page.find('.account-keys').css('display','block');

		download('viz-account.txt','my.VIZ.plus\r\n\r\nAccount login: '+account_login+'\r\nMaster key: '+keys['master']+'\r\nActive key: '+keys['active']+'\r\nRegular key: '+keys['regular']+'\r\nMemo key: '+keys['memo']+'');

		update_balances(page.find('.account-balance'));
	}
	let account_failure=function(err){
		console.log(err);

		page.find('.submit-button-ring').css('display','none');
		page.find('.create-subaccount-error').html(ltmp_arr.create_subaccount_error);
		page.find('.create-subaccount-available').html('');
		page.find('.create-subaccount-action').removeAttr('disabled');

		if(account_login){
			viz.api.getAccounts([account_login],function(err,response){
				if(!err){
					page.find('.create-subaccount-available').html(ltmp_arr.check_login_already_exist);
				}
			});
		}
		if(typeof err.cause !== 'undefined'){
			page.find('.create-subaccount-error').html(page.find('.create-subaccount-error').html()+': '+err.cause.data.stack[0].format);
		}
	}
	viz.broadcast.accountCreate(users[current_user].active_key,fixed_token_amount,fixed_shares_amount,current_user,account_login,master,active,regular,memo_key,json_metadata,referrer,[],function(err,result){
		if(!err){
			account_success(result);
		}
		else{
			account_failure(err);
		}
	});
}

window.onpopstate=function(event){
	if(standalone){
		parse_standalone_fullpath();
		change_state(standalone_path+standalone_search,event.state,false);
	}
	else{
		change_state(document.location.pathname+document.location.search,event.state,false);
	}
};

function app_mouse(e){
	if(!e)e=window.event;
	var target=e.target || e.srcElement;
	if(typeof $(target).attr('data-href') != 'undefined'){
		var href=$(target).attr('data-href');
		if($(target).hasClass('menu-el')){
			$('.absolute-view.menu-list').css('display','none');
			/*
			if('none'==$('.menu-list').css('float')){
				$('.menu-list').css('display','none');
			}
			*/
		}
		change_state(href,{},true);
		e.preventDefault();
	}
	if($(target).hasClass('go-top')){
		$('body,html').animate({scrollTop:0},1000);
	}
	if($(target).hasClass('select-lang-action')){
		select_lang($(target).data('lang'));
	}
	if($(target).hasClass('fill-stake-shares-amount-action')){
		let amount=parseFloat($(target).attr('data-raw'));
		$('.page-stake-shares input[name=stake-shares-tokens-amount]').val(amount);
	}
	if($(target).hasClass('fill-transfer-amount-action')){
		let amount=parseFloat($(target).attr('data-raw'));
		$('.page-transfer input[name=transfer-tokens-amount]').val(amount);
	}
	if($(target).hasClass('create-invite-min-balance')){
		let amount=parseFloat($(target).text());
		$('.page-checks input[name=invites-create-amount]').val(parseFloat(amount));
	}
	if($(target).hasClass('show-inactive-witnesses-action')){
		$(target).addClass('hidden');
		$(target).parent().next('.inactive-witnesses').removeClass('hidden');
	}
	if($(target).hasClass('paid-subscribe-action')){
		let provider=$('.page-paid-subscriptions .view-paid-subscription .provider-account').html();
		let level=parseInt($('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-level]').val());
		let amount=parseInt($('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-level]').attr('data-amount'));
		amount=(amount/1000).toFixed(3)+' VIZ';
		let period=parseInt($('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-level]').attr('data-period'));
		let auto_renewal=$('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-auto-renewal]').prop('checked');
		if(typeof $('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-agreement]:checked').val() != 'undefined'){
			let agreement=('true'==$('.page-paid-subscriptions .view-paid-subscription input[name=paid-subscribe-agreement]:checked').val());
			set_paid_subscribe(provider,level,amount,period,auto_renewal,agreement,target);
		}
		else{
			$('.page-paid-subscriptions .view-paid-subscription .paid-subscribe-error').html(ltmp_arr.ps_need_sign_agreement);
			return;
		}
	}
	if($(target).hasClass('cancel-paid-subscribe-action')){
		let descr=$('.page-create-paid-subscribe input[name=create-paid-subscribe-descr]').val().trim();
		let url=$('.page-create-paid-subscribe input[name=create-paid-subscribe-url]').val().trim();
		let url_summary=descr+' '+url;
		url_summary=url_summary.trim();
		let levels=parseInt($('.page-create-paid-subscribe input[name=create-paid-subscribe-levels]').val());
		let amount=$('.page-create-paid-subscribe input[name=create-paid-subscribe-amount]').val().trim();
		let period=parseInt($('.page-create-paid-subscribe input[name=create-paid-subscribe-period]').val());
		create_paid_subscribe(url_summary,levels,amount,period,false,target);
		/*
		if(typeof $('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement]:checked').val() != 'undefined'){
			//let agreement=('true'==$('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement]:checked').val());
		}
		else{
			$('.page-create-paid-subscribe .create-paid-subscribe-error').html(ltmp_arr.ps_need_sign_agreement);
		}
		*/
	}
	if($(target).hasClass('decode-memo-action')){
		let memo_str=$(target).html();
		if(typeof $(target).attr('data-text') !== 'undefined'){
			memo_str=escape_html($(target).attr('data-text'));
		}
		let decoded_memo_str=false;
		let error=false;

		let back_link='';
		if(standalone){
			parse_standalone_fullpath();
			back_link=standalone_path;
		}
		else{
			back_link=document.location.pathname;
		}

		if(typeof users[current_user].memo_key === 'undefined'){
			error=ltmp(ltmp_arr.enter_memo_link,{link:back_link});
		}
		else{
			try{
				decoded_memo_str=viz.memo.decode(users[current_user].memo_key,memo_str);
			}
			catch(e){
				error=ltmp(ltmp_arr.error_update_memo_link,{link:back_link});
			}
		}
		if(false===error){
			$(target).html(decoded_memo_str);
			$(target).removeAttr('data-text');
			$(target).removeClass('decode-memo-action');
		}
		else{
			let target_parent=$(target).parent();
			console.log(target_parent,target_parent.find('.error').length);
			if(target_parent.find('.error').length==0){
				target_parent.append('<div class="red error alone"></div>');
			}
			target_parent.find('.error').html(error);
		}
		return;
	}
	if($(target).hasClass('create-paid-subscribe-action')){
		let descr=$('.page-create-paid-subscribe input[name=create-paid-subscribe-descr]').val().trim();
		let url=$('.page-create-paid-subscribe input[name=create-paid-subscribe-url]').val().trim();
		let url_summary=descr+' '+url;
		url_summary=url_summary.trim();
		let levels=parseInt($('.page-create-paid-subscribe input[name=create-paid-subscribe-levels]').val());
		let amount=$('.page-create-paid-subscribe input[name=create-paid-subscribe-amount]').val().trim();
		let period=parseInt($('.page-create-paid-subscribe input[name=create-paid-subscribe-period]').val());
		let agreement=$('.page-create-paid-subscribe input[name="create-paid-subscribe-agreement"]').prop('checked');
		//if(typeof $('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement]:checked').val() != 'undefined'){
			//let agreement=('true'==$('.page-create-paid-subscribe input[name=create-paid-subscribe-agreement]:checked').val());
		if(agreement){
			create_paid_subscribe(url_summary,levels,amount,period,true,target);
		}
		else{
			$('.page-create-paid-subscribe .create-paid-subscribe-error').html(ltmp_arr.ps_need_sign_agreement);
		}
	}
	if($(target).hasClass('accounts-on-sale-page-action')){
		let page=parseInt($(target).attr('data-page'));
		page--;
		load_accounts_on_sale(page);
	}
	if($(target).hasClass('short-accounts-on-sale-page-action')){
		let page=parseInt($(target).attr('data-page'));
		page--;
		load_short_accounts_on_sale(page);
	}
	if($(target).hasClass('subaccounts-on-sale-page-action')){
		let page=parseInt($(target).attr('data-page'));
		page--;
		load_subaccounts_on_sale(page);
	}
	if($(target).hasClass('show-inactive-paid-subscriptions-action')){
		$(target).css('display','none');
		$('.inactive-paid-subscriptions').css('display','block');
		load_inactive_paid_subscriptions();
	}
	if($(target).hasClass('nodes-config-action')){
		$(target).css('display','none');
		$('.nodes-config').css('display','block');
	}
	/*
	if($(target).hasClass('portable-version-action')){
		$(target).css('display','none');
		$('.portable-version').css('display','block');
	}
	*/
	if($(target).hasClass('add-api-node-action')){
		let node=$('input[name=api-node-url]').val().trim();
		//$('input[name=api-node-url]').val('');
		add_api_node(node);
	}
	if($(target).hasClass('select-api-node')){
		let node=$(target).attr('rel');
		select_api_node(node);
	}
	if($(target).hasClass('remove-api-node')){
		let node=$(target).attr('rel');
		remove_api_node(node);
	}
	if($(target).hasClass('cancel-fund-request-action')){
		let req_id=parseInt($('.page-fund-requests .section-fund-request').attr('data-id'));
		cancel_fund_request(req_id,$('.page-fund-requests .section-fund-request .cancel-fund-request-action'));
	}
	if($(target).hasClass('fund-vote-request-action')){
		let req_id=parseInt($('.page-fund-requests .section-fund-request').attr('data-id'));
		let percent=$('.page-fund-requests .section-fund-request input[name=fund-vote-request-percent]').val();
		fund_vote_request(req_id,percent,$('.page-fund-requests .section-fund-request .fund-vote-request-action'));
	}
	if($(target).hasClass('fund-show-more-requests')){
		$(target).parent().css('display','none');
		$(target).closest('.fund-requests').find('.fund-request.hidden').each(function(){
			update_fund_request($(this).attr('data-id'));
		});
	}
	if($(target).hasClass('fund-show-others-requests')){
		$(target).css('display','none');
		$(target).closest('.page').find('.fund-others').css('display','block');
		update_fund_requests(1);
		update_fund_requests(2);
		update_fund_requests(3);
		update_fund_requests(4);
		update_fund_requests(5);
	}
	if($(target).hasClass('delegate-shares-max-tokens-amount-action') || $(target).hasClass('delegate-shares-max-tokens-amount')){
		$('.page-delegate-shares input[name=delegate-shares-tokens-amount]').val($('.page-delegate-shares .delegate-shares-max-tokens-amount').attr('data-vesting-shares'));
	}
	if($(target).hasClass('witness-props-action')){
		let props_el=$(target).parent().find('.witness-props');
		if('none'==props_el.css('display')){
			props_el.css('display','block');
		}
		else{
			props_el.css('display','none');
		}
	}
	if($(target).hasClass('view-account')){
		let page=$(target).closest('.page');
		if(page.hasClass('page-award')){
			page.find('input[name=award-account]').val($(target).html());
			page.find('input[name=award-account]').keyup();
			page.find('input[name=award-account]').change();
		}
		if(page.hasClass('page-transfer')){
			$('.page-transfer select[name=transfer-template]').val(0);
			$('.page-transfer select[name=transfer-template]').change();
			page.find('input[name=transfer-account]').val($(target).html());
			page.find('input[name=transfer-account]').keyup();
			page.find('input[name=transfer-account]').change();
		}
	}
	if($(target).hasClass('view-percent')){
		let page=$(target).closest('.page');
		if(page.hasClass('page-award')){
			page.find('input[name=award-energy]').val($(target).html());
			page.find('input[name=award-energy]').keyup();
			page.find('input[name=award-energy]').change();
		}
	}
	if($(target).hasClass('view-key')){
		let page=$(target).closest('.page');
		if(page.hasClass('page-checks')){
			page.find('input[name=invites-claim-code]').val($(target).html());
			page.find('input[name=invites-claim-code]').keyup();
			page.find('input[name=invites-claim-code]').change();
		}
	}
	if($(target).hasClass('view-tokens')){
		let page=$(target).closest('.page');
		if(page.hasClass('page-checks')){
			page.find('input[name=invites-create-amount]').val($(target).html());
			page.find('input[name=invites-create-amount]').keyup();
			page.find('input[name=invites-create-amount]').change();
		}
		if(page.hasClass('page-transfer')){
			page.find('input[name=transfer-tokens-amount]').val($(target).html());
			page.find('input[name=transfer-tokens-amount]').keyup();
			page.find('input[name=transfer-tokens-amount]').change();
		}
		if(page.hasClass('page-unstake-shares')){
			page.find('input[name=unstake-shares-tokens-amount]').val($(target).html());
			page.find('input[name=unstake-shares-tokens-amount]').keyup();
			page.find('input[name=unstake-shares-tokens-amount]').change();
		}
		if(page.hasClass('page-stake-shares')){
			page.find('input[name=stake-shares-tokens-amount]').val($(target).html());
			page.find('input[name=stake-shares-tokens-amount]').keyup();
			page.find('input[name=stake-shares-tokens-amount]').change();
		}
	}
	if($(target).hasClass('view-memo')){
		if(typeof $(target).attr('data-text') != 'undefined'){
			$(target).html(escape_html($(target).attr('data-text')));
			$(target).removeAttr('data-text');
			$(target).addClass('full')
		}
		let page=$(target).closest('.page');
		if(page.hasClass('page-award')){
			page.find('input[name=award-memo]').val($(target).html());
			page.find('input[name=award-memo]').keyup();
			page.find('input[name=award-memo]').change();
		}
		if(page.hasClass('page-transfer')){
			page.find('input[name=transfer-memo]').val($(target).html());
			page.find('input[name=transfer-memo]').keyup();
			page.find('input[name=transfer-memo]').change();
		}
	}
	if($(target).hasClass('history-load-more-action')){
		load_history($(target).parent().parent().find('.history'),true,false);
	}
	if($(target).hasClass('award-action')){
		let account=$('.page-award input[name=award-account]').val().toLowerCase().trim();
		let energy=$('.page-award input[name=award-energy]').val().trim();
		let memo=$('.page-award input[name=award-memo]').val().trim();
		let encode=$('.page-award input[name=encode-memo]').prop('checked');
		award(account,energy,memo,encode,target);
	}
	if($(target).hasClass('fund-create-request-action')){
		let descr=$('.page-fund-create-request input[name=fund-create-request-descr]').val().trim();
		let url=$('.page-fund-create-request input[name=fund-create-request-url]').val().trim();
		let url_summary=descr+' '+url;
		url_summary=url_summary.trim();
		let worker=$('.page-fund-create-request input[name=fund-create-request-worker]').val().toLowerCase().trim();
		let min=$('.page-fund-create-request input[name=fund-create-request-min-amount]').val().trim();
		let max=$('.page-fund-create-request input[name=fund-create-request-max-amount]').val().trim();
		let duration=$('.page-fund-create-request input[name=fund-create-request-duration]').val().trim();
		fund_create_request(url_summary,worker,min,max,duration,$('.page-fund-create-request .fund-create-request-action'));
	}
	if($(target).hasClass('invites-create-action')){
		let amount=$('.page-checks input[name=invites-create-amount]').val().trim();
		create_invite(amount,target);
	}
	if($(target).hasClass('invites-claim-action')){
		let code=$('.page-checks input[name=invites-claim-code]').val().trim();
		claim_invite(code,target);
	}
	if($(target).hasClass('invites-use-action')){
		let code=$('.page-checks input[name=invites-claim-code]').val().trim();
		use_invite(code,target);
	}
	if($(target).hasClass('activate-viz-dollars-action')){
		var error=false;
		var account=current_user;
		var code=$('.page-stake-shares input[name=activate-viz-dollars-code]').val().trim();
		$(target).attr('disabled','disabled');
		$('.page-stake-shares .submit-button-ring[rel=activate-viz-dollars]').css('display','inline-block');
		$('.page-stake-shares .icon-check[rel=activate-viz-dollars]').css('display','none');
		$('.page-stake-shares .activate-viz-dollars-error').html('');
		$('.page-stake-shares .activate-viz-dollars-success').html('');
		$.ajax({
			type:'POST',
			url:'https://start.viz.plus/ajax/claim-code/',
			data:{account_login:account,code},
			success:function(result){
				result_json=JSON.parse(result);
				if('too much attempts'==result_json.result){
					error=ltmp_arr.deposit_too_much_attempts;
					$('.page-stake-shares .activate-viz-dollars-error').html(error);
				}
				if('claimed code'==result_json.result){
					error=ltmp_arr.deposit_claimed_code;
					$('.page-stake-shares .activate-viz-dollars-error').html(error);
				}
				if('incorrect code'==result_json.result){
					error=ltmp_arr.deposit_incorrect_code;
					$('.page-stake-shares .activate-viz-dollars-error').html(error);
				}
				if('broadcast error'==result_json.result){
					error=ltmp_arr.deposit_broadcast_error;
					$('.page-stake-shares .activate-viz-dollars-error').html(error);
				}
				if('success'==result_json.result){
					$('.page-stake-shares .activate-viz-dollars-error').html('');
					$('.page-stake-shares .activate-viz-dollars-success').html(ltmp_arr.deposit_success);

					update_balances($('.page-stake-shares .account-balance'));
					$('.page-stake-shares .icon-check[rel=activate-viz-dollars]').css('display','inline-block');
				}
				$(target).removeAttr('disabled');
				$('.page-stake-shares .submit-button-ring[rel=activate-viz-dollars]').css('display','none');
			},
		});
	}
	if($(target).hasClass('deposit-action')){
		var error=false;
		var account=$('.page-deposit input[name=deposit-account]').val().toLowerCase().trim();
		var code=$('.page-deposit input[name=deposit-claim-code]').val().trim();
		$(target).attr('disabled','disabled');
		$('.page-deposit .submit-button-ring').css('display','inline-block');
		$('.page-deposit .icon-check').css('display','none');
		$('.page-deposit .deposit-error').html('');
		$('.page-deposit .deposit-success').html('');
		$.ajax({
			type:'POST',
			url:'https://start.viz.plus/ajax/claim-code-balance/',
			data:{account_login:account,code},
			success:function(result){
				result_json=JSON.parse(result);
				if('too much attempts'==result_json.result){
					error=ltmp_arr.deposit_too_much_attempts;
					$('.page-deposit .deposit-error').html(error);
				}
				if('claimed code'==result_json.result){
					error=ltmp_arr.deposit_claimed_code;
					$('.page-deposit .deposit-error').html(error);
				}
				if('incorrect code'==result_json.result){
					error=ltmp_arr.deposit_incorrect_code;
					$('.page-deposit .deposit-error').html(error);
				}
				if('broadcast error'==result_json.result){
					error=ltmp_arr.deposit_broadcast_error;
					$('.page-deposit .deposit-error').html(error);
				}
				if('success'==result_json.result){
					$('.page-deposit .deposit-error').html('');
					$('.page-deposit .deposit-success').html(ltmp_arr.deposit_success);

					update_balances($('.page-deposit .account-balance'));
				}
				$(target).removeAttr('disabled');
				$('.page-deposit .submit-button-ring').css('display','none');
				$('.page-deposit .icon-check').css('display','inline-block');
			},
		});
	}
	if($(target).hasClass('activate-booster-action')){
		if(typeof window['booster_code'] === 'function'){
			let login=$('.page-booster input[name=booster-account]').val().toLowerCase().trim();
			let code=$('.page-booster input[name=booster-code]').val().trim();
			booster_code(code,login);
		}
	}
	if($(target).hasClass('exchange-buy-action')){
		if(typeof window['exchange_buy'] === 'function'){
			exchange_buy(target);
		}
	}
	if($(target).hasClass('exchange-copy-eth-action')){
		if(typeof window['exchange_copy_eth'] === 'function'){
			exchange_copy_eth(target);
		}
	}
	if($(target).hasClass('exchange-qr-eth-action')){
		if(typeof window['exchange_qr_eth'] === 'function'){
			exchange_qr_eth(target);
		}
	}
	if($(target).hasClass('exchange-sell-action')){
		if(typeof window['exchange_sell'] === 'function'){
			exchange_sell(target);
		}
	}
	if($(target).hasClass('transfer-action')){
		let account=$('.page-transfer input[name=transfer-account]').val().toLowerCase().trim();
		let amount=$('.page-transfer input[name=transfer-tokens-amount]').val().trim();
		let memo=$('.page-transfer input[name=transfer-memo]').val().trim();
		var encode=$('.page-transfer input[name=encode-memo]').prop('checked');
		transfer(account,amount,memo,encode,target);
	}
	if($(target).hasClass('delegate-shares-action')){
		let account=$('.page-delegate-shares input[name=delegate-shares-account]').val().toLowerCase().trim();
		let amount=$('.page-delegate-shares input[name=delegate-shares-tokens-amount]').val().trim();
		delegate_shares(account,amount,target);
	}
	if($(target).hasClass('undelegate-shares-action')){
		let account=$(target).attr('data-account');
		undelegate_shares(account,target);
	}
	if($(target).hasClass('stop-unstake-shares-action')){
		stop_unstake_shares($('.page-unstake-shares .stop-unstake-shares-action'));
	}
	if($(target).hasClass('unstake-shares-action')){
		let tokens_amount=$('.page-unstake-shares input[name=unstake-shares-tokens-amount]').val().trim();
		unstake_shares(tokens_amount,$('.page-unstake-shares .unstake-shares-action'));
	}

	if($(target).hasClass('stake-shares-action')){
		let tokens_amount=$('.page-stake-shares input[name=stake-shares-tokens-amount]').val().trim();
		stake_shares(tokens_amount,$('.page-stake-shares input[name=stake-shares-tokens-amount]'));
	}
	if($(target).hasClass('create-account-action')){
		if($(target).closest('.page-create-account').length){
			let account_login=$('.page-create-account input[name=create-account-login]').val().toLowerCase().trim();
			let token_amount=$('.page-create-account input[name=create-account-token-amount]').val().trim();
			let shares_amount=$('.page-create-account input[name=create-account-shares-amount]').val().trim();
			create_account(account_login,token_amount,shares_amount,$('.page-create-account input[name=create-account-login]'));
		}
	}
	if($(target).hasClass('create-subaccount-action')){
		if($(target).closest('.page-create-subaccount').length){
			let account_login=$('.page-create-subaccount input[name=create-subaccount-login]').val().toLowerCase().trim();
			let token_amount=$('.page-create-subaccount input[name=create-subaccount-token-amount]').val().trim();
			let shares_amount=$('.page-create-subaccount input[name=create-subaccount-shares-amount]').val().trim();
			create_subaccount(account_login,token_amount,shares_amount,$('.page-create-subaccount input[name=create-subaccount-login]'));
		}
	}
	if($(target).hasClass('buy-account-action')){
		let account_login=$('.page-buy-account .buy-account-confirmation input[name=buy-account-login]').val().toLowerCase().trim();
		let offer_price=$('.page-buy-account .buy-account-confirmation input[name=buy-account-offer-price]').attr('data-offer-price');
		let tokens_amount=$('.page-buy-account .buy-account-confirmation input[name=buy-account-token-to-shares]').val().trim();
		buy_account(account_login,offer_price,tokens_amount,$('.page-buy-account .buy-account-confirmation'));
	}
	if($(target).hasClass('buy-short-account-action')){
		let account_login=$('.page-buy-short-account .buy-short-account-confirmation input[name=buy-short-account-login]').val().toLowerCase().trim();
		let offer_price=$('.page-buy-short-account .buy-short-account-confirmation input[name=buy-short-account-offer-price]').attr('data-offer-price');
		let tokens_amount=$('.page-buy-short-account .buy-short-account-confirmation input[name=buy-short-account-token-to-shares]').val().trim();
		buy_short_account(account_login,offer_price,tokens_amount,$('.page-buy-short-account .buy-short-account-confirmation'));
	}
	if($(target).hasClass('buy-subaccount-action')){
		let account_login=$('.page-buy-subaccount .buy-subaccount-confirmation input[name=buy-subaccount-login]').val().toLowerCase().trim();
		account_login=account_login+'.'+$('.page-buy-subaccount .buy-subaccount-confirmation input[name=buy-subaccount-login]').attr('data-suffix');
		let offer_price=$('.page-buy-subaccount .buy-subaccount-confirmation input[name=buy-subaccount-offer-price]').attr('data-offer-price');
		let tokens_amount=$('.page-buy-subaccount .buy-subaccount-confirmation input[name=buy-subaccount-token-to-shares]').val().trim();
		buy_subaccount(account_login,offer_price,tokens_amount,$('.page-buy-subaccount .buy-subaccount-confirmation'));
	}
	if($(target).hasClass('sell-account-action')){
		if(0==$('.page-sell-account input[name=set-account-on-sale]:checked').length){
			$('.page-sell-account').find('.sell-account-error').html(ltmp_arr.default_select_action);
		}
		else{
			let account=$('.page-sell-account input[name=set-account-login]').val().toLowerCase().trim();
			let master_key=$('.page-sell-account input[name=set-account-master-key]').val().trim();
			let seller=$('.page-sell-account input[name=set-account-seller]').val().toLowerCase().trim();
			let offer_price=$('.page-sell-account input[name=set-account-price]').val().trim();
			//let on_sale=$('.page-sell-account input[name=set-account-on-sale]').prop('checked');
			let on_sale=('true'==$('.page-sell-account input[name=set-account-on-sale]:checked').val())
			set_account_price(account,master_key,seller,offer_price,on_sale,$('.page-sell-account'));
		}
	}
	if($(target).hasClass('manage-profile-action')){
		save_profile($('.page-manage-profile'));
	}
	if($(target).hasClass('reset-access-action')){
		let account=$('.page-reset-access input[name=reset-access-login]').val().toLowerCase().trim();
		let master_key=$('.page-reset-access input[name=reset-access-master-key]').val().trim();
		reset_access(account,master_key,$('.page-reset-access'));
	}
	if($(target).hasClass('manage-access-preload-action')){
		let account=$('.page-manage-access input[name=manage-access-login]').val().toLowerCase().trim();
		manage_access_preload(account,$('.page-manage-access'));
	}

	if($(target).hasClass('manage-access-save-action')){
		let account=$('.page-manage-access input[name=manage-access-master-key]').attr('data-account');
		let master_key=$('.page-manage-access input[name=manage-access-master-key]').val().trim();
		manage_access_save(account,master_key,$('.page-manage-access'));
	}
	if($(target).hasClass('delete-auth-action')){
		let parent=$(target).parent();
		let type_el=parent.parent();
		if(parent.hasClass('key-auths')){
			parent.remove();
			if(0<type_el.find('.key-auths').length){
				type_el.find('.none-auths').css('display','none');
			}
			else{
				type_el.find('.none-auths').css('display','block');
			}
		}
		if(parent.hasClass('account-auths')){
			parent.remove();
			if(0<type_el.find('.account-auths').length){
				type_el.find('.none-auths').css('display','none');
			}
			else{
				type_el.find('.none-auths').css('display','block');
			}
		}
	}
	if($(target).hasClass('memo-gen-new-key')){
		let private_key=pass_gen(100,true);
		let public_key=viz.auth.wifToPublic(private_key);
		$('.view-memo input[name=memo-key]').attr('data-public-key',public_key);
		$('.view-memo input[name=memo-key]').val(private_key);
		$('.view-memo .save-memo-key-action').html(ltmp_arr.memo_update_key);
		return;
	}
	if($(target).hasClass('manage-access-gen-memo')){
		let private_key=pass_gen(100,true);
		let public_key=viz.auth.wifToPublic(private_key);
		$('.page-manage-access input[name=manage-access-memo-key]').attr('data-private-key',private_key);
		$('.page-manage-access input[name=manage-access-memo-key]').val(public_key);
	}
	if($(target).hasClass('witness-set-props-action')){
		witness_set_props($('.page-witness-params .witness-set-props'));
	}
	if($(target).hasClass('witness-setup-action')){
		let url=$('.page-witness-params input[name=witness-setup-url]').val().trim();
		let public_key=$('.page-witness-params input[name=witness-setup-signing-key]').val().trim();
		let private_key='';
		if(typeof $('.page-witness-params input[name=witness-setup-signing-key]').attr('data-private-key') !== 'undefined'){
			private_key=$('.page-witness-params input[name=witness-setup-signing-key]').attr('data-private-key');
		}
		witness_setup(url,public_key,private_key,$('.page-witness-params .witness-setup-action'));
	}
	if($(target).hasClass('witness-setup-signing-key-action')){
		e.preventDefault();
		let private_key=pass_gen(100,true);
		let public_key=viz.auth.wifToPublic(private_key);
		$('.page-witness-params input[name=witness-setup-signing-key]').attr('data-private-key',private_key);
		$('.page-witness-params input[name=witness-setup-signing-key]').val(public_key);
		$('.page-witness-params .witness-setup-signing-private-key').html(': '+private_key);
	}
	if($(target).hasClass('witness-setup-signing-private-key')){
		e.preventDefault();
		$(target).selText();
	}
	if($(target).hasClass('witness-setup-signing-key-action')){
		e.preventDefault();
		let private_key=pass_gen(100,true);
		let public_key=viz.auth.wifToPublic(private_key);
		$('.page-witness-params input[name=witness-setup-signing-key]').attr('data-private-key',private_key);
		$('.page-witness-params input[name=witness-setup-signing-key]').val(public_key);
		$('.page-witness-params .witness-setup-signing-private-key').html(private_key);
	}
	if($(target).hasClass('add-account-auths-action')){
		let type=$(target).attr('rel');
		$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').removeClass('red');
		$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').removeClass('red');
		let account=$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').val().toLowerCase().trim();
		let weight=$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').val();
		$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').val(account);
		if(''==account){
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').focus();
			return;
		}
		if(!(/^([a-z0-9\-\.]*)$/).test(account)){
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=account]').focus();
			return;
		}
		if(''==weight){
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').focus();
			return;
		}
		if((parseInt(weight)<=0)||(isNaN(parseInt(weight)))){
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-account-auths input[name=weight]').focus();
			return;
		}
		let new_el='<div class="account-auths" data-account="'+account+'" data-weight="'+weight+'">';
		new_el+=account;
		new_el+='<span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:weight})+'</span>';
		new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
		new_el+='</div>';
		$('.page-manage-access .account-keys .'+type+'-accounts').append(new_el);

		$('.page-manage-access .account-keys .'+type+'-accounts .none-auths').css('display','none');
	}
	if($(target).hasClass('add-key-auths-action')){
		let type=$(target).attr('rel');
		$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').removeClass('red');
		$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').removeClass('red');
		$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').removeClass('red');
		let private_key=$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').val();
		let public_key=$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').val();
		let weight=$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').val();
		if(!viz.auth.isPubkey(public_key)){
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').focus();
			return;
		}
		if(''!=private_key){
			if(!viz.auth.isWif(private_key)){
				$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').addClass('red');
				$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').focus();
				return;
			}
			if(viz.auth.wifToPublic(private_key)!=public_key){
				$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').addClass('red');
				$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').addClass('red');
				$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').focus();
				return;
			}
		}
		if(''==weight){
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').focus();
			return;
		}
		if((parseInt(weight)<=0)||(isNaN(parseInt(weight)))){
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').addClass('red');
			$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=weight]').focus();
			return;
		}
		let new_el='<div class="key-auths" data-key="'+public_key+'" data-weight="'+weight+'" data-private-key="'+private_key+'">';
		new_el+=public_key;
		new_el+='<span class="weight-inline">'+ltmp(ltmp_arr.access_weight_caption,{weight:weight})+'</span>';
		new_el+='<a class="red-button-inline delete-auth-action">'+ltmp_arr.access_remove_caption+'</a>';
		new_el+='</div>';
		$('.page-manage-access .account-keys .'+type+'-keys').append(new_el);

		$('.page-manage-access .account-keys .'+type+'-keys .none-auths').css('display','none');
	}
	if($(target).hasClass('gen-key-auths-action')){
		let type=$(target).attr('rel');
		let private_key=pass_gen(100,true);
		let public_key=viz.auth.wifToPublic(private_key);
		$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=private-key]').val(private_key);
		$('.page-manage-access .account-keys-'+type+' .add-key-auths input[name=public-key]').val(public_key);
	}
	if($(target).hasClass('sell-subaccount-action')){
		if(0==$('.page-sell-subaccount input[name=set-subaccount-on-sale]:checked').length){
			$('.page-sell-subaccount').find('.sell-subaccount-error').html(ltmp_arr.default_select_action);
		}
		else{
			let account=$('.page-sell-subaccount input[name=set-subaccount-login]').val().toLowerCase().trim();
			let master_key=$('.page-sell-subaccount input[name=set-subaccount-master-key]').val().trim();
			let seller=$('.page-sell-subaccount input[name=set-subaccount-seller]').val().toLowerCase().trim();
			let offer_price=$('.page-sell-subaccount input[name=set-subaccount-price]').val().trim();
			let on_sale=('true'==$('.page-sell-subaccount input[name=set-subaccount-on-sale]:checked').val());
			set_subaccount_price(account,master_key,seller,offer_price,on_sale,$('.page-sell-subaccount'));
		}
	}
	if($(target).hasClass('menu-button-action')){
		if('none'==$('.menu-list').css('float')){
			if('none'==$('.absolute-view.menu-list').css('display')){
				$('.absolute-view.menu-list').css('display','block');
				$('.users-drop-down').css('display','none');
			}
			else{
				$('.absolute-view.menu-list').css('display','none');
			}
		}
	}
	if($(target).hasClass('logout') && $(target).parent().hasClass('user-buttons')){
		logout();
	}
	if($(target).hasClass('select-user') && $(target).closest('.sessions')){
		let user_login=$(target).attr('rel');
		if(typeof users[user_login] != 'undefined'){
			current_user=user_login;
			$('.users-drop-down').css('display','none');
			save_session();
			change_user();
		}
	}
	if($(target).hasClass('remove-user') && $(target).closest('.sessions')){
		let user_login=$(target).attr('rel');
		if(typeof users[user_login] != 'undefined'){
			logout(user_login);
			save_session();
			change_user();
		}
	}
	if($(target).hasClass('select-user') && $(target).parent().hasClass('users-drop-down')){
		let user_login=$(target).attr('rel');
		if(typeof users[user_login] != 'undefined'){
			current_user=user_login;
			$('.users-drop-down').css('display','none');
			save_session();
			change_user();
		}
	}
	if(($(target).hasClass('drop-down') && $(target).parent().hasClass('user-buttons'))||($(target).hasClass('login') && $(target).parent().hasClass('user-menu'))){
		if('none'==$('.users-drop-down').css('display')){
			$('.users-drop-down').css('margin-left',''+(-5+15+(-1*($('.users-drop-down').width())))+'px');
			$('.users-drop-down').css('display','block');
			if('none'==$('.menu-list').css('float')){
				$('.absolute-view.menu-list').css('display','none');
			}
		}
		else{
			$('.users-drop-down').css('display','none');
		}
	}
	if($(target).hasClass('add-account') && $(target).parent().hasClass('user-buttons')){
		if(standalone){
			parse_standalone_fullpath();
			change_state('/login/?back='+standalone_path,{},true);
		}
		else{
			change_state('/login/?back='+document.location.pathname,{},true);
		}
	}
	if($(target).hasClass('save-memo-key-action')){
		$(target).attr('disabled','disabled');

		$('.view-'+current_view+' .icon-check').css('display','none');
		$('.view-'+current_view+' .submit-button-ring').css('display','inline-block');
		$('.view-'+current_view+' .success').html('');
		$('.view-'+current_view+' .error').html('');

		$('.view-'+current_view+' input[name=memo-key]').removeClass('red');
		let error=false;
		let memo_key=$('.view-'+current_view+' input[name=memo-key]').val();
		memo_key=memo_key.trim();
		let memo_update_key=(typeof $('.view-memo input[name=memo-key]').attr('data-public-key') !== 'undefined');
		$('.view-'+current_view+' input[name=memo-key]').val(memo_key);

		try{
			viz.auth.wifIsValid(memo_key);
		}
		catch(e){
			error=ltmp_arr.login_memo_wif_invalid;
			$('.view-'+current_view+' input[name=memo-key]').addClass('red');
			$('.view-'+current_view+' .error').html(''+error);
			$('.view-'+current_view+' input[name=memo-key]').focus();
			$(target).removeAttr('disabled');
			$('.view-'+current_view+' .submit-button-ring').css('display','none');
			return false;
		}
		memo_key_public=viz.auth.wifToPublic(memo_key);
		viz.api.getAccounts([current_user],function(err,response){
			if(err){
				error=ltmp_arr.default_incorrect_response;
				$('.view-'+current_view+' .error').html(''+error);

				console.log(err);
				$(target).removeAttr('disabled');
				$('.view-'+current_view+' .submit-button-ring').css('display','none');
				return false;
			}
			else{
				if(typeof response[0] == 'undefined'){
					error=ltmp_arr.login_account_not_found;
					$('.view-'+current_view+' input[name=login]').addClass('red');
					$('.view-'+current_view+' .error').html(''+error);
					$('.view-'+current_view+' input[name=login]').focus();

					console.log(response[0]);
					$(target).removeAttr('disabled');
					$('.view-'+current_view+' .submit-button-ring').css('display','none');
					return false;
				}
				if(current_user!=response[0].name){
					error=ltmp_arr.login_account_not_found;
					$('.view-'+current_view+' input[name=login]').addClass('red');
					$('.view-'+current_view+' .error').html(''+error);
					$('.view-'+current_view+' input[name=login]').focus();

					console.log(response[0]);
					$(target).removeAttr('disabled');
					$('.view-'+current_view+' .submit-button-ring').css('display','none');
					return false;
				}
				else{
					if(memo_update_key){
						let json_metadata='{}';
						if(''!=response[0].json_metadata){
							json_metadata=response[0].json_metadata;
						}

						let txt_to_save='';
						let html_to_show='';
						txt_to_save='my.VIZ.plus\r\n\r\n';
						txt_to_save+='Account: '+current_user+'\r\n';
						txt_to_save+='Memo private key:  '+memo_key;
						html_to_show='<p class="captions">Account: <strong>'+current_user+'</strong></p>';
						html_to_show+='<p class="captions">Memo private key: <strong>'+memo_key+'</strong></p>';
						txt_to_save=txt_to_save.trim();

						viz.broadcast.accountUpdate(users[current_user].active_key,current_user,undefined,undefined,undefined,memo_key_public,json_metadata,function(err,result){
							if(result){
								$('.view-'+current_view+' .success').html(ltmp_arr.memo_key_updated);

								$(target).removeAttr('disabled');
								$('.view-'+current_view+' .submit-button-ring').css('display','none');
								$('.view-'+current_view+' .icon-check').css('display','inline-block');

								users[current_user].memo_key=memo_key;
								save_session();

								$('.view-'+current_view+' .memo-new-key').html(html_to_show);
								download('viz-memo-key.txt',txt_to_save);
							}
							else{
								$('.view-'+current_view+' .error').html(ltmp_arr.access_error);
								$(target).removeAttr('disabled');
								$('.view-'+current_view+' .submit-button-ring').css('display','none');

								console.log(err);
							}
							return;
						});
					}
					else{

						if(memo_key_public!=response[0].memo_key){
							$('.view-'+current_view+' input[name=memo-key]').addClass('red');
							error=ltmp_arr.login_memo_wif_incorrect;
							$('.view-'+current_view+' .error').html(''+error);
							$('.view-'+current_view+' .submit-button-ring').css('display','none');
							return false;
						}

						$('.view-'+current_view+' .success').html(ltmp_arr.memo_key_saved);
						$(target).removeAttr('disabled');
						$('.view-'+current_view+' .submit-button-ring').css('display','none');
						$('.view-'+current_view+' .icon-check').css('display','inline-block');

						users[current_user].memo_key=memo_key;
						save_session();

						setTimeout(function(){
							let back=$('.view-'+current_view+' input[name=back]').val();
							if(''!=back){
								change_state(back,{},true);
							}
						},500);
					}
				}
			}
		});
	}
	if(('login'==current_view)||('index'==current_view)){
		if($(target).hasClass('user-authentication')){
			$('.view-'+current_view+' .error').html('');
			$('.view-'+current_view+' input[name=active-key]').removeClass('red');
			$('.view-'+current_view+' input[name=memo-key]').removeClass('red');
			$('.view-'+current_view+' input[name=login]').removeClass('red');
			let error=false;

			let user_login=$('.view-'+current_view+' input[name=login]').val();
			user_login=user_login.trim();
			user_login=user_login.toLowerCase();
			user_login=user_login.replace(/[^a-z0-9\-\.]/g,'');
			$('.view-'+current_view+' input[name=login]').val(user_login);
			if(''==user_login){
				error=ltmp_arr.login_empty_account;
				$('.view-'+current_view+' input[name=login]').addClass('red');
				$('.view-'+current_view+' .error').html(''+error);
				$('.view-'+current_view+' input[name=login]').focus();
				return false;
			}

			let active_key=$('.view-'+current_view+' input[name=active-key]').val();
			active_key=active_key.trim();
			$('.view-'+current_view+' input[name=active-key]').val(active_key);

			try{
				viz.auth.wifIsValid(active_key);
			}
			catch(e){
				error=ltmp_arr.login_active_wif_invalid;
				$('.view-'+current_view+' input[name=active-key]').addClass('red');
				$('.view-'+current_view+' .error').html(''+error);
				$('.view-'+current_view+' input[name=active-key]').focus();
				return false;
			}

			let memo_key=$('.view-'+current_view+' input[name=memo-key]').val();
			memo_key=memo_key.trim();
			$('.view-'+current_view+' input[name=memo-key]').val(memo_key);
			let memo_key_public='';
			if(''!=memo_key){
				try{
					viz.auth.wifIsValid(memo_key);
				}
				catch(e){
					error=ltmp_arr.login_memo_wif_invalid;
					$('.view-'+current_view+' input[name=memo-key]').addClass('red');
					$('.view-'+current_view+' .error').html(''+error);
					$('.view-'+current_view+' input[name=memo-key]').focus();
					return false;
				}
				memo_key_public=viz.auth.wifToPublic(memo_key);
			}

			let active_key_public=viz.auth.wifToPublic(active_key);
			viz.api.getAccounts([user_login],function(err,response){
				if(err){
					error=ltmp_arr.default_incorrect_response;
					$('.view-'+current_view+' .error').html(''+error);

					console.log(err);
					return false;
				}
				else{
					if(typeof response[0] == 'undefined'){
						error=ltmp_arr.login_account_not_found;
						$('.view-'+current_view+' input[name=login]').addClass('red');
						$('.view-'+current_view+' .error').html(''+error);
						$('.view-'+current_view+' input[name=login]').focus();

						console.log(response[0]);
						return false;
					}
					if(user_login!=response[0].name){
						error=ltmp_arr.login_account_not_found;
						$('.view-'+current_view+' input[name=login]').addClass('red');
						$('.view-'+current_view+' .error').html(''+error);
						$('.view-'+current_view+' input[name=login]').focus();

						console.log(response[0]);
						return false;
					}
					else{
						if(''!=memo_key){
							if(memo_key_public!=response[0].memo_key){
								$('.view-'+current_view+' input[name=memo-key]').addClass('red');
								error=ltmp_arr.login_memo_wif_incorrect;
								$('.view-'+current_view+' .error').html(''+error);
								return false;
							}
						}
						let active_authority=response[0].active_authority;
						let key_weight=0;
						for(i in active_authority.key_auths){
							if(active_authority.key_auths[i][0]==active_key_public){
								key_weight+=active_authority.key_auths[i][1];
							}
						}
						if(key_weight>=active_authority.weight_threshold){
							users[user_login]={active_key};
							if(''!=memo_key){
								users[user_login].memo_key=memo_key;
							}
							current_user=user_login;
							save_session();
							$('.view-'+current_view+' input[name=login]').val('');
							$('.view-'+current_view+' input[name=active-key]').val('');
							change_user($('.view-'+current_view+' input[name=back]').val());
						}
						else{
							$('.view-'+current_view+' input[name=active-key]').addClass('red');
							error=ltmp_arr.login_key_weight_not_enough;
							$('.view-'+current_view+' .error').html(''+error);
							return false;
						}
					}
				}
			});
		}
	}
}

function preset_template(callback){
	if(typeof callback==='undefined'){
		callback=function(){};
	}
	let available_langs_str='';
	for(let i in available_langs){
		available_langs_str+=ltmp(ltmp_arr.select_lang_item,{lang:i,caption:available_langs[i]});
	}
	let select_lang=ltmp(ltmp_arr.select_lang,{items:available_langs_str});
	$('.menu-bg').html(ltmp(ltmp_arr.menu_preset));
	let preset_view=['index','portable','login','memo','accounts','assets','dao','market'];
	for(let i in preset_view){
		let view_name=preset_view[i];
		if(typeof ltmp_arr['preset_view_'+view_name] !== 'undefined'){
			$('.view-'+view_name).html(ltmp(ltmp_arr['preset_view_'+view_name])+select_lang);
			if(typeof ltmp_arr['preset_view_'+view_name+'_title'] !== 'undefined'){
				$('.view-'+view_name).attr('data-title',ltmp_arr['preset_view_'+view_name+'_title']);
			}
		}
	}
	callback();
}
function init_bindings(callback){
	if(typeof callback==='undefined'){
		callback=function(){};
	}

	$(window).resize(function(){
		$('.absolute-view.menu-list').css('display','none');
	});

	if(null!=localStorage.getItem('users')){
		users=JSON.parse(localStorage.getItem('users'));
		if(null!=localStorage.getItem('current_user')){
			current_user=localStorage.getItem('current_user');
			if(''!=current_user){
				if(standalone){
					parse_standalone_fullpath();
					change_user(standalone_path+standalone_search);
				}
				else{
					change_user(document.location.pathname+document.location.search);
				}
			}
			else{
				if(standalone){
					parse_standalone_fullpath();
					change_state(standalone_path+standalone_search,{},false);
				}
				else{
					change_state(document.location.pathname+document.location.search,{},false);
				}
			}
		}
	}
	else{
		if(standalone){
			parse_standalone_fullpath();
			change_state(standalone_path+standalone_search,{},false);
		}
		else{
			change_state(document.location.pathname+document.location.search,{},false);
		}
	}

	clearTimeout(update_dgp_timer);
	update_dgp_timer=setTimeout('update_dgp()',100);

	/*
	let isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
	(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
	!window.MSStream;
	if(!isIOS){
	}
	*/
	document.addEventListener('click', app_mouse, false);
	document.addEventListener('tap', app_mouse, false);
	document.addEventListener('keyup', app_keyboard, false);

	callback();
}
function dom_bindings(callback){
	if(typeof callback==='undefined'){
		callback=function(){};
	}
	energy_radial=new ProgressBar.Circle('.energy-radial',{
		strokeWidth:10,
		color:'#093',
		duration:2000,
		trailColor:'#eee',
		trailWidth:10,
		easing:'easeInOut',
	});

	$('.page-unstake-shares .range-slider').each(function(i,el){
		$(el).find('.range-slider-value').each(function(){
			var value=$(this).prev().attr('value');
			$(this).html(value+('percent'==$(this).attr('rel')?'%':''));
		});
		$(el).find('.range-slider-input').on('input',function(){
			let value_el=$(this).next('.range-slider-value');
			value_el.html(this.value+('percent'==value_el.attr('rel')?'%':''));
			if(typeof $(this).attr('data-input-element') != 'undefined'){
				if(''!=$(this).attr('data-input-element')){
					let data_raw=$($(this).attr('data-input-element')).data('available-vesting-shares');
					if(typeof data_raw != 'undefined'){
						let calc_result=parseFloat(data_raw);
						calc_result=calc_result*parseFloat(this.value)/100;
						$($(this).attr('data-result-element')).val(show_balance_in_tokens(calc_result));
						$($(this).attr('data-result-element')).change();
					}
				}
			}
		});
	});
	$('.page-unstake-shares input[name=unstake-shares-tokens-amount]').on('change',function(){
		let value=parseFloat($(this).val());
		if(!isNaN(value)){
			if(value<0){
				value=0;
			}
			$(this).val(value);
			let range_slider=$(this).parent().find('.range-slider');

			let other=$('.page-unstake-shares input[name=unstake-shares-tokens-left]');
			let shares=$('.page-unstake-shares .shares-balance .vesting-shares').data('available-vesting-shares');
			let all_shares=$('.page-unstake-shares .shares-balance .vesting-shares').data('vesting-shares');
			let withdraw_intervals=28;
			if(!isNaN(parseInt($('.page-unstake-shares .median-props[rel="withdraw_intervals"]').text()))){
				withdraw_intervals=parseInt($('.page-unstake-shares .median-props[rel="withdraw_intervals"]').text());
			}
			if(typeof shares != 'undefined'){
				let calc_result=parseFloat(shares);
				if(value>calc_result){
					value=calc_result;
					$(this).val(value);
				}
				let partition=parseFloat(parseFloat(shares)/withdraw_intervals).toFixed(2);

				let percent=parseInt(value*100/calc_result);
				range_slider.find('.range-slider-input').val(percent);
				range_slider.find('.range-slider-value').html(percent+'%');
				other.parent().find('.range-slider-input').val(100-percent);
				other.parent().find('.range-slider-value').html((100-percent)+'%');

				calc_result=calc_result-value;
				other.val(show_balance_in_tokens(calc_result));

				if(partition>value){
					partition=value;
				}
				$('.page-unstake-shares .unstake-shares-partition').html(show_price_in_tokens(partition));

				let duration=Math.ceil(value/partition);
				if(isNaN(duration)){
					duration=0;
				}
				if(duration>withdraw_intervals){
					duration=withdraw_intervals;
				}
				$('.page-unstake-shares .unstake-shares-duration').html(duration+plural_str(duration,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5));
			}
		}
	});

	$('.page-unstake-shares input[name=unstake-shares-tokens-left]').on('change',function(){
		let value=parseFloat($(this).val());
		if(!isNaN(value)){
			if(value<0){
				value=0;
			}
			$(this).val(value);
			let range_slider=$(this).parent().find('.range-slider');

			let other=$('.page-unstake-shares input[name=unstake-shares-tokens-amount]');
			let shares=$('.page-unstake-shares .shares-balance .vesting-shares').data('available-vesting-shares');
			let all_shares=$('.page-unstake-shares .shares-balance .vesting-shares').data('vesting-shares');
			let withdraw_intervals=28;
			if(!isNaN(parseInt($('.page-unstake-shares .median-props[rel="withdraw_intervals"]').text()))){
				withdraw_intervals=parseInt($('.page-unstake-shares .median-props[rel="withdraw_intervals"]').text());
			}
			if(typeof shares != 'undefined'){
				let calc_result=parseFloat(shares);
				if(value>calc_result){
					value=calc_result;
					$(this).val(value);
				}
				let partition=parseFloat(parseFloat(shares)/withdraw_intervals).toFixed(2);

				let percent=parseInt(value*100/calc_result);
				range_slider.find('.range-slider-input').val(percent);
				range_slider.find('.range-slider-value').html(percent+'%');
				other.parent().find('.range-slider-input').val(100-percent);
				other.parent().find('.range-slider-value').html((100-percent)+'%');

				calc_result=calc_result-value;
				other.val(show_balance_in_tokens(calc_result));

				if(partition>calc_result){
					partition=calc_result;
				}
				$('.page-unstake-shares .unstake-shares-partition').html(show_price_in_tokens(partition));

				let duration=Math.ceil(calc_result/partition);
				if(isNaN(duration)){
					duration=0;
				}
				if(duration>withdraw_intervals){
					duration=withdraw_intervals;
				}
				$('.page-unstake-shares .unstake-shares-duration').html(duration+plural_str(duration,ltmp_arr.plural_days_1,ltmp_arr.plural_days_2,ltmp_arr.plural_days_5));
			}
		}
	});

	$('.page-transfer select[name=transfer-template]').on('change',function(){
		$('.page-transfer input[name=transfer-account]').removeAttr('disabled');
		$('.page-transfer input[name=transfer-tokens-amount]').removeAttr('disabled');
		$('.page-transfer input[name=transfer-memo]').removeAttr('disabled');
		$('.page-transfer input[name=transfer-memo]').removeAttr('data-memo-check');
		$('.page-transfer .transfer-tokens-amount-caption').css('display','none');
		$('.page-transfer .transfer-tokens-amount-fee').html('&hellip;');
		$('.page-transfer .transfer-memo-caption').css('display','none');
		$('.page-transfer .transfer-memo-format').html('&hellip;');
		let template=$(this).find('option[value='+this.value+']');
		if((typeof template.attr('data-account') != 'undefined') && (''!=template.attr('data-account'))){
			$('.page-transfer input[name=transfer-account]').attr('disabled','disabled');
			$('.page-transfer input[name=transfer-account]').val(template.attr('data-account'));
		}
		if((typeof template.attr('data-tokens-amount-fee') != 'undefined') && (''!=template.attr('data-tokens-amount-fee'))){
			if(0==parseFloat(template.attr('data-tokens-amount-fee'))){
				$('.page-transfer .transfer-tokens-amount-caption').css('display','none');
			}
			else{
				$('.page-transfer .transfer-tokens-amount-caption').css('display','block');
				$('.page-transfer .transfer-tokens-amount-caption .transfer-tokens-amount-fee').html(show_price_in_tokens(template.attr('data-tokens-amount-fee'),true));
			}
		}
		if((typeof template.attr('data-memo') != 'undefined') && (''!=template.attr('data-memo'))){
			$('.page-transfer input[name=transfer-memo]').val(template.attr('data-memo'));
		}
		if((typeof template.attr('data-memo-format') != 'undefined') && (''!=template.attr('data-memo-format'))){
			$('.page-transfer .transfer-memo-caption').css('display','block');
			$('.page-transfer .transfer-memo-caption .transfer-memo-format').html(template.attr('data-memo-format'));
		}
		if((typeof template.attr('data-memo-check') != 'undefined') && (''!=template.attr('data-memo-check'))){
			$('.page-transfer input[name=transfer-memo]').attr('data-memo-check',template.attr('data-memo-check'));
		}
		if(typeof template.attr('data-memo-encrypt') != 'undefined'){
			if('false'==template.attr('data-memo-encrypt')){
				$('.page-transfer .encode-memo-checkbox input[type="checkbox"]').prop('checked',false);
				$('.page-transfer .encode-memo-checkbox').css('display','none');
				$('.page-transfer .memo-key-optional').css('display','none');
			}
			else{
				$('.page-transfer .encode-memo-checkbox').css('display','block');
			}
		}
		else{
			$('.page-transfer .encode-memo-checkbox').css('display','block');
		}
	});

	$('.page-checks input[name=invites-claim-code]').on('keyup',function(){
		clearTimeout(check_invite_timer);
		check_invite_timer=setTimeout(check_invite,500,$(this).val(),$('.page-checks .invites-claim-code-caption'));
	});

	$('.page-award input[name=award-energy]').on('keyup',function(){
		let value=parseFloat($(this).val());
		if(isNaN(value)){
			value=0;
		}
		if(value<0){
			value=0;
		}
		if(value>100){
			value=100;
		}
		let range_slider=$(this).parent().parent().find('.range-slider-input');
		range_slider.val(parseInt(value*100));
		range_slider.change();
		/*
		let shares=$('.page-unstake-shares .shares-balance .vesting-shares').attr('data-available-vesting-shares');
		let all_shares=$('.page-unstake-shares .shares-balance .vesting-shares').attr('data-vesting-shares');
		if(typeof shares != 'undefined'){

		}
		*/
	});
	$('.page-award .range-slider').each(function(i,el){
		$(el).find('.range-slider-value').each(function(){
			var value=$(this).prev().attr('value');
			$(this).html('~'+show_balance_in_tokens(parseFloat(value),true));
		});
		$(el).find('.range-slider-input').on('input',function(){
			$($(this).attr('data-result-element')).val(parseFloat(this.value/100).toFixed(2)+'%');
			$(this).change();
		});
		$(el).find('.range-slider-input').on('change',function(){
			let value_el=$(this).next('.range-slider-value');
			if(typeof $(this).attr('data-input-element') != 'undefined'){
				if(''!=$(this).attr('data-input-element')){
					let data_raw=$($(this).attr('data-input-element')).attr('data-raw');
					if(typeof data_raw != 'undefined'){
						data_raw=parseFloat(data_raw);
						data_raw=parseInt(data_raw*1000000);//to int shares
						let current_rshares=parseInt(data_raw*parseInt(parseInt(this.value))/10000);
						let total_reward_shares=parseInt(dgp.total_reward_shares);
						total_reward_shares+=current_rshares;
						let total_reward_fund=parseInt(parseFloat(dgp.total_reward_fund)*1000);//to int tokens
						let reward=(total_reward_fund*current_rshares)/total_reward_shares;
						reward=reward*0.9995;//decrease expectations 0.005%
						reward=Math.ceil(reward)/1000;//to float tokens
						if(isNaN(reward)){
							reward=0;
						}
						$(this).next().html('~'+show_balance_in_tokens(reward,true));
					}
				}
			}
		});
	});

	$('input[type="checkbox"][name="encode-memo"]').on('change',function(){
		let find_memo_key=$(this).closest('.card').find('.memo-key-optional');
		if($(this).prop('checked')){
			find_memo_key.css('display','block');
			if(typeof users[current_user].memo_key !== 'undefined'){
				find_memo_key.find('input[name="memo-key"]').val(users[current_user].memo_key);
			}
		}
		else{
			find_memo_key.css('display','none');
		}
	});
	callback();
}
var energy_radial;
$(document).ready(function(){
	preset_template(function(){
		init_bindings(function(){
			dom_bindings(function(){
				/*
				if(!standalone){
					var hash_load=window.location.hash;
					if(''!=hash_load){
						hash_load=hash_load.substr(1);
						if(-1==hash_load.indexOf('/')){
							if(0<$('.index[data-index='+hash_load+']').length){
								$('body,html').animate({scrollTop:parseInt($('.index[data-index='+hash_load+']').offset().top) - 64 - 10},1000);
							}
						}
					}
				}
				*/
			});
		});
	});
});