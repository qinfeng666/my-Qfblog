const { MongoClient } = require('mongodb');

// 从环境变量获取连接字符串，开发环境可以使用默认值
// 注意：在生产环境中，请使用Vercel的环境变量配置
const uri = process.env.MONGODB_URI || 'mongodb+srv://qinfeng666:QF123456789@cluster0.sewdkni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// 创建客户端实例
const client = new MongoClient(uri);

// 连接数据库的函数
async function connectDB() {
  try {
    await client.connect();
    console.log("成功连接到MongoDB");
    return client.db(); // 返回数据库实例
  } catch (err) {
    console.error("连接失败：", err);
    throw err;
  }
}

module.exports = { connectDB, client };
    