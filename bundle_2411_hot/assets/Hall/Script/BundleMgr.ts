


const {ccclass, property} = cc._decorator;

@ccclass
export default class BundleMgr {

    
    static _inst:BundleMgr = null;
    static bundleMap = new Map();
    static _curBDName = "";

    static inst () {
        if (BundleMgr._inst == null) {
            BundleMgr._inst = new BundleMgr();
        }

        return BundleMgr._inst;
    }

    static LoadBundle(path, options, gameName){
        if (cc.assetManager.assets.has(path)) {
            cc.log("cc.assetManager.assets.has(path)... true");
        }
        cc.assetManager.loadBundle(path, options, (err, res)=>{
            if (err) {
                cc.log(err);
                return null;
            }
            cc.log("LoadBundle ", path, "is suc!!!")
            BundleMgr.bundleMap.set(path, res);
            BundleMgr._curBDName = path;
            res.loadScene(gameName, (err, res)=>{
                if (err) {
                    cc.log(err);
                    return;
                }
                cc.director.runScene(res);
            })
            return res;
        })
    }

    static removeBundle(bunldeName) {
        let bd = BundleMgr.bundleMap.get(bunldeName);
        if (bd) {
            BundleMgr.bundleMap.delete(bunldeName);
        } else {
            bd = cc.assetManager.getBundle(bunldeName);
        }
        if (bd) {
            bd.releaseAll();
            cc.assetManager.removeBundle(bd);
        }
    }

    static getBundle(bunldeName) {
        return BundleMgr.bundleMap.get(bunldeName);
    }

    static LoadBundleRes(bunldeName, resName, resType) {
        let bd = BundleMgr.bundleMap.get(bunldeName);
        if (bd) {
            bd.load(resName, resType, (err, res)=>{
                if (err) {
                    cc.log(err)
                    return null;
                }
                return res;
            })
        }
        return null;
    }

    // update (dt) {}
}
