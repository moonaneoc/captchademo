const fs = require("fs");
const opentype = require('opentype.js');

/**
 * 且东为京仔企会古顿俄内农出分办务包北协却去发可吧和哈哦唯啊器回天夫女好婚宁晨差布常并得快白惧黑所手把
 * 提握播放教方无明服未机村来查检科给求法点版玩番的看红细美而聚肉苦茄被要见觉说请读距输返问陪风饭饿岗鹅
 */
const charset = ["且", "东", "为", "京", "仔", "企", "会", "古", "顿", "俄", "内", "农", "出", "分", "办", "务", "包", "北", "协", "却", "去", "发", "可", "吧", "和", "哈", "哦", "唯", "啊", "器", "回", "天", "夫", "女", "好", "婚", "宁", "晨", "差", "布", "常", "并", "得", "快", "白", "惧", "黑", "所", "手", "把", "提", "握", "播", "放", "教", "方", "无", "明", "服", "未", "机", "村", "来", "查", "检", "科", "给", "求", "法", "点", "版", "玩", "番", "的", "看", "红", "细", "美", "而", "聚", "肉", "苦", "茄", "被", "要", "见", "觉", "说", "请", "读", "距", "输", "返", "问", "陪", "风", "饭", "饿", "岗", "鹅"];
let scale = 0.8;
const svgWidth = 240 * scale;
const svgHeight = 160 * scale;
const fontSize = 30 * scale;

const getRandomColor = function () {
    let colorChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += colorChar[Math.floor(Math.random() * 16)];
    }
    return color;
}
const getRandomChars = function () {
    let result = [];
    let copySet = [...charset];
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * copySet.length);
        let item = {};
        item.char = copySet.splice(index, 1);

        let xmax = (i + 1) * svgWidth * 0.8 / 4 - fontSize + svgWidth * 0.1;
        let xmin = i * svgWidth * 0.8 / 4 + svgWidth * 0.1;
        item.x = Math.random() * (xmax - xmin) + xmin;
        item.y = Math.random() * (svgHeight * 0.8 - fontSize) + fontSize + svgHeight * 0.1;
        result.push(item);
    }
    return result;
}

let font = opentype.loadSync('./assets/font-min.otf');

setInterval(() => {
    let characterSet = getRandomChars();

    let character = "";
    for (let i = 0; i < characterSet.length; i++) {
        let path = font.getPath(characterSet[i].char, characterSet[i].x, characterSet[i].y, fontSize * (Math.random() * 0.3 + 0.7));
        path.fill = getRandomColor();
        for (let cmd of path.commands) {
            if (cmd.type === "C") {
                // cmd.x1 += cmd.x1 * (Math.random() * 0.04 - 0.02);
                cmd.y1 += cmd.y1 * (Math.random() * 0.04 - 0.02);
                // cmd.x2 += cmd.x2 * (Math.random() * 0.04 - 0.02);
                cmd.y2 += cmd.y2 * (Math.random() * 0.04 - 0.02);
                // cmd.x += cmd.x * (Math.random() * 0.04 - 0.02);
                cmd.y += cmd.y * (Math.random() * 0.04 - 0.02);
            }
        }
        character += path.toSVG();
    }

    let svg =
        `<svg width="${svgWidth}" height="${svgHeight + fontSize}" xmlns="http://www.w3.org/2000/svg" version="1.1">` +
        `<image x="0" y="0" width="100%" height="${svgHeight}" href="./assets/bg.jpg"></image>` +
        `${character}` +
        `</svg>`


    let html = fs.readFileSync("./template.html", "utf-8");
    html = html.replace("<%=svg%>", svg);
    fs.writeFileSync("./test.html", html, "utf-8");
}, 1000);