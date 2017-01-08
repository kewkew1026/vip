/**
 * Created by kew on 2017/1/6.
 */
var Kew=window.Kew||{};
Kew.fn=Kew.prototype={

    init:function(){
        return this;
    }
};

Kew.fn.init.prototype = Kew.fn;

window.Kew = Kew;

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g,"");
}

/***
 * 正在查看用法 - 2017-1-7-13:41
 * 取出需要的参数 -2017-1-7-13:57
 * @param str
 * @param start
 * @param end
 * @returns {string}
 */
Kew.inter=function(str,start,end){
    var wd2='',wd;
    if(str && start){
        var arr=str.split(start);
        if(arr.length>1){
            wd=arr[1];
            if(end){
                var arr2=wd.split(end);
                if(arr2.length>1){
                    wd2=arr2[0];
                }
                else{
                    wd2=wd;
                }
            }
            else{
                wd2=wd;
            }
        }
    }
    return wd2;
};

//出问题
Kew.urldebug=function(url,isCallBack){//如果不希望往服务器回传数据，请自己把$off的值改为true
    var data={};
    data['status'] = -1;
    data['msg'] = '该地址不能正常解析，已经记录，会在最短的时间内解决该问题';
    data['url'] = url;
    // if(isCallBack ){
    //     url= 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    //     $out = 'http://debug.flv.pw/urldebug.php?url='.base64_encode(url);
    //     if($out != '1'){
    //         data['msg'] = '该地址不能正常解析，地址记录无法正常记入数据库';
    //     }
    // }

    return data;
};

// http 使用ajax 替换
Kew.get_curl_contents=function(url,header,body,cal){
    var cookies = ['juid=01atlmqmev1ivd; cna=1/5vEKEjrwYCAX1u5ai7Xjk+; _ga=GA1.2.1207046816.1474976170; __aryft=1475417743; uaid=0c212b3d800344f3a9ac0b8348a3b933; __ysuid=1477146898344P5U; __tft=1478006967536; __vtft=1478346378708; __ali=14808411288117Ub; __aliCount=1; __yscnt=1; yseid=1481550805520ngYpHt; yseidcount=37; seid=01b3pkuegl22vu; referhost=http%3A%2F%2Fwww.youku.com; ykss=c9ab4e5824ad9abe5ef28ac3; P_j_scl=hasCheckLogin; _l_lgi=786224940; ypvid=14815508677499RszB1; ysestep=3; yseidtimeout=1481558067752; ycid=0; ystep=109; seidtimeout=1481552667762; __ayft=1481550805486; __aysid=1481428595832vKG; __arpvid=1481550868025YUsGXl-1481550868056; __arycid=dd-3-00; __ayscnt=1; __arcms=dd-3-00; __aypstp=4; __ayspstp=10; yktk=1%7C1481550807%7C15%7CaWQ6Nzg2MjI0OTQwLG5uOuelnuenmOS6uui1teWFiOeUnyx2aXA6ZmFsc2UseXRpZDo3ODYyMjQ5NDAsdGlkOjA%3D%7Ce20b102f35e73d4537c181947bfd351f%7Cdc79b8c7d7240abfa1e4ac112b84169085645a20%7C1; u=%E7%A5%9E%E7%A7%98%E4%BA%BA%E8%B5%B5%E5%85%88%E7%94%9F; szutsid=786224940; userTrack_predict=17%2C1905.5882352941176%2C1481550854717%2C3.380518042373351; view_record=g%3A1%2Co%3A1%2Cg%3A2%2Cc%3A2%2Cd%3A1%2C32%3A1%2Cv%3A1%2Cc%3A1%2Ch%3A1%2Cd%3A2%2C35%3A1%2Cd%3A1_1; track_castids=; updatetime=1481550855622; __ayvstp=5; __aysvstp=2'];
//随机取一个cookie
    var rand = parseInt(Math.random()*10%cookies.length);
    cookies = cookies[rand];
    Kew.ajax({
        url:url,
        success:function (data) {
            cal(data);
        }
    });

    // curl_setopt($c, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    // curl_setopt($c, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:'.$_SERVER["REMOTE_ADDR"], 'CLIENT-IP:'.$_SERVER["REMOTE_ADDR"]));
    // $content = curl_exec($c);

}

