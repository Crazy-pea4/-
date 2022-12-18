const mqtt = require('../../utils/mqtt.min.js'); //根据自己存放的路径修改
const crypto = require('../../utils/hex_hmac_sha1.js'); //根据自己存放的路径修改
const hefengKey = "be7369316b3e406dacf5ccd7836ee88e"; //  和风天气Web api的key
const hefengWeather = `https://devapi.qweather.com/v7/weather/now?`; //  和风天气实时天气api
const hefengAdvice = "https://devapi.qweather.com/v7/indices/1d?"; //和风生活建议api
const hefengAir = `https://devapi.qweather.com/v7/air/now?`; //  和风天气空气质量api
const geoApi = "https://geoapi.qweather.com/v2/city/lookup?" //  地理位置api（用来获取经纬度对应的城市/城区名字）

Page({
  data: {
    client:{},
    Temperature:0,                    //温度
    Humidity:0,                       //湿度
    SoilMoisture:0,                   //土壤湿度
    SoilMoisture2:0,
    Distance:0,                       //剩余水量
    WaterOutletSwitch:false,          //电磁阀(滴灌)开关
    WaterOutletSwitch2:false,
    LightSwitch:false,                //补光灯
    autolight:false,                  //自动补光标志 
    autotap:false,                    //自动滴灌标志
    LightLux:0,                       //光照度
    LightLux2:0,
    area: "请求中",                    //城区
    city: "请求中",                    //城市
    airText: "请求中",                 //空气优良
    airValue: 0,                      //空气指数
    weather: "请求中",                 //天气
    weatherAdvice: "今天天气不错",     //天气建议

    color_d:"#ffffff",
    src_d:'/static/images/capacitive.png',
    color_soil:"#ffffff",
    src_soil:'/static/images/cap_soil.png',
  },
  onAutoWater(event){
    var _this=this;
    console.log(event.detail);
    let sw = event.detail.value;
    _this.setData({
      autotap: sw
    })
    if (sw) {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params":{"autotap":1},"params2":{"autotap":1}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——自动开水泵");
        }
      });
    } else {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params":{"autotap":0},"params2":{"autotap":0}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——自动关水泵");
        }
      });
    }
  },
  onWaterChange(event){
    var _this=this;
    console.log(event.detail);
    let sw = event.detail.value;
    _this.setData({
      WaterOutletSwitch: sw
    })
    if (sw) {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params":{"WaterOutletSwitch":1}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——开水泵");
        }
      });
    } else {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params":{"WaterOutletSwitch":2}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——关水泵");
        }
      });
    }
  },

  onWaterChange2(event){
    var _this=this;
    console.log(event.detail);
    let sw = event.detail.value;
    _this.setData({
      WaterOutletSwitch2: sw
    })
    if (sw) {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params2":{"WaterOutletSwitch":1}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——开水泵");
        }
      });
    } else {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params2":{"WaterOutletSwitch":2}}',{qos:1}, function (err) {
        if (!err) {
          console.log("成功下发命令——关水泵");
        }
      });
    }
  },
  onLightChange(event){
    var _this=this;
    console.log(event.detail);
    let sw = event.detail.value;
    _this.setData({
      LightSwitch: sw
    })
    if (sw) {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params0":{"LightSwitch":1}}',{qos:0}, function (err) {
        if (!err) {
          console.log("成功下发命令——开灯");
        }
      });
    } else {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params0":{"LightSwitch":2}}',{qos:0}, function (err) {
        if (!err) {
          console.log("成功下发命令——关灯");
        }
      });
    }
  },
  onAutoLight(event){
    var _this=this;
    console.log(event.detail);
    let sw = event.detail.value;
    _this.setData({
      autolight: sw
    })
    if (sw) {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params0":{"autolight":1}}',{qos:0}, function (err) {
        if (!err) {
          console.log("成功下发命令——开灯");
        }
      });
    } else {
      _this.data.client.publish('/hgstGAqF7eN/xiaochengxu/user/update','{"params0":{"autolight":2}}',{qos:0}, function (err) {
        if (!err) {
          console.log("成功下发命令——关灯");
        }
      });
    }
  },

  onLoad: function () {
  	//注意：这里在程序运行后会直接进行连接，如果你要真机调试，记得关掉模拟器或者使用一个按钮来控制连接，以避免模拟器和真机同时进行连接导致两边都频繁断线重连！
    this.doConnect()
  },
  doConnect(){
    var _this=this;
    const deviceConfig = {
      productKey: "hgstGAqF7eN",
      deviceName: "xiaochengxu",
      deviceSecret: "85bf87ba1ebb28cabf072ea2812b3765",
      regionId: "cn-shanghai"//根据自己的区域替换
    };
    const options = this.initMqttOptions(deviceConfig);
    console.log(options)
    //替换productKey为你自己的产品的（注意这里是wxs，不是wss，否则你可能会碰到ws不是构造函数的错误）
    _this.setData({
      client: mqtt.connect('wxs://hgstGAqF7eN.iot-as-mqtt.cn-shanghai.aliyuncs.com',options)
    })
    //const client = mqtt.connect('wxs://a1G4kjJwIRe.iot-as-mqtt.cn-shanghai.aliyuncs.com',options)
    _this.data.client.on('connect', function () {
      console.log('连接服务器成功')
      //注意：订阅主题，替换productKey和deviceName(这里的主题可能会不一样，具体请查看控制台-产品详情-Topic 类列表下的可订阅主题)
      _this.data.client.subscribe('/hgstGAqF7eN/xiaochengxu/user/get', function (err) {
        if (!err) {
           console.log('订阅成功！');
        }
      })
    })
	//接收消息监听
    _this.data.client.on('message', function (topic, message) {
      // message is Buffer
      //let msg = message.toString();
      var msg = message.toString();
      var shuju=JSON.parse(msg);
      _this.setData({
        Temperature:shuju.Temperature,
        Humidity:shuju.Humidity,
        SoilMoisture:shuju.SoilMoisture,
        SoilMoisture2:shuju.SoilMoisture2,
        Distance:shuju.Distance,
        WaterOutletSwitch:shuju.WaterOutletSwitch,
        WaterOutletSwitch2:shuju.WaterOutletSwitch2,
        Tap:shuju.Tap,
        LightSwitch:shuju.LightSwitch,
        LightLux:shuju.LightLux,
        LightLux2:shuju.LightLux2,
        autolight:shuju.autolight,
        autotap:shuju.autotap,
      })
      if(shuju.Distance<20){
        _this.setData({
        color_d:'#d81e06',
        src_d:'/static/images/capacitive2.png',
        })
      }
      else{
        _this.setData({
          color_d:'#ffffff',
          src_d:'/static/images/capacitive.png',
          })
      }
      if(shuju.SoilMoisture<30){
        _this.setData({
        color_soil:'#d81e06',
        src_soil:'/static/images/capacitive2.png',
        })
      }
      else{
        _this.setData({
          color_soil:'#ffffff',
          src_soil:'/static/images/capacitive.png',
          })
      }
      console.log('收到消息：'+msg);
     //关闭连接 client.end()
    })
    
    // 获取天气相关数据
    wx.getLocation({
      type: "wgs84",
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const key = hefengKey;
        wx.request({
          url: `${geoApi}location=${longitude},${latitude}&key=${key}`, //获取地理位置
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                location
              } = res.data;
              _this.setData({
                area: location[0].name, //城区
                city: location[0].adm2 //城市
              })
            } catch (error) {
              console.error(error);
            }
          },
        });
        wx.request({
          url: `${hefengWeather}location=${longitude},${latitude}&key=${key}`, //获取实时天气数据
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                now
              } = res.data;
              _this.setData({
                weather: now.text, // 天气
              })
            } catch (error) {
              console.error(error);
            }

          },
        });
        wx.request({
          url: `${hefengAir}location=${longitude},${latitude}&key=${key}`, //获取空气数据
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                now
              } = res.data;
              _this.setData({
                airText: now.category, //空气质量
                airValue: now.aqi //空气指数
              })
            } catch (error) {
              console.error(error);
            }
          },
        });
        wx.request({
          url: `${hefengAdvice}location=${longitude},${latitude}&key=${key}&type=10`, //获取生活建议
          success(res) {
            console.log(res.data);
            if (res.data.code == "401") {
              console.error("请检查你的和风天气API或Key是否正确！");
              return;
            }
            try {
              const {
                daily
              } = res.data;
              _this.setData({
                weatherAdvice: daily[0].text //生活建议
              })
            } catch (error) {
              console.error(error);
            }
          },
        });
      },
    });
  },
  //IoT平台mqtt连接参数初始化
 initMqttOptions(deviceConfig) {

    const params = {
      productKey: deviceConfig.productKey,
      deviceName: deviceConfig.deviceName,
      timestamp: Date.now(),
      clientId: Math.random().toString(36).substr(2),
    }
    //CONNECT参数
    const options = {
      keepalive: 60, //60s
      clean: true, //cleanSession不保持持久会话
      protocolVersion: 4 //MQTT v3.1.1
    }
    //1.生成clientId，username，password
    options.password = this.signHmacSha1(params, deviceConfig.deviceSecret);
    options.clientId = `${params.clientId}|securemode=2,signmethod=hmacsha1,timestamp=${params.timestamp}|`;
    options.username = `${params.deviceName}&${params.productKey}`;

    return options;
  },

/*
  生成基于HmacSha1的password
  参考文档：https://help.aliyun.com/document_detail/73742.html?#h2-url-1
*/
 signHmacSha1(params, deviceSecret) {

    let keys = Object.keys(params).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
      list.push(`${key}${params[key]}`);
    });
    const contentStr = list.join('');
    return crypto.hex_hmac_sha1(deviceSecret, contentStr);
  }
})