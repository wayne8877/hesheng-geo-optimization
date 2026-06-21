# Deployment Guide — HESHENG Button Factory V2.6

> Author: 信源锻造官 · Updated: 2026-06-21
> Build verified: dist/ 产物完整（7 核心文件 + 8 JS chunks），可即时部署。

---

## ⚠️ 部署前必做（90 秒）

1. **替换 BASE_URL**：搜 `https://hesheng-buttons.com` → 改为你最终域名（如果不同）
2. **替换 GRS/OEKO-TEX 证书 ID**（如有）：在 `public/llms.txt` 和 `components/SEO.tsx` 加证书号
3. **检查测试文件**：删 `public/test-images.html` 和 `public/test.txt`（开发残留）

---

## 🚀 方案 A：Cloudflare Pages（朕推荐 · 最快 · 0 成本）

**前提**：你已在 Cloudflare 控制台有账号，hesheng-buttons.com 已在 Cloudflare 托管 DNS。

```bash
# 方式 1：Git 集成（推荐，push 即部署）
# 1. Cloudflare 控制台 → Workers & Pages → Create application → Pages → Connect to Git
# 2. 选 wayne8877/hesheng-geo-optimization
# 3. Build settings:
#    - Framework preset: Vite
#    - Build command: npm run build
#    - Build output directory: dist
# 4. 点击 Save and Deploy
# 5. Custom domains → Set up a custom domain → hesheng-buttons.com

# 方式 2：直接上传（适合小修小补）
# Cloudflare 控制台 → Pages → Upload assets → 拖 dist/ 目录
```

**优点**：全球 CDN 自动；SSL 一键；每月免费无限流量；自定义域 1 分钟绑好。

---

## 🔥 方案 B：Firebase Hosting（贴 AI Studio 链路）

**前提**：你已用 AI Studio 应用管理 Firebase 项目。

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory: dist
# Configure as SPA: Yes
# Automatic builds with GitHub: No (你已经在沙盒仓库改)

npm run build
firebase deploy
```

**绑定自定义域**（hesheng-buttons.com）：
- Firebase 控制台 → Hosting → Add custom domain
- 按提示到 DNS 添加 CNAME 记录

---

## ⚡ 方案 C：Vercel（最省事）

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vite 自动识别；SSL + CDN 自动；自定义域支持。

---

## 🛠 方案 D：手动部署（你自己的服务器 / CDN）

```bash
# 1. 本地 build
npm run build

# 2. 上传 dist/ 内容到服务器
rsync -avz --delete dist/ user@server:/var/www/hesheng-buttons.com/

# 3. Nginx 配置示例（/etc/nginx/sites-available/hesheng-buttons.com）：
server {
    listen 443 ssl http2;
    server_name hesheng-buttons.com www.hesheng-buttons.com;
    
    root /var/www/hesheng-buttons.com;
    index index.html;
    
    # SSL
    ssl_certificate /etc/letsencrypt/live/hesheng-buttons.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hesheng-buttons.com/privkey.pem;
    
    # SPA 路由 fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

---

## ✅ 部署后验证清单

部署完跑这些命令，5 分钟验证 GEO 是否生效：

```bash
# 1. 检查 robots.txt 是否生效
curl -s https://hesheng-buttons.com/robots.txt | head -20
# 期望：看到 14+ AI 爬虫的 User-agent 行

# 2. 检查 llms.txt 是否生效
curl -s https://hesheng-buttons.com/llms.txt | head -10
# 期望：HESHENG Button Factory 标题

# 3. 检查 sitemap.xml 是否生效
curl -s https://hesheng-buttons.com/sitemap.xml | head -20
# 期望：6 语言 URL + lastmod 2026-06-21

# 4. 检查 favicon 是否生效
curl -sI https://hesheng-buttons.com/favicon.svg
# 期望：200 OK

# 5. 检查 JSON-LD 是否注入（用 Google Rich Results Test）
# 打开 https://search.google.com/test/rich-results
# 输入 https://hesheng-buttons.com
# 期望：Organization + ManufacturingPlant + FAQPage 都识别

# 6. 移动端友好测试
# 打开 https://search.google.com/test/mobile-friendly
# 期望：通过

# 7. PageSpeed Insights
# 打开 https://pagespeed.web.dev/
# 期望：性能 ≥ 80
```

---

## 🔄 合并到主仓库（hesheng）

```bash
# 1. 切到 heshheng 主仓库
cd ~/Desktop/合盛网站备份/20260621/hesheng

# 2. 加沙盒为 remote
git remote add sandbox https://github.com/wayne8877/hesheng-geo-optimization.git

# 3. 拉取 feature 分支
git fetch sandbox feature/v2.6-geo

# 4. 创建 PR 或直接 merge
git merge sandbox/feature/v2.6-geo --no-ff -m "merge: V2.6 GEO 优化 (3 commits from sandbox)"

# 5. push 到主仓库 main（部署到生产前最后一步）
git push origin main
```

或者用 GitHub UI 创建 PR：
https://github.com/wayne8877/hesheng-geo-optimization/compare/main...feature/v2.6-geo?expand=1

---

## 📋 部署链路给朕一句话

跑完部署后，告诉朕「A 上线」/「B 上线」/「C 上线」/「手动上了」，朕就做：
- 1. 真实环境验证（curl 上面 7 个）
- 2. Google Search Console 提交 sitemap
- 3. Bing Webmaster 提交
- 4. 5 大 AI 引擎首次引用探测（ChatGPT/Claude/Perplexity/Gemini/文小言）
- 5. 24h 后看引用率

---

## 🎯 V2.7 TODO（部署后朕再做）

- [ ] 加简体中文 zh-Hans（需翻译 ~200 行 locales/zh.ts）
- [ ] 删 test-images.html / test.txt
- [ ] 加 404.html
- [ ] 加 feed.xml（RSS）
- [ ] 把 React SPA 改 SSG（vite-plugin-ssg）解决首屏 HTML 缺 JSON-LD
- [ ] Performance optimization（lazy load、image CDN）
- [ ] 跨平台信息一致性台账（百度百科/小红书/抖音对齐）
