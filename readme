> nohup npx ts-node server.ts &
> ```

## 使用

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

用户可以通过发送 `/start` 命令并附带参数来切换主题。例如：

- `/start ${themeNameA}`：切换到名为 `themeName` 的 Android 主题。
- `/start ${themeNameD}`：切换到名为 `themeName` 的桌面主题。

### HTTP API 示例

- **主题切换**：`POST /api/theme-switch`
- **生成预览**：`GET /api/preview`
- **获取日志**：`GET /api/logs`

更多详细信息请参考源码注释或相关文档。

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

执行以下命令以初始化数据库模型：
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

