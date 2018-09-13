const qs = require("querystring");
const http = require("http");
const url = require("url");

function serverRequest(options) {
    return new Promise(function (resolve, reject) {
        let body = options.data || '';
        let req = http.request({
            host: options.host, //域名
            path: options.path, //资源地址
            method: options.method, //请求方式
            headers: Object.assign({}, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
            }, options.headers)
        }, function (res) {
            console.log(`状态码: ${res.statusCode}`);
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(`解析数据遇到问题: ${e.message} \n ${rawData}`);
                }
            });
        });
        req.on('error', (e) => {
            reject(`请求遇到问题: ${e.message}`);
        });

        req.write(body);
        req.end();
    });
}


serverRequest.get = function (options) {
    let reqUrl = url.parse(options.url);
    let reqPath = reqUrl.pathname;
    let body = qs.stringify(options.data || '');
    if (!reqUrl.query) {
        reqPath += `?${body}`;
    } else {
        reqPath += `${reqUrl.search}&${body}`;
    }
    return serverRequest({
        method: 'GET',
        host: reqUrl.host,
        path: reqPath,
    }, options);
}

serverRequest.post = function (options) {
    let reqUrl = url.parse(options.url);
    let body = qs.stringify(options.data);
    return serverRequest(Object.assign({}, options, {
        method: 'POST',
        host: reqUrl.host,
        path: reqUrl.path,
        data: body,
    }));
}

module.exports = serverRequest;