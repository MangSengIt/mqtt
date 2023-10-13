const __private_css = `
:root {
    --color-primary: #409eff;
    --color-success: #67c23a;
    --color-warning: #e6a23c;
    --color-error: #f56c6c;
    --color-info: #909399;
    --current-color: var(--color-primary);
    --hide-delay: 2s;
}
#yuyayuya-alter {
    background-color: var(--current-color);
    width: 320px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 20px;
    padding: 12px 6px;
    color: #fff;
    border-radius: 4px;
    position: fixed;
    top: 20px;
    left: calc(50vw - 160px);
    z-index: 999999;
    text-align: center;
    cursor: default;
    animation: yuyayuya-alter 0.4s ease-in-out,
        yuyayuya-alter-hide 0.4s ease-in-out var(--hide-delay) forwards;
}
@keyframes yuyayuya-alter {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes yuyayuya-alter-hide {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px);
        display: none;
    }
}`
if (CONNECT_MQTT_OPTIONS.tooltip) {
    document.head.insertAdjacentHTML("beforeend", `<style>${__private_css}</style>`)
}

function __showTooltip(message, type = "success", delay = 3000) {
    // 获取提示框，如果存在则删除
    const alterEl = document.getElementById("yuyayuya-alter")
    if (alterEl) alterEl.remove()

    // 添加提示框
    const alter = document.createElement("div")
    alter.id = "yuyayuya-alter"
    alter.innerHTML = message
    alter.style.setProperty("--current-color", `var(--color-${type})`)
    alter.style.setProperty("--hide-delay", `${delay}ms`)
    document.body.appendChild(alter)
}

const _MQ_CLIENT = mqtt.connect(CONNECT_MQTT_OPTIONS.url, CONNECT_MQTT_OPTIONS.options)
_MQ_CLIENT.on("error", (error) => {
    if (CONNECT_MQTT_OPTIONS.tooltip) {
        __showTooltip(`connect Error[${CONNECT_MQTT_OPTIONS.url}]: ${error.toString()}`, "error")
    }
    console.error("Connection failed:", error)
})
_MQ_CLIENT.on("connect", () => {
    if (CONNECT_MQTT_OPTIONS.tooltip) {
        __showTooltip(`${CONNECT_MQTT_OPTIONS.url} Connected successfully!`)
    }

    CONNECT_MQTT_OPTIONS.subs.forEach((sub_topic) => {
        _MQ_CLIENT.subscribe(sub_topic, (error) => {
            if (error) {
                console.error(`subscribe[${sub_topic}] error: `, error)
                if (CONNECT_MQTT_OPTIONS.tooltip) {
                    __showTooltip(`subscribe [${sub_topic}] error: ${error.toString()}`, "error")
                }
                return void 0
            }
            if (CONNECT_MQTT_OPTIONS.tooltip) {
                __showTooltip(`subscribe [${sub_topic}] success!`)
            }
        })
    })
})
_MQ_CLIENT.on("message", CONNECT_MQTT_OPTIONS.messageCallback)
