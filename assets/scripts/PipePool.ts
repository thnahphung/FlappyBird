import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {

    @property(Prefab)
    protected prefabPipes = null;

    @property(Node)
    protected pipePoolHome: Node;

    protected pool = new NodePool;

    update(deltaTime: number) {

    }

    protected initPool() {
        let initCount = 3;
        for (let i = 0; i < initCount; i++) {
            let createPipe = instantiate(this.prefabPipes);

            if (i == 0) {
                this.pipePoolHome.addChild(createPipe);
            } else {
                this.pool.put(createPipe);
            }
        }
    }

    addPool() {

        let pipe;
        if (this.pool.size() > 0) {
            pipe = this.pool.get();
        } else {
            pipe = instantiate(this.prefabPipes);
        }

        this.pipePoolHome.addChild(pipe);
    }

    reset() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}

