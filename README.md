# demon

FE-Map-Enum vscode's Extension.

## Features

```
WAITING(10, "待处理"),
PREPROCCESSED(20, "预处理完成"),
ORDER_CREATED(30, "单据已创建"),
FINISHED(40, "已完成"),

```

> cmd + shift + p
> MapEnum

```
{
  WAITING: 10,
  PREPROCCESSED: 20,
  CREATED: 30,
  FINISHED: 40,
  properties: {
    10: {
      value: 10,
      name: "待处理"
    },
    20: {
      value: 20,
      name: "预处理完成"
    },
    30: {
      value: 30,
      name: "单据已创建"
    },
    40: {
      value: 40,
      name: "已完成"
    }
  }
}
```

## Extension Settings

```
"commands": [
  {
    "command": "extension.mapEnum",
    "title": "MapEnum"
  }
],
"configuration": {
  "type": "object",
  "title": "demon configuration",
  "properties": {
    "demon.keyNum": {
      "type": "number",
      "default": 0,
      "description": "Set default key number."
    }
  }
}
```

## Release Notes

### 1.2.0

[feat]: Support set diff key number.

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
