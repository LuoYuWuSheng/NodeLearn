/**
 * Computer user xd
 * Created by 张洋 on 2016/12/15.
 */

var request = require('superagent');

module.exports = function search(query,fn) {
    request.get('http://search.twitter.com/search.json')
        //js 这么弱类型也不支持更改立即生效？？？？！！！
        .send({q:query})
        .end(function (res) {
            if (res.body && Array.isArray(res.body.results)){
                return fn(null,res.body.results);
            }
            fn( new Error('twitter 根本到不了'));
        });
};