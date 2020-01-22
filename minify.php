<?php
$langs_arr=['rus','eng'];
foreach($langs_arr as $lang){
	$input_file='index.'.$lang.'.php';
	if(file_exists($input_file)){
		$main=file_get_contents($input_file);
		print '<hr><div><b>Lang: '.$lang.'</b></div>';
		print '<div>+'.$input_file.' ('.(round(filesize($input_file)/1024,2)).' Kb)</div>';
		preg_match_all('~<\?(.*)\?>~iUs',$main,$stack);
		foreach($stack[0] as $k=>$v){
			$main=str_replace($v,'',$main);
		}

		preg_match_all('~<!--(.*)-->~iUs',$main,$stack);
		foreach($stack[0] as $k=>$v){
			$main=str_replace($v,'',$main);
		}

		preg_match_all('~<img(.*)src="(.*)"(.*)>~iUs',$main,$img_stack);
		foreach($img_stack[0] as $k=>$img_change){
			$img_file=$img_stack[2][$k];
			$img_file=ltrim($img_file,'/');
			if(false!==strpos($img_file,'?')){
				$img_file=substr($img_file,0,strpos($img_file,'?'));
			}
			$img=file_get_contents($img_file);
			$img_base64=base64_encode($img);
			$img_new='<img'.$img_stack[1][$k].'src="data:image/svg+xml;base64,'.$img_base64.'"'.$img_stack[3][$k].'>';
			$main=str_replace($img_change,$img_new,$main);
			print '<div>+'.$img_file.' ('.(round(filesize($img_file)/1024,2)).' Kb)</div>';
			unset($img);
			unset($img_file);
			unset($img_base64);
			unset($img_new);
		}
		unset($img_stack);

		preg_match_all('~<link rel="stylesheet" href="(.*)">~iUs',$main,$css_stack);
		foreach($css_stack[0] as $k=>$css_change){
			$css_file=$css_stack[1][$k];
			$css_file=ltrim($css_file,'/');
			if(false!==strpos($css_file,'?')){
				$css_file=substr($css_file,0,strpos($css_file,'?'));
			}
			$css=file_get_contents($css_file);
			preg_match_all('~/\*(.*)\*/~iUs',$css,$stack);
			foreach($stack[0] as $k=>$v){
				$css=str_replace($v,'',$css);
			}
			$css=str_replace("\r\n\r\n\r\n",PHP_EOL,$css);
			$css=str_replace("\r\n\r\n",PHP_EOL,$css);
			$css=str_replace(PHP_EOL.PHP_EOL.PHP_EOL,PHP_EOL,$css);
			$css=str_replace(PHP_EOL.PHP_EOL,PHP_EOL,$css);

			preg_match_all('~url\((.*)\)~iUs',$css,$img_stack);
			foreach($img_stack[0] as $k=>$img_change){
				$img_file=$img_stack[1][$k];
				$img_file=trim($img_file,' "\'');
				$img_file=ltrim($img_file,'/');
				if(false!==strpos($img_file,'?')){
					$img_file=substr($img_file,0,strpos($img_file,'?'));
				}
				$img=file_get_contents($img_file);
				$img_base64=base64_encode($img);
				$img_new='url("data:image/svg+xml;base64,'.$img_base64.'")';
				$css=str_replace($img_change,$img_new,$css);
				print '<div>+'.$img_file.' in css '.$css_file.' ('.(round(filesize($img_file)/1024,2)).' Kb)</div>';
				unset($img);
				unset($img_file);
				unset($img_base64);
				unset($img_new);
			}
			unset($img_stack);

			$main=str_replace($css_change,'<style>'.$css.'</style>',$main);
			print '<div>+'.$css_file.' ('.(round(filesize($css_file)/1024,2)).' Kb)</div>';
			unset($css);
			unset($css_file);
		}
		unset($css_stack);

		preg_match_all('~<script(.*)src="(.*)"(.*)></script>~iUs',$main,$js_stack);
		foreach($js_stack[0] as $k=>$js_change){
			$js_file=$js_stack[2][$k];
			$js_file=ltrim($js_file,'/');
			if(false!==strpos($js_file,'?')){
				$js_file=substr($js_file,0,strpos($js_file,'?'));
			}
			$js=file_get_contents($js_file);
			$js=str_replace("\r\n\r\n\r\n",PHP_EOL,$js);
			$js=str_replace("\r\n\r\n",PHP_EOL,$js);
			$js=str_replace(PHP_EOL.PHP_EOL.PHP_EOL,PHP_EOL,$js);
			$js=str_replace(PHP_EOL.PHP_EOL,PHP_EOL,$js);
			$main=str_replace($js_change,'<script>'.$js.'</script>',$main);
			print '<div>+'.$js_file.' ('.(round(filesize($js_file)/1024,2)).' Kb)</div>';
			unset($js);
			unset($js_file);
		}
		unset($js_stack);

		print '<div>+favicon.ico ('.(round(filesize('favicon.ico')/1024,2)).' Kb)</div>';
		$favicon_base64=base64_encode(file_get_contents('favicon.ico'));
		$main=str_replace('href="/favicon.ico"','href="data:image/x-icon;base64,'.$favicon_base64.'"',$main);

		$main=preg_replace('~<a class="menu-el color-red" data-href="/market/">(.*)</a>~','',$main);
		$main=str_replace('portable-version-card ','portable-version-card hidden ',$main);
		$main=preg_replace('~<div class="select-lang captions">(.*)</div>~','',$main);

		$main=str_replace('var standalone=false;','var standalone=true;',$main);
		$output_file='my-viz-plus'.('-'.$lang).'.html';
		file_put_contents($output_file,$main);
		print '<div>'.$output_file.' ('.(round(filesize($output_file)/1024,2)).' Kb)</div>';
	}
}
exit;