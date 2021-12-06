#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_HTS221.h>
#include <Adafruit_NeoPixel.h>
#include <ESPAsync_WiFiManager.h>
#include <PubSubClient.h>

// constants
#define I2C_SDA     41
#define I2C_SCL     40
#define LED_PIN     2
#define RGBLED_PIN  18

const char SENSOR_TOPIC[] = "cn466_dave/sensors/cucumber_dave";
const char LED_TOPIC[] = "cn466_dave/leds/cucumber_dave";

// persistence variables
Adafruit_BMP280 bmp;
Adafruit_HTS221 hts;
Adafruit_MPU6050 mpu;
Adafruit_NeoPixel pixels(1, RGBLED_PIN, NEO_GRB + NEO_KHZ800);

AsyncWebServer webServer(80);
WiFiClient esp32Client;
DNSServer dnsServer;
PubSubClient mqttClient(esp32Client);
//IPAddress netpieBroker(35, 186, 155, 39);

// setup sensors and LED
void setupHardware() {
  Wire.begin(I2C_SDA, I2C_SCL, 100000);
  if (bmp.begin(0x76)) {    // prepare BMP280 sensor
    Serial.println("BMP280 sensor ready");
  }
  if (hts.begin_I2C()) {    // prepare HTS221 sensor
    Serial.println("HTS221 sensor ready");
  }
  if (mpu.begin()) {       // prepare MPU6050 sensor
    Serial.println("MPU6050 sensor ready");
  }
  pinMode(LED_PIN, OUTPUT);      // prepare LED
  digitalWrite(LED_PIN, HIGH);
  pixels.begin();                // prepare NeoPixel LED
  pixels.clear();
}

// message reception callback
void callback(char* topic, byte* payload, unsigned int length) {
  char cmd[100];
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0; i<length; i++) {
    cmd[i] = (char)payload[i];
  }
  cmd[length] = 0;
  Serial.println(cmd);
  if (strcmp(cmd, "off") == 0) {
    pixels.setPixelColor(0, pixels.Color(0, 0, 0));
    pixels.show();
  }
  if (strcmp(cmd, "red") == 0) {
    pixels.setPixelColor(0, pixels.Color(25, 0, 0));
    pixels.show();
  }
  if (strcmp(cmd, "green") == 0) {
    pixels.setPixelColor(0, pixels.Color(0, 25, 0));
    pixels.show();
  }
 
}

void setupNetwork() {
  // WiFi
  /*ESPAsync_WiFiManager ESPAsync_wifiManager(&webServer, NULL, "Async_AutoConnect");
  ESPAsync_wifiManager.resetSettings();
  ESPAsync_wifiManager.setAPStaticIPConfig(IPAddress(192,168,132,1), IPAddress(192,168,132,1), IPAddress(255,255,255,0));
  ESPAsync_wifiManager.autoConnect("Cucumber_AP");
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print(F("Connected. Local IP: ")); 
    Serial.println(WiFi.localIP()); 
    WiFi.setAutoReconnect(true);
    WiFi.persistent(true);  
  } else {
    Serial.println(ESPAsync_wifiManager.getStatus(WiFi.status()));
  }
*/
WiFi.begin("Wifi name", "password");
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
}
  // HiveMQ
  mqttClient.setServer("broker.hivemq.com", 1883);
  mqttClient.setCallback(callback);
}

// connect MQTT broker
void connectBroker() {
  char client_id[20];

  sprintf(client_id, "cucumber-%d", esp_random()%10000);
  if (mqttClient.connect(client_id)) {
    mqttClient.subscribe(LED_TOPIC);
  }
}

// initialization
void setup() {
  Serial.begin(115200);
  setupHardware();
  setupNetwork();
  connectBroker();
  Serial.println("Starting");
}

void loop() {
  static uint32_t prev_millis = 0;
  char json_body[200];
  char accel_body[200];
  const char json_tmpl[] = "{\"pressure\": %.2f, \"temperature\": %.2f, \"humidity\": %.2f,"
                           "\"acceleration\": [%.2f,%.2f,%.2f], \"angular_velocity\":[%.2f,%.2f,%.2f]}";
  const char accel[] = "%.2f,%.2f,%.2f";
  sensors_event_t temp, humid;
  sensors_event_t a, g;

    float p = bmp.readPressure();
    hts.getEvent(&humid, &temp);
    float t = temp.temperature;
    float h = humid.relative_humidity;
    mpu.getEvent(&a, &g, &temp);
    float ax = a.acceleration.x;
    float ay = a.acceleration.y;
    float az = a.acceleration.z;
    float gx = g.gyro.x;
    float gy = g.gyro.y;
    float gz = g.gyro.z;
    //sprintf(json_body, json_tmpl, p, t, h, ax, ay, az, gx, gy, gz);
    //Serial.println(json_body);
    
    
  
    
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    
  if (!mqttClient.connected()) {
    connectBroker();
  }
  mqttClient.loop();
  delay(160);
}
