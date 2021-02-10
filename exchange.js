var exchange_data_account='data.exch.bank.viz.plus';
var exchange_data_block=0;
var exchange_data_timer=0;
var exchange_data={};
var exchange_viz_amount=0;
var exchange_usdt_amount=0;

var canary_account='';
var canary_alive_time=5;//min

var hot_viz_wallet='';
var hot_viz_amount=0;
var cold_viz_wallet='';
var cold_viz_amount=0;

var hot_usdt_address='';
var hot_usdt_amount=0;
var cold_usdt_address='';
var cold_usdt_amount=0;

function render_exchange_viz_provision(){
	let table=$('.page-exchange .table-view.exchange-data');
	let provision=0;
	if(exchange_viz_amount>0){
		provision=hot_viz_amount+cold_viz_amount;
		provision=100*provision/exchange_viz_amount;
		provision=''+parseFloat(provision).toFixed(2)+'%';
	}
	else{
		provision='&mdash;';
	}
	table.find('.provision .viz-data').html(provision);
}

function render_exchange_usdt_provision(){
	let table=$('.page-exchange .table-view.exchange-data');
	let provision=0;
	if(exchange_usdt_amount>0){
		provision=hot_usdt_amount+cold_usdt_amount;
		provision=100*provision/exchange_usdt_amount;
		provision=''+parseFloat(provision).toFixed(2)+'%';
	}
	else{
		provision='&mdash;';
	}
	table.find('.provision .usdt-data').html(provision);
	exchange_recalc_buy();
	exchange_recalc_sell();
}

function setCaretPosition(ctrl, pos) {
	// Modern browsers
	if(ctrl.setSelectionRange){
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	// IE8 and below
	}
	else
	if(ctrl.createTextRange){
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function exchange_check_buy_input(){
	let input=$('.page-exchange .exchange-buy-data input[name="buy-tokens-amount"]');
	//input error text
	input.removeClass('red');
	$('.page-exchange .exchange-buy-input-error').html('');
	let amount=input.val();
	if(''==amount){
		amount=0;
	}
	let error=false;
	if(0==hot_viz_amount){
		error='Подождите загрузки информации';
	}
	if(parseFloat(amount)>hot_viz_amount){
		error='Сумма viz не должна превышать баланс горячего резерва: '+number_thousands(hot_viz_amount(hot_usdt_amount,true));
	}
	if(parseFloat(amount)<parseFloat(exchange_data.buy_viz_limit_min)){
		error='Сумма покупки должна превышать минимальный порог';
	}
	if(parseFloat(amount)>parseFloat(exchange_data.buy_viz_limit_max)){
		error='Сумма покупки не должна превышать максимальный порог';
	}
	if(false!==error){
		input.addClass('red');
		$('.page-exchange .exchange-buy-input-error').html(error);
		let buy_table=$('.page-exchange .table-view.exchange-buy-data');
		buy_table.find('.output-amount .usdt-data').html('&mdash;');
		buy_table.find('.rate .ratio-data').html('&mdash;');
	}
}

function exchange_check_sell_input(){
	$('.page-exchange .exchange-sell-action').attr('disabled','disabled');
	let input=$('.page-exchange .exchange-sell-data input[name="sell-tokens-amount"]');
	input.removeClass('red');
	$('.page-exchange .exchange-sell-input-error').html('');
	let amount=input.val();
	if(''==amount){
		amount=0;
	}

	let user_amount=parseFloat(amount);
	let usdt_amount=0;
	if(user_amount>0){
		//usdt_amount=(parseFloat(exchange_data.usdt_balance)*(1-Math.pow(1-user_amount/parseFloat(exchange_data.viz_balance),1/parseFloat(exchange_data.exchange_ratio))))-parseFloat(exchange_data.usdt_fee);
		usdt_amount=parseFloat(exchange_data.usdt_balance)*
			(
				(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio))-1)
				/
				(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio)))
			)
		-parseFloat(exchange_data.usdt_fee);
		if(usdt_amount<0){
			usdt_amount=0;
		}
	}
	else{
	}

	let error=false;
	let page=$('.page-exchange .exchange-sell-data');
	if(0==hot_usdt_amount){
		error='Подождите загрузки информации';
	}
	if(usdt_amount>hot_usdt_amount){
		error='Сумма usdt не должна превышать баланс горячего резерва: '+number_thousands(show_balance_in_tokens(hot_usdt_amount,false))+' usdt';
	}
	else
	if(0==hot_viz_amount){
		//input error text
		error='Подождите загрузки информации';
	}
	else
	if(parseFloat(amount)<=0){
		error='Проверьте сумму';
	}
	else
	if(parseFloat(amount)>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
		error='Недостаточно средств';
	}
	else
	if(parseFloat(amount)<parseFloat(exchange_data.viz_limit_min)){
		error='Сумма продажи должна превышать минимальный порог';
	}
	else
	if(parseFloat(amount)>parseFloat(exchange_data.viz_limit_max)){
		error='Сумма продажи не должна превышать максимальный порог';
	}
	if(false!==error){
		input.addClass('red');
		$('.page-exchange .exchange-sell-input-error').html(error);
		let sell_table=$('.page-exchange .table-view.exchange-sell-data');
		sell_table.find('.output-amount .usdt-data').html('&mdash;');
		sell_table.find('.rate .ratio-data').html('&mdash;');
	}
	else{
		exchange_check_eth_input();
	}
}
function exchange_check_eth_input(){
	$('.page-exchange .exchange-sell-action').attr('disabled','disabled');
	let input=$('.page-exchange input[name="exchange-outcome-eth-address"]');
	input.removeClass('red');
	$('.page-exchange .exchange-sell-error').html('');

	memo_check_regexp=new RegExp('^(0x)?[0-9a-fA-F]{40}$');
	if(!memo_check_regexp.test(input.val())){
		input.addClass('red');
		$('.page-exchange .exchange-sell-error').html('Введите правильный адрес в формате ETH (42 символа)');
		return;
	}
	if(!$('.page-exchange .exchange-sell-data input[name="sell-tokens-amount"]').hasClass('red')){
		if(''!=$('.page-exchange .exchange-sell-data input[name="sell-tokens-amount"]').val()){
			$('.page-exchange .exchange-sell-action').removeAttr('disabled');
		}
	}
}

