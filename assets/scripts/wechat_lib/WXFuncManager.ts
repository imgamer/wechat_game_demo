///<reference path='WXFunc.d.ts'/>
import * as WXFunc from "WXFunc";

export default class WXFuncManager {
    private static s_intance:WXFuncManager = null;

    public static get instance()
    {
        if(this.s_intance == null)
        {
            this.s_intance = new WXFuncManager();
        }

        return this.s_intance;
    }

     /**   
     * 显示弹框
     * @param title 标题  
     * @param content 内容    
     * @param showCancel 是否显示取消按钮
     * @param cancelText 取消按钮内容 最多4个汉字
     * @param confirmText 确定按钮内容 最多显示4个汉字
     * @param callback 回调函数(callback参数为number,0为确定按钮，1为取消按钮)    
     */  
    public showModal(title:string,content:string,showCancel:boolean,cancelText:string,confirmText:string,callback:Function)
    {
        if(cc.sys.platform ==cc.sys.WECHAT_GAME)
        {
            WXFunc.showModal(title,content,showCancel,cancelText,confirmText,callback);
        }
    }

     /**   
     * 显示等待框
     * @param title 标题  
     * @param mask 是否透明显示遮罩    
     * @param callback 接口调用成功回调  
     */  
    public showLoading(title:string,mask:boolean,callback:Function)
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return;

