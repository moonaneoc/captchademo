const opentype = require('opentype.js');

// var fontCarrier = require('font-carrier')
// var transFont = fontCarrier.transfer('./Songti.ttc')
// // 会自动根据当前的输入的文字过滤精简字体
// transFont.min('且东为京仔企会古顿俄内农出分办务包北协却去发可吧和哈哦唯啊器回天夫女好婚宁晨差布常并得快白惧黑所手把提握播放教方无明服未机村来查检科给求法点版玩番的看红细美而聚肉苦茄被要见觉说请读距输返问陪风饭饿岗鹅')
// transFont.output({
//   path: './dist/min'
// })

let svg;
// var font = opentype.loadSync('./Ayuthaya.ttf');
var font = opentype.loadSync('./font/cn.ttf');
// let apath = font.getPath("A", 0, 80, 80);
// svg = apath;
// var Glyph_A = new opentype.Glyph({
//     name: 'A',
//     // unicode: 65,
//     // advanceWidth: 650,
//     path: apath
// })
var Glyph_A = font.charToGlyph("我");
// var Glyph_B = font.charToGlyph("B");
// var Glyph_C = font.charToGlyph("C");
svg = Glyph_A.getPath(80, 80, 120)
var newFont = new opentype.Font({
    familyName: 'Echo',
    styleName: 'Regular',
    unitsPerEm: 500,
    ascender: 100,
    descender: -300,
    // glyphs: [Glyph_A, Glyph_B, Glyph_C]
    glyphs: [Glyph_A]
})
newFont.download("./newFont.otf");

// var font = opentype.loadSync('./newFont.otf');
// let path = font.getPath("我", 0, 80, 120);
// svg = path;

const fs = require("fs");
let html = fs.readFileSync("./template.html", "utf-8");
html = html.replace("<%=svg%>", svg.toSVG());
fs.writeFileSync("./test.html", html, "utf-8");

