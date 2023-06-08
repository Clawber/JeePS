#include <Arduino.h>            // standard Arduino library
#include <TinyGPS++.h>          // for easy reading and translation of data from NEO-6M GPS module
#include <SoftwareSerial.h>     // for the serial monitor
#include <ESP8266WiFi.h>        // for WiFi class
#include <ESP8266HTTPClient.h>  // for HTTPClient class

// Board: NodeMCU 1.0 (ESP-12E Module)
// Platform: Arduino
// Port: Usually COM3 (USB)

/************* Select Target Network *************/
const char* ssid = "Royalty";
const char* password = "passwordwoowoo";

// Set up GPS serial communication
TinyGPSPlus gps;
SoftwareSerial SerialGPS(5, 4);  // Pins for serial monitor
bool gpsFlag = false;

// Set up signal LEDs
const int ledGPS = 0;
const int ledWiFi = 2;
const int ledALL = 14;

/************* Select Target PHP Server *************/
const char* serverName = "jeeps-alt.onrender.com";  //"jeeps-alt.onrender.com";
const char* uri = "/api/jeeps/jeepney/1";

/************* Configure TrackerID::JeepID mapping  *************/
const char* JeepID = "1";  // For testing, use JeepID = "1"

const char fingerprint[] PROGMEM = "0C 0D 28 8D EE 2F D9 F6 A3 88 E2 A9 9A CD 32 40 FD 6F 61 11";  //jeeps-alt
// const char fingerprint[] PROGMEM = "E1 B8 81 4C FF 40 71 61 96 53 44 47 6E 43 BD B2 B6 17 F7 20";  //jeeps-api onrender
// const char fingerprint [] PROGMEM = "85 9A AD 92 D7 8A 4B 46 97 6C F4 67 91 19 65 1A 04 63 08 4D"; //requestcatcher
// const char fingerprint [] PROGMEM = "22:6E:AC:E3:C9:9C:47:AF:D4:53:CE:CC:A4:EC:F0:A2:E5:30:D7:62"; //httpbin.org;

char httpRequestData[64];  // initialize http data buffer

// Initialize GPS receiver variables and buffers
float Latitude, Longitude;
char fBuffLat[12];
char fBuffLng[12];

// Configure frequency of rereading GPS information
unsigned long lastTimeWifi = 0;
unsigned long lastTimeGPS = 0;
unsigned long timerDelayWifi = 20000;
unsigned long timerDelayGPS = 1000;

// method declarations
void displayInfo();
void checkGPS();
void(* resetFunc) (void) = 0;

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

  digitalWrite(ledALL, HIGH);  // indicate setup complete

  WiFi.begin(ssid, password);
  Serial.print("\nConnecting to ");
  Serial.println(ssid);
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
  if ((millis() - lastTimeGPS) > timerDelayWifi) {
    checkGPS();
    lastTimeGPS = 0;
  }
  if ((millis() - lastTimeWifi) > timerDelayWifi) {
    sendPOST();
    lastTimeWifi = millis();
  }
  yield();
}

void checkGPS() {
  while (SerialGPS.available() > 0)
    if (gps.encode(SerialGPS.read())) displayInfo();
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println("No GPS detected");
    while (true)
      ;
  }
}

void displayInfo() {
  if (gps.location.isValid()) {
    // Serial.println("GPS info recieved!");
    Latitude = gps.location.lat();
    Longitude = gps.location.lng();
    dtostrf(Latitude, -8, 5, fBuffLat);
    dtostrf(Longitude, -8, 5, fBuffLng);
    // Serial.print("LatBuffer: ");
    // Serial.println(fBuffLat);
    // Serial.print("LngBuffer: ");
    // Serial.println(fBuffLng);
    digitalWrite(ledGPS, HIGH);
    if (!gpsFlag) {
      gpsFlag = true;
      digitalWrite(ledGPS, HIGH);
    }

    // Serial.print("httpRequestData: ");
    // Serial.println(httpRequestData);
  } else {
    Serial.println("Location: Not Available");
    if (gpsFlag) {
      gpsFlag = false;
      digitalWrite(ledGPS, LOW);
    }
  }
}

void sendPOST() {
  /************* Send HTTP POST Data *************/
  Serial.println("TEST");
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    HTTPClient https;

    client.setFingerprint(fingerprint);
    yield();
    https.begin(client, serverName, 443, uri);

    /************* Send HTTP POST Data *************/
    Serial.print("HTTPRequest: ");
    Serial.println(httpRequestData);

    Serial.print("Attempting to Post to ");
    Serial.println(serverName);
    https.addHeader("Content-Type", "application/json");

    strcpy(httpRequestData, "{\"coords\":[");
    strcat(httpRequestData, fBuffLat);
    strcat(httpRequestData, ",");
    strcat(httpRequestData, fBuffLng);
    strcat(httpRequestData, "]}");

    //int httpCode = https.POST(httpRequestData);
    int httpCode = https.PUT(httpRequestData);
    //int httpCode = https.POST("{\"coords\":[12,34]}");
    //int httpCode = https.GET();
    yield();

    /************* Verify response to HTTP POST *************/
    if (httpCode > 0) {
      Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String payload = https.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
    }
    // Free resources
    https.end();
    yield();
  } else {
    /************* upon Disconnection, reset device *************/
    Serial.println("WiFi Disconnected");
    digitalWrite(ledWiFi, LOW);
    resetFunc();
  }
  yield();
}
