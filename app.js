const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const path = require('path');
const marked = require('marked');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 数据库连接
let db;
connectDB().then(database => {
  db = database;
  console.log('数据库连接成功');
}).catch(err => {
  console.error('数据库连接失败:', err);
});

// API路由 - 文章相关
app.get('/api/articles', async (req, res) => {
  try {
    const category = req.query.category;
    let articles;
    
    if (category) {
      articles = await db.collection('articles').find({ category, status: 'published' }).sort({ createdAt: -1 }).toArray();
    } else {
      articles = await db.collection('articles').find({ status: 'published' }).sort({ createdAt: -1 }).toArray();
    }
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: '获取文章失败' });
  }
});

// 获取所有文章（包括草稿）
app.get('/api/articles/all', async (req, res) => {
  try {
    const articles = await db.collection('articles').find().sort({ createdAt: -1 }).toArray();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: '获取文章失败' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let articleId;
    try {
      articleId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的文章ID格式' });
    }
    
    const article = await db.collection('articles').findOne({ _id: articleId });
    if (!article) return res.status(404).json({ error: '文章不存在' });
    
    // 转换Markdown为HTML
    article.contentHtml = marked.parse(article.content);
    res.json(article);
  } catch (err) {
    console.error('获取文章详情失败:', err);
    res.status(500).json({ error: '获取文章详情失败' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const article = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('articles').insertOne(article);
    res.status(201).json({ ...article, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: '发布文章失败' });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let articleId;
    try {
      articleId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的文章ID格式' });
    }
    
    const article = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const result = await db.collection('articles').updateOne(
      { _id: articleId },
      { $set: article }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: '文章不存在或未做任何修改' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('更新文章失败:', err);
    res.status(500).json({ error: '更新文章失败' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let articleId;
    try {
      articleId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的文章ID格式' });
    }
    
    const result = await db.collection('articles').deleteOne({ _id: articleId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('删除文章失败:', err);
    res.status(500).json({ error: '删除文章失败' });
  }
});

// API路由 - 分类相关
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('categories').find().sort({ createdAt: -1 }).toArray();
    res.json(categories);
  } catch (err) {
    console.error('获取分类失败:', err);
    res.status(500).json({ error: '获取分类失败' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('categories').insertOne(category);
    res.status(201).json({ ...category, _id: result.insertedId });
  } catch (err) {
    console.error('创建分类失败:', err);
    res.status(500).json({ error: '创建分类失败' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let categoryId;
    try {
      categoryId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的分类ID格式' });
    }
    
    const category = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const result = await db.collection('categories').updateOne(
      { _id: categoryId },
      { $set: category }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: '分类不存在或未做任何修改' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('更新分类失败:', err);
    res.status(500).json({ error: '更新分类失败' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let categoryId;
    try {
      categoryId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的分类ID格式' });
    }
    
    const result = await db.collection('categories').deleteOne({ _id: categoryId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: '分类不存在' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('删除分类失败:', err);
    res.status(500).json({ error: '删除分类失败' });
  }
});

// API路由 - 设置相关
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await db.collection('settings').findOne({ _id: 'blog_settings' });
    res.json(settings || {});
  } catch (err) {
    console.error('获取设置失败:', err);
    res.status(500).json({ error: '获取设置失败' });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const settings = {
      _id: 'blog_settings',
      ...req.body,
      updatedAt: new Date()
    };
    
    await db.collection('settings').updateOne(
      { _id: 'blog_settings' },
      { $set: settings },
      { upsert: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error('保存设置失败:', err);
    res.status(500).json({ error: '保存设置失败' });
  }
});

// API路由 - 留言相关
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.collection('messages').find().sort({ createdAt: -1 }).toArray();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: '获取留言失败' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = {
      ...req.body,
      createdAt: new Date()
    };
    
    const result = await db.collection('messages').insertOne(message);
    res.status(201).json({ ...message, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: '提交留言失败' });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    // 验证并转换ID
    let messageId;
    try {
      messageId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: '无效的留言ID格式' });
    }
    
    const result = await db.collection('messages').deleteOne({ _id: messageId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: '留言不存在' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('删除留言失败:', err);
    res.status(500).json({ error: '删除留言失败' });
  }
});

// 前端页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', req.params[0] || 'index.html'));
});

app.get('/category/:category', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/article/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'article.html'));
});

app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'messages.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
    