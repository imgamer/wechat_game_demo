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

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestMain extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

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

    login()
    {
        this.startKBE();

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
