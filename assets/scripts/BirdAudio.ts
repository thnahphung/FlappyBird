import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
    @property([AudioClip])
    protected clips: AudioClip[] = [];

    @property(AudioSource)
    protected audioSource: AudioSource = null;

    onAudioQueue(index: number) {
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }
}