function exchange_recalc_buy(){
	let buy_table=$('.page-exchange .table-view.exchange-buy-data');
	if(''==buy_table.find('.exchange-buy-input-error').html()){
		let user_amount=parseFloat($('.exchange-buy-data input[name="buy-tokens-amount"]').val());
		let usdt_amount=0;
		if(user_amount>0){
			usdt_amount=(parseFloat(exchange_data.usdt_balance)*(Math.pow(1+user_amount/parseFloat(exchange_data.viz_balance),1/parseFloat(exchange_data.exchange_ratio))-1))+parseFloat(exchange_data.usdt_fee);
			//console.log(usdt_amount,user_amount,exchange_data);
			buy_table.find('.output-amount .usdt-data').html(number_thousands(show_balance_in_tokens(usdt_amount,false))+' usdt');
		}
		else{
			buy_table.find('.output-amount .usdt-data').html('&mdash;');
		}
		let ratio=0;
		if(user_amount){
			ratio=Math.ceil(1000000*usdt_amount/user_amount)/1000000;
		}
		if(ratio<=0){
			buy_table.find('.rate .ratio-data').html('&mdash;');
		}
		else{
			buy_table.find('.rate .ratio-data').html(ratio+' usdt/viz');
		}
	}
}

function exchange_recalc_sell(){
	let sell_table=$('.page-exchange .table-view.exchange-sell-data');
	if(''==sell_table.find('.exchange-sell-input-error').html()){
		let user_amount=parseFloat($('.exchange-sell-data input[name="sell-tokens-amount"]').val());
		let usdt_amount=0;
		if(user_amount>0){
			//usdt_amount=(parseFloat(exchange_data.usdt_balance)*(1-Math.pow(1-user_amount/parseFloat(exchange_data.viz_balance),1/parseFloat(exchange_data.exchange_ratio))))-parseFloat(exchange_data.usdt_fee);
			usdt_amount=parseFloat(exchange_data.usdt_balance)*
				(
					(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio))-1)
					/
					(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio)))
				)
			-parseFloat(exchange_data.usdt_fee);
			if(usdt_amount<0){
				usdt_amount=0;
			}
			//console.log(usdt_amount,user_amount,exchange_data);
			sell_table.find('.output-amount .usdt-data').html(number_thousands(show_balance_in_tokens(usdt_amount,false))+' usdt');
		}
		else{
			sell_table.find('.output-amount .usdt-data').html('&mdash;');
		}
		let ratio=0;
		if(user_amount){
			ratio=Math.ceil(1000000*usdt_amount/user_amount)/1000000;
		}
		if(ratio<=0){
			sell_table.find('.rate .ratio-data').html('&mdash;');
		}
		else{
			sell_table.find('.rate .ratio-data').html(ratio+' usdt/viz');
		}
	}
}

