import Phaser from "phaser";
import GamePlay from "./GamePlay";
import WebSocketClient from "../api/WebSocketClient";
import GameOffline from "./GameOffline";
import { FPSLabel } from "../components/FPS_Label";
import { SettingButton } from "../components/Setting_Button";
import { ReadyButton } from "../components/Ready_Button";
import { WEBSOCKET } from "../config"

class Controller extends Phaser.Scene {
    // socket: WebSocketClient;
    currentScene: any;
    socket: WebSocket;
    constructor() {
        super({ key: 'Controller' });
        this.currentScene;
        this.socket = WEBSOCKET;
        this.socket.onmessage = this.handleMessageReceived.bind(this);
        this.socket.onopen = this.handleOnOpen.bind(this);
    }

    handleOnOpen() { }

    handleMessageReceived(event: MessageEvent): void {
        console.log(event.data)
    }

    onRegistryChange(parent: any, key: any, data: any) {
        console.log(data);
        if (data) {
            this.socket.send('ping');
        }
    }


    init(data: any): void {
        // console.log('init', data);
    }

    preload(): void {
        // console.log('preload');

    }

    changeScene(sceneKey: any) {
        // Hàm để chuyển đổi giữa các scene
        this.scene.start(sceneKey);
    }

    create(): void {
        this.registry.events.on('changedata', this.onRegistryChange, this);
        this.scene.add('FPSLabel', FPSLabel, true);
        this.scene.add('SettingButton', SettingButton, true);
        // this.scene.add('ReadyButton', ReadyButton, true);
        // this.scene.add('GamePlay', GamePlay, true);
        this.scene.add('GameOffline', GameOffline, true);
        // this.scene.start('GamePlay')
    }


    update(): void {
    }

}

export default Controller;