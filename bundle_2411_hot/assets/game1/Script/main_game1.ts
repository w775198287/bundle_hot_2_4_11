
const v1 = "001";

const {ccclass, property} = cc._decorator;

@ccclass
export default class main_game1 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.label.string = "game1   " + v1;
    }

    // update (dt) {}
}
