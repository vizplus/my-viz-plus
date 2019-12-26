<?php
class DataManagerDatabase {
	public $basename='';
	public $history_arr=array();
	public $counter=0;
	public $last_query='';
	public $link;
	public function __construct($host,$name,$pass){
		$this->connect($host,$name,$pass);
	}
	public function __destructor(){
		$this->close();
	}
	public function connect($host,$name,$pass){
		$this->link=mysqli_connect($host,$name,$pass);

		return $this->link;
	}
	public function close(){
		mysqli_close($this->link);
	}
	public function db($name,$charset='utf8mb4'){
		if(mysqli_select_db($this->link,$name)){
			$this->basename=$name;
			mysqli_set_charset($this->link,$charset);
			return true;
		}
		else
		{
			return false;
		}
	}
	public function row($q=''){
		if (!$q){
			$q=$this->last_query;
		}
		return @mysqli_fetch_assoc($q);
	}
	public function sql_row($sql){
		return $this->row($this->sql($sql));
	}
	public function select_one($from, $attr, $addon = ''){
		$this->sql('SELECT '.$attr.' FROM `'.$from.'` '.$addon.' LIMIT 1');
		$res=$this->row($this->last_query);
		$attr=trim($attr,'`');
		return $res[$attr];
	}
	public function object($q='')
	{
		if ($q==''){
			$q=$this->last_query;
		}
		return @mysqli_fetch_object($q);
	}
	public function table_count($table,$addon=''){
		$this->sql("SELECT count(*) as `count` FROM `".$table.'` '.$addon);
		$buf=$this->row();
		return $buf['count'];
	}
	public function sql($sql){
		$time_start=microtime(true);
		$this->last_query=@mysqli_query($this->link,$sql);
		$time_end=microtime(true);
		$time_delay=($time_end - $time_start);
		$this->history_arr[]=array('sql'=>$sql,'time'=>$time_delay);
		$this->history_arr['time_delay']+=$time_delay;
		$this->counter++;
		return $this->last_query;
	}
	public function last_id(){
		return mysqli_insert_id($this->link);
	}
	public function prepare($text){
		return str_replace(array('\\',"\0","\n","\r","'",'"',"\x1a"),array('\\\\','\\0','\\n','\\r',"\\'",'\\"','\\Z'),$text);
	}
	public function history($id=''){
		if($id){
			return $this->history_arr[$id];
		}
		else{
			return $this->history_arr;
		}
	}
}