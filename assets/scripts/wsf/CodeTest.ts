const {ccclass, property} = cc._decorator;
import player = require("./Player");    // 导入js，但需要.d.ts

import Entity from "../../kbengine_typescript_plugin/kbengine/Entity";   // 如果没有默认导出要加上{}，对应从模块对象中导出某个属性
import KBEDebug from "../../kbengine_typescript_plugin/kbengine/KBEDebug";    // 默认导出KBEDebug
import KBEEvent from "../../kbengine_typescript_plugin/kbengine/Event";
import Message from "../../kbengine_typescript_plugin/kbengine/Message";
import * as KBEEncoding from "../../kbengine_typescript_plugin/kbengine/KBEEncoding";
import {KBEngineArgs, KBEngineApp} from "../../kbengine_typescript_plugin/kbengine/KBEngine";  // 没有默认导出，需要{}方式

import * as KBEMath from "../../kbengine_typescript_plugin/kbengine/KBEMath";
import AsyncModule from "./AsyncModule";

import * as ExportEntity from "../../kbengine_typescript_plugin/entities/ExportEntity";
import * as Datatypes from "../../kbengine_typescript_plugin/kbengine/DataTypes";

import tsPlayer from "./tsPlayer";  // 默认导出

// 函数重载写法
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
// 上面是定义，这里必须有实现，在实现中根据参数类型来决定算法
function pickCard(x): any
{}

window.console.log("------------>>>abc");

class TestObject
{
    m_value1: number = 999;
}

enum enumTest
{
    a = "aaaaaaaaaaa",
    b = "bbbbbbbbbbb",
}

function func1(a: object, b:any): void
{
    KBEDebug.DEBUG_MSG("func1(a(%d): any(type:%s), b(%s):any(type:%s)): void............", a, typeof(a), b, typeof(b) );
}


@ccclass
export default class CodeTest extends cc.Component {

    private m_socket: WebSocket;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    IP: string = "127.0.0.1";

    @property
    port: number = 20013;

    @property
    useWss: boolean = false;

    @property
    isUseURL: boolean = false;

    @property
    serverURL: string = "";

    @property
    updateHZ = 100;

    @property
    isOnInitCallPropertysSetMethods = true;

    @property
    clientType = 5;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // promise测试，必须在Promise中显示调用resolve
        // 输出：
        // 000000000000000
        // 3333333333333333333333333
        // 111111111111111
        // 22222222222222222222
        let p = new Promise((resolve, reject) => 
        {
            console.log("000000000000000");
            setTimeout(()=>
            {
                console.log("111111111111111");
                resolve(4444);
            }, 500);
            
        }
        );

        p.then((value)=>
        {
            console.log("22222222222222222222" + value);
        });

