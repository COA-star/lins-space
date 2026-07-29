# Lin's space

AI Designer Lin 的个人作品集网站，使用 React + Vite。

## 本地预览

当前本地预览地址：`http://127.0.0.1:5174/`

若下次需要重新启动：

```powershell
cd "D:\ai项目\网站"
npm.cmd run dev
```

## 上传到 GitHub

1. 在 GitHub 点击 **New repository**，创建一个空仓库，例如 `lins-space`。不要勾选 README、`.gitignore` 或 License。
2. 在此文件夹打开 PowerShell，依次运行：

```powershell
cd "D:\ai项目\网站"
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/你的GitHub用户名/lins-space.git
git push -u origin main
```

3. 首次推送时，GitHub 会要求你在浏览器中登录并授权。

## 部署到 Vercel

1. 打开 https://vercel.com/new 并使用 GitHub 登录。
2. 选择 `lins-space` 仓库并点击 **Import**。
3. Vercel 会自动识别 Vite；保持默认的 Build Command：`npm run build`，Output Directory：`dist`。
4. 点击 **Deploy**。完成后，Vercel 会给出可公开访问的网址。