var exchange_listen_timer=0;
var exchange_listen_from_block=0;
var exchange_listen_find=false;
async function exchange_start_listen(){
	console.log('exchange_start_listen');
	viz.api.getDynamicGlobalProperties(function(err,response){
		if(err){
			console.log(err);
		}
		else{
			exchange_listen_find=false;
			if(response.head_block_number>exchange_listen_from_block){
				while(response.head_block_number>exchange_listen_from_block){
					exchange_listen_from_block++;
					console.log('exchange_start_listen getBlock',exchange_listen_from_block);
					viz.api.getBlock(exchange_listen_from_block,async function(err,result){
						if(!err){
							for(trans of result['transactions']){
								for(oper of trans['operations']){
									if(oper[0] == 'custom' && oper[1]['id']=='vizplus_exchanger'){
										//look for exchange trusted account
										if(oper[1]['required_regular_auths'].includes(exchange_data.viz_wallet)){
											let json=JSON.parse(oper[1]['json']);
											if(json[0]=='new_wallet'){
												if(json[1]['login']==current_user){
													exchange_listen_find=json[1]['eth_wallet'];
													console.log('find!',exchange_listen_find);
												}
											}
										}
									}
								}
							}
							if(!exchange_listen_find){
								clearTimeout(exchange_listen_timer);
								exchange_listen_timer=setTimeout(function(){exchange_start_listen();},3000);
							}
							else{
								clearTimeout(exchange_listen_timer);
								let page=$('.page-exchange');
								page.find('.exchange-buy-view').css('display','block');
								page.find('.exchange-buy-success').html('Адрес успешно получен');
								page.find('input[name=exchange-income-eth-address]').val(exchange_listen_find);
								page.find('.exchange-buy-action').removeAttr('disabled');
								page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
								page.find('.icon-check[rel="exchange-buy"]').css('display','inline-block');
							}
						}
						else{
							console.log(err);
						}
					});
				}
			}

		}
	});
}
function exchange_copy_eth(el){
	let input=$('.page-exchange input[name=exchange-income-eth-address]');
	input.removeAttr('disabled');
	input[0].select();
	input[0].setSelectionRange(0,99999);
	document.execCommand("copy");
	input.attr('disabled','disabled');
	$('.page-exchange .icon-check[rel="exchange-copy-eth"]').css('display','inline-block');
}
function exchange_qr_eth(el){
	let input=$('.page-exchange input[name=exchange-income-eth-address]');
	$('.page-exchange .qr-view').html('');
	$('.page-exchange .qr-view').css('margin','10px');
	new QRCode($('.page-exchange .qr-view')[0],{text:input.val(),width:200,height:200});
	$('.page-exchange .icon-check[rel="exchange-qr-eth"]').css('display','inline-block');
}
function exchange_buy(el){
	let page=$(el).closest('.page');
	page.find('.exchange-buy-action').attr('disabled','disabled');
	page.find('.icon-check[rel="exchange-buy"]').css('display','none');
	page.find('.submit-button-ring[rel="exchange-buy"]').css('display','inline-block');
	page.find('input[name=buy-tokens-amount]').removeClass('red');
	page.find('.exchange-buy-error').html('');
	page.find('.exchange-buy-success').html('');

	if(typeof exchange_data.viz_wallet === 'undefined'){
		page.find('.exchange-buy-error').html('Подождите загрузки информации');

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}

	let amount=page.find('input[name=buy-tokens-amount]').val().trim();
	if(''==amount){
		amount=0;
	}
	let account=exchange_data_account;
	if(parseFloat(exchange_data.eth_wallet_cost)>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
		page.find('input[name=buy-tokens-amount]').addClass('red');
		page.find('.exchange-buy-error').html('Недостаточно средств (требуется '+number_thousands(show_balance_in_tokens(exchange_data.eth_wallet_cost,true))+')');

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}
	/*
	if(0==hot_viz_amount){
		page.find('.exchange-buy-error').html('Подождите загрузки информации');

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}
	if(parseFloat(amount)>hot_viz_amount){
		page.find('.exchange-buy-error').html('Сумма viz не должна превышать баланс горячего резерва: '+number_thousands(hot_viz_amount(hot_usdt_amount,true)));

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}
	if(parseFloat(amount)<parseFloat(exchange_data.buy_viz_limit_min)){
		page.find('input[name=buy-tokens-amount]').addClass('red');
		page.find('.exchange-buy-error').html('Сумма продажи должна превышать минимальный порог');

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}
	if(parseFloat(amount)>parseFloat(exchange_data.buy_viz_limit_max)){
		page.find('input[name=buy-tokens-amount]').addClass('red');
		page.find('.exchange-buy-error').html('Сумма продажи не должна превышать максимальный порог');

		page.find('.exchange-buy-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-buy"]').css('display','none');
		return;
	}
	*/

	let fixed_tokens_amount=''+parseFloat(exchange_data.eth_wallet_cost).toFixed(3)+' VIZ';
	let memo='';
	viz.api.getDynamicGlobalProperties(function(err,response){
		if(err){
			page.find('.exchange-buy-error').html(ltmp_arr.default_operation_error);

			page.find('.exchange-buy-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');

			console.log(err);
		}
		else{
			exchange_listen_from_block=response.head_block_number;
			viz.broadcast.transfer(users[current_user].active_key,current_user,account,fixed_tokens_amount,memo,function(err,result){
				if(!err){
					page.find('.exchange-buy-success').html('Перевод '+show_amount_in_tokens(fixed_tokens_amount,true)+' выполнен успешно, ждем адрес&hellip;');

					//page.find('.exchange-sell-action').removeAttr('disabled');
					//page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
					//page.find('.icon-check[rel="exchange-sell"]').css('display','inline-block');

					//page.find('input[name=sell-tokens-amount]').val('');

					update_balances($('.page-exchange .account-balance'));

					clearTimeout(exchange_listen_timer);
					exchange_listen_timer=setTimeout(function(){exchange_start_listen();},3000);
				}
				else{
					page.find('.exchange-buy-error').html(ltmp_arr.default_operation_error);

					page.find('.exchange-buy-action').removeAttr('disabled');
					page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');

					console.log(err);
				}
			});
		}
	});
}

