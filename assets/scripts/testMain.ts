// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import KBEMain from "./KBEMain";
import WXFuncManager from "./wechat_lib/WXFuncManager";
import KBEDebug from "../kbengine_typescript_plugin/kbengine/KBEDebug";
import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestMain extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property
    loginByWX: boolean = true;

    private wxcode: string = "";
    private wxUserData: object = undefined;

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    }

    start () {
        console.info("TestMain::start.");
    }

    startKBE()
    {
        KBEMain.instance.run();
    }

    wxlogin()
    {
        KBEDebug.INFO_MSG("wxlogin .....");

        // 如果不使用bind，那么需要使用=>创建匿名回调函数，以便绑定执行上下文
        WXFuncManager.instance.wxlogin(this.wxloginCB.bind(this));
    }

    wxloginCB(errorcode, code)
    {
        // 调用接口失败
        if(errorcode == 0)
        {
            KBEDebug.ERROR_MSG("wxloginCB error:%s.", code);
        }
        else if(errorcode == 1)
        {
            KBEDebug.INFO_MSG("wxloginCB failed:%s.微信登录失败。", code);
        }
        else if(errorcode == 2)
        {
            KBEDebug.INFO_MSG("wxloginCB sucess:%s.微信登录成功。", code);
            this.wxcode = code;
            this.getWXAuthSetting();    // 请求获取用户数据
        }
    }

    loginWebServer()
    {
        KBEDebug.INFO_MSG("loginWebServer, this.wxUserData:%s.", this.wxUserData);
        let url = Config.instance.wxLoginURL();
        KBEDebug.INFO_MSG("wxloginCB: WXFuncManager.instance.httprequest url:%s.", url);
        WXFuncManager.instance.httprequest(url, "GET", this.wxUserData, this.loginWebServerCB.bind(this));
    }

    loginWebServerCB(errcode, res)
    {
        KBEDebug.INFO_MSG("loginWebServerCB, errcode:%s, res.statusCode:%s.", errcode, res.statusCode);
        if(errcode == 0)    // 调用request接口失败
        {}
        else if(errcode == 1)   // //调用request成功
        {
            //调用成功
            if(res.statusCode == 200)
            {
                KBEDebug.INFO_MSG("loginWebServerCB:result:%s, res.data:%s", res.data["result"], res.data);
                if(res.data["result"] == "SUCCESS")
                {
                    // 必须要做类型转换，否则登录失败，服务器错误，猜测是传入any类型，插件并不能正确转换为string：
                    // WebSocketPacketFilter::recv: pFragmentDatasRemain_ <= 0! addr=127.0.0.1:64917/0/0/0!
                    let account = String(res.data["account"]);
                    let password = String(res.data["pwd"]);
                    // 获取到帐号密码unionid等数据,存储到本地
                    WXFuncManager.instance.setStorageSync("account", account);
                    WXFuncManager.instance.setStorageSync("password", password);

                    KBEDebug.INFO_MSG("loginWebServerCB:login kbe, account:%s, password:%s", account, password);
                    // 调用kbe登录接口
                    let strUserData = JSON.stringify(this.wxUserData);
                    WXFuncManager.instance.setStorageSync("strUserData", strUserData);
                    KBEMain.instance.Login(account, password, strUserData);  // kbe会使用utf8编码后发送给服务端，服务端应该utf8解码
                }
            }
            else
            {
                // 提示网络原因登录失败
                WXFuncManager.instance.showModal("提示", "微信登录失败("+ res.statusCode + ")", false, "", "确定", (clickinfo) => {});
            }
        }
    }

    createUserInfoButton()
    {
        let imgUrl = "resources/Native/start_game.png";

        // 为何要getMd5PipeUrl？是不是生成在运行时的路径，例如db://assets/resources/Native/start_game.png
        // 一个资源加入到resources/Native目录的时候，cc会生成一个db路径
        let md5Imgurl = WXFuncManager.instance.getMd5PipeUrl(imgUrl);
        WXFuncManager.instance.createUserInfoButton(md5Imgurl, 1, this.createUserInfoButtonCB.bind(this) );
    }

    createUserInfoButtonCB(errcode: any, info: any)
    {
        KBEDebug.INFO_MSG("createUserInfoButtonCB: errorcode:%s.", errcode);
        if(errcode == 0)
        {
            if(info)
            {
                if(this.wxcode != "")
                {
                    this.wxUserData = {
                        code: this.wxcode,
                        rawData: info.rawData,
                        signature: info.signature,
                        encryptedData: info.encryptedData,
                        iv: info.iv,
                    };

                    this.loginWebServer();
                }
            }
        }
        else if(errcode == 1)
        {
             //用户点了拒绝授权按钮
        }
        else if(errcode == 2)
        {
            //不兼容
        }
    }

    getWXAuthSetting()
    {
        KBEDebug.INFO_MSG("getWXAuthSetting: code:%s.", this.wxcode);
        // 获取用户信息"scope.userInfo"
        WXFuncManager.instance.getAuthSetting("scope.userInfo", 
                (seterrcode, status) => {
                    KBEDebug.INFO_MSG("getAuthSetting: seterrcode: %s, status:%s", seterrcode, status);

                    if(seterrcode == 0) // 调用接口失败
                    {
                        
                    }
                    else if(seterrcode == 1)    // 设置中无该权限
                    {
                        this.createUserInfoButton();
                    }
                    else if(seterrcode == 2)    // 设置中有该权限
                    {
                        if(status)
                        {
                            //用户同意授权用户信息
                            WXFuncManager.instance.getUserInfo(
                                (info) => {
                                    let tempdata: Object = {
                                        code: this.wxcode,
                                        rawData: info.rawData,
                                        signature: info.signature,
                                        encryptedData: info.encryptedData,
                                        iv: info.iv,
                                    };
                                    this.wxUserData = tempdata;
                                    this.loginWebServer();
                                }
                            )
                        }
                    }
                }
        
        );
    }

    login()
    {
        this.startKBE();
        if(this.loginByWX)
            this.wxlogin();
        else
            KBEMain.instance.Login();

        return;
        let p = new Promise((resolved, rejected) =>
                            {
                                WXFuncManager.instance.wxlogin( (errorcode, code) =>
                                                                {
                                                                    // 调用接口失败
                                                                    if(errorcode == 0)
                                                                    {
                                                                        KBEDebug.ERROR_MSG("wxlogin error:%s.", code);
                                                                    }
                                                                    else if(errorcode == 1)
                                                                    {
                                                                        KBEDebug.INFO_MSG("wxlogin failed:%s.微信登录失败。", code);
                                                                    }
                                                                    else if(errorcode == 2)
                                                                    {
                                                                        KBEDebug.INFO_MSG("wxlogin sucess:%s.微信登录成功。", code);
                                                                        resolved(code);
                                                                    }
                                                                }
                                );
                            }
        );
        p.then((code) =>
        {
            KBEDebug.INFO_MSG("wxlogin sucess:%s.微信登录成功，使用code申请登录。", code);
        });

    }
    // update (dt) {}
}
