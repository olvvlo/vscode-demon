"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const extension = require("../extension");
suite("Extension Tests", function () {
    const normal_template = `WAITING(-1, "待处理", "黄色"),
    PREPROCCESSED(20, "预处理完成", "绿色"),
    ORDER_CREATED(30, "单据已创建", "红色"),
    FINISHED(40, "已完成", "白色"),`;
    const normal_result = `{
    WAITING: -1,
    PREPROCCESSED: 20,
    CREATED: 30,
    FINISHED: 40,
    properties: {
      20: {
        value: 20,
        name: "预处理完成",
        name1: "绿色"
      },
      30: {
        value: 30,
        name: "单据已创建",
        name1: "红色"
      },
      40: {
        value: 40,
        name: "已完成",
        name1: "白色"
      },
      [-1]: {
        value: -1,
        name: "待处理",
        name1: "黄色"
      }
    }
  }`;
    const string_template = `WAITING("WAITING", "待处理", "黄色"),
    PREPROCCESSED("PREPROCCESSED", "预处理完成", "绿色"),
    ORDER_CREATED("ORDER_CREATED", "单据已创建", "红色"),
    FINISHED("FINISHED", "已完成", "白色"),`;
    const string_result = `{
    WAITING: "WAITING",
    PREPROCCESSED: "PREPROCCESSED",
    CREATED: "ORDER_CREATED",
    FINISHED: "FINISHED",
    properties: {
      WAITING: {
        value: "WAITING",
        name: "待处理",
        name1: "黄色"
      },
      PREPROCCESSED: {
        value: "PREPROCCESSED",
        name: "预处理完成",
        name1: "绿色"
      },
      ORDER_CREATED: {
        value: "ORDER_CREATED",
        name: "单据已创建",
        name1: "红色"
      },
      FINISHED: {
        value: "FINISHED",
        name: "已完成",
        name1: "白色"
      }
    }
  }`;
    test("map-default", function () {
        assert.equal(normal_result.replace(/\r|\n|\s/g, ''), extension.formatEnumMapFromDev(normal_template).replace(/\r|\n|\s/g, ''));
        assert.equal(string_result.replace(/\r|\n|\s/g, ''), extension.formatEnumMapFromDev(string_template).replace(/\r|\n|\s/g, ''));
    });
});
//# sourceMappingURL=extension.test.js.map