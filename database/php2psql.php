<!-- # Embed within HTML?
-t C:\UPDLabs\PSQLPractice for starting with different root
-->

<?php
   # http://localhost:4000/www/php2psql.php?coords=(11.16,20.32)
   # echo "$_SERVER['SERVER_ADDR']";

   $coords = $_GET["coords"]; # get point value from HTTP GET

   $host        = "host=192.168.100.124"; # Phone WiFi hotspot (ipconfig)
   $port        = "port=5432";
   $dbname      = "dbname=jeeps";
   $credentials = "user=postgres password=jeeps101";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error : Unable to open database<br>";
   } else {
      echo "Opened database successfully<br>";
   }

   $sql = "UPDATE tracker SET coords = '$coords' WHERE id = 1";
   $ret = pg_query($db, $sql);
   if(!$ret) {
      echo pg_last_error($db);
      exit;
   } else {
      echo "Record updated successfully<br>";
   }
   
   $sql = "SELECT * FROM tracker WHERE id = 1";
   $ret = pg_query($db, $sql);
   $row = pg_fetch_row($ret);
   for($i = 0; $i < count($row); $i++) {
      echo "$row[$i]<br>";
   }
   echo "Operation done successfully<br>";
   pg_close($db);
?>