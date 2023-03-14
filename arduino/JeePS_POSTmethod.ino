#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define SERVER_IP "192.168.1.42"

#ifndef STASSID
#define STASSID "SSID"
#define STAPSK "PASSWORD"
#endif

TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5);

String serverName = "http://192.168.100.84:8080/sensordata/post-esp-data.php";
String apiKeyValue = "tPmAT5Ab3j7F9";

float Latitude, Longitude;
int year, month, date, hour, minute, second;
int JeepID = 1;
String DateString, TimeString, LatitudeString, LongitudeString;
String QueryString;

unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

void setup() {
  Serial.begin(9600);
  SerialGPS.begin(9600);
  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    if ((WiFi.status() == WL_CONNECTED)) {
      WiFiClient client;
      HTTPClient http;
      while (SerialGPS.available() > 0)
        if (gps.encode(SerialGPS.read())) {
          updateData();
        }

      Serial.print("[HTTP] begin...\n");

      
      
      // configure traged server and url
      http.begin(client, "http://192.168.100.84:8080/sensordata/post-esp-data.php");  // HTTP
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

      //Build Request String
	  //SAMPLE String httpRequestData = "api_key=tPmAT5Ab3j7F9&ID=4&X=12.1&Y=18.1";
      String httpRequestData = "api_key=" + apiKeyValue +"&ID=" + String(JeepID) + "&coords=(" + LatitudeString + "," + LongitudeString + ")";
      
      Serial.print("[DATA] ");
      Serial.println(httpRequestData);

      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header and body
      int httpCode = http.POST(httpRequestData);
      if (httpCode <= 0) {
        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      } else {
        String payload = http.getString();
        Serial.printf("[HTTP] POST... payload: %d\n", payload);
      }
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
      http.end();
    }
    lastTime = millis();
  }
}

void updateData() {
  QueryString = "?ID=1";
  if (gps.location.isValid()) {
    Latitude = gps.location.lat();
    LatitudeString = String(Latitude, 6);
    Longitude = gps.location.lng();
    LongitudeString = String(Longitude, 6);
  }

  if (gps.date.isValid()) {
    DateString = "";
    date = gps.date.day();
    month = gps.date.month();
    year = gps.date.year();

    if (date < 10)
      DateString = '0';
    DateString += String(date);

    DateString += " / ";

    if (month < 10)
      DateString += '0';
    DateString += String(month);
    DateString += " / ";

    if (year < 10)
      DateString += '0';
    DateString += String(year);
  }

  if (gps.time.isValid()) {
    TimeString = "";
    hour = gps.time.hour() + 8;  //adjust UTC
    minute = gps.time.minute();
    second = gps.time.second();

    if (hour < 10)
      TimeString = '0';
    TimeString += String(hour);
    TimeString += " : ";

    if (minute < 10)
      TimeString += '0';
    TimeString += String(minute);
    TimeString += " : ";

    if (second < 10)
      TimeString += '0';
    TimeString += String(second);
  }
}