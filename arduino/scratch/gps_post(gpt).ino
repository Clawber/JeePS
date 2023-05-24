#include <Adafruit_GPS.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Define GPS module pins
#define GPS_TX_PIN 4
#define GPS_RX_PIN 5

// Define WiFi network credentials
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

// Define server URL and path
const char* serverUrl = "http://example.com";
const char* serverPath = "/api/gps-data";

// Initialize GPS module
SoftwareSerial gpsSerial(GPS_TX_PIN, GPS_RX_PIN);
Adafruit_GPS gps(&gpsSerial);
void setupGPS() {
  gps.begin(9600);
  gps.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  gps.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);
}

void setup() {
  // Initialize serial communication
  Serial.begin(115200);

  // Set up WiFi connection
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Initialize GPS module
  setupGPS();
}

void loop() {
  // Read GPS data
  gps.read();

  // Check if there's new GPS data
  if (gps.newNMEAreceived()) {
    // Parse GPS data
    gps.parse(gps.lastNMEA());

    // Check if the GPS data is valid
    if (gps.fix) {
      // Construct JSON payload
      String payload = "{\"latitude\": " + String(gps.latitudeDegrees, 6) + ", \"longitude\": " + String(gps.longitudeDegrees, 6) + "}";

      // Initialize HTTP client
      HTTPClient http;
      http.begin(serverUrl + serverPath);

      // Set HTTP headers
      http.addHeader("Content-Type", "application/json");

      // Send POST request with payload
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);
      } else {
        Serial.print("Error on HTTP request: ");
        Serial.println(httpResponseCode);
      }

      // Clean up
      http.end();
    }
  }

  // Wait for 1 second before reading new GPS data
  delay(1000);
}