function exchange_sell(el){
	let sell_table=$('.page-exchange .table-view.exchange-sell-data');
	let user_amount=parseFloat($('.exchange-sell-data input[name="sell-tokens-amount"]').val());
	let usdt_amount=0;
	if(user_amount>0){
		//usdt_amount=(parseFloat(exchange_data.usdt_balance)*(1-Math.pow(1-user_amount/parseFloat(exchange_data.viz_balance),1/parseFloat(exchange_data.exchange_ratio))))-parseFloat(exchange_data.usdt_fee);
		usdt_amount=parseFloat(exchange_data.usdt_balance)*
			(
				(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio))-1)
				/
				(Math.pow(1+user_amount/(parseFloat(exchange_data.viz_balance)+user_amount),1/parseFloat(exchange_data.exchange_ratio)))
			)
		-parseFloat(exchange_data.usdt_fee);
		if(usdt_amount<0){
			usdt_amount=0;
		}
		sell_table.find('.output-amount .usdt-data').html(number_thousands(show_balance_in_tokens(usdt_amount,false))+' usdt');
	}
	else{
		sell_table.find('.output-amount .usdt-data').html('&mdash;');
	}

	let page=$(el).closest('.page');
	page.find('.exchange-sell-action').attr('disabled','disabled');
	page.find('.icon-check[rel="exchange-sell"]').css('display','none');
	page.find('.submit-button-ring[rel="exchange-sell"]').css('display','inline-block');
	page.find('input[name=sell-tokens-amount]').removeClass('red');
	page.find('input[name=exchange-outcome-eth-address]').removeClass('red');
	page.find('.exchange-sell-error').html('');
	page.find('.exchange-sell-success').html('');

	if(typeof exchange_data.viz_wallet === 'undefined'){
		page.find('.exchange-sell-error').html('Подождите загрузки информации');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	if(0==hot_usdt_amount){
		page.find('.exchange-sell-error').html('Подождите загрузки информации');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	if(usdt_amount>hot_usdt_amount){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Сумма usdt не должна превышать баланс горячего резерва: '+number_thousands(show_balance_in_tokens(hot_usdt_amount,false))+' usdt');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}

	let account=exchange_data.viz_wallet;
	let amount=page.find('input[name=sell-tokens-amount]').val().trim();
	let memo=page.find('input[name=exchange-outcome-eth-address]').val().trim();

	amount=amount.replace(/[^0-9\,\.]/g,'');
	page.find('input[name=sell-tokens-amount]').val(amount);

	account=account.replace(/[^a-z0-9\-\.]/g,'');

	if((''==account) || (!(/^([a-z0-9\-\.]*)$/).test(account))){
		page.find('.exchange-sell-error').html('Подождите загрузки информации');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	amount=fast_str_replace(' ','',amount);
	if(-1==amount.indexOf('.')){
		if(2<amount.split(',').length){
			page.find('input[name=sell-tokens-amount]').addClass('red');
			page.find('input[name=sell-tokens-amount]').focus();
			page.find('.exchange-sell-error').html('Проверьте сумму');

			page.find('.exchange-sell-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
			return;
		}
		amount=fast_str_replace(',','.',amount);
	}
	if(2<amount.split('.').length){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Проверьте сумму');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	amount=fast_str_replace(',','',amount);
	page.find('input[name=sell-tokens-amount]').val(amount);
	if(parseFloat(amount)<=0){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Проверьте сумму');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}

	if(parseFloat(amount)>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Недостаточно средств');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	if(parseFloat(amount)<parseFloat(exchange_data.viz_limit_min)){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Сумма продажи должна превышать минимальный порог');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	if(parseFloat(amount)>parseFloat(exchange_data.viz_limit_max)){
		page.find('input[name=sell-tokens-amount]').addClass('red');
		page.find('.exchange-sell-error').html('Сумма продажи не должна превышать максимальный порог');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}

	memo_check_regexp=new RegExp('^(0x)?[0-9a-fA-F]{40}$');
	if(!memo_check_regexp.test(memo)){
		page.find('input[name=exchange-outcome-eth-address]').addClass('red');
		page.find('.exchange-sell-error').html('Введите правильный адрес в формате ETH (42 символа)');

		page.find('.exchange-sell-action').removeAttr('disabled');
		page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
		return;
	}
	let fixed_tokens_amount=''+parseFloat(amount).toFixed(3)+' VIZ';
	if(''==amount){
		fixed_tokens_amount='0.000 VIZ';
	}
	viz.broadcast.transfer(users[current_user].active_key,current_user,account,fixed_tokens_amount,memo,function(err,result){
		if(!err){
			page.find('.exchange-sell-success').html('Перевод '+show_amount_in_tokens(fixed_tokens_amount,true)+' выполнен успешно');

			page.find('.exchange-sell-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');
			page.find('.icon-check[rel="exchange-sell"]').css('display','inline-block');

			page.find('input[name=sell-tokens-amount]').val('');

			update_balances($('.page-exchange .account-balance'));
		}
		else{
			page.find('.exchange-sell-error').html(ltmp_arr.default_operation_error);

			page.find('.exchange-sell-action').removeAttr('disabled');
			page.find('.submit-button-ring[rel="exchange-sell"]').css('display','none');

			console.log(err);
		}
	});
}

function render_exchange_data(){
	let table=$('.page-exchange .table-view.exchange-data');

	canary_account=exchange_data.bird_account;

	hot_viz_wallet=exchange_data.viz_wallet;
	cold_viz_wallet=exchange_data.viz_wallet_cold;

	hot_usdt_address=exchange_data.eth_wallet.toLowerCase();
	cold_usdt_address=exchange_data.eth_wallet_cold.toLowerCase();

	viz.api.getAccounts([hot_viz_wallet,cold_viz_wallet,canary_account],function(err,response){
		load_exchange_account_callback(err,response);
	});

	$('.page-exchange .eth_wallet_cost').html(number_thousands(show_balance_in_tokens(parseFloat(exchange_data.eth_wallet_cost),true)));
	exchange_viz_amount=parseFloat(exchange_data.viz_balance);
	table.find('.summary .viz-data').html(number_thousands(show_balance_in_tokens(exchange_viz_amount,false)));
	//table.find('.summary.adaptive-show-flex .viz-data').html(table.find('.summary.adaptive-show-flex .viz-data').html()+'&nbsp;viz');
	exchange_usdt_amount=parseFloat(exchange_data.usdt_balance);
	table.find('.summary .usdt-data').html(number_thousands(show_balance_in_tokens(exchange_usdt_amount,false)));
	//table.find('.summary.adaptive-show-flex .usdt-data').html(table.find('.summary.adaptive-show-flex .usdt-data').html()+'&nbsp;usdt');
	table.find('.rate .ratio-data').html(parseFloat(exchange_data.rate).toFixed(5)+'&nbsp;usdt/viz');

	let buy_table=$('.page-exchange .table-view.exchange-buy-data');
	exchange_data.buy_viz_limit_min=parseFloat(exchange_data.buy_viz_limit_min);
	buy_table.find('.min-amount .viz-data').html(number_thousands(show_balance_in_tokens(exchange_data.buy_viz_limit_min,true)));
	exchange_data.buy_viz_limit_max=parseFloat(exchange_data.buy_viz_limit_max);
	buy_table.find('.max-amount .viz-data').html(number_thousands(show_balance_in_tokens(exchange_data.buy_viz_limit_max,true)));

	buy_table.find('.output-amount .usdt-data').html(number_thousands(show_balance_in_tokens(0,false))+' usdt');
	buy_table.find('.rate .ratio-data').html('&mdash;');

	let sell_table=$('.page-exchange .table-view.exchange-sell-data');
	exchange_data.viz_limit_min=parseFloat(exchange_data.viz_limit_min);
	sell_table.find('.min-amount .viz-data').html(number_thousands(show_balance_in_tokens(exchange_data.viz_limit_min,true)));
	exchange_data.viz_limit_max=parseFloat(exchange_data.viz_limit_max);
	sell_table.find('.max-amount .viz-data').html(number_thousands(show_balance_in_tokens(exchange_data.viz_limit_max,true)));

	sell_table.find('.output-amount .usdt-data').html(number_thousands(show_balance_in_tokens(0,false))+' usdt');
	sell_table.find('.rate .ratio-data').html('&mdash;');

	setTimeout(function(){
		load_exchange_eth();
		render_exchange_viz_provision();
		render_exchange_usdt_provision();
	},100);

	//buy binds
	$('.exchange-buy-data input[name="buy-tokens-amount"]').unbind('keyup');
	$('.exchange-buy-data input[name="buy-tokens-amount"]').bind('keyup',function(e){
		if(!e)e=window.event;
		//console.log('keyup',e);
		if(8==e.keyCode){//backspace
			//need to init recalc function after value change
			setTimeout(function(){
				exchange_check_buy_input();
				exchange_recalc_buy();
			},10);
		}
	});
	$('.exchange-buy-data input[name="buy-tokens-amount"]').unbind('keypress');
	$('.exchange-buy-data input[name="buy-tokens-amount"]').bind('keypress',function(e){
		if(!e)e=window.event;
		e.preventDefault();
		//console.log('keypress',e);
		let carret_pos=this.selectionStart;
		let selection_pos=this.selectionEnd;

		let left_part=this.value.substr(0,carret_pos);
		let right_part=this.value.substr(selection_pos);

		let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
		let char=String.fromCharCode(key);
		if(/^([^0-9.,])$/.test(char)){
			return false;
		}
		if(','==char){
			char='.';
		}
		$(this).val(''+left_part+char+right_part);
		setCaretPosition(this,1+carret_pos);
		let float_val=parseFloat(this.value);
		/*
		if(float_val<exchange_data.buy_viz_limit_min){
			float_val=exchange_data.buy_viz_limit_min;
			$(this).val(''+float_val);
			return false;
		}
		*/
		if(float_val>exchange_data.buy_viz_limit_max){
			float_val=exchange_data.buy_viz_limit_max;
			$(this).val(''+float_val);
			exchange_check_buy_input();
			exchange_recalc_buy();
			return false;
		}
		let float_preview=Math.floor(float_val*100)/100;
		if(float_preview!=this.value){
			this.value=float_preview;
		}
		exchange_check_buy_input();
		exchange_recalc_buy();
	});
	$('.exchange-buy-data input[name="buy-tokens-amount"]').unbind('input');
	$('.exchange-buy-data input[name="buy-tokens-amount"]').bind('input',function(e){
		if(!e)e=window.event;
		e=e.originalEvent;
		e.preventDefault();
		let char=e.data;
		if(null!==char){
			if(char.length>1){
				char=char.slice(-1);
			}
			let save=true;
			let addon='';
			if(/^([^0-9.,])$/.test(char)){
				save=false;
			}
			if(','==char){
				addon='.';
			}
			let float_val=parseFloat($(this).val());
			if(float_val>exchange_data.buy_viz_limit_max){
				float_val=exchange_data.buy_viz_limit_max;
				$(this).val(''+float_val);
				exchange_check_buy_input();
				exchange_recalc_buy();
				return false;
			}
			let float_preview=Math.floor(float_val*100)/100;
			if(float_preview!=$(this).val()){
				$(this).val(''+float_preview);
			}
			if(!save){
				$(this).val(''+$(this).val().slice(0,-char.length));
			}
			$(this).val(''+$(this).val()+addon);
		}
		exchange_check_buy_input();
		exchange_recalc_buy();
	});

	//sell binds
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').unbind('keyup');
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').bind('keyup',function(e){
		if(!e)e=window.event;
		if(8==e.keyCode){//backspace
			//need to init recalc function after value change
			setTimeout(function(){
				exchange_check_eth_input();
			},10);
		}
	});
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').unbind('keypress');
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').bind('keypress',function(e){
		setTimeout(function(){
			exchange_check_eth_input();
		},10);
	});
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').unbind('input');
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').bind('input',function(e){
		setTimeout(function(){
			exchange_check_eth_input();
		},10);
	});
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').unbind('change');
	$('.exchange-sell-view input[name="exchange-outcome-eth-address"]').bind('change',function(e){
		setTimeout(function(){
			exchange_check_eth_input();
		},10);
	});

	$('.exchange-sell-data input[name="sell-tokens-amount"]').unbind('keyup');
	$('.exchange-sell-data input[name="sell-tokens-amount"]').bind('keyup',function(e){
		if(!e)e=window.event;
		//console.log('keyup',e);
		if(8==e.keyCode){//backspace
			//need to init recalc function after value change
			setTimeout(function(){
				exchange_check_sell_input();
				exchange_recalc_sell();
			},10);
		}
	});
	$('.exchange-sell-data input[name="sell-tokens-amount"]').unbind('keypress');
	$('.exchange-sell-data input[name="sell-tokens-amount"]').bind('keypress',function(e){
		if(!e)e=window.event;
		e.preventDefault();
		//console.log('keypress',e);
		let carret_pos=this.selectionStart;
		let selection_pos=this.selectionEnd;

		let left_part=this.value.substr(0,carret_pos);
		let right_part=this.value.substr(selection_pos);

		let key=(e.charCode)?e.charCode:((e.keyCode)?e.keyCode:((e.which)?e.which:0));
		let char=String.fromCharCode(key);
		if(/^([^0-9.,])$/.test(char)){
			return false;
		}
		if(','==char){
			char='.';
		}
		$(this).val(''+left_part+char+right_part);
		setCaretPosition(this,1+carret_pos);
		let float_val=parseFloat(this.value);
		/*
		if(float_val<exchange_data.viz_limit_min){
			float_val=exchange_data.viz_limit_min;
			$(this).val(''+float_val);
			return false;
		}
		*/
		if(float_val>exchange_data.viz_limit_max){
			float_val=exchange_data.viz_limit_max;
			$(this).val(''+float_val);
			exchange_check_sell_input();
			exchange_recalc_sell();
			return false;
		}
		let page=$('.page-exchange');
		if(float_val>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
			float_val=parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'));
			$(this).val(''+float_val);
			exchange_check_sell_input();
			exchange_recalc_sell();
			return false;
		}
		exchange_check_sell_input();
		exchange_recalc_sell();
	});
	$('.exchange-sell-data input[name="sell-tokens-amount"]').unbind('input');
	$('.exchange-sell-data input[name="sell-tokens-amount"]').bind('input',function(e){
		if(!e)e=window.event;
		e=e.originalEvent;
		e.preventDefault();
		let char=e.data;
		if(null!==char){
			if(char.length>1){
				char=char.slice(-1);
			}
			let save=true;
			let addon='';
			if(/^([^0-9.,])$/.test(char)){
				save=false;
			}
			if(','==char){
				addon='.';
			}
			let float_val=parseFloat($(this).val());
			if(float_val>exchange_data.viz_limit_max){
				float_val=exchange_data.viz_limit_max;
				$(this).val(''+float_val);
				exchange_check_sell_input();
				exchange_recalc_sell();
				return false;
			}
			let page=$('.page-exchange');
			if(float_val>parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'))){
				float_val=parseFloat(page.find('.account-balance span[rel=token]').attr('data-raw'));
				$(this).val(''+float_val);
				exchange_check_sell_input();
				exchange_recalc_sell();
				return false;
			}
			let float_preview=Math.floor(float_val*100)/100;
			if(float_preview!=$(this).val()){
				$(this).val(''+float_preview);
			}
			if(!save){
				$(this).val(''+$(this).val().slice(0,-char.length));
			}
			$(this).val(''+$(this).val()+addon);
		}
		exchange_check_sell_input();
		exchange_recalc_sell();
	});
}

