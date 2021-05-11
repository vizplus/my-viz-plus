var booster_account='invest.viz.plus';
var booster_effective_shares=0;
var booster_percent=1.5;
var booster_ltmp={
	'en':{
		'ok':'Code successfully activated',
	},
	'ru':{
		'ok':'Код успешно активирован',
	},
};

var booster_update_timer=0;
var booster_update_timeout=60000;//60 sec
function booster_update_valuation(){
	let valuation_el=$('.page-booster .booster-valuation');
	let valuation=0;
	valuation_el.html('&hellip;');
	viz.api.getAccount(booster_account,'',function(err,response){
		if(err){
			console.log(err);
			booster_update_timer=setTimeout(function(){
				booster_update_valuation();
			},booster_update_timeout);
		}
		else{
			valuation=parseInt(parseFloat(response.vesting_shares)-parseFloat(response.delegated_vesting_shares));
			valuation=valuation*booster_percent/100;
			valuation=Math.ceil(valuation/100)*100;
			valuation_el.html(valuation);
			booster_update_timer=setTimeout(function(){
				booster_update_valuation();
			},booster_update_timeout);
		}
	});
}
function stop_booster_updates(){
	clearTimeout(booster_update_timer);
}
function booster_init(){
	let page=$('.page-booster');
	page.find('input[name="booster-account"]').val(current_user);
	setTimeout(function(){
		booster_update_valuation();
	},100);
}

function booster_code(code,login){
	let page=$('.page-booster');
	page.find('.activate-booster-action').attr('disabled','disabled');
	page.find('.icon-check').css('display','none');
	page.find('.submit-button-ring').css('display','inline-block');

	page.find('.activate-booster-error').html('');
	page.find('.activate-booster-success').html('');

	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType('text/plain');
	xhr.open('POST','/booster_api.php');
	xhr.setRequestHeader('accept','application/json, text/plain, */*');
	xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(4==xhr.readyState && 200==xhr.status){
			try{
				let json=JSON.parse(xhr.response);
			}
			catch(e){
				console.log('booster api error');
				page.find('.activate-booster-error').html(ltmp(ltmp_arr.default_error,{text:ltmp_arr.default_api_error}));
				page.find('.activate-booster-action').removeAttr('disabled');
				page.find('.submit-button-ring').css('display','none');
			}
			finally{
				let json=JSON.parse(xhr.response);
				console.log('booster api response',json);
				if(json.error !== null){
					page.find('.activate-booster-error').html(ltmp(ltmp_arr.default_error,{text:json.error}));
					page.find('.activate-booster-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
				}
				else{
					page.find('input[name="booster-code"]').val('');
					page.find('.activate-booster-success').html(booster_ltmp[selected_lang]['ok']);
					page.find('.activate-booster-action').removeAttr('disabled');
					page.find('.submit-button-ring').css('display','none');
				}
			}
		}
	}
	xhr.send('code='+encodeURIComponent(code)+'&login='+encodeURIComponent(login));
}