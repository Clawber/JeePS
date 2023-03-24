#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define SERVER_IP "192.168.1.42"

#ifndef STASSID
#define STASSID "Kuya Yenzy"
#define STAPSK "123654789"
#endif

TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5);

String serverAddress = "http://192.168.27.124:8888/database/post-esp-data.php";
String apiKeyValue = "tPmAT5Ab3j7F9";

float Latitude, Longitude;
int year, month, date, hour, minute, second;
int trackerID = 4;
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
      http.begin(client, serverAddress);  // HTTP
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      //Build Request String
      //String httpRequestData = "api_key=tPmAT5Ab3j7F9&ID=4&X=12.1&Y=18.1";
      String httpRequestData = "api_key=" + apiKeyValue +"&ID=" + String(trackerID) + "&X=" + LatitudeString + "&Y=" + LongitudeString;
      //SAMPLE String httpRequestData = "api_key=" + apiKeyValue +"&ID=" + String(JeepID) + "&X=" + LatitudeString + "&Y=" + LongitudeString + "";
      Serial.print("[DATA] ");
      Serial.println(httpRequestData);

      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header and body
      int httpCode = http.POST("api_key=tPmAT5Ab3j7F9&ID=4&X=12.1&Y=18.1");
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
  Serial.print("[GPSD] Receiving...\n");
  if (gps.location.isValid()) {
    Latitude = gps.location.lat();
    LatitudeString = String(Latitude, 6);
    Serial.printf("[LATT] %s\n", LatitudeString);
    Longitude = gps.location.lng();
    LongitudeString = String(Longitude, 6);
    Serial.printf("[LONG] %s\n", LatitudeString);
  }
}