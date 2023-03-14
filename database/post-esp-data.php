<?php
    // Arduino Model: ESP8266 NodeMCU
    // $servername = "localhost";
    // $username = "root";
    // $password = "jeeps";
    // $dbname = "sensordata";

    $host        = "host=192.168.100.124"; # Phone WiFi hotspot (ipconfig)
    $port        = "port=5432";
    $dbname      = "dbname=jeeps";
    $credentials = "user=postgres password=jeeps101";

    /*$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);*/

    $api_key_value = "tPmAT5Ab3j7F9";

    // Initialize vars to empty string
    $api_key = $jeepID = $X = $Y = $PlateNumber = $Time = $Date = "";

    // $_SERVER: superglobal, holds info about headers, paths, and script locations.
    // "REQUEST METHOD": Returns request method used to access the page (such as POST)
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $api_key = test_input($_POST["api_key"]);
        if($api_key == $api_key_value) {
            $JeepID = $_POST["ID"];
            $X = $_POST["X"];
            $Y = $_POST["Y"];
            //$Date = $_POST["Date"];
            //$Time = $_POST["Time"];
            //$PlateNumber = $_POST["Plate"];

            // Create connection (converted from MySQL to PSQL)
            // $conn = new mysqli($servername, $username, $password, $dbname);
            if ($db = pg_connect("$host $port $dbname $credentials")) {
                echo "Connected successfully to $dbname";
            } else {
                die("Connection failed.");
            }

            // Check connection (PSQL)
            test_db($db);

            // Check connection (MSQL)
            // if ($conn->connect_error) {
            //     die("Connection failed: " . $conn->connect_error);
            // } 
            
            /*$sql = "INSERT INTO jeepinfo SET Coordinates = '$Coordinates' WHERE JeepID = 'jeepID'";*/
            /*$sql = "INSERT INTO jeepinfo (JeepID, X, Y, Date, Time, PlateNumber)
            VALUES ('" . $JeepID . "', '" . $X . "', '" . $Y . "', '" . $Date . "', '" . $Time . "', '" . $PlateNumber . "')";*/
            /*UPDATE `jeepinfo` SET X = 0.00, Y = 0.00 WHERE JeepID = 1;*/
            $sql = "UPDATE `jeepinfo` SET X = $X, Y = $Y, Time = now(), Date = CURDATE() WHERE JeepID = $JeepID";
            //http://localhost/sensordata/post-esp-data.php?api_key=tPmAT5Ab3j7F9&ID=0&X=12.3&Y=18.4
            if ($conn->query($sql) === TRUE) {
                echo "Record updated successfully";
            } 
            else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        
            $conn->close();
        }
        else {
            echo "Wrong API Key provided.";
        }

    }else if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $api_key = test_input($_POST["api_key"]);
        if($api_key == $api_key_value) {
            $JeepID = $_GET["ID"];
            $X = $_GET["X"];
        $Y = $_GET["Y"];
        //$Date = $_GET["Date"];
        //$Time = $_GET["Time"];
        //$PlateNumber = $_GET["Plate"];

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            } 
            
            /*$sql = "INSERT INTO jeepinfo SET Coordinates = '$Coordinates' WHERE JeepID = 'jeepID'";*/
            /*$sql = "INSERT INTO jeepinfo (JeepID, X, Y, Date, Time, PlateNumber)
            VALUES ('" . $JeepID . "', '" . $X . "', '" . $Y . "', '" . $Date . "', '" . $Time . "', '" . $PlateNumber . "')";*/
        /*UPDATE `jeepinfo` SET X = 0.00, Y = 0.00 WHERE JeepID = 1;*/
        $sql = "UPDATE `jeepinfo` SET X = $X, Y = $Y, Time = now(), Date = CURDATE() WHERE JeepID = $JeepID";
            //http://localhost/sensordata/post-esp-data.php?api_key=tPmAT5Ab3j7F9&ID=0&X=12.3&Y=18.4
            if ($conn->query($sql) === TRUE) {
                echo "Record updated successfully";
            } 
            else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        
            $conn->close();
        }
        else {
            echo "Wrong API Key provided.";
        }

    }
    else {
        echo "No data posted with HTTP POST.";
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function test_db($db) {
        echo "host = " . pg_host($db);
        echo "port = " . pg_port($db);
        echo "dbname = " . pg_dbname($db);
        echo "options = " . pg_options($db);
        if (pg_ping($db)) {echo "ACK received!";}
        else {echo "Error: No ACK received.";}
    }

    // Notes (cleanup before finalization:)
    /*The name attribute is for submitting a form element to the server;
    many elements may share the same name (e.g. radio buttons, which must
    have the same name within the set). The id attribute is for uniquely
    identifying any element (not just form elements). It must be unique
    throughout the entire document.*/
?>