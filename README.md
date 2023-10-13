# mqtt
user<渝呀渝呀> mqtt连接

# 使用示例
```html
<!-- 添加mqtt配置: CONNECT_MQTT_OPTIONS -->
<script>
      const CONNECT_MQTT_OPTIONS = {
          // 连接地址
          url: "wss://broker.emqx.io:8084/mqtt",
          // 连接配置，请参考官网
          options: {
              clientId: "mqttjs_yuyayuya",
          },
          // 订阅topic列表
          subs: ["/mypark/pub"],
          // 发布topic列表
          pubs: ["/mypark/sub"],
          // 订阅消息回调
          messageCallback: (topic, message) => {
              console.log(`[${topic}] message: `, message)
          },
          // 是否显示提示消息
          tooltip: true,
      }
  </script>
  <script src="./index.js"></script>
<!-- 引入动画工具，需要在元素之后引用，或者使用异步引入 -->
<script src="https://cdn.jsdelivr.net/gh/MangSengIt/mqtt@main/mqtt.min.js"></script>
```
