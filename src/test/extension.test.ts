import * as assert from 'assert';

import * as extension from '../extension';

suite("Extension Tests", function () {

  const TPL = `WAITING(-1, "待处理", "黄色"),
    PREPROCCESSED(20, "预处理完成", "绿色"),
    ORDER_CREATED(30, "单据已创建", "红色"),
    FINISHED(40, "已完成", "白色"),`

  const result = `{
    WAITING: -1,
    PREPROCCESSED: 20,
    ORDER_CREATED: 30,
    FINISHED: 40,
    properties: {
      20: {
        name: "预处理完成",
        name1: "绿色",
        value: 20
      },
      30: {
        name: "单据已创建",
        name1: "红色",
        value: 30
      },
      40: {
        name: "已完成",
        name1: "白色",
        value: 40
      },
      [-1]: {
        name: "待处理",
        name1: "黄色",
        value: -1
      }
    }
  }`;

  test("map-default", function () {
    assert.equal(result.replace(/\r|\n|\s/g, ''), extension.formatEnumMapFromDev(TPL).replace(/\r|\n|\s/g, ''));
  });
});