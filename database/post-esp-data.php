<?php
// Arduino Model: ESP8266 NodeMCU
$api_key_value = "tPmAT5Ab3j7F9";

// Database options
// TODO: LAN enabled na PSQL
$host        = "host=localhost"; # Check ipv6 thru ipconfig
$port        = "port=5432";
$dbname      = "dbname=jeeps";
$credentials = "user=postgres password=jeeps101";

// Connect to database 
$db = pg_connect("$host $port $dbname $credentials");

// Check connection (PSQL)
test_db($db);

// $_SERVER: superglobal, holds info about headers, paths, and script locations.
// "REQUEST METHOD": Returns request method used to access the page (such as POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
    if($api_key == $api_key_value) {
        $trackerID = $_POST["ID"]; // JeepID to trackerID
        $X = $_POST["X"];
        $Y = $_POST["Y"];
        $coords = "($X,$Y)";    // use this if schema uses (X,Y)

        // Sample: http://localhost/sensordata/post-esp-data.php?api_key=tPmAT5Ab3j7F9&ID=0&X=12.3&Y=18.4
        $sql = "UPDATE tracker SET coords = '$coords' WHERE id = $trackerID";

        $ret = pg_query($db, $sql);
        if(!$ret) {
           echo pg_last_error($db);
           exit;
        } else {
           echo "Record updated successfully<br>";
        }
        
        $sql = "SELECT * FROM tracker WHERE id = $trackerID";
        $ret = pg_query($db, $sql);
        $row = pg_fetch_row($ret);
        for($i = 0; $i < count($row); $i++) {
           echo "$row[$i]<br>";
        }
        echo "Operation done successfully<br>";

    }
    else {
        echo "Wrong API Key provided.";
    }

} else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function test_db($db) {
    if ($db) {
        echo "Connected successfully! Options used:<br>";
        echo "host = " . pg_host($db) . "<br>";
        echo "port = " . pg_port($db) . "<br>";
        echo "dbname = " . pg_dbname($db) . "<br>";
    } else {
        die("Error: Connection failed.");
    }

    if (pg_ping($db)) {
        echo "ACK received!" . "<br>";
    } else {
        die("Error: No ACK received.");
    }
}

pg_close($db);

// Notes (cleanup before finalization:)
/*The name attribute is for submitting a form element to the server;
many elements may share the same name (e.g. radio buttons, which must
have the same name within the set). The id attribute is for uniquely
identifying any element (not just form elements). It must be unique
throughout the entire document.*/
?>