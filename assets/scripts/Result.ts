import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {

    @property(Label)
    protected currentScoreLabel: Label;

    @property(Label)
    public highScoreLable: Label;

    @property(Label)
    public tryAgainLable: Label;

    protected currentScore: number = 0;
    protected highScore: number = 0;

    start() {

    }

    update(deltaTime: number) {

    }

    updateScore(num: number) {
        this.currentScore = num;
        this.currentScoreLabel.string = '' + this.currentScore;

    }

    resetScore() {
        this.updateScore(0);

        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.highScore = Math.max(this.currentScore, this.highScore);

        this.highScoreLable.string = 'High Score: ' + this.highScore;

        this.tryAgainLable.node.active = true;
        this.highScoreLable.node.active = true;
    }

    hideResults() {
        this.highScoreLable.node.active = false;
        this.tryAgainLable.node.active = false;
    }
}

