/**
 * Created by kew on 2017/1/6.
 */

function queryYoukuUrl(url) {

    if(!url){
        url=window.location.href;
    }

    var video_id,video_type,pid;

    if(!Kew.getParam("vtype",url)&&!Kew.getParam("u",url)&&Kew.getParam("url",url)){
        var ids="http://"+Kew.requestInfo.domain+(Kew.requestInfo.port?"":":"+Kew.requestInfo.port)+Kew.requestInfo.path;
        ids=decodeURI(ids);
        ids=ids.split("url=");
        ids=ids[ids.length-1];
        var domain_list=["127.0.01","*.*.com"];
        //黑名单 ,这里不需要
        var is_black_list=false,is_allow_empty=true;

        //暂时未知  _
        var arrays=ids.split("_");

        pid='2';

        switch(arrays[0]){
            case Kew.const.cq:
                pid='3';
                Kew.setCookie("pidcookie", pid,Date.parse(new Date()+360000));
                break;

            case Kew.const.gq:
                pid='2';
                Kew.setcookie("pidcookie", pid, Date.parse(new Date()+360000));
                break;

            case Kew.const.bq:
                pid='1';
                Kew.setcookie("pidcookie", pid, Date.parse(new Date()+360000));
                break;

            default :
                var pidCookie=Kew.getCookie("pidcookie");
                if(pidCookie){
                    pid=pidCookie;
                }
                break;
        }

        if(ids.indexOf('http://')==-1){
            //不含有 http://
            var _type=arrays[arrays.length-1];
            var id=Kew.replace(ids,[Kew.const.bq+"_",Kew.const.gq+"_",Kew.const.cq+"_",_type ],["","","",""]);
            if(ids.indexOf("_wd")>-1){
                switch(_type){
                    case 'wd1':
                        _type='youku';
                        break;
                    case 'wd2':
                        _type='wasu';
                        break;
                    case 'wd3':
                        _type='letv';
                        break;
                    case 'wd4':
                        _type='56';
                        break;
                    case 'wd5':
                        _type='ku6';
                        break;
                    case 'wd6':
                        _type='qq';
                        break;
                    case 'wd7':
                        _type='cntv';
                        break;
                    case 'wd8':
                        _type='mgtv';
                        break;
                    case 'wd9':
                        _type='sohu';
                        break;
                    case 'wd10':
                        _type='iqiyi';
                        break;
                    case 'wd11':
                        _type='tudou';
                        break;
                    case 'wd12':
                        _type='ifeng';
                        break;
                    case 'wd13':
                        _type='17173';
                        break;
                    case 'wd14':
                        _type='yinyuetai';
                        break;
                    case 'wd15':
                        _type='bilibili';
                        break;
                    case 'wd16':
                        _type='pps';
                        break;
                    case 'wd17':
                        _type='sina';
                        break;
                    case 'wd18':
                        _type='pptv';
                        break;
                    case 'wd19':
                        _type='fun';
                        break;
                    default:
                        break;
                }
            }
        }else {
            var _url;
            if(ids.indexOf("_http://")>-1){
                _url=ids.replace(arrays[0]+"_","");
            }else{
                _url=ids;
            }

            var data=Kew.getVideoId(_url);
            video_id=data['id'];
            video_type=data['type'];
        }
    }else {
        if(Kew.getParam('vtype',url)){
            video_type=Kew.getParam('vtype',url);
            video_id=Kew.getParam('vid',url);
        }else if(Kew.getParam('u',url)){
            var b=new Base64();
            var ids = b.decode(Kew.getParam('u',url));
            if(/^[a-zA-Z0-9-_]{4,41}\.[a-z0-9]{2,12}$/.test(url)){
                var i=ids.split(".");
                video_id=i[0];
                video_type=i[1];
            }else{
                var data=Kew.getVideoId(url);
                if(data['status']<0){
                    return false;
                }
            }
        }
    }

    //完成视频类型和视频id的获取

    if(video_type){
        video_type=Kew.ucfirst(video_type.toLowerCase());
        //执行指定方法
    }else{

    }

    if(video_id){
        if(!pid){
            pid=2;
        }

         var xx=Kew.getvideo(video_id,pid);
         document.write(Kew.getXml(xx));
    }else{

    }
}

$(function () {
    queryYoukuUrl('http://v.youku.com/v_show/id_XMTg5NDA0MzIxNg==.html?spm=a2hww.20023042.m_230771.5~5!2~5~5~5~5~A.ADXjhX&from=y1.3-idx-beta-1519-23042.230771.1-1');
});