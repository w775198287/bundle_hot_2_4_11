import BundleMgr from "./BundleMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class changzhujiedian extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('click', ()=>{
            cc.director.loadScene('Hall');
            BundleMgr.removeBundle(cc.director.getScene().name);
        })
    }

    protected onEnable(): void {
        cc.log("onEnable...",cc.director.getScene().name)
        let isHallScene = cc.director.getScene().name == "Hall";
        this.node.getComponent(cc.Widget).left = isHallScene ? 10000 : 40;
    }

    protected onDisable(): void {
        cc.log("onDisable...")
    }


    // start () {

    // }

    // update (dt) {}
}
