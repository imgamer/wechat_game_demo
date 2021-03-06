var WXFunc=({
    /**   
     * 显示弹框(点击蒙版会关闭界面，此时res.cancel为false)
     * @param title 标题  
     * @param content 内容    
     * @param showCancel 是否显示取消按钮
     * @param cancelText 取消按钮内容
     * @param confirmText 确定按钮内容
     * @param callback 回调函数(0代表点了确定按钮,1代表点了取消按钮)    
     */  
    showModal:function(title,content,showCancel,cancelText,confirmText,callback)
    {
        wx.showModal({
            title:title,
            content:content,
            showCancel:showCancel,
            cancelText:cancelText,
            confirmText:confirmText,
            success:function(res)
            {
               //res 有confirm 和cancel两个属性，分别对应点击了对应按钮
                if(res.confirm)
                {
                    callback(0);
                }
                else if(res.cancel)
                {
                    callback(1);
                }
                else if(!res.cancel)
                {
                    //点蒙版也会关闭界面，所以需要回调确定
                    callback(0);
                }
 
            },
            fail:function(res){
                console.error("Call show modal fail!::"+res.errMsg);
            }
        })
    },

    /**   
     * 显示等待框
     * @param title 标题  
     * @param mask 是否透明显示遮罩    
     * @param callback 接口调用成功回调  
     */    
    showLoading:function(title,mask,callback)
    {
        wx.showLoading({
            title:title,
            mask:mask,
            success:function()
            {
                //接口调用成功
                if(callback)
                callback();
            }
        });
    },

    /**
     * 关闭等待框
     */
    hideLoading:function()
    {
        wx.hideLoading();
    },

    /**
     * http request
     * @param url 地址
     * @param method HTTP请求方法(默认为GET,有效值：GET/HEAD/POST/PUT/DELETE/TRACE/CONNECT)
     * @param data 请求参数
     * @param callback 成功回调函数(参数错误码 errcode:0代表调用接口失败，1代表调用接口成功,参数 res对应属性：data:string/Object/Arraybuffer 开发者服务器返回数据，statusCode:number 开发者服务器返回的HTTP状态码,header:Object 开发者服务器返回的的HTTP Response)
     */
    request:function(url,method,callback,data)
    {
        if(data)
        {
            wx.request({
                url:url,
                method:method,
                data:data,
                success:function(res)
                {
                    if(callback)
                    callback(1,res);
                },
                fail:function(res)
                {
                    if(callback)
                    {
                        callback(0,res.errMsg);
                    }
                }
            });
        }
        else
        {
            wx.request({
                url:url,
                method:method,
                success:function(res)
                {
                    if(callback)
                    callback(1,res);
                },
                fail:function(res)
                {
                    if(callback)
                    {
                        callback(0,res.errMsg);
                    }
                }
            });
        }
    },

    /**
     * 获取经过md5 cache后的资源路径
     * @param path 以resources开始的资源路径(带后缀名)，例如resources/test.mp3
     */
    getMd5PipeUrl:function(path)
    {
        path = cc.url.raw(path);

        if(cc.loader.md5Pipe)
        {
            path = cc.loader.md5Pipe.transformURL(path);
        }

        return path;
    },

    /**
     * 检测游戏是否有更新
     * @param callback 回调函数
     */
    CheckUpdate:function(callback)
    {
        if(typeof wx.getUpdateManager === 'function')
        {
            const updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(function(res){
                //请求完整版本信息的回调
                if(res.hasUpdate)
                {
                    //有新版本
                    callback(res.hasUpdate);
                }
                else
                {
                    //当前为最新版本，不需要更新
                    callback(res.hasUpdate);
                }
            });
        }
    },

    /**
     * 监听版本是否下载好了
     * @param callback 回调函数
     */
    ListenUpdateReadyEvent:function(callback)
    {
        if(typeof wx.getUpdateManager === 'function')
        {
            const updateManager = wx.getUpdateManager();

            updateManager.onUpdateReady(function(){
                //新版本下载好了，调用applyUpdate应用新版本并重启
                callback();
            });
        }
    },

    /**
     * 监听版本是否下载失败
     * @param callback 回调函数
     */
    ListenUpdateFailEvent:function(callback)
    {
        if(typeof wx.getUpdateManager === 'function')
        {
            const updateManager = wx.getUpdateManager();

            updateManager.onUpdateFailed(function(){
                //新版本下载失败
                callback();
            });
        }
    },

    /**
     * 重启并应用更新(需要确保下载完成后进行调用)
     */
    applyUpdate:function()
    {
        if(typeof wx.getUpdateManager === 'function')
        {
            const updateManager = wx.getUpdateManager();

            updateManager.applyUpdate()
        }
    },

    /**
     * 退出微信小游戏接口
     */
    exitMiniProgram:function()
    {
        wx.exitMiniProgram({
            success:function(){

            },
            fail:function(){
                console.error("退出小游戏失败!");
            },
        });
    },

    /**
     * 同步设置本地缓存
     * @param key 存储的key值
     * @param data 存储的key对应的data
     */
    setStorageSync:function(key,data)
    {
        wx.setStorageSync(key,data);
    },

    /**
     * 通过key值获取缓存中对应的data内容（返回值如果为undefined说明之前没有这个key值）
     * @param key key值
     */
    getStorageSync:function(key)
    {
        return wx.getStorageSync(key);
    },

    /**
     * 获取系统信息同步接口
     */
    getSystemInfoSync:function()
    {
        return wx.getSystemInfoSync();
    },

    /**
     * GC回收
     */
    triggerGC:function()
    {
        wx.triggerGC();
    },

    /**
     * 设置帧率(默认为60)
     * @param fps 帧率(取值范围1~60)
     */
    setPreferredFramesPerSecond:function(fps)
    {
        wx.setPreferredFramesPerSecond(fps);
    },

    /**
     * 设置屏幕常亮
     */
    setKeepScreenOn:function()
    {
        wx.setKeepScreenOn({
            keepScreenOn:true,
        });
    },

    /**
     * 获取当前时间以微秒为单位的时间戳
     */
    getTimeStamp:function()
    {
        let performence = wx.getPerformance();

        return performance.now();
    },

    /**
     * 检测用户当前session_key是否有效
     * @param callback 回调函数,参数为haveExpiry:是否已经过期
     */
    checkSession:function(callback)
    {
        wx.checkSession({
            success:function()
            {
                //未过期
                callback(false);
            },
            fail:function()
            {
                //已经失效，需要重新执行登录流程
                callback(true);
            }
        });
    },

    /**
     * 微信登录接口
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表登录失败,2代表成功,参数2:code)
     */
    wxlogin:function(callback)
    {
        wx.login({
            success:function(res)
            {
                if(res.code)
                {
                    //登录成功
                    callback(2,res.code);
                }
                else
                {
                    //登录失败
                    callback(1,null);
                }
            },
            fail:function(res)
            {
                //调用接口失败
                callback(0,res.errMsg);
            }
        });
    },

    /**
     * 获取设置中指定权限状态
     * @param auth 权限名
     * @param callback 回调函数(参数1：errcode:0代表调用接口失败，1代表设置中无该权限,2代表有权限,参数2:对应权限状态,3代表不兼容该接口)
     */
    getAuthSetting:function(auth,callback)
    {
        if(typeof wx.getSetting === 'function')
        {
            wx.getSetting({
                success:function(set){
                    let authsetting = set.authSetting;
    
                    if(authsetting[auth])
                    {
                        //存在授权信息
                        if(authsetting[auth] == true)
                        {
                            //该权限状态为允许
                            callback(2,true);
                        }
                        else
                        {
                            //该权限状态为拒绝
                            callback(2,false);
                        }
                    }
                    else
                    {
                        //不包含该权限
                        callback(1,null);
                    }
                },
                fail:function(set)
                {
                    //调用接口失败
                    callback(0,set.errMsg);
                }
            });
        }
        else
        {
            callback(3,null);
        }
    },


    /**
     * 生成获取用户信息按钮
     * @param imgurl 按钮图片路径
     * @param callback 回调函数(errorcode:0代表点了允许按钮，1代表点了拒绝按钮，2代表不兼容该接口，需要提示用户升级微信版本)
     */
    createUserInfoButton:function(imgurl,ratio,callback)
    {
        if(typeof wx.createUserInfoButton === 'function')
        {
            let sysinfo = this.getSystemInfoSync();

            let halfwidh = sysinfo.screenWidth/2 - 201*ratio/2;
            let targettop =  Math.floor(sysinfo.screenHeight*3/4) - 71*ratio/2;
    
            let button = wx.createUserInfoButton({
                type:'image',
                image:imgurl,
                style:{
                    left:halfwidh,
                    top:targettop,
                    width: 226*ratio,
                    height: 101*ratio,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            });
    
            button.onTap((res)=>{

                if(res.userInfo)
                {
                    callback(0,res);
                    button.destroy();
                }
                else
                {
                    //拒绝授权
                    callback(1,null);
                    button.show();
                }
            })
        }
        else
        {
            //不兼容
            callback(2,null)
        }
    },

    /**
     * 获取用户个人信息接口(此接口如果没有用户信息权限调用会直接报错，调用时请确保用户已经授权了)
     * @param callback 回调函数
     */
    getUserInfo:function(callback)
    {
        wx.getUserInfo({
            success:function(res){
                if(callback)
                {
                    callback(res);
                }
            }
        });
    },

    /**
     * 主动拉起转发，进入选择通讯录界面
     * @param title 转发标题，不传则默认使用当前小游戏的昵称(非必填)
     * @param imageUrl (非必填)转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     * @param query (非必填)查询字符串，从这条转发消息进入后，可通过 wx.getLaunchInfoSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     */
    shareAppMessage:function(title,imageUrl,query)
    {
        if(title&&imageUrl&&query)
        {
            //都有值
            wx.shareAppMessage({
                title:title,
                imageUrl:imageUrl,
                query:query
            });
        }
        else if(title&&!imageUrl&&!query)
        {
            //只填了title
            wx.shareAppMessage({
                title:title
            });
        }
        else if(title&&!imageUrl&&query)
        {
            //填了title和query
            wx.shareAppMessage({
                title:title,
                query:query
            });
        }
        else if(title&&imageUrl&&!query)
        {
            //填了title和imagurl
            wx.shareAppMessage({
                title:title,
                imageUrl:imageUrl
            });
        }
        else if(!title&&imageUrl&&query)
        {
            //只填了imageUrl和query
            wx.shareAppMessage({
                imageUrl:imageUrl,
                query:query
            });
        }
        else if(!title&&!imageUrl&&query)
        {
            //只有query
            wx.shareAppMessage({
                query:query
            });
        }
        else if(!title&&imageUrl&&!query)
        {
            //只有imagurl
            wx.shareAppMessage({
                imageUrl:imageUrl
            });
        }
        else
        {
            //都没值
            wx.shareAppMessage({});
        }
    },

    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    onShareAppMessage:function(title,imageUrl,query)
    {
        wx.onShareAppMessage(()=>{
            if(title&&imageUrl&&query)
            {
                //都有值
                return {
                    title:title,
                    imageUrl:imageUrl,
                    query:query
                };
            }
            else if(title&&!imageUrl&&!query)
            {
                //只填了title
                return {
                    title:title
                };
            }
            else if(title&&!imageUrl&&query)
            {
                //填了title和query
                return {
                    title:title,
                    query:query
                };
            }
            else if(title&&imageUrl&&!query)
            {
                //填了title和imagurl
                return {
                    title:title,
                    imageUrl:imageUrl
                };
            }
            else if(!title&&imageUrl&&query)
            {
                //只填了imageUrl和query
                return {
                    imageUrl:imageUrl,
                    query:query
                };
            }
            else if(!title&&!imageUrl&&query)
            {
                //只有query
                return {
                    query:query
                };
            }
            else if(!title&&imageUrl&&!query)
            {
                //只有imagurl
                return{
                    imageUrl:imageUrl
                };
            }
            else
            {
                return {};
            }
        });
    },

    /**
     * 监听后台切换到前台事件
     * @param callback 
     */
    ListenOnShow(callback)
    {
        wx.onShow((res)=>{
            callback(res);
        })
    },

    /**
     * 获取启动参数中的query信息，并保持到本地
     * @param  nativeSaveQueryKey 
     */
    getQueryInfoAndSaveInNativeStorageWhenOnLanuch(nativeSaveQueryKey)
    {
        let query = wx.getLaunchOptionsSync();

        if(query["query"])
        {
            wx.setStorageSync(nativeSaveQueryKey,query["query"]);
        }
        else
        {
            console.error("Query Not Exit When Lanuch!");
        }
    },

    /**
     * 移除本地缓存中的key值
     * @param keyname
     */
    removeStorageSync(keyname)
    {
        wx.removeStorageSync(keyname);
    },

    /**
     * 显示当前页面的转发按钮
     * @param isShowShareTicket 详细参考https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/share.html
     */
    showShareMenu(isShowShareTicket)
    {
        wx.showShareMenu({
            withShareTicket:isShowShareTicket
        })
    },

    //创建游戏圈按钮
    createGameClubButton(ratio)
    {
        let button = wx.createGameClubButton({
            icon: 'green',
            style: {
                right: 10,
                top: 76,
                width: 40*ratio,
                height: 40*ratio
            }
        });

        button.hide();

        return button;
    },

    //显示游戏圈按钮
    showGameClubButton(button)
    {
        if(button)
        {
            button.show();
        }
    },

    //隐藏游戏圈按钮
    hideGameClubButton(button)
    {
        if(button)
        {
            button.hide();
        }
    },

    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param kvdatalist (Array.<KVData> 详见https://developers.weixin.qq.com/minigame/dev/api/open-api/data/wx.setUserCloudStorage.html,https://developers.weixin.qq.com/minigame/dev/api/open-api/data/KVData.html)
     */
    setUserCloudStorage(kvdatalist)
    {
        wx.setUserCloudStorage({
            KVDataList:kvdatalist
        });
    },

    /**
     * 获取开放数据域
     */
    getOpenDataContext()
    {
        return wx.getOpenDataContext();
    },

    /**
     * 向开放数据域发送消息
     * @param message 消息
     */
    OpenDataContextPostMessage(message)
    {
        if(message)
        {
            let context = wx.getOpenDataContext();

            context.postMessage(message);
        }
    },

    /**
     * 监听全局错误事件
     * @param callback res属性message:string 错误，stack:string 错误调用堆栈
     */
    ListenOnError(callback)
    {
        if(callback)
        {
            wx.onError((res)=>{
                if(res)
                {
                    callback(res);
                }
            });
        }
    }

});

module.exports = WXFunc;