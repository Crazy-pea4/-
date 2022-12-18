/*
 * 调用库文件
 */
#include<SimpleDHT.h>            //DHT11温湿度传感器库
#include <BH1750.h>              //GY30光照传感器库
#include <Wire.h>                //IIC/I2C通信库
#include <ESP8266WiFi.h>//wifi功能包
#include <ArduinoJson.h>//json包
#include <AliyunIoTSDK.h>//GitHub上一个封装好的阿里云数据传输包，特别好用
AliyunIoTSDK iot;
static WiFiClient espClient;

/*
 * 定义引脚及全局变量
 */
#define TrgPin D0                //超声波模块Trig引脚
#define EcoPin D1                //超声波模块Echo引脚
#define DH11Pin D2               //温湿度模块Data引脚
#define AoutPin A0               //土壤湿度模块Aout引脚
#define SCLPin D3                //光照度模块SCL引脚
#define SDAPin D4                //光照度模块SDA引脚
#define TapPin D5                //继电器模块IN脚（控制电磁阀）
#define LightPin D6              //补光灯引脚
#define high 9                  //水桶高度
int autotap_flag = 1;            //自动滴灌标志
int autolight_flag = 1;          //自动补光标志
byte temperature = 25;           //空气温度
byte humidity = 0;               //空气湿度
SimpleDHT11 dht11(DH11Pin);      //调用库进行温湿度类定义
BH1750 lightMeter;               //调用库进行光照类定义

//阿里云设备三元组，能够唯一确定设备
#define PRODUCT_KEY "**********"
#define DEVICE_NAME "**********"
#define DEVICE_SECRET "**********"
//地区
#define REGION_ID "cn-shanghai"
//wifi信息
#define WIFI_SSID "Q"
#define WIFI_PASSWD "Aa123654789."

unsigned long lastMsMain = 0;
DynamicJsonDocument doc(1024);   //上传至阿里云iot的信息长度上限


/*
 * 函数：初始化wifi信息
 * 用途：连接wifi
 */
void wifiInit(const char *ssid, const char *passphrase){
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, passphrase);
  WiFi.setAutoConnect (true);
  WiFi.setAutoReconnect (true);
  while (WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.println("WiFi not Connect");
  }
  Serial.println("Connected to AP");
}

/*
 * 函数：TapCallback
 * 用途：接收Tap数据后执行事件
 */
void TapCallback(JsonVariant p){
    int PowerSwitch = p["Tap"];
    if (PowerSwitch == 1){
      digitalWrite(TapPin,HIGH);
    }
    else{
      digitalWrite(TapPin,LOW);
    }
}

/*
 * 函数：LightCallback
 * 用途：接收Tap数据后执行事件
 */
void LightCallback(JsonVariant p){
    int PowerSwitch = p["Light"];
    if (PowerSwitch == 1){
      digitalWrite(LightPin,HIGH);
    }
    else{
      digitalWrite(LightPin,LOW);
    }
}

/*
 * 函数：autotapCallback
 * 用途：接收autotap数据后执行事件
 */
void autotapCallback(JsonVariant p){
    autotap_flag = p["autotap"];
}

/*
 * 函数：autolight
 * 用途：接收autolight数据后执行事件
 */
void autolightCallback(JsonVariant p){
    autolight_flag = p["autolight"];
}

/*
 * 模块：HC-SR04超声波模块
 * 用途：测量剩余水量
 */
float hcsr04(){
  float dist;
  float d;
  digitalWrite(TrgPin, LOW);
  delayMicroseconds(8);
  digitalWrite(TrgPin, HIGH);                   //维持10毫秒高电平用来产生一个脉冲
  delayMicroseconds(10);
  digitalWrite(TrgPin, LOW);
  dist = pulseIn(EcoPin, HIGH) / 58;             //读取脉冲的宽度并换算成距离
  d = (19.72 - dist) / high * 100;               //测量水面高度（桶高-距离）,再转换成水量百分比
  if(d>0)return (int)d;
  else return 0;
}

