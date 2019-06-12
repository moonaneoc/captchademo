/**
 * 字体文件生成
 */
const opentype = require('opentype.js');

const origin = "./font/cn.ttf";
const dist = "./dist/font-min.otf";
const list = ["且", "东", "为", "京", "仔", "企", "会", "古", "顿", "俄", "内", "农", "出", "分", "办", "务", "包", "北", "协", "却", "去", "发", "可", "吧", "和", "哈", "哦", "唯", "啊", "器", "回", "天", "夫", "女", "好", "婚", "宁", "晨", "差", "布", "常", "并", "得", "快", "白", "惧", "黑", "所", "手", "把", "提", "握", "播", "放", "教", "方", "无", "明", "服", "未", "机", "村", "来", "查", "检", "科", "给", "求", "法", "点", "版", "玩", "番", "的", "看", "红", "细", "美", "而", "聚", "肉", "苦", "茄", "被", "要", "见", "觉", "说", "请", "读", "距", "输", "返", "问", "陪", "风", "饭", "饿", "岗", "鹅"];
const font = opentype.loadSync(origin);

let glyphs = [];
for (let item of list) {
    let glyph = font.charToGlyph(item);
    glyph.name = item;
    glyphs.push(glyph);
}

var newFont = new opentype.Font({
    familyName: 'font-min',
    styleName: 'Regular',
    unitsPerEm: 256,
    ascender: 128,
    descender: -128,
    glyphs: glyphs
})
newFont.download(dist);