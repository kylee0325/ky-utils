const path = require("path");
const fs = require("fs");
const svgs = require("./files/iconfont.svg.js");
const {
  attrsToString,
  getSvg,
  getAttrs,
  getElementCode,
} = require("./template");

const rootDir = path.join(__dirname, "../src");
const svgDir = path.join(__dirname, "../src/svgs");
const componentsDir = path.join(__dirname, "../src/components");

const generateIndex = () => {
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir);
  }
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }

  fs.writeFileSync(path.join(rootDir, "index.js"), "", "utf-8");
};

// generate icon code separately
const generateIconCode = async (item) => {
  const fileName = svgs.names[item];
  const destination = path.join(componentsDir, `${fileName}.vue`);
  const ComponentName = item.replace(/icon/, "Icon");

  const component = getElementCode(
    fileName,
    attrsToString(getAttrs(svgs.viewBox[item]), "\n\t\t"),
    getSvg(svgs[item])
  );

  fs.writeFileSync(destination, component, "utf-8");
  fs.writeFileSync(
    path.join(svgDir, `${fileName}.svg`),
    `<svg
  ${attrsToString(getAttrs(svgs.viewBox[item]), "\n\t\t")}
>
  ${getSvg(svgs[item])}
</svg>`,
    "utf-8"
  );

  return { ComponentName, name: fileName };
};

// append export code to index.js
const appendToIndex = ({ ComponentName, name }) => {
  const exportString = `export { default as ${ComponentName} } from './components/${name}.vue';\r\n`;
  fs.appendFileSync(path.join(rootDir, "index.js"), exportString, "utf-8");
};

generateIndex();

Object.keys(svgs.viewBox).forEach((item) => {
  generateIconCode(item).then(({ ComponentName, name }) => {
    appendToIndex({ ComponentName, name });
  });
});

// 删除下载的文件
// fs.unlink(`./files/iconfont.svg.js`, (err) => {
//   if (err) throw err;
// });