function load_exchange_account_callback(err,response){
	let table=$('.page-exchange .table-view.exchange-data');
	if(!err){
		//console.log(response);
		for(let i in response){
			let account=response[i];
			if(exchange_data_account==account.name){
				let last_block_num=account.custom_sequence_block_num;
				//last_block_num=19487397;
				if(exchange_data_block<last_block_num){
					exchange_data_block=last_block_num;
					viz.api.getOpsInBlock(last_block_num,false,function(err,response){
						if(!err){
							let find=false;
							for(let i in response){
								let trx=response[i];
								if('custom'==trx.op[0]){
									if('vizplus_exchanger'==trx.op[1].id){
										if(trx.op[1].required_regular_auths.includes(exchange_data_account)){
											find=JSON.parse(trx.op[1].json);
										}
									}
								}
							}
							//console.log(response);
							console.log(find);
							if('exchanger_data'==find[0]){
								exchange_data=find[1];
								render_exchange_data();
							}
						}
					});
				}
			}
			if(hot_viz_wallet==account.name){
				hot_viz_amount=parseFloat(account.balance);
				table.find('.hot .viz-data').html('<a href="https://info.viz.plus/accounts/'+hot_viz_wallet+'/" target="_blank">'+number_thousands(show_balance_in_tokens(hot_viz_amount,false))+'</a>');
				//table.find('.hot.adaptive-show-flex .viz-data').html(table.find('.hot.adaptive-show-flex .viz-data').html()+'&nbsp;viz');
			}
			if(cold_viz_wallet==account.name){
				cold_viz_amount=parseFloat(account.balance);
				table.find('.cold .viz-data').html('<a href="https://info.viz.plus/accounts/'+cold_viz_wallet+'/" target="_blank">'+number_thousands(show_balance_in_tokens(cold_viz_amount,false))+'</a>');
				//table.find('.cold.adaptive-show-flex .viz-data').html(table.find('.cold.adaptive-show-flex .viz-data').html()+'&nbsp;viz');
			}
			if(canary_account==account.name){
				check_exchange_loading();
			}
			render_exchange_viz_provision();
		}
	}
}
function load_exchange_eth(){
	let table=$('.page-exchange .table-view.exchange-data');

	//usdt data
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType('text/plain');
	xhr.open('POST','/exchange_api.php');
	xhr.setRequestHeader('accept','application/json, text/plain, */*');
	xhr.setRequestHeader('content-type','application/json');
	xhr.onreadystatechange = function() {
		if(4==xhr.readyState && 200==xhr.status){
			//console.log(xhr,xhr.response);
			try{
				let json=JSON.parse(xhr.response);
			}
			catch(e){
				console.log('exchange api error');
			}
			finally{
				let json=JSON.parse(xhr.response);
				for(let i in json){
					if(i==hot_usdt_address){
						hot_usdt_amount=json[i];
						table.find('.hot .usdt-data').html('<a href="https://etherscan.io/address/'+hot_usdt_address+'" target="_blank">'+number_thousands(show_balance_in_tokens(hot_usdt_amount,false))+'</a>');
						//table.find('.hot.adaptive-show-flex .usdt-data').html(table.find('.hot.adaptive-show-flex .usdt-data').html()+'&nbsp;usdt');
					}
					if(i==cold_usdt_address){
						cold_usdt_amount=json[i];
						table.find('.cold .usdt-data').html('<a href="https://etherscan.io/address/'+cold_usdt_address+'" target="_blank">'+number_thousands(show_balance_in_tokens(cold_usdt_amount,false))+'</a>');
						//table.find('.cold.adaptive-show-flex .usdt-data').html(table.find('.cold.adaptive-show-flex .usdt-data').html()+'&nbsp;usdt');
					}
				}
				render_exchange_usdt_provision();
			}
		}
	}
	xhr.send();
}
function load_exchange_data(){
	//viz data
	viz.api.getAccounts([exchange_data_account],function(err,response){
		load_exchange_account_callback(err,response);
	});
	clearTimeout(exchange_data_timer);
	exchange_data_timer=setTimeout(function(){load_exchange_data()},30000);//10sec
}
function exchange_loading_error(){
	$('.page-exchange .loading-status').css('display','block');
	$('.page-exchange .loading-status p.loading-error').css('display','block');
	$('.page-exchange .loading-status p.wait-loading').css('display','none');
	$('.page-exchange .successful-loading').css('display','none');
}
function exchange_successful_loading(){
	$('.page-exchange .loading-status').css('display','none');
	$('.page-exchange .loading-status p.loading-error').css('display','none');
	$('.page-exchange .loading-status p.wait-loading').css('display','none');
	$('.page-exchange .successful-loading').css('display','block');
}
function check_exchange_loading(){
	$('.page-exchange .loading-status').css('display','block');
	$('.page-exchange .loading-status p.wait-loading').css('display','block');
	$('.page-exchange .loading-status p.loading-error').css('display','none');
	$('.page-exchange .successful-loading').css('display','none');
	viz.api.getAccount(canary_account,'vizplus_exchanger',function(err,account_data){
		if(err){
			console.log(err);
			exchange_loading_error();
		}
		else{
			//console.log('check_exchange_loading getAccount',account_data);
			viz.api.getOpsInBlock(account_data.custom_sequence_block_num,false,function(err,response){
				if(err){
					console.log(err);
					exchange_loading_error();
				}
				else{
					//console.log('check_exchange_loading getOpsInBlock',response);
					let find=false;
					for(let i in response){
						let trx=response[i];
						if('custom'==trx.op[0]){
							if('vizplus_exchanger'==trx.op[1].id){
								if(trx.op[1].required_regular_auths.includes(canary_account)){
									find=JSON.parse(trx.op[1].json);
								}
							}
						}
					}
					if('exchanger_status'==find[0]){
						//console.log('check_exchange_loading found exchanger_status');
						let date_str=fast_str_replace(' ','T',find[1].datetime);
						let time_offset=Math.floor((new Date().getTime() - new Date(date_str).getTime())/1000/60);
						console.log('check_exchange_loading','date_str=',date_str,'time_offset=',time_offset,'canary_alive_time=',canary_alive_time);
						if(canary_alive_time<time_offset){
							exchange_loading_error();
						}
						else{
							exchange_successful_loading();
						}
					}
					if(false===find){
						exchange_loading_error();
					}
				}
			});
		}
	});
}
function stop_load_exchange_data(){
	clearTimeout(exchange_data_timer);
}
$(document).ready(function(){
	load_exchange_data();
});