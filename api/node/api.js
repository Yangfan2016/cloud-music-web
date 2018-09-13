const request = require("./tools/request.js");

request.post({
    url: 'http://music.163.com/api/search/pc', //资源地址
    data: {
        's': 'gem',
        'offset': '0',
        'limit': '20',
        'type': 1,
    },
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        'Referer': 'http://music.163.com/',
        'Cookie': "appver=1.5.0.75771",
        "Connection": "close",
    }
})
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.error(err);
    });

request.get({
    url: 'http://music.163.com/api/playlist/detail',
    data: {
        id: "22320356",
    },
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        'Referer': 'http://music.163.com/',
        'Cookie': "appver=1.5.0.75771",
    }
})
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.error(err);
    });