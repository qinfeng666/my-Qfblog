// 模拟数据生成脚本
// 用于在前端展示一些测试文章数据

const mockArticles = [
    {
        _id: '1',
        title: 'React Hooks 入门指南',
        category: 'tech',
        content: '# React Hooks 入门指南\n\n## 什么是 React Hooks\n\nReact Hooks 是 React 16.8 版本引入的新特性，它允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。\n\n## 常用的 Hooks\n\n### useState\n\n`useState` 允许你在函数组件中添加 state：\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n### useEffect\n\n`useEffect` 可以让你在函数组件中执行副作用操作：\n\n```javascript\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);\n```\n\n## 自定义 Hooks\n\n你也可以创建自己的 Hooks 来复用状态逻辑。\n\n## 总结\n\nHooks 是 React 的一个重要特性，它让函数组件变得更加灵活和强大。',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        _id: '2',
        title: 'Vue 3 Composition API 实践',
        category: 'tech',
        content: '# Vue 3 Composition API 实践\n\n## 为什么使用 Composition API\n\nVue 3 的 Composition API 提供了一种更灵活的方式来组织和重用组件逻辑。\n\n## setup 函数\n\nComposition API 的核心是 `setup` 函数：\n\n```javascript\nexport default {\n  setup() {\n    // 组件逻辑\n    return {\n      // 暴露给模板的属性\n    }\n  }\n}\n```\n\n## 响应式引用\n\n使用 `ref` 和 `reactive` 创建响应式数据：\n\n```javascript\nconst count = ref(0);\nconst user = reactive({ name: 'John' });\n```\n\n## 生命周期钩子\n\nComposition API 提供了一系列生命周期钩子：\n\n```javascript\nonMounted(() => {\n  console.log('Component mounted');\n});\n```',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
        _id: '3',
        title: '前端性能优化技巧',
        category: 'tech',
        content: '# 前端性能优化技巧\n\n## 代码分割\n\n使用代码分割可以减少初始加载时间：\n\n```javascript\nimport(/* webpackChunkName: "lodash" */ 'lodash').then((_) => {\n  // 使用 lodash\n});\n```\n\n## 懒加载\n\n图片懒加载可以减少带宽使用：\n\n```html\n<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" />\n```\n\n## 缓存策略\n\n合理使用浏览器缓存可以提高重复访问的性能。\n\n## 性能监控\n\n使用 Chrome DevTools 和 Lighthouse 等工具监控性能。',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        _id: '4',
        title: '我的学习笔记：JavaScript 异步编程',
        category: 'emotion',
        content: '# 我的学习笔记：JavaScript 异步编程\n\n## 回调函数\n\n回调函数是 JavaScript 中处理异步操作的传统方式：\n\n```javascript\nfs.readFile('file.txt', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n```\n\n## Promise\n\nPromise 提供了一种更优雅的方式来处理异步操作：\n\n```javascript\nnew Promise((resolve, reject) => {\n  // 异步操作\n}).then(result => {\n  // 处理成功\n}).catch(error => {\n  // 处理错误\n});\n```\n\n## async/await\n\nasync/await 让异步代码看起来像同步代码：\n\n```javascript\nasync function getData() {\n  try {\n    const result = await fetchData();\n    return result;\n  } catch (error) {\n    console.error(error);\n  }\n}\n```',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
        _id: '5',
        title: '周末阅读：程序员如何保持创造力',
        category: 'emotion',
        content: '# 周末阅读：程序员如何保持创造力\n\n## 1. 持续学习\n\n技术领域变化很快，保持学习的态度很重要。\n\n## 2. 涉猎不同领域\n\n学习其他领域的知识可以带来新的视角。\n\n## 3. 适当休息\n\n休息是为了更好地工作，保持良好的作息很重要。\n\n## 4. 参与开源项目\n\n参与开源项目可以学习其他人的代码和思路。\n\n## 5. 记录灵感\n\n随身携带笔记本，随时记录灵感。',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// 如果需要，可以在控制台输出这些数据
if (typeof window !== 'undefined') {
    // 在浏览器环境中，将数据存储到 localStorage
    localStorage.setItem('mockArticles', JSON.stringify(mockArticles));
    console.log('Mock articles data has been saved to localStorage');
} else {
    // 在 Node.js 环境中
    console.log('Mock articles data:', mockArticles);
}