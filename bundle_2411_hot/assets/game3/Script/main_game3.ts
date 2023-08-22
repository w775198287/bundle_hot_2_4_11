const v3 = "001";

const {ccclass, property} = cc._decorator;

@ccclass
export default class main_game3 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.label.string = "game3   "+v3;
    }

    // update (dt) {}
}