Kew.getVideoId=function (url) {
    var data={ status:"0" };
    if(url.indexOf("youku.com")>-1){
         data.type="youku";
         if(url.indexOf("html")>-1){
             data.id=Kew.inter(url,'id_','.html');
         }
         else if(url.indexOf("swf")>-1){
             data.id=Kew.inter(url,'/sid/','/');
         }else{
            data=Kew.urldebug(url);
         }
    }else if(url.indexOf("letv.com")>-1){
        data.type="letv";
        if(url.indexOf("html")>-1) {
            data.id = Kew.inter(url, 'vplay/', '.html');
        }
        else if(url.indexOf("swf")>-1){
            data.id=Kew.inter(url,'id=','&');
        }else{
            data=Kew.urldebug(url);
        }
    }else if(url.indexOf("wasu.cn")>-1){
        data.type="wasu";
        if(url.indexOf("/show/")>-1){
            data.id=Kew.inter(url,'id/','');
        }else{
            data=Kew.urldebug(url);
        }
    }else if(url.indexOf('yinyuetai.com')>-1){
        data['type'] = 'yinyuetai';
        if(url.indexOf('/video/')>-1){
            data['id'] =Kew.inter(url,'video/','');
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('pptv.com')>-1){
        data['type'] = 'pptv';
        if(url.indexOf('show/')>-1){
            data['id'] =Kew.inter(url,'show/','.html');
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('ifeng.com')>-1){
        data['type'] = 'ifeng';
        if(url.indexOf('shtml')>-1){
            var arr=url.split("/");
            var wd=arr[arr.length-1];
            wd=wd.replace(".shtml","");
            data['id'] = wd;
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('qq.com')>-1){
        data['type'] = 'qq';
        if(url.indexOf('html')>-1){
            var arr=url.split("/");
            var wd=arr[arr.length-1];
            wd=wd.replace(".html","");
            data['id'] = wd;
        }
        else if(url.indexOf('swf')>-1){
            data['id']=Kew.inter(url,'vid=','&');
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('56.com')>-1){
        data['type'] = '56';
        if(url.indexOf('v_')){
            var wd=Kew.inter(url,'v_','.');
        }else if(url.indexOf('cpm_')>-1){
            wd=Kew.inter(url,'cpm_','.');
        }else if(url.indexOf('vid-')>-1){
            wd=Kew.inter(url,'vid-','.');
        }else if(url.indexOf('open_')>-1){
            wd=Kew.inter(url,'open_','.');
        }else if(url.indexOf('redian/')>-1){
            wd=url.split("redian/")
            var wd2 =wd[1].split("/");
            wd = '';
            wd = wd2[0];
            if(wd2[1]){
                wd = wd2[1];
            }
        }
        if(wd){
            data['id'] = wd;
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('cntv.cn')>-1){
        data['type'] = 'cntv';
        data['id']='';
        var content;
        if(!data['id']){
            Kew.get_curl_contents(url,null,null,function (content) {
                data['id']=Kew.inter(content,'videoId:"','"');
            });
        }else if(url.indexOf('/video/')>-1){
            var arr=url.split('/');
            wd=arr[arr.length-1];
            data['id']=wd;
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('17173.com')>-1){
        data['type'] = '17173';
        data['id']='';
        if(!data['id']){
            Kew.get_curl_contents(url,null,null,function (content) {
                data['id']=Kew.inter(content,'videoId:"','"');
            });
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('bilibili.com')>-1){
        data['type'] = 'bilibili';
        if(url.indexOf('/video/')>-1){
            var arr=url.split('/');
            wd=arr[arr.length-2];
            wd=Kew.inter(wd,'av','');
            urlapi="http://www.bilibilijj.com/Api/AvToCid/wd";
            Kew.get_curl_contents(urlapi,null,null,function (content) {
                data['id'] =Kew.inter(content,'cid&quot;:','}');
            });

        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('tudou.com')>-1){
        data['type'] = 'tudou';
        data['id']='';
        if(url.indexOf('swf')>-1){

            wd=Kew.inter(url,'iid=','&');

            data['id'] = wd;
        }
        if(url.indexOf('programs/view')>-1){
            Kew.get_curl_contents(url,null,null,function (content) {
                wd=Kew.inter(content,'iid: ',' ');
                data['id'] = wd;
            });
        }

        if(url.indexOf('tudou.com/v/')>-1){
            var arr=url.split('/');
            wd=arr[arr.length-2];
            url="http://www.tudou.com/programs/view/wd/";
            Kew.get_curl_contents(url,null,null,function (content) {
                wd=Kew.inter(content,'iid: ',' ');
                data['id'] = wd;
            });
        }
        if(url.indexOf('tudou.com/listplay')>-1){
            Kew.get_curl_contents(url,null,null,function (content) {
            wd=Kew.inter(content,'iid: ',' ');
            wd=wd.substr(0,9);
            });
        }
        if(!data['id']){
            Kew.get_curl_contents(url,null,null,function (content) {
                wd=Kew.inter(content,'vcode:"','"');
                if(!wd){
                    wd=Kew.inter(content,'vcode: \'','\'');
                }
                if (wd){
                    data['type'] = 'tudou';
                    data['id'] = Kew.inter(content,'iid:',',').trim();
                }else{
                    Kew.urldebug(url);
                }
            });
        }
    }else if(url.indexOf('hunantv.com')>-1){
        data['type'] = 'mgtv';
        if(url.indexOf('html')>-1){
            var arr=url.split('/');
            wd=arr[arr.length-1];
            data['id']=wd.replace('.html','');
        }else if(url.indexOf('swf')>-1){
            data['id']=Kew.inter(url,'video_id=','');
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('sohu.com')>-1){
        data['type'] = 'sohu';
        data['id']='';
        if(!data['id']){
            Kew.get_curl_contents(url,null,null,function (content) {
                url=content;
                wd=Kew.inter(url,'var vid="','";');
                data['id']=wd;
            });
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('sina.com.cn')>-1){
        data['type'] = 'sina';
        if(url.indexOf('sina.com.cn')>-1){
            Kew.get_curl_contents(url,null,null,function (content) {
                url = content;
                wd=inter(url,"hd_vid:'","'");
                data['id']=wd;
            });
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('pps.tv')>-1){
        data['type'] = 'pps';
        data['id']='';
        if(url.indexOf('html')>-1){
            data['id']=Kew.inter(url,'play_','.html');
        }
        else{
            urldebug(url);
        }
    }else if(url.indexOf('fun.tv')>-1){
        data['type'] = 'fun';
        data['id']='';
        if(url.indexOf('fun.tv/')>-1){
            Kew.get_curl_contents(url,null,null,function (content) {
                data['id']=Kew.inter(content,'vplay.videoid = ',';');
            });
        }
        else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('iqiyi.com')>-1){
        data['type'] = 'iqiyi';
        data['id']='';
        if(!data['id']){
            Kew.get_curl_contents(url,null,null,function (content) {
                data['id'] = Kew.inter(content, 'data-player-videoid="', '"');
            });
        }else{
            Kew.urldebug(url);
        }
    }else if(url.indexOf('ku6.com')>-1){
        data['type'] = 'ku6';
        if(url.indexOf('html')){
            var arr=url.split('/');
            wd=arr[arr.length-1];
            wd=wd.replace('.html','');
        }else{
            Kew.urldebug(url);
        }
        if(wd){
            data['id'] = wd;
        }else{
            Kew.urldebug(url);
        }
    }else{
        data['type'] = 'url';
        data['id'] = url;
    }
    return data;
}