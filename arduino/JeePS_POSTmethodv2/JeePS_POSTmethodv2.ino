#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

/*
const char* ssid = "LAPTOP-BUICL812 6668";
const char* password = "889t51M,";
*/

const char* ssid = "dcs-students3";
const char* password = "W1F14students";

TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5);

//Your Domain name with URL path or IP address with path
const char* serverName = "http://10.0.1.101:8080/database/post-esp-data.php";

const char* apiKeyValue = "tPmAT5Ab3j7F9";
float Latitude, Longitude;
String LatitudeString, LongitudeString;
// the following variables are unsigned longs because the time, measured in
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

int JeepID = 1;

void setup() {
  Serial.begin(9600);
  SerialGPS.begin(4800);

  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.print("macAddress: ");
  Serial.println(WiFi.macAddress());
  Serial.print("subnetMask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("gatewayIP: ");
  Serial.println(WiFi.gatewayIP());
  Serial.print("dnsIP: ");
  Serial.println(WiFi.dnsIP());
  Serial.print("broadcastIP: ");
  Serial.println(WiFi.broadcastIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every 10 minutes


  if ((millis() - lastTime) > timerDelay) {
    updateData();
    //Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;

      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      //String httpRequestData = "api_key=tPmAT5Ab3j7F9&ID=1&X=23&Y=50";
      String httpRequestData = "api_key=" + String(apiKeyValue) + "&ID=" + String(JeepID) + "&X=" + String(LatitudeString) + "&Y=" + String(LongitudeString) + "";
      // Send HTTP POST request

      Serial.print("Attempting to Post to ");
      Serial.println(serverName);
      int httpResponseCode = http.POST(httpRequestData);
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.print("Payload: ");
        Serial.println(payload);
      } else {
        Serial.print("HTTP Error: ");
        Serial.println(httpResponseCode);
      }

      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
    delay(1000);
  }
}

void updateData() {
  Serial.print("[GPSD] Receiving...\n");
  LatitudeString = "0";
  LongitudeString = "0";
  if (gps.location.isValid()) {
    Latitude = gps.location.lat();
    LatitudeString = String(Latitude, 6);

    Serial.printf("[LATT] %s\n", LatitudeString);
    Longitude = gps.location.lng();
    LongitudeString = String(Longitude, 6);
    Serial.printf("[LONG] %s\n", LongitudeString);
  } else {
    Serial.println("GPS failed");
    LatitudeString = "0";
    LongitudeString = "0";
  }
}