/*
 * 模块：DHT11温湿度模块
 * 用途：测量空气温度和湿度
 */
void dht(){
  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(&temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err="); Serial.println(err);delay(1000);
  }
}

/*
 * 模块：Capcitive_Soil_V1.2
 * 用途：测量土壤湿度
 */
 int Cap_soil(){
  int val;
  val = (340-analogRead(AoutPin))/2;    //空气中测量最大值340，水中最小值约140
  return abs(val);
 }

/*
 * 函数：autotap
 * 用途：自动浇水
 */
void autotap(int c_soil){
  if(autotap_flag == 1){
    if(c_soil<40){ //判断土壤湿度小于30%则开启电磁阀加水0.5秒
      digitalWrite(TapPin,HIGH);
      delay(100);
      digitalWrite(TapPin,LOW);
    }
    else{digitalWrite(TapPin,LOW);}
  }
}

/*
 * 函数：autolight
 * 用途：自动补光
 */
void autolight(int lux){
  if(autolight_flag == 1){
    if(lux<200){
      digitalWrite(LightPin,HIGH);
    }
    else digitalWrite(LightPin,LOW);
  }
}

/*
 * 初始化函数：只运行一次
 */
void setup(){
  Serial.begin(115200);         //设置通信波特率
  pinMode(TrgPin, OUTPUT);      //设置TrgPin为输出状态
  pinMode(EcoPin, INPUT);       //设置EcoPin为输入状态
  pinMode(TapPin, OUTPUT);      //设置TapPin为输出状态
  pinMode(LightPin, OUTPUT);    //设置LightPin为输出状态
  Wire.begin(SDAPin,SCLPin);
  lightMeter.begin();

  //连接网络
  wifiInit(WIFI_SSID, WIFI_PASSWD);
  //连接阿里云
  AliyunIoTSDK::begin(espClient, PRODUCT_KEY, DEVICE_NAME, DEVICE_SECRET, REGION_ID);
  // 绑定属性回调，即确定从阿里云向设备发送信息后触发的方法
  AliyunIoTSDK::bindData("Tap", TapCallback);
  AliyunIoTSDK::bindData("Light", LightCallback);
  AliyunIoTSDK::bindData("autotap", autotapCallback);
  AliyunIoTSDK::bindData("autolight", autolightCallback);
}

/*
 * 主函数：死循环
 */
void loop(){
  dht();       //测量温湿度
  float d=hcsr04();                          //测量剩余水量
  int c_soil=Cap_soil();                     //测量土壤湿度
  int lux=abs(lightMeter.readLightLevel());  //测量光度

  autotap(c_soil);                           //自动滴灌
  autolight(lux);                            //自动补光
  
  AliyunIoTSDK::loop();
  if (millis() - lastMsMain >= 3000){
    doc["Temperature"] = temperature;            //读温度
    doc["Humidity"] = humidity;                  //读湿度
    doc["Distance"] = d;                         //读剩余水量
    doc["Lux"] = lux;                            //读光度
    doc["SoilHumidity"] = c_soil;                //读土壤湿度
    doc["Tap"] = digitalRead(TapPin);            //读继电器（水龙头）开关状态
    doc["Light"] = digitalRead(LightPin);        //读补光灯开关状态
    doc["autotap"] = autotap_flag;               //读自动浇水标志
    doc["autolight"] = autolight_flag;           //读自动补光标志
    lastMsMain = millis();
    String output;
    
    //这里需要将数据json序列化，因为send方法的参数是const char*类型。
    serializeJson(doc, output);
    const char *str = output.c_str();
    
    //将数据发送至阿里云，使用的topic类列表中的物模型通信topic中的
    //  /sys/a1pjDXR6L0q/${deviceName}/thing/event/property/post
    // 这个是阿里云自带的topic。
    AliyunIoTSDK::send(str);  
  }
  delay(2000);
}
