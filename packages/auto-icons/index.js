const fs = require("fs");
const path = require("path");
const request = require("request");
// const svgfilesPath = path.resolve("./files/svgfiles");
// const svgfilesPath = "https://at.alicdn.com/t/font_1825326_k1wqcsfusk.js";
const svgfilesPath = "https://at.alicdn.com/t/font_2698958_09qenuziz1rf.js";

const iconsDir = path.join(__dirname, "files");

// 下载iconfontsvg图标
function downloadFile(uri, filename, callback) {
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }
  const stream = fs.createWriteStream(`./files/${filename}`);
  request(uri).pipe(stream).on("close", callback);
}

const fileUrl = process.argv[2] || svgfilesPath;
const filename = "svgfont.js";
downloadFile(fileUrl, filename, () => {
  svgformat("./files");
});

function svgformat(filePath) {
  fs.readFile(`./files/${filename}`, "utf8", (error, data) => {
    if (error) {
      throw error;
    } else {
      const pattern = /<symbol ("[^"]*"|'[^']*'|[^'">])*>[\s\S]*?<\/symbol>/;
      // 获取svg图标数组
      const svgArr = data.split("</symbol>");
      // 最后一个为js代码忽略
      svgArr.pop();
      let svgTmp = "";
      let viewBox = "";
      let names = "";
      svgArr.forEach((svg, v) => {
        const tmpPath = svg.split("<path");
        // 将-连接的变量转为驼峰式命名变量
        const viewBoxKeyStr = tmpPath[0].match('id=.*"')[0].split('"')[1];
        const viewBoxKey = viewBoxKeyStr.replace(/\-(\w)/g, (x) =>
          x.slice(1).toUpperCase()
        );
        // 获取viewBox大小
        const viewBoxValue = tmpPath[0].match('viewBox=.*"')[0].split('"')[1];
        const pathValue = tmpPath;
        // viewBox[viewBoxKey] = viewBoxValue;
        viewBox += `${viewBoxKey}:'${viewBoxValue}',\n`;
        // names[viewBoxKey] = viewBoxKeyStr;
        names += `${viewBoxKey}:'${viewBoxKeyStr}',\n`;
        const pathArr = [];
        // 第一个用来获取viewBox获取信息，后面的数据为path
        tmpPath.shift();
        tmpPath.forEach((path) => {
          // 组装为object对象
          pathArr.push(
            `{${path
              .replace(/=/g, ":")
              .replace("fill", ",fill")
              .replace("opacity", ",opacity")
              .replace("></path>", "")}}`
          );
        });
        svgTmp += `${viewBoxKey}:[${pathArr}],\n`;
      });

      const svgStr = `module.exports = {
    viewBox:{${viewBox}},
    names:{${names}},
    ${svgTmp}
}`;

      fs.writeFileSync("./files/iconfont.svg.js", svgStr, "utf8");
      // 删除下载的文件
      fs.unlink(`./files/${filename}`, (err) => {
        if (err) throw err;
      });
    }
  });
}
