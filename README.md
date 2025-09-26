# 博客管理系统

一个完整的博客系统，包含前端和后端功能，支持文章管理、留言管理、分类管理和系统设置等功能。

## 功能特性

- 📝 **文章管理**：创建、编辑、删除文章，支持Markdown格式
- 💬 **留言管理**：查看和删除用户留言
- 📁 **分类管理**：创建和管理文章分类
- ⚙️ **系统设置**：配置博客基本信息
- 📊 **数据统计**：查看博客数据统计
- 📱 **响应式设计**：支持移动端和桌面端访问

## 技术栈

- **后端**：Node.js, Express
- **数据库**：MongoDB
- **前端**：HTML, CSS (Tailwind CSS), JavaScript
- **其他**：Marked (Markdown解析)

## 本地开发

### 前提条件

- 安装 Node.js (推荐18.x版本)
- 安装 MongoDB

### 安装步骤

1. 克隆仓库
```bash
git clone <repository-url>
cd complete-blog-system
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env` 文件，添加以下内容：
```
MONGODB_URI=mongodb://localhost:27017/blog-system
PORT=3000
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问系统
   - 前台：http://localhost:3000
   - 后台管理：http://localhost:3000/admin

## 部署到 Vercel

### 步骤

1. **创建 Vercel 账户**
   访问 [Vercel官网](https://vercel.com/) 并注册账户。

2. **准备 Git 仓库**
   将项目推送到 GitHub、GitLab 或 Bitbucket 仓库。

3. **导入项目到 Vercel**
   - 登录 Vercel 控制台
   - 点击 "New Project" 按钮
   - 导入你的 Git 仓库
   - 选择项目根目录

4. **配置环境变量**
   在 Vercel 项目的 "Settings" > "Environment Variables" 中添加以下环境变量：
   - `MONGODB_URI`: 你的 MongoDB 连接字符串
   - `NODE_ENV`: `production`

5. **配置构建设置**
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认
   - Build Command: 留空（Vercel 会自动检测）
   - Output Directory: 留空

6. **部署项目**
   点击 "Deploy" 按钮开始部署过程。

## 注意事项

- MongoDB 连接字符串包含敏感信息，请务必通过环境变量配置，不要硬编码在代码中
- 确保你的 MongoDB 数据库允许来自 Vercel IP 的连接
- 在 Vercel 上部署时，Node.js 版本会根据 package.json 中的 engines 字段自动选择

## License

MIT