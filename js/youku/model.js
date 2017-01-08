/**
 * Created by kew on 2017/1/8.
 */


function getvideo(id, pid,cal ) {
    if(!pid){
        pid = 3;
    }

    var ysid = id;
    var hz = '_youku',hd,pidx;
    if(pid=="1")
    {hd="1";pidx="flv";}
    else if(pid=="2")
    {hd="2";pidx="mp4";}
    else if(pid=="3")
    {hd="3";pidx="flv";}
    var html ,qvars,qxd,qxurl,data;
    Kew.get_curl_contents('http://play.youku.com/play/get.json?vid='+id+'&ct=12',null,null,function (json) {
        html=json;
        //需要json
        switch (pid) {
            case '1':
                qvars = Kew.const.bq +'_' + ysid +hz+'|'+ Kew.const.gq + '_' + ysid + hz + '|' + Kew.const.cq + '_' + ysid + hz;
                qxd = '标清|高清|超清';
                qxurl = 'bq_' + ysid + '_youku';
                break;

            case '2':
                qvars =Kew.const.gq+ '_' + ysid + hz + '|' + Kew.const.bq + '_' + ysid + hz + '|' + Kew.const.cq + '_' + ysid + hz;
                qxd = '高清|标清|超清';
                qxurl = 'gq_' + ysid + '_youku';
                break;

            case '3':
                qvars =Kew.const.cq+  '_' + ysid + hz + '|' + Kew.const.bq + '_' + ysid + hz + '|' + Kew.const.gq + '_' + ysid + hz;
                qxd = '超清|标清|高清';
                qxurl = 'cq_' + ysid + '_youku';
                break;
        }
        data = json.data;
        var fileids = data[stream[hd]].stream_fileid;
        var segs = data.stream[hd].segs;

        var fileid_1 = fileids.substr(0, 8);
        var fileid_2 = fileids.substr(10);
        var i=yk_e("becaf9be",yk_na(data.security.encrypt_string)).split("_");
        var sid=i[0];
        var token=i[1],urllist={};
        for(var k in segs){
            var v=segs[k].v;
            var hex=parseInt(k).toString(16).toLocaleUpperCase();
            if (strlen(hex) < 2){
                hex = '0'+hex;
            }
            var fileid = fileid_1 + hex + fileid_2;
            var key = v.key;
            if (!key || key == '' || key == '-1')
            {
                key = segs[k].key;
            }
            var ep = encodeURI(yk_d(yk_e('bf7e5f01', sid+ '_' + fileid +'_' + token)));
            var tvaddr = "http://k.youku.com/player/getFlvPath/sid/" + sid +'_00/st/' + pidx + '/fileid/' +fileid + '?K=' + key + '&hd=1&myp=0&ts=';
            tvaddr+= v.total_milliseconds_video +'&ypp=0&ctype=12&ev=1&token=' + token + '&oip=' + data.security.ip + '&ep=' + ep;
            urllist['urls'][k]['url'] = tvaddr;
        }

        urllist.vars="{h->3}{a->qxurl}{defa->qvars}{deft->qxd}{f->"+Kew.requestInfo.hostUrl+"?url=[\pat]}";
        cal(urllist);
    });
}
function yk_file_id(fileId, seed) {
    var mixed = yk_Mix_String(seed);
    var ids =fileId.split("*");
    ids.splice(ids.length-1,1);
    var realId = '';
    for (var i = 0; i < ids.length; i++) {
        var idx = ids[i];
        realId+= mixed.substr( idx, 1);
    }
    return realId;
}
function yk_Mix_String(seed) {
    var string = ("abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase()) + strtoupper("abcdefghijklmnopqrstuvwxyz") + '/\\:._-1234567890';
    var count = string.length,mixed='';
    for (var i = 0; i < count; i++) {
        var seed = (seed * 211 + 30031) % 65536;
        index = (seed / 65536 * string.length);
        item = string.substr(index, 1);
        mixed+= item;
        string = string.replace(item, '');
    }
    return mixed;
}

function yk_na(a) {
    if (!a) return "";
    h = "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1".split(",");
    i = a.length;
    f = 0;
    for (e = ""; f < i;) {
        do c = h[charCodeAt(a, f++) & 255];
        while (f < i && - 1 == c);
        if (-1 == c) break;

        do b = h[charCodeAt(a, f++) & 255];
        while (f < i && - 1 == b);
        if (-1 == b) break;

        e+= fromCharCode(c << 2 | (b & 48) >> 4);
        do {
            c = charCodeAt(a, f++) & 255;
            if (61 == c) return e;
            c = h[c];
        }
        while (f < i && - 1 == c);
        if (-1 == c) break;

        e+= fromCharCode((b & 15) << 4 | (c & 60) >> 2);
        do {
            b = charCodeAt(a, f++) & 255;
            if (61 == b) return e;
            b = h[b];
        }
        while (f < i && - 1 == b);
        if (-1 == b) break;

        e+= fromCharCode((c & 3) << 6 | b);
    }
    return e;
};

function yk_d(a) {
    if (!a) return '';
    var f = a.length;
    var b = 0;
    var str = ("abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase()) +("abcdefghijklmnopqrstuvwxyz".toLocaleLowerCase()) +'0123456789+/';
    for (var c = ''; b < f;) {
        var e = charCodeAt(a, b++) & 255;
        if (b == f) {
            c+= charAt(str, (e >> 2));
            c+= charAt(str, ((e & 3) << 4));
            c+= "==";
            break;
        }
        var g = charCodeAt(a, b++);
        if (b == f) {
            c+= charAt(str, (e >> 2));
            c+= charAt(str, ((e & 3) << 4 | (g & 240) >> 4));
            c+= charAt(str, ((g & 15) << 2));
            c+= "=";
            break;
        }
        var h = charCodeAt(a, b++);
        c+= charAt(str, (e >> 2));
        c+= charAt(str, ((e & 3) << 4 | (g & 240) >> 4));
        c+= charAt(str, ((g & 15) << 2 | (h & 192) >> 6));
        c+= charAt(str, (h & 63));
    }
    return c;
}
function yk_e(a, c) {
    for (f = 0, i, e = '', h = 0; 256 > h; h++) b[h] = h;
    for (h = 0; 256 > h; h++) {
        f = (f + b[h] + charCodeAt(a, h % strlen(a))) % 256;
        i = b[h];
        b[h] = b[f];
        b[f] = i;
    }
    for (q = f = h = 0; q < strlen(c); q++) {
        h = (h + 1) % 256;
        f = (f + b[h]) % 256;
        i = b[h];
        b[h] = b[f];
        b[f] = i;
        e+= fromCharCode(charCodeAt(c, q) ^ b[(b[h] + b[f]) % 256]);
    }
    return e;
}
function fromCharCode(codes) {
    if (isNaN(codes)) {
        codes =arguments;
    }
    str = '';
    for(var code in codes){
        console.log(codes[code]);
        str+= parseInt(codes[code],2);
    }
    return str;
}
function charCodeAt(str, index) {
    var charCode = [];
    key = $.md5(str);
    index = index + 1;
    if (charCode[key]) {
        return charCode[key][index];
    }
    charCode[key] = Kew.pack(str);
    return charCode[key][index];
}
function charAt(str, index) {
    return str.substr(index, 1);
}