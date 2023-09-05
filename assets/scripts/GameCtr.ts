import { _decorator, Component, director, EventKeyboard, Input, input, KeyCode, Node, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { GroundCtr } from './GroundCtr';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';

@ccclass('GameCtr')
export class GameCtr extends Component {

    protected static _instance: GameCtr;
    public static get instance() { return this._instance; }

    @property(GroundCtr)
    protected groundCtr: GroundCtr;

    @property(Result)
    protected result: Result;

    @property(Bird)
    protected bird: Bird;

    @property(PipePool)
    protected pipeQueue: PipePool;

    @property(BirdAudio)
    protected clip: BirdAudio;

    public isOver: boolean;

    @property()
    protected speed: number = 300;
    public get getSpeed() { return this.speed }

    protected onLoad(): void {
        if (GameCtr._instance != null)
            console.log('Only 1 GameCtr allow to exist');
        GameCtr._instance = this;
    }

    start() {

        this.initLisener();
        this.result.resetScore();
        this.isOver = false;
        // director.pause();
        this.resetGame();

    }

    update(deltaTime: number) {
        if (!this.isOver) {
            this.birdStruck();
        }
    }

    initLisener() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            } else {
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
        })
    }

    // onKeyDown(envent: EventKeyboard) {
    //     switch (envent.keyCode) {
    //         case KeyCode.KEY_D:
    //             this.gameOver();
    //             break;
    //         case KeyCode.KEY_S:
    //             this.resetGame();
    //             this.bird.resetBird();
    //             break;
    //         case KeyCode.KEY_A:
    //             this.result.addScore();
    //             break;
    //     }
    // }

    startGame() {
        this.result.hideResults();
        director.resume();
    }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.pipeQueue.reset();
        this.isOver = false;
        this.startGame();
    }

    passPipe() {
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck() {
        this.contactGroundPipe();

        if (this.bird.hitSomething) {
            this.gameOver();
        }
    }
}

