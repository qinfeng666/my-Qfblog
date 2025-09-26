const { connectDB } = require('./db');

async function testConnection() {
  const db = await connectDB();
  // 测试插入一条数据
  await db.collection('test').insertOne({ message: '连接成功！' });
  console.log("测试数据插入成功");
}

testConnection();