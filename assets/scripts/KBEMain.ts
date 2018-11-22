// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import ClientApp from "../kbengine_typescript_plugin/ClientApp";
import KBEDebug from "../kbengine_typescript_plugin/kbengine/KBEDebug"

const {ccclass, property} = cc._decorator;

@ccclass
export default class KBEMain extends ClientApp {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private static _instance: KBEMain = undefined;
    static get instance()
    {
        return KBEMain._instance;
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        KBEDebug.INFO_MSG("KBEMain::onLoad:do nothing.");
        KBEMain._instance = this;
    }

    // update (dt) {}
}
