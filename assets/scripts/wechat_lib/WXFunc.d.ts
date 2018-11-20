declare module "WXFunc"
{
     /**   
     * 显示弹框
     * @param title 标题  
     * @param content 内容    
     * @param showCancel 是否显示取消按钮
     * @param cancelText 取消按钮内容
     * @param confirmText 确定按钮内容
     * @param callback 回调函数    
     */  
    function showModal(title:string,content:string,showCancel:boolean,cancelText:string,confirmText:string,callback:Function):void;

    /**   
     * 显示等待框
     * @param title 标题  
     * @param mask 是否透明显示遮罩    
     * @param callback 接口调用成功回调  
     */  
    function showLoading(title:string,mask:boolean,callback:Function):void;

    /**
     * 关闭等待框
     */
    function hideLoading():void;

    /**
     * http request
     * @param url 地址
     * @param method HTTP请求方法(默认为GET,有效值：GET/HEAD/POST/PUT/DELETE/TRACE/CONNECT)
     * @param data 请求参数
     * @param callback 成功回调函数(参数 res对应属性：data:string/Object/Arraybuffer 开发者服务器返回数据，statusCode:number 开发者服务器返回的HTTP状态码,header:Object 开发者服务器返回的的HTTP Response)
     */
    function request(url:string,method:string,callback:Function,data:Object):void;

     /**
     * 获取经过md5 cache后的资源路径
     * @param path 以resources开始的资源路径(带后缀名)，例如resources/test.mp3
     */
    function getMd5PipeUrl(path:string):string;

     /**
     * 检测游戏是否有更新
     * @param callback 回调函数
     */
    function CheckUpdate(callback:Function):void;

    /**
     * 重启并应用更新(需要确保下载完成后进行调用)
     */
    function applyUpdate():void;

    /**
     * 退出微信小游戏接口
     */
    function exitMiniProgram():void;

    /**
     * 同步设置本地缓存
     * @param key 存储的key值
     * @param data 存储的key对应的data
     */
    function setStorageSync(key,data):void;

    /**
     * 通过key值获取缓存中对应的data内容（返回值如果为undefined说明之前没有这个key值）
     * @param key key值
     */
    function getStorageSync(key):Object|string;

    /**
     * 获取系统信息同步接口
     */
    function getSystemInfoSync():Object;

    /**
     * GC回收
     */
    function triggerGC():void;

    /**
     * 设置帧率(默认为60)
     * @param fps 帧率(取值范围1~60)
     */
    function setPreferredFramesPerSecond(fps):void;

    /**
     * 设置屏幕常亮
     */
    function setKeepScreenOn():void;

    /**
     * 获取当前时间以微秒为单位的时间戳
     */
    function getTimeStamp():number;

    /**
     * 监听版本是否下载好了
     * @param callback 回调函数
     */
    function ListenUpdateReadyEvent(callback):void;

    /**
     * 监听版本是否下载失败
     * @param callback 回调函数
     */
    function ListenUpdateFailEvent(callback):void;

    /**
     * 检测用户当前session_key是否有效
     * @param callback 回调函数,参数为haveExpiry:是否已经过期
     */
    function checkSession(callback):void;
    /**
     * 微信登录接口
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表登录失败,2代表成功,参数2:code)
     */
    function wxlogin(callback):void;

    /**
     * 获取设置中指定权限状态
     * @param auth 权限名
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表设置中无该权限,2代表有权限,参数2:对应权限状态)
     */
    function getAuthSetting(auth,callback):void;

        /**
     * 生成获取用户信息按钮
     * @param imgurl 按钮图片路径
     * @param callback 回调函数
     */
    function createUserInfoButton(imgurl,ratio,callback):void;

    /**
     * 获取用户个人信息接口(此接口如果没有用户信息权限调用会直接报错，调用时请确保用户已经授权了)
     * @param callback 回调函数
     */
    function getUserInfo(callback):void;

    /**
     * 主动拉起转发，进入选择通讯录界面
     * @param title 转发标题，不传则默认使用当前小游戏的昵称(非必填)
     * @param imageUrl (非必填)转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     * @param query (非必填)查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     */
    function shareAppMessage(title,imageUrl,query):void;

    
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    function onShareAppMessage(title,imageUrl,query):void;

        /**
     * 监听后台切换到前台事件
     * @param callback 
     */
    function ListenOnShow(callback):void;

     /**
     * 获取启动参数中的query信息，并保持到本地
     * @param  nativeSaveQueryKey 
     */
    function getQueryInfoAndSaveInNativeStorageWhenOnLanuch(nativeSaveQueryKey):void;

    /**
     * 移除本地缓存中的key值
     * @param keyname
     */
    function removeStorageSync(keyname):void;

    /**
     * 显示当前页面的转发按钮
     * @param isShowShareTicket 详细参考https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/share.html
     */
    function showShareMenu(isShowShareTicket):void;

    //创建游戏圈按钮
    function createGameClubButton(ratio):Object;

    //显示游戏圈按钮
    function showGameClubButton(GameClubButton):void;

    //隐藏游戏圈按钮
    function hideGameClubButton(GameClubButton):void;

    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param kvdatalist (Array.<KVData> 详见https://developers.weixin.qq.com/minigame/dev/api/open-api/data/wx.setUserCloudStorage.html,https://developers.weixin.qq.com/minigame/dev/api/open-api/data/KVData.html)
     */
    function setUserCloudStorage(kvdatalist):void;

    /**
     * 获取开放数据域
     */
    function getOpenDataContext():Object;

    /**
     * 向开放数据域发送消息
     * @param message 消息
     */
    function OpenDataContextPostMessage(message):void;

    /**
     * 监听全局错误事件
     * @param callback res属性message:string 错误，stack:string 错误调用堆栈
     */
    function ListenOnError(callback):void;
}