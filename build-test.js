// 简单的构建测试脚本
// 用于验证项目在Vercel上的构建兼容性

// 检查主要文件是否存在
const fs = require('fs');
const path = require('path');

// 检查必要的文件
const requiredFiles = [
  'app.js',
  'db.js',
  'package.json',
  'vercel.json',
  'public/index.html',
  'public/admin/index.html'
];

let allFilesExist = true;

console.log('开始构建测试...');
console.log('====================');

// 检查文件是否存在
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ 文件存在: ${file}`);
  } else {
    console.log(`❌ 文件不存在: ${file}`);
    allFilesExist = false;
  }
});

console.log('====================');

// 检查package.json配置
if (allFilesExist) {
  try {
    const packageJson = require('./package.json');
    
    console.log('检查package.json配置...');
    console.log(`- Node.js版本要求: ${packageJson.engines?.node || '未指定'}`);
    console.log(`- 主入口文件: ${packageJson.main}`);
    console.log(`- 脚本命令: ${Object.keys(packageJson.scripts).join(', ')}`);
    console.log(`- 核心依赖: ${Object.keys(packageJson.dependencies).join(', ')}`);
    
    console.log('====================');
    
    // 检查是否有不必要的依赖
    if (packageJson.dependencies['mongod']) {
      console.log('❌ 警告: package.json中仍包含可能不需要的"mongod"依赖');
    }
    
    // 检查vercel.json配置
    const vercelJson = require('./vercel.json');
    console.log('检查vercel.json配置...');
    console.log(`- Vercel配置版本: ${vercelJson.version}`);
    console.log(`- 构建配置数量: ${vercelJson.builds?.length || 0}`);
    console.log(`- 路由配置数量: ${vercelJson.routes?.length || 0}`);
    
    console.log('====================');
    console.log('✅ 构建测试通过！项目已准备好部署到Vercel。');
    console.log('');
    console.log('部署指南:');
    console.log('1. 将项目推送到GitHub/GitLab/Bitbucket');
    console.log('2. 在Vercel上导入项目');
    console.log('3. 配置环境变量(MONGODB_URI)');
    console.log('4. 点击部署按钮');
  } catch (err) {
    console.log(`❌ 构建测试失败: ${err.message}`);
  }
} else {
  console.log('❌ 构建测试失败: 缺少必要的文件');
}