import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property(CCFloat)
    public jumbHeight: number = 200;


    @property(CCFloat)
    public jumbDuration: number = 3.5;

    public birdAnimation: Animation;

    public birdLocation: Vec3;

    public hitSomething: boolean;

    protected onLoad(): void {
        this.resetBird();

        this.birdAnimation = this.getComponent(Animation);
    }
    update(deltaTime: number) {

    }

    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);

        this.node.position = this.birdLocation;
        this.hitSomething = false;
    }

    fly() {
        this.birdAnimation.stop();

        tween(this.node.position)
            .to(this.jumbDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumbHeight, 0),
                {
                    easing: 'smooth',
                    onUpdate: (target: Vec3, ratio: number) => {
                        this.node.position = target;
                    }
                }).start();
        this.birdAnimation.play();
    }
}

