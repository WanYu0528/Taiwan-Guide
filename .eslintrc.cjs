/* eslint-env node */
module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "plugin:vue-pug/vue3-recommended",
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  plugins: [
    "vue"
  ],
  rules: {
    // 縮排
    indent: [
      "error",
      2
    ],
    // 引號
    quotes: [
      "error",
      "double"
    ],
    // 分號
    semi: [
      "error",
      "always"
    ],
    // ===/!==
    eqeqeq: [
      "error",
      "always"
    ],
    // 需要let或const代替var
    "no-var": "error",
    // 定義前不使用
    "no-use-before-define": "error",
    // => 前後空格
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    // {}內前後空格
    "block-spacing": "error",
    // {}樣式
    "brace-style": [
      "error",
      "stroustrup"
    ],
    // 屬性順序
    "vue/attributes-order": ["warn", {
      order: [
        "TWO_WAY_BINDING",
        "LIST_RENDERING",
        "CONDITIONALS",
        "EVENTS",
        "DEFINITION",
        "RENDER_MODIFIERS",
        "OTHER_DIRECTIVES",
        "SLOT",
        "GLOBAL"
      ],
      alphabetical: false
    }],
    // 屬性每行最多5個
    "vue/max-attributes-per-line": ["warn", {
      singleline: {
        max: 5
      },
      multiline: {
        max: 5
      }
    }],
    // 屬性換行規則
    "vue/first-attribute-linebreak": ["error", {
      singleline: "beside",
      multiline: "ignore"
    }],
    // 縮排
    "vue/html-indent": ["error", 2, {
      attribute: 2,
      baseIndent: 0,
      alignAttributesVertically: false
    }],
    // 需要在 props 中定義types
    "vue/require-prop-type": "off",
    // :前後空格
    "key-spacing": ["error",{
      beforeColon: false,
      afterColon: true
    }],
    // 運算符前後空格
    "space-infix-ops": "error",
    "vue/multi-word-component-names": 0
  }
};
