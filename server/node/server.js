const path = require("path");
const http = require("http");
const url = require("url");
const fs = require("fs");
const mime = require("mime-types");
const requset = require("./tools/request.js");

// config
const SITE_ROOT_DIR = path.resolve(__dirname, "../../");
const PORT = process.env.PORT || '9631';
const staticReg = /\.\w+$/;
const proxyReg = /^\/api/;

// create httpserver
const app = new http.Server();

let requestListener = function (req, res) {
    let routePath = url.parse(req.url);
    let isStatic = staticReg.test(routePath.pathname);
    let isProxy = proxyReg.test(routePath.pathname);
    let mimeType = mime.lookup(routePath.pathname); // may be return 'false'

    // 静态资源
    if (isStatic) {
        // 处理 css js image fonts 等
        if (mimeType === false) {
            console.log('无法识别此文件类型');
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('无法识别此文件类型');
            return;
        }
        switch (true) {
            case mimeType.indexOf('image') !== -1:
                fs.readFile(path.join(SITE_ROOT_DIR, routePath.pathname), 'binary', function (err, bin) {
                    if (!err) {
                        res.writeHead(200, {
                            "Content-Type": mimeType
                        });
                        res.write(bin, 'binary');
                        res.end();
                    }
                });
                break;
            case mimeType.indexOf('font') !== -1:
                fs.readFile(path.join(SITE_ROOT_DIR, routePath.pathname), 'binary', function (err, bin) {
                    if (!err) {
                        res.writeHead(200, {
                            "Content-Type": mimeType
                        });
                        res.write(bin, 'binary');
                        res.end();
                    }
                });
                break;
            default:
                fs.readFile(path.join(SITE_ROOT_DIR, routePath.pathname), 'UTF-8', function (err, data) {
                    if (!err) {
                        res.writeHead(200, {
                            "Content-Type": mimeType
                        });
                        res.write(data);
                        res.end();
                    }
                });
                break;
        }
    } else { // 路由
        // 需要代理
        if (isProxy) {
            let target = 'http://music.163.com';
            let proxyPath = `${target}${routePath.path}`;

            requset.get({
                url: proxyPath,
                data: routePath.query,
                headers: {
                    'Referer': 'http://music.163.com/',
                    'Cookie': "appver=1.5.0.75771",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
                }
            })
                .then(function (d) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(JSON.stringify(d));
                    res.end();
                })
                .catch(function (r) {
                    res.writeHead(504, {
                        'Content-Type': 'text/plain'
                    });
                    res.write(r);
                    res.end();
                });

        } else {  // 不需要代理
            switch (routePath.pathname) {
                case '/':
                    fs.readFile(path.join(SITE_ROOT_DIR, '/index.html'), 'UTF-8', function (err, data) {
                        if (!err) {
                            res.writeHead(200, {
                                "Content-Type": "text/html"
                            });
                            res.write(data);
                            res.end();
                        }
                    });
                    break;
                default:
                    res.write('404 NOT FOUND');
                    res.end();
                    break;
            }
        }

    }

};
app.on("request", requestListener);
app.listen(PORT);
console.log(`The server is running at http://localhost:${PORT}`);

