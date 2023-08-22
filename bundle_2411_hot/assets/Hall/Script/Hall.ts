import BundleMgr from "./BundleMgr";

export const GameBundleCfg = {
    game1: {
        path: 'game1',
        first: 'game1',
    },
    game2: {
        path: 'http://10.151.32.173:8080/2411_hot_test/remote/game2',
        first: 'game2'
    },
    game3: {
        path: 'game3',
        first: 'game3'
    }
}

export let game2version: string = "";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    backNd: cc.Node = null;
    
    @property(cc.Node)
    gameItems: cc.Node[] = [];

    start () {
        cc.game.addPersistRootNode(this.backNd);
        
        this.getGameBundleNew();
    }

    async onClickGame(evt: cc.Event.EventTouch, custom: string) {
        cc.log("onClickGame...",evt.getCurrentTarget().name);
        let gameName = evt.getCurrentTarget().name;
        for (let i = 0; i < this.gameItems.length; i++) {
            if (gameName == this.gameItems[i].name) {
                let bdCfg = GameBundleCfg[gameName];
                let options = null;
                if (gameName == "game2") {
                    await this.getGameBundleNew();
                    options = {version: game2version}
                }
                BundleMgr.LoadBundle(bdCfg.path, options, bdCfg.first);
                break;
            }
        }
    }

    async getGameBundleNew() {
        // game2
        let url = "http://127.0.0.1:8080/2411_hot_test/remote/game2" + "/version.json"
        if (cc.sys.isNative) {
            url = GameBundleCfg['game2'].path + "/version.json"
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                if (response) {
                    console.log("response=",response)
                    let js = JSON.parse(response)
                    game2version = js.version;
                    console.log(game2version);
                    return js.version;
                }
            } else {
                return null
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
}
