<?php
function hr(){
	echo "<hr />";
}
$arr = array('apple'=>'10','banana'=>'14','watermelon'=>'10','orange'=>'8');
foreach($arr as $k=>$v){
	if($v==10){
	echo $k."___".$v,"<br>";
}
}
hr();
foreach($arr as $k=>$v){
        if($v==8){
        echo $k."___".$v,"<br>";
}
}
hr();
$arr2 = array(
	array('username'=>'lev1','password'=>'111','id'=>'1-1'),
	array('username'=>'lev2','password'=>'222','id'=>'1-2'),
	array('username'=>'lev3','password'=>'333','id'=>'1-3'),
	array('username'=>'lev4','password'=>'444','id'=>'1-4')
);
	foreach($arr2 as $k){
	if($k['id']=='1-4'){
	echo $k['username'].'   '.$k['password'];
}
}
	

