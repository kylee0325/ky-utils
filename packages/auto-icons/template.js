// generate attributes code
const attrsToString = (attrs, split = " ") => {
  return Object.keys(attrs)
    .map((key) => {
      // should distinguish fill or stroke
      if (key === "width" || key === "height") {
        return key + "={" + attrs[key] + "}";
      }
      return key + '="' + attrs[key] + '"';
    })
    .join(split);
};

const getSvg = (arr) => {
  if (!arr || arr.length === 0) return "";
  let str = "";
  arr.forEach((element) => {
    if (str) {
      str += "\n\t\t";
    }
    str += `<path
    \t${attrsToString(element, "\n\t\t\t")}
    ></path>`;
  });
  return str;
};

const getAttrs = (viewBox = "0 0 24 24") => {
  const baseAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    ":width": "size",
    ":height": "size",
    "aria-hidden": "true",
    "v-on": "$listeners",
    ":fill": "color",
  };
  return Object.assign({}, baseAttrs, { viewBox });
};

const getElementCode = (ComponentName, attrs, svgCode) =>
  `<template>
  <svg
    ${attrs}
  >
    ${svgCode}
  </svg>
</template>
<script>
export default {
  name: "${ComponentName}",
  props: {
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
`;

module.exports = { attrsToString, getSvg, getAttrs, getElementCode };
