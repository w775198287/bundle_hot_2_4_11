# bundle_hot_2_4_11
bundle资源脚本都热更

# 远程bundle game2
game2作为远程bundle，用来测试更新远程bundle是否及时的正确生效，以及更新下来是否用的最新的资源和脚本
game远程资源根目录新添加了version.json文件用来版本检查。
{
  "version": "b4ee1"
}
加载game2时根据版本来更新game2此bundle的最新文件

# 更新脚本需要修改引擎部分代码
找到构建缓存引擎版本\resources\engine\bin\.cache，删除对应平台构建缓存
找到文件引擎版本/resources/engine/cocos2d/core/platform/js.js
找到function setup方法替换如下

```JavaScript
function setup (key, publicName, table) {
    js.getset(js, publicName,
        function () {
            return Object.assign({}, table);
        },
        function (value) {
            js.clear(table);
            Object.assign(table, value);
        }
    );
    return function (id, constructor) {
        // deregister old
        if (constructor.prototype.hasOwnProperty(key)) {
            delete table[constructor.prototype[key]];
        }
        js.value(constructor.prototype, key, id);
        // register class
        if (id) {
            var registered = table[id];
// ---------------------------- 旧逻辑 start ----------------------------
//                 if (registered && registered !== constructor) {
//                     var error = 'A Class already exists with the same ' + key + ' : "' + id + '".';
//                     if (CC_TEST) {
//                         error += ' (This may be caused by error of unit test.) \
// If you dont need serialization, you can set class id to "". You can also call \
// cc.js.unregisterClass to remove the id of unused class';
//                     }
//                     cc.error(error);
//                 }
//                 else {
//                     table[id] = constructor;
//                 }
// ---------------------------- 旧逻辑 end ----------------------------
// ---------------------------- 新逻辑 start ----------------------------
            if (registered && registered !== constructor) {
                if (key == "__classname__") {
                    delete _nameToClass[id];
                } else if (key == "__cid__") {
                    delete _idToClass[id];
                }
                // console.log(`---- cc.js.setup ---- delete ${key} : ${id}`);
            }
            table[id] = constructor;
// ---------------------------- 新逻辑 end ----------------------------
            //if (id === "") {
            //    console.trace("", table === _nameToClass);
            //}
        }
    };
}
```

