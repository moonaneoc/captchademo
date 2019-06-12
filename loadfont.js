const fs = require("fs");
const opentype = require('opentype.js');

/**
 * 且东为京仔企会古顿俄内农出分办务包北协却去发可吧和哈哦唯啊器回天夫女好婚宁晨差布常并得快白惧黑所手把
 * 提握播放教方无明服未机村来查检科给求法点版玩番的看红细美而聚肉苦茄被要见觉说请读距输返问陪风饭饿岗鹅
 */
let font = opentype.loadSync('./dist/font-min.otf');
let path = font.getPath("茄", 0, 60, 80);
let fpath = font.getPath("番", 80, 30, 40);

let svg =
    `<svg width="300" height="200">` +
    `<image x="0" y="0" width="100%" height="100%" href="./bg.jpg"></image>` +
    `${[path.toSVG(), fpath.toSVG()].join("")}` +
    `</svg>`

let html = fs.readFileSync("./template.html", "utf-8");
html = html.replace("<%=svg%>", svg);
fs.writeFileSync("./test.html", html, "utf-8");