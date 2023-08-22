const v2 = "001";

const {ccclass, property} = cc._decorator;

@ccclass
export default class main_game2 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.label.string = "game2 ffffff  "+v2;
    }


/*

找到构建缓存引擎版本\resources\engine\bin\.cache，删除对应平台构建缓存
找到文件引擎版本/resources/engine/cocos2d/core/platform/js.js
找到function setup方法替换如下
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

*/

    // update (dt) {}
}
