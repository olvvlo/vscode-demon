import * as assert from 'assert';

import * as extension from '../extension';

suite("Extension Tests", function () {

  const normal_template = `WAITING(-1, "待处理", "黄色"),
    PREPROCCESSED(20, "预处理完成", "绿色"),
    ORDER_CREATED("ORDER_CREATED", "单据已创建", "红色"),
    FINISHED_40(40, "已完成", "白色"),
    END_50("END_50", "已结束", "黑色"),
    INTERACT_2("互动积分", 2),`;

  const normal_result = `{
    WAITING: -1,
    PREPROCCESSED: 20,
    ORDER_CREATED: "ORDER_CREATED",
    FINISHED_40: 40,
    END_50: "END_50",
    INTERACT_2: "互动积分",
    properties: {
      20: {
        value: 20,
        name: "预处理完成",
        name1: "绿色"
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
      },
      ORDER_CREATED: {
        value: "ORDER_CREATED",
        name: "单据已创建",
        name1: "红色"
      },
      END_50: {
        value: "END_50",
        name: "已结束",
        name1: "黑色"
      },
      互动积分: {
        value: "互动积分",
        name: 2
      }
    }
  }`;

  test("map-default", function () {
    assert.equal(normal_result.replace(/\r|\n|\s/g, ''), extension.formatEnumMapFromDev(normal_template, 0).replace(/\r|\n|\s/g, ''));
  });
});