# 在根目录库下创建配置config.ts 文件
```
interface BotConfig {
    botApi:string
}
interface DBConfig {
    username:string
    password:string
}

let devObject:BotConfig={
    botApi:""
}
let proObject:BotConfig={
    botApi: ""
}

let dbConfig:DBConfig={
    username:"",
    password:"",
}
export let dbConfigPro:DBConfig={
    username:"",
    password:"",
}
export {devObject, proObject,dbConfig,DBConfig}
```
## 数据库模型
项目中定义了两个主要的数据库模型，用于存储主题切换记录和编辑日志：

1. **`jump_to_theme`**:
    - **字段**：
        - `type`: 主题类型（0 表示 Android，1 表示桌面）。
        - `theme_name`: 主题名称。
        - `date`: 切换时间。

2. **`theme_editor_log`**:
    - **字段**：
        - `kind`: 日志种类。
        - `ip`: 用户 IP 地址。
        - `date`: 操作时间。

### sequelize配置
```typescript
import { initModels } from './db/models/init-models';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

initModels(sequelize);
sequelize.sync();
```

### 启动服务

服务启动后，将同时运行 HTTP API 和 Telegram Bot。相关初始化逻辑位于 `server.ts` 文件中：

```typescript
import { initBot } from "./src/bot/bot";
import { initHttp } from "./src/express/http-config";

// 启动 HTTP 服务
initHttp();

// 启动 Telegram Bot
initBot();
```

### Telegram Bot 示例
用户可以通过发送 `/start` 命令并附带参数来发送主题。例如：

- `/start ${themeNameA}`：切换到名为 `themeName` 的 Android 主题。
- `/start ${themeNameD}`：切换到名为 `themeName` 的桌面主题。

根据你提供的 `http-config.ts` 文件内容，我将整理并生成一个完整的 HTTP API 文档。以下是基于代码结构和功能的 API 列表及其描述。

---

# HTTP API 文档

本项目提供了一组 RESTful API 接口，用于管理 Telegram 主题（`.attheme` 文件）、生成预览、编辑模板以及记录日志。以下是详细的 HTTP API 说明。

## 基础信息

- **服务器地址**: `http://<your-server-ip>:3000`
- **跨域支持**: 允许所有来源 (`*`)
- **静态文件目录**:
    - `/public/tempelete/tohuemodle`
    - `/public/myserver-bot-public/attheme`
    - `/public/myserver-bot-public/desk`
---

## API 列表

### 1. 获取 Android 主题列表
- **URL**: `/attheme`
- **Method**: `GET`
- **Description**: 返回当前可用的 Android 主题列表。
---

### 2. 获取桌面主题列表
- **URL**: `/desk`
- **Method**: `GET`
- **Description**: 返回当前可用的桌面主题列表。

---

### 4. 创建颜色图片
- **URL**: `/colorlist`
- **Method**: `POST`
- **Description**: 根据请求数据生成颜色图片。

### 5. 创建不透明 Android 主题
- **URL**: `/attheme-create`
- **Method**: `POST`
- **Description**: 根据请求数据生成不透明的 Android 主题文件。
- **Request Body**:
---

### 6. 创建透明 Android 主题
- **URL**: `/attheme-create/tran`
- **Method**: `POST`
- **Description**: 根据请求数据生成透明的 Android 主题文件。
- **Request Body**:

---

### 7. 创建桌面主题
- **URL**: `/tdesktop-create`
- **Method**: `POST`
- **Description**: 根据请求数据生成桌面主题文件。
- **Request Body**:

---

### 8. 获取模板信息
- **URL**: `/templete-info`
- **Method**: `GET`
- **Description**: 返回当前支持的模板信息。
- **Response**:

---

### 9. 模板编辑器
- **URL**: `/templete-editor/`
- **Method**: `POST`
- **Description**: 根据请求数据应用模板并生成新的主题文件。
- **Request Body**:
```]
{
    "kind": "android", // 或 "desktop"
    "type": "black",   // 或 "white"
    "model": "default",
    "hue": 200,
    "sat": 50,
    "lig": 75,
    "alpha": 0.8
  }
```

- **Response**:
    - 成功时返回生成的主题文件路径。
    - 失败时返回错误信息。

---