        console.log("3333333333333333333333333");
    }

    async TestAsnyc(moduleName: string)
    {
        // 在更新协议时根据entity名字动态import类型并注册到
        let path: string = "../../kbengine_typescript_plugin/entities/" + "DemoAccount"
        const module  = await import("../../kbengine_typescript_plugin/entities/DemoAccount");    // 这样的import是异步行为，必须指定回调处理函数
        let e = new module.default();
        return e;
    }

    async TestAsnyc2(moduleName: string)
    {
        let o = new AsyncModule();
        await o.TestAsync(moduleName);
    }

    TestEntityModule(name:string)
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEntityModule begin-------------------------------------------------");
        //ExportEntity.InitEntityScripts();
        let entityScript = Entity.GetEntityScript(name);
        
        if(entityScript === undefined)
        {
            KBEDebug.DEBUG_MSG("entityScript(%s) === undefined.", name); 
        }
        else
        {
            let e = new entityScript();
            KBEDebug.DEBUG_MSG("create entity(%s),name(%s).", name, e.Name ); 
        }
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEntityModule end-------------------------------------------------");
    }

    async start () {
        //let e = await this.TestAsnyc("Account");     // await关键字，等待返回再继续往下执行
        //KBEDebug.DEBUG_MSG("start............await import entity by name:%s.", e.Name ); 
        //await this.TestAsnyc2("Account");

        this.TestDebug();
        this.TestEvent();
        this.TestStreamMemory();
        this.TestMessage();
        this.TestCall();
        this.TestEncoding();
        this.TestSyntax();
        //this.TestKBEngine();
        this.TestEntityModule("DemoAccount");

        // KBEngine.app.connect("ws://" + KBEngine.app.ip + ":" + KBEngine.app.port);
        // var m_socket = new WebSocket("ws://127.0.0.1:20013");

        // m_socket.binaryType = "arraybuffer";
        // m_socket.onopen = this.onopen;
        // m_socket.onerror = this.onerror;
        // m_socket.onclose = this.onclose;
        // m_socket.onmessage = this.onmessage;

        var buff = new ArrayBuffer(10);
    }

    private TestDebug()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestDebug begin-------------------------------------------------");
        var abc = new player();
        KBEDebug.WARNING_MSG("new player()-------------->>>jumpHeight:%s",abc.jumpHeight);
        // 微信小游戏不支持eval函数
        //KBEDebug.ERROR_MSG("new player()-------------->>>jumpHeight:%s, jumpHeight number:%d",abc.jumpHeight, eval("1234567"));
        let entity1: any = new Entity();
        let entity2: any = new Entity();
        KBEDebug.WARNING_MSG("new Entity()----------->>>"+ entity1.Name);

        KBEDebug.WARNING_MSG("test enum.toString()-------------->>>:%s",enumTest.a.toString());
        KBEDebug.ASSERT(1===1, "1===1");

        let now: number = new Date().getTime();
        let udata = Datatypes.BuildUINT64(now);
        KBEDebug.WARNING_MSG("TestDebug::Datatypes.BuildUUUUUUUUUUUINT64(%s)-------------->>>:%s", now, udata.toString());

        let idata = Datatypes.INT64.BuildINT64(now);
        KBEDebug.WARNING_MSG("TestDebug::Datatypes.BuildIIIIIIIIIIIINT64(%s)-------------->>>:%s", now, idata.toString());

        KBEDebug.DEBUG_MSG("-------------------------------------------------TestDebug end-------------------------------------------------");
    }

    private TestKBEngine()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestKBEngine begin-------------------------------------------------");
        
        let args = new KBEngineArgs();
        args.port = this.port;
        args.updateTick = this.updateHZ;
        args.isOnInitCallPropertysSetMethods = this.isOnInitCallPropertysSetMethods;
        args.clientType = this.clientType;
        args.useWss = this.useWss;

        let kbeApp = KBEngineApp.Create(args);

        let data = KBEEncoding.StringToUTF8Array("hahahaha")
        kbeApp.Login("wsf", "123456", data);
        kbeApp.Update();
        //setTimeout(() => kbeApp.Reset(), 3000);
        //kbeApp.Reset();
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestKBEngine end-------------------------------------------------");
    }

    private TestEncoding()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEncoding begin-------------------------------------------------");
        // python中得到字符串“中国”的utf8编码：b'\xe4\xb8\xad\xe5\x9b\xbd'
        let sArray = [0xe4, 0xb8, 0xad, 0xe5, 0x9b, 0xbd];
        let bb = new Uint8Array(sArray);
        let s = KBEEncoding.UTF8ArrayToString(bb);

        KBEDebug.WARNING_MSG("'编码转换:中国->%s", s);

        let utf8 = KBEEncoding.StringToUTF8Array(s);
        for(let i = 0; i < utf8.length; i++)
        {
            KBEDebug.WARNING_MSG(utf8[i].toString(16));
        }

        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEncoding end-------------------------------------------------");
    }

    private TestSyntax()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestSyntax begin-------------------------------------------------");

        let datas: {[key:string]: number} = {};
        datas["a"] = 2;
        datas[1] = 2;

        // 测试枚举
        enum abc
        {
            a = 0x00000040,
        }

        KBEDebug.DEBUG_MSG("TestSyntax:0x00000040 === abc.a:-------------------->>>%s.", abc.a === 0x00000040);

        KBEDebug.DEBUG_MSG("-------------------------------------------------TestSyntax end-------------------------------------------------");
    }

    private TestCall()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestCall begin-------------------------------------------------");
        // 对any类型的参数，也能解析得到传入时的数据类型
        let a1: number = 555;   // number类型也能传给object参数，object和any的区别是什么，object可以接受null
        let s1: string = "wwwww";
        let f1: Function = func1;
        KBEDebug.DEBUG_MSG("typeof f1:%s.", typeof(f1));
        // func1(42, 55);   // error，类型42的参数不能赋值给object类型的参数
        f1.call(this, 42, s1);
        func1.call(this, 4444, s1);   // 需要this参数，这个方式可以让number类型的参数赋值给object，例如a1，这里可能是都转为了any类型
        f1 = null;  // f1可以为null

        KBEDebug.DEBUG_MSG("-------------------------------------------------TestCall end-------------------------------------------------");
    }

    private TestEvent()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEvent begin-------------------------------------------------");
        KBEEvent.Register("abc", this, this.onopen);
        KBEEvent.Deregister("abc", this, this.onclose);
        KBEEvent.Deregister("abc", this, this.onopen);

        KBEEvent.Register("Event_hhh", this, this.Event_hhh);
        KBEEvent.Fire("dddd", "wwwwwwwwwwwwwwwwwwwwww");
        KBEEvent.Fire("Event_hhh", "sssssss");
        KBEEvent.Fire("Event_hhh", 2222,"abcdefdfe");

        let testObj: TestObject = new TestObject();
        testObj.m_value1 = 4444;
        KBEEvent.Fire("Event_hhh", testObj);
        KBEEvent.Deregister("Event_hhh", this, this.Event_hhh);

        KBEEvent.Register("Event_eee", this, this.Event_eee);
        KBEEvent.Fire("Event_eee", 2222, 3333);
        KBEEvent.Register("bbb", this, this.onopen);
        KBEEvent.DeregisterObject(this);
        KBEDebug.DEBUG_MSG("-------------------------------------------------TestEvent end-------------------------------------------------");
    }

    private TestMessage()
    {
        KBEDebug.DEBUG_MSG("-------------------------------------------------message begin-------------------------------------------------");
        Message.messages["onImportClientMessages"] = new Message(518, "onImportClientMessages", -1, -1, new Array(), null);
        //let m1 = eval("Message.messages.onImportClientMessages"); // error,Message is not define，eval的作用域问题要研究一下
        let m2 = {}
        m2["abc"] = 12345;
        for(let key in Message.messages)
        {
            //KBEDebug.WARNING_MSG("TestMessage:eval message............(%s)", m.toString());
            KBEDebug.WARNING_MSG("Message::constructor:let key(%s) in Message.messages............value(%s)", key, Message.messages[key]);
        }
        //let message = new Message();
        KBEDebug.DEBUG_MSG("-------------------------------------------------message end -------------------------------------------------");
    }

    private Event_hhh(saySomething: TestObject)
    {
        let typename: string = typeof saySomething;
        KBEDebug.WARNING_MSG("Event_hhh----------->>>saySomething(%s)----typeof saySomething:(%s)--->>>value:(%d)", saySomething, typename, saySomething.m_value1);
    }

    private Event_eee(saySomething: string, p1: number, p2: number)
    {
        let typename: string = typeof saySomething;
        KBEDebug.WARNING_MSG("Event_hhh----------->>>saySomething(%s), p1(%d), p2(%d)", saySomething, p1, p2);
    }

    private onopen(event: Event)
    {
        console.log("connect server onopen------------>>>" + event.type);
    }

    private onerror(event: Event)
    {
        console.log("connect server onerror------------>>>" + event);
    }

    private onmessage(msg: MessageEvent)
    {
        console.log("connect server onmessage------------>>>" + msg);
    }

    private onclose(event: CloseEvent)
    {
        console.log("connect server onclose------------>>>" + event);
    }

    private TestStreamMemory(): void
    {

    }
    // update (dt) {}
}