        WXFunc.showLoading(title,mask,callback);
    }

    
    /**
     * 关闭等待框(调用显示接口后需要调用此接口关闭)
     */
    public hideLoading()
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return;

        WXFunc.hideLoading();
    }

    /**
     * http request
     * @param url 地址
     * @param method HTTP请求方法(默认为GET,有效值：GET/HEAD/POST/PUT/DELETE/TRACE/CONNECT)
     * @param data 请求参数
     * @param callback 成功回调函数(参数错误码 errcode:0代表调用接口失败，1代表调用接口成功,参数 res对应属性：data:string/Object/Arraybuffer 开发者服务器返回数据，statusCode:number 开发者服务器返回的HTTP状态码,header:Object 开发者服务器返回的的HTTP Response)
     */
    public httprequest(url:string,method:string = "GET",data:Object = null,callback:Function)
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return;

        WXFunc.request(url,method,callback,data);
    }

      /**
     * 获取经过md5 cache后的资源路径
     * @param path 以resources开始的资源路径(带后缀名)，例如resources/test.mp3
     */
    public getMd5PipeUrl(path:string)
    {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            //微信小游戏平台
            return  WXFunc.getMd5PipeUrl(path);
        }
        else if(this.CheckIsEditorMode())
        {
            //编辑器模式
            return path;
        }
    }

     /**
     * 检测游戏是否有更新
     * @param callback 回调函数
     */
    public CheckUpdate(callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return;        

        WXFunc.CheckUpdate(callback);
    } 

    /**
     * 重启并应用更新(需要确保下载完成后进行调用)
     */
    public applyUpdate():void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.applyUpdate();
    }

    /**
     * 退出微信小游戏接口
     */
    public exitMiniProgram():void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.exitMiniProgram();
    }

    /**
     * 同步设置本地缓存
     * @param key 存储的key值
     * @param data 存储的key对应的data
     */
    public setStorageSync(key:string,data:Object|string):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.setStorageSync(key,data);
    }

    /**
     * 通过key值获取缓存中对应的data内容（返回值如果为undefined说明之前没有这个key值）
     * @param key key值
     */
    public getStorageSync(key:string):Object|string
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        return WXFunc.getStorageSync(key);
    }

    /**
     * 获取系统信息同步接口
     */
    public getSystemInfoSync():Object
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        return WXFunc.getSystemInfoSync();
    }

    /**
     * GC回收
     */
    public triggerGC():void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.triggerGC();
    }

    public CheckIsEditorMode():boolean
    {
        return CC_DEV;
    }

    /**
     * 设置帧率(默认为60帧)
     * @param fps 帧率(取值范围为1~60) 
     */
    public setPreferredFramesPerSecond(fps:number):void
    {

        if(this.CheckIsEditorMode())
        {
            cc.game.setFrameRate(fps);
        }


        // if(cc.sys.platform == cc.sys.WECHAT_GAME)
        // {
        //     WXFunc.setPreferredFramesPerSecond(fps);
        // }
        // else
        // {
        //     cc.game.setFrameRate(fps);
        // }
    }

    /**
     * 设置屏幕常亮
     */
    public setKeepScreenOn():void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.setKeepScreenOn();
    } 

    /**
     * 获取当前时间以微秒为单位的时间戳
     */
    public getTimeStamp():number{
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return 0; 

        return WXFunc.getTimeStamp();
    }

    /**
     * 监听更新下载完成回调
     * @param callback 回调函数
     */
    public ListenUpdateReadyEvent(callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.ListenUpdateReadyEvent(callback);
    }

    /**
     * 监听更新下载失败回调
     * @param callback 回调函数
     */
    public ListenUpdateFailEvent(callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.ListenUpdateFailEvent(callback);
    }

    /**
     * 检测用户当前session_key是否有效
     * @param callback 回调函数,参数为haveExpiry:是否已经过期
     */
    public checkSession(callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.checkSession(callback);
    }

    /**
     * 微信登录接口
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表登录失败,2代表成功,参数2:code)
     */
    public wxlogin(callback):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.wxlogin(callback);
    }

    /**
     * 获取设置中指定权限状态
     * @param auth 权限名
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表设置中无该权限,2代表有权限,参数2:对应权限状态,3代表不兼容该接口)
     */
    public getAuthSetting(auth:string,callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.getAuthSetting(auth,callback);
    }

    /**
     * 生成获取用户信息按钮
     * @param imgurl 按钮图片路径
     * @param callback 回调函数(errorcode:0代表点了允许按钮，1代表点了拒绝按钮，2代表不兼容该接口，需要提示用户升级微信版本)
     */
    public createUserInfoButton(imgurl:string,ratio:number,callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.createUserInfoButton(imgurl,ratio,callback);
    }

    /**
     * 获取用户个人信息接口(此接口如果没有用户信息权限调用会直接报错，调用时请确保用户已经授权了)
     * @param callback 回调函数
     */
    public getUserInfo(callback:Function):void
    {
        if(cc.sys.platform!=cc.sys.WECHAT_GAME)
        return; 

        WXFunc.getUserInfo(callback);
    }

    /**
     * 获取当前的屏幕分辨率
     */
    public getCurrentResolution():cc.Vec2
    {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            let width:number = this.getSystemInfoSync()["screenWidth"];
            let height:number = this.getSystemInfoSync()["screenHeight"];

            return new cc.Vec2(width,height);
        }
        else
        {
            return new cc.Vec2(cc.winSize.width,cc.winSize.height);
        }
    }

    /**
     * 主动拉起转发，进入选择通讯录界面
     * @param title 转发标题，不传则默认使用当前小游戏的昵称(非必填)
     * @param imageUrl (非必填)转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     * @param query (非必填)查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     */
    public shareAppMessage(title:string,imageUrl:string,query:string):void
    {
        if(cc.sys.platform != cc.sys.WECHAT_GAME)
        {
            return;
        }
        
        WXFunc.shareAppMessage(title,imageUrl,query);
    }

    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    public onShareAppMessage(title:string,imageUrl:string,query:string):void
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.onShareAppMessage(title,imageUrl,query);
    }

    /**
     * 监听后台切换到前台事件
     * @param callback 
     */
    public ListenOnShow(callback:Function):void
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.ListenOnShow(callback);
    }

    /**
     * 获取启动参数中的query信息，并保持到本地
     * @param  nativeSaveQueryKey 
     */
    public getQueryInfoAndSaveInNativeStorageWhenOnLanuch(nativeSaveQueryKey:string):void
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.getQueryInfoAndSaveInNativeStorageWhenOnLanuch(nativeSaveQueryKey);
    }

    /**
     * 移除本地缓存中的key值
     * @param keyname 
     */
    public removeStorageSync(keyname)
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        //验证下本地是否有该key值
        if(!WXFunc.getStorageSync(keyname))
        {
            return;
        }

        WXFunc.removeStorageSync(keyname);
    }

    /**
     * 显示当前页面的转发按钮
     * @param isShowShareTicket 详细参考https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/share.html
     */
    public showShareMenu(isShowShareTicket:boolean):void
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.showShareMenu(isShowShareTicket);
    }

    public createGameClubButton(ratio):Object
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return null;
        }

        return WXFunc.createGameClubButton(ratio);
    }

    public showGameClubButton(gameclubbtn:object)
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.showGameClubButton(gameclubbtn);
    }

    public hideGameClubButton(gameclubbtn:object)
    {
        if(cc.sys.platform!= cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.hideGameClubButton(gameclubbtn);
    }

    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param kvdatalist (Array.<KVData> 详见https://developers.weixin.qq.com/minigame/dev/api/open-api/data/wx.setUserCloudStorage.html,https://developers.weixin.qq.com/minigame/dev/api/open-api/data/KVData.html)
     */
    public setUserCloudStorage(kvdatalsit:object[]):void
    {
        if(cc.sys.platform !== cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.setUserCloudStorage(kvdatalsit);
    }

    /**
     * 获取开放数据域
     */
    public getOpenDataContext():Object
    {
        if(cc.sys.platform !== cc.sys.WECHAT_GAME)
        {
            return null;
        }

        return WXFunc.getOpenDataContext();
    }

    /**
     * 向开放数据域发送消息
     * @param message 消息
     */
    public OpenDataContextPostMessage(message:object):void
    {
        if(cc.sys.platform !== cc.sys.WECHAT_GAME)
        {
            return;
        }

        WXFunc.OpenDataContextPostMessage(message);
    }

    /**
     * 监听全局错误事件 (监听的是运行时的错误而非错误打印)
     * @param callback res属性message:string 错误，stack:string 错误调用堆栈
     */
    public ListenOnError(callback:Function):void
    {
        if(cc.sys.platform !== cc.sys.WECHAT_GAME)
        {
            return;
        }

        if(callback)
        {
            WXFunc.ListenOnError(callback);
        }
    }
}
