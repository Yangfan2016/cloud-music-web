## cloud-music-web

This is a music player

![cloud-music-pc](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/cloud-music-pc.gif)

### Run

```bash
$ yarn
$ yarn start
```
然后打开浏览器输入 http://localhost:9631  
> ##### 或者可以到`package.json` 里自定义端口，将 `set PORT=XXXX` 的 `XXXX` 改为你自己想要的端口即可，然后重新执行下 `npm start`

```json
"scripts": {
    "start":"set PORT=9631 && node server/node/server.js"
}
```

### Post

[博客-网易云音乐播放器](https://yangfan2016.github.io/2017/02/18/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/)

### Intro

功能  
- [x] 播放歌曲、暂停歌曲  
- [x] 切换歌曲  
- [x] 调节音量  
- [x] 调节进度条  
- [x] 搜索歌曲  
- [x] 歌词滚动
- [x] 指定歌单播放（目前是使用的“我喜欢的歌曲”这个歌单）

技术栈  
- 前台：`Javascript`+`jQuery`+`HTML`+`CSS`  
- 后台：`Nodejs`

缓存
- 利用`sessionStorage` 存储歌曲基本信息和歌词


原先用的php做的请求代理`server/php/index.php`，现在用nodejs重写了代码作为服务代理，详情`server/node/server.js`

### MIT license
Copyright (c) 2018 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
