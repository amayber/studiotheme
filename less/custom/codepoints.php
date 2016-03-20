<?php
$líneas = file('codepoints.txt');
$less='';
foreach ($líneas as $num_línea => $línea) {
	$l=explode(" ", $línea);
	$l[1]=trim($l[1]," \t\n\r\0\x0B");
    $less=$less.'.@{md-css-prefix}-'.$l[0].':before{content:"\\'.$l[1].'";}';
}
print($less);
?>