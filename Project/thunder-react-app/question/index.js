export default {
  topLevel: [
    {
      name: "choose",
      type: "list",
      choices: [
        {
          name: "simple",
        },
        {
          name: "customize",
          disabled: "unusable",
        },
      ],
      message: "please choose a mode",
    },
  ],
  simpleQuestion: [
    {
      name: "isJs",
      type: "list",
      message: "language?",
      filter: function (language) {
        return language === "js" ? true : false;
      },
      choices: [
        {
          name: "js",
        },
        {
          name: "ts",
          disabled: "unusable",
        },
      ],
    },
  ],
  // 状态管理库
  customizeQuestion_for_store: [
    {
      name: "select_for_store",
      type: "list",
      message: "Select following repository",
      choices: [
        {
          name: "redux",
        },
        {
          name: "react-redux",
        },
      ],
    },
  ],
  // 异步方案库
  customizeQuestion_for_async: [
    {
      name: "select_for_async",
      type: "list",
      message: "Select following repository",
      choices: [
        {
          name: "react-saga",
        },
        {
          name: "react-thunk",
        },
        {
          name: "react-promise",
        },
      ],
    },
  ],
  // UI组件库
  customizeQuestion_for_ui: [
    {
      name: "select_for_ui",
      type: "list",
      message: "Select following repository",
      choices: [
        {
          name: "AntDesign",
        },
        {
          name: "react-redux",
        },
      ],
    },
  ],
};
