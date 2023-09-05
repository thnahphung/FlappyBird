import { _decorator, Component, Node, Vec3, screen, UITransform } from 'cc';
import { GameCtr } from './GameCtr';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {

    @property(Node)
    protected topPipe: Node;

    @property(Node)
    protected botPipe: Node;

    protected tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    protected tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);

    protected scene = screen.windowSize;

    protected pipeSpeed: number;
    protected tempSpeed: number;

    protected isPass: boolean;

    protected onLoad(): void {
        this.pipeSpeed = GameCtr.instance.getSpeed;
        this.initPos();
        this.isPass = false;
    }

    protected initPos() {
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width;
        this.tempStartLocationDown.x = this.botPipe.getComponent(UITransform).width + this.scene.width;

        let gap = random(90, 100);
        let topHeight = random(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10))

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.botPipe.setPosition(this.tempStartLocationDown);

    }

    update(deltaTime: number) {

        this.tempSpeed = this.pipeSpeed * deltaTime;
        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown = this.botPipe.position;

        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.botPipe.setPosition(this.tempStartLocationDown);

        if (!this.isPass && this.topPipe.position.x <= 0) {
            this.isPass = true;
            GameCtr.instance.passPipe();
        }

        if (this.topPipe.position.x < - this.scene.width) {
            GameCtr.instance.createPipe();
            this.destroy();
        }
    }
}

