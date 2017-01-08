/**
 * 基于jQuery
 * Created by kew on 2017/1/6.
 */


var Kew = window.Kew || {};
Kew.fn = Kew.prototype = {

    init: function () {
        return this;
    }
};

Kew.fn.init.prototype = Kew.fn;

window.Kew = Kew;

Kew.getParam = function (name, url) {
    if (!url) {
        url = location.search; // 获取url中"?"符后的字串
    }
    var params = {};
    var param = null;
    var _index = url.lastIndexOf("?");
    if (_index != -1) {
        var str = url.substring(_index + 1);
        var paramArr = str.split("&");
        for (var i = 0; i < paramArr.length; i++) {
            params[paramArr[i].split("=")[0]] = decodeURIComponent(paramArr[i].split("=")[1]);
        }
    }
    if (name) {
        if (params[name] != null) {
            param = params[name];
        }
        return param;
    } else {
        return params;
    }
};

Kew.setCookie = function (name, val, expires) {
    $.cookie(name, val, {expires: expires});
};

Kew.getCookie = function (name) {
    return $.cookie(name);
};

Kew.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

Kew.replace = function (str, searchTexts, replaceTexts) {
    if (Kew.isArray(searchTexts) && Kew.isArray(replaceTexts)) {
        if (searchTexts.length != replaceTexts.length) {
            throw new Exception("寻找和替换需要相同");
        }
    } else {
        searchTexts = [searchTexts];
        replaceTexts = [replaceTexts];
    }

    for (var i = 0; i < searchTexts.length; i++) {
        str = str.replace(searchTexts[i], replaceTexts[i]);
    }

    return str;
};

Kew.requestInfo = {
    domain: window.location.hostname,
    port: window.location.port,
    path: window.location.pathname + window.location.search,
    refer: "",
    hostUrl: "http://" + window.location.host + window.location.pathname
};

Kew.ucfirst = function (str) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
};

Kew.pack = function (byt) {
    var total2str = "";
    for (var i = 0; i < byt.length; i++) {
        var num10 = byt.charCodeAt(i);  ///< 以10进制的整数返回 某个字符 的unicode编码
        var str2 = num10.toString(2);   ///< 将10进制数字 转换成 2进制字符串

        if (total2str == "") {
            total2str = str2;
        } else {
            total2str = total2str + " " + str2;
        }
    }
    console.log("编码后:" + total2str);
    return total2str;
};

Kew.unpack = function (str) {
    var goal = "";
    var arr = str.split(' ');
    for (var i = 0; i < arr.length; i++) {
        var str2 = arr[i];
        var num10 = parseInt(str2, 2); ///< 2进制字符串转换成 10进制的数字
        goal += String.fromCharCode(num10); ///< 将10进制的unicode编码, 转换成对应的unicode字符
    }
    return goal;
};

Kew.getXml = function (data) {
    var urls = data['urls'];
    var vars = data['vars'];
    urllist = '';
    for(var key in urls){
     var value=urls[key];
        urllist+='<video>'+chr(13);
        urllist+="<file><![CDATA["+urls[key]['url']+"]]></file>"+chr(13);
        if (urls[key]['sec']) {
            if (!(urls[key]['size'])) urls[key]['size'] = 0;
            urllist+= "<size>"+urls[key]['size']+"</size>"+chr(13);
            urllist+= "<seconds>"+urls[key]['sec']+ "</seconds>"+chr(13);
        }
        urllist+= '</video>'+chr(13);
    }

    urllist2 = '';
    urllist2+= '<?xml version="1+0" encoding="utf-8"?>'+chr(13);
    urllist2+= '	<ckplayer>';
    urllist2+= '	<flashvars>'+chr(13);
    urllist2+= '	<![CDATA['+vars+ ']]>'+chr(13);
    urllist2+= '	</flashvars>'+chr(13);
    urllist2+= urllist;

    urllist2+= '	</ckplayer>';
    return urllist2;
};

Kew.ajax=function (data) {
    $.ajax({
        url:data.url,
        success:function (data) {
            console.log(data);
        },
        error:function (data) {

        }
    });
};


Kew.const = {
    cq: "cq",
    gq: "gq",
    bq: "bq"
}

