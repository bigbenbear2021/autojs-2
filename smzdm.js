auto.waitFor();

const PACKAGE_NAME = "com.smzdm.client.android";

function s(ms) {
    sleep(ms);
}

function unlockDevice() {
    if (device.isScreenOn()) {
        return;
    }
    device.wakeUp();
    s(1000);
    swipe(500, 1900, 500, 1000, 1000);
    s(1000);
    click(821, 883); s(500);
    click(544, 614); s(500);
    click(538, 878); s(500);
    click(810, 1131); s(500);
    click(558, 1414); s(500);
    click(542, 1150); s(500);
}

function launchApp() {
    launch(PACKAGE_NAME);
}

function clickWidget(selector, timeout) {
    timeout = timeout || 5000;
    let widget = selector.findOne(timeout);
    if (widget) {
        let rect = widget.bounds();
        return click(rect.centerX(), rect.centerY());
    }
    return false;
}

function clickText(textStr, timeout) {
    return clickWidget(text(textStr), timeout);
}

function clickId(idStr, timeout) {
    return clickWidget(id(idStr), timeout);
}

let source = engines.myEngine().source.toString();
console.log("开始执行: " + source);

const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);
setScreenMetrics(WIDTH, HEIGHT);

s(Math.random() * 10000);
console.log("随机延迟完成");

try {
    console.log("解锁设备...");
    unlockDevice();
    s(2000);

    console.log("启动APP...");
    launchApp();
    s(5000);

    console.log("检查更新弹窗...");
    let cancelUpd = id("iv_content_cancel").findOne(2000);
    if (cancelUpd) {
        let rect = cancelUpd.bounds();
        click(rect.centerX(), rect.centerY());
        console.log("关闭更新弹窗");
        s(1000);
    }

    console.log("点击'我的'...");
    let myTab = clickText("我的", 5000);
    console.log("点击'我的'结果: " + myTab);
    s(4000);

    console.log("点击'签到领奖'...");
    let signResult = clickText("签到领奖", 5000);
    console.log("点击'签到'结果: " + signResult);
    s(3000);

    console.log("什么值得买签到完成");
    toast("什么值得买签到完成");

    console.log("返回桌面...");
    home();
    s(2000);

    console.log("点击一键锁屏...");
    clickText("一键锁屏", 3000);
} catch (e) {
    console.log("脚本执行出错: " + e);
    toast("脚本出错: " + e);
}

exit();
