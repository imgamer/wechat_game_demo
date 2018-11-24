import KBEDebug from "./../kbengine_typescript_plugin/kbengine/KBEDebug";

export default class AsyncModule
{
    constructor()
    {

    }

    async TestAsync(moduleName: string)
    {
        KBEDebug.DEBUG_MSG("AsyncModule::TestAsync:raw url------------------->>>");
        let path: string = "../kbengine_typescript_plugin/kbengine/" + moduleName
        const module  = await import(path);
        let e = new module.default();
        KBEDebug.DEBUG_MSG("AsyncModule::TestAsync:raw url------------------->>>11111111111111111:%s", e.Name());
    }
}