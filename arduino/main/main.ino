#include <Arduino.h>              // standard Arduino library
#include <TinyGPS++.h>            // for easy reading and translation of data from NEO-6M GPS module
#include <SoftwareSerial.h>       // for the serial monitor
#include <ESP8266WiFi.h>          // for WiFi class
#include <ESP8266HTTPClient.h>    // for HTTPClient class

// Board: NodeMCU 1.0 (ESP-12E Module)
// Platform: Arduino
// Port: Usually COM3 (USB)

/************* Select Target Network *************/
const char* ssid = "";
const char* password = "";

// Set up GPS serial communication
TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5);   // Pins for serial monitor
bool gpsFlag = false;

// Set up signal LEDs
const int ledGPS = 0;
const int ledWiFi = 2;
const int ledALL = 14;

/************* Select Target PHP Server *************/
const char* serverName = "http://jeeps-api.onrender.com/api/jeeps/1";

const char* apiKeyValue = "tPmAT5Ab3j7F9";  // for verification
char httpRequestData[64];                   // initialize http data buffer

// Initialize GPS receiver variables and buffers
float Latitude, Longitude;
char fBuffLat[8];
char fBuffLng[8];

// Configure frequency of rereading GPS information
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

/************* Configure TrackerID::JeepID mapping  *************/
const char* JeepID = "1";   // For testing, use JeepID = "1"

void displayInfo();

int idx = 0;    // hardcoded for testing only
// char* coords[5] = {"14, 121",
// "14.64827247, 121.0737752",
// "14.652349354571994, 121.06794118881227",
// "14.652992357786058, 121.06233000755311",
// "14.65764329, 121.062349"};

void setup() {
  // Begin monitoring at baud rate 9600
  Serial.begin(9600);
  SerialGPS.begin(9600);

  // Set pin modes
  pinMode(ledGPS, OUTPUT);
  pinMode(ledWiFi, OUTPUT);
  pinMode(ledALL, OUTPUT);
  digitalWrite(ledGPS, LOW);
  digitalWrite(ledWiFi, LOW);
  digitalWrite(ledALL, LOW);

  delay(1000);

  digitalWrite(ledALL, HIGH);   // indicate setup complete

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
  Serial.print("broadcastIP: ");
  Serial.println(WiFi.broadcastIP());



  digitalWrite(ledWiFi, HIGH);  // indicate WiFi connection success
}

void loop() {
  // while (SerialGPS.available() > 0)
  //   if (gps.encode(SerialGPS.read()))
  //     displayInfo();
  // // if (millis() > 5000 && gps.charsProcessed() < 10) {
  // //   Serial.println("No GPS detected");
  // //   while (true)
  // //     ;
  // // }
  if ((millis() - lastTime) > timerDelay) {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;
      yield();
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      
      /************* Prepare HTTP POST Data *************/
      // Ex. httpRequestData = "api_key=tPmAT5Ab3j7F9&ID=1&X=23&Y=50";
      // Note: String()  class converts values to string.
      
      // Comment out the encoding you don't want to use

      // URL encoding
      // http://jeeps-api.onrender.com/api/jeeps/database/post-esp-data.php/api_key=tPmAT5Ab3j7F9&ID=...&X=...&Y=...
      // http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // strcpy(httpRequestData, "api_key=tPmAT5Ab3j7F9&ID=");
      // strcat(httpRequestData, JeepID);
      // strcat(httpRequestData, "&X=");
      // strcat(httpRequestData, fBuffLat);
      // strcat(httpRequestData, "&Y=");
      // strcat(httpRequestData, fBuffLng);
      
      // idx = (idx + 1)%5;

      // JSON encoding

      http.addHeader("Content-Type", "application/json");
      // String httpRequestData = "{\"coords\":[" + String(coords[idx]) + "]}";
      strcpy(httpRequestData, "{\"coords\":[14.64827247, 121.0737752]}");   //
      // strcat(httpRequestData, "14,121");    // fBuffLat
      // // Serial.println(coords[idx]);
      // // strcat(httpRequestData, ",");      // uncomment for actual testing
      // // strcat(httpRequestData, fBuffLng);    // fBuffLng
      // strcat(httpRequestData, "]}");
      
      /************* Send HTTP POST Data *************/
      Serial.print("HTTPRequest: ");
      Serial.println(httpRequestData);

      Serial.print("Attempting to Post to ");
      Serial.println(serverName);
      int httpResponseCode = http.POST(httpRequestData);
      yield();

      /************* Verify response to HTTP POST *************/
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
      } else {
        Serial.print("HTTP Error: ");
        Serial.println(httpResponseCode);
      }

      // Free resources
      http.end();
      yield();
      
    } else {
      Serial.println("WiFi Disconnected");
      digitalWrite(ledWiFi, LOW);
    }
    lastTime = millis();
    yield();
  }
  yield();
}

void displayInfo() {
  if (gps.location.isValid()) {
    Serial.println("GPS info recieved!");
    Latitude = gps.location.lat();
    Longitude = gps.location.lng();
    dtostrf(Latitude, -6, 2, fBuffLat);
    dtostrf(Longitude, -6, 2, fBuffLng);
    Serial.print("LatBuffer: ");
    Serial.println(fBuffLat);
    Serial.print("LngBuffer: ");
    Serial.println(fBuffLng);
    digitalWrite(ledGPS, HIGH);
    if (!gpsFlag) {
      gpsFlag = true;
      digitalWrite(ledGPS, HIGH);
    }
  } else {
    Serial.println("Location: Not Available");
    if (gpsFlag) {
      gpsFlag = false;
      digitalWrite(ledGPS, LOW);
    }
  }

  Serial.println();
  delay(1000);
}
