#include <Arduino.h>              // standard Arduino library
#include <TinyGPS++.h>            // for easy reading and translation of data from NEO-6M GPS module
#include <SoftwareSerial.h>       // for the serial monitor
#include <ESP8266WiFi.h>          // for WiFi class
#include <ESP8266HTTPClient.h>    // for HTTPClient class

// Board: NodeMCU 1.0 (ESP-12E Module)
// Platform: Arduino
// Port: Usually COM1 (USB)

/************* Select Target Network *************/
const char* ssid = "dcs-students";
const char* password = "W1F14students";

// Set up GPS serial communication
TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5);   // Pins for serial monitor
bool gpsFlag = false;

// Set up signal LEDs
const int ledGPS = 0;
const int ledWiFi = 2;
const int ledALL = 14;

/************* Select Target PHP Server *************/
// TODO: Create an online PHP server.
const char* serverName = "http://192.168.56.1:8080/database/post-esp-data.php"; // "https://jeeps-api.onrender.com/api/jeeps/1"; //"http://10.0.1.101:8080/database/post-esp-data.php";  // "https://httpbin.org/";

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
  while (SerialGPS.available() > 0)
    if (gps.encode(SerialGPS.read()))
      displayInfo();
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println("No GPS detected");
    while (true)
      ;
  }
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
      // Note: String() class converts values to string.
      
      // Comment out the encoding you don't want to use

      // URL encoding
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      strcpy(httpRequestData, "api_key=tPmAT5Ab3j7F9&ID=");
      strcat(httpRequestData, JeepID);
      strcat(httpRequestData, "&X=");
      strcat(httpRequestData, fBuffLat);
      strcat(httpRequestData, "&Y=");
      strcat(httpRequestData, fBuffLng);
      
      // JSON encoding
      // http.addHeader("Content-Type", "application/json; charset=utf-32");
      // strcpy(httpRequestData, "{'coords':[");
      // strcat(httpRequestData, fBuffLat);
      // strcat(httpRequestData, ",");
      // strcat(httpRequestData, fBuffLng);
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
