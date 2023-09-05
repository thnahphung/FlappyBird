import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtr } from './GameCtr';
const { ccclass, property } = _decorator;

@ccclass('GroundCtr')
export class GroundCtr extends Component {
    @property([Node])
    protected listGround: Node[] = [];

    @property
    protected speed: number = 300;

    @property
    protected startPosX = -320;

    @property
    protected startPosY = -480;

    protected onLoad(): void {
        this.speed = GameCtr.instance.getSpeed;
    }

    start() {
        this.restart();
    }

    update(deltaTime: number) {
        this.speed = GameCtr.instance.getSpeed;
        this.moveAllGround(deltaTime);
    }

    restart() {
        this.listGround[0].setPosition(this.startPosX, this.startPosY);

        for (let i = 1; i < this.listGround.length; i++) {
            const beforeGround = this.listGround[i - 1];
            let positionX = beforeGround.position.x + beforeGround.getComponent(UITransform).width;
            this.listGround[i].setPosition(positionX, this.listGround[i].position.y);
        }
    }

    moveAllGround(deltaTime: number) {
        for (const ground of this.listGround) {
            if (ground.position.x + ground.getComponent(UITransform).width <= this.startPosX) {
                ground.setPosition(-(this.startPosX), ground.position.y);
                continue;
            }

            let newPosX = ground.position.x - this.speed * deltaTime;
            ground.setPosition(newPosX, ground.position.y);

        }
    }
}

