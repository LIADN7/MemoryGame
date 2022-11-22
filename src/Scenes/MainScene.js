"use strict";
// You can write more code here
// / <reference path="../../node_modules/phaser/types/phaser.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/* START OF COMPILED CODE */
var music; //
class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
        const nameS0 = "symbol_0.png";
        // bg
        const bg = this.add.image(408, 368, "bg");
        bg.scaleX = 0.6;
        bg.scaleY = 0.6;
        // symbols_layer
        const symbols_layer = this.add.layer();
        // symbol11
        const symbol11 = this.add.sprite(215, 521, "symbols", nameS0).setInteractive();
        symbol11.scaleX = 0.5;
        symbol11.scaleY = 0.5;
        symbols_layer.add(symbol11);
        // symbol10
        const symbol10 = this.add.sprite(405, 521, "symbols", nameS0).setInteractive();
        symbol10.scaleX = 0.5;
        symbol10.scaleY = 0.5;
        symbols_layer.add(symbol10);
        // symbol9
        const symbol9 = this.add.sprite(595, 521, "symbols", nameS0).setInteractive();
        symbol9.scaleX = 0.5;
        symbol9.scaleY = 0.5;
        symbols_layer.add(symbol9);
        // symbol8
        const symbol8 = this.add.sprite(595, 392, "symbols", nameS0).setInteractive();
        symbol8.scaleX = 0.5;
        symbol8.scaleY = 0.5;
        symbols_layer.add(symbol8);
        // symbol7
        const symbol7 = this.add.sprite(405, 392, "symbols", nameS0).setInteractive();
        symbol7.scaleX = 0.5;
        symbol7.scaleY = 0.5;
        symbols_layer.add(symbol7);
        // symbol6
        const symbol6 = this.add.sprite(215, 392, "symbols", nameS0).setInteractive();
        symbol6.scaleX = 0.5;
        symbol6.scaleY = 0.5;
        symbols_layer.add(symbol6);
        // symbol5
        const symbol5 = this.add.sprite(595, 263, "symbols", nameS0).setInteractive();
        symbol5.scaleX = 0.5;
        symbol5.scaleY = 0.5;
        symbols_layer.add(symbol5);
        // symbol4
        const symbol4 = this.add.sprite(405, 263, "symbols", nameS0).setInteractive();
        symbol4.scaleX = 0.5;
        symbol4.scaleY = 0.5;
        symbols_layer.add(symbol4);
        // symbol3
        const symbol3 = this.add.sprite(215, 263, "symbols", nameS0).setInteractive();
        symbol3.scaleX = 0.5;
        symbol3.scaleY = 0.5;
        symbols_layer.add(symbol3);
        // symbol2
        const symbol2 = this.add.sprite(595, 135, "symbols", nameS0).setInteractive();
        symbol2.scaleX = 0.5;
        symbol2.scaleY = 0.5;
        symbols_layer.add(symbol2);
        // symbol1
        const symbol1 = this.add.sprite(405, 135, "symbols", nameS0).setInteractive();
        symbol1.scaleX = 0.5;
        symbol1.scaleY = 0.5;
        symbols_layer.add(symbol1);
        // symbol0
        const symbol0 = this.add.sprite(215, 135, "symbols", nameS0).setInteractive();
        symbol0.scaleX = 0.5;
        symbol0.scaleY = 0.5;
        symbols_layer.add(symbol0);
        const restartSymbol = this.add.image(720, 75, 'reset').setInteractive();
        restartSymbol.scaleX = 0.25;
        restartSymbol.scaleY = 0.25;
        symbols_layer.add(restartSymbol);
        const tipSymbol = this.add.image(100, 75, 'tip').setInteractive();
        tipSymbol.scaleX = 0.25;
        tipSymbol.scaleY = 0.25;
        symbols_layer.add(restartSymbol);
        const leaderboard = this.add.image(850, 350, 'leaderboard').setInteractive();
        leaderboard.scaleX = 0.7;
        leaderboard.scaleY = 0.7;
        symbols_layer.add(leaderboard);
        this.bg = bg;
        this.symbol11 = symbol11;
        this.symbol10 = symbol10;
        this.symbol9 = symbol9;
        this.symbol8 = symbol8;
        this.symbol7 = symbol7;
        this.symbol6 = symbol6;
        this.symbol5 = symbol5;
        this.symbol4 = symbol4;
        this.symbol3 = symbol3;
        this.symbol2 = symbol2;
        this.symbol1 = symbol1;
        this.symbol0 = symbol0;
        this.restartSymbol = restartSymbol;
        this.tipSymbol = tipSymbol;
        this.limitText = this.add.text(184, 13, "");
        this.feedbackText = this.add.text(400, 13, "");
        this.timeLimitText = this.add.text(570, 13, "60");
        this.leaderboardText = [
            this.add.text(815, 300, "6       23.321").setColor('black').setFontStyle('bold'),
            this.add.text(815, 347, "6       23.321").setColor('black').setFontStyle('bold'),
            this.add.text(815, 394, "6       23.321").setColor('black').setFontStyle('bold')
        ];
        this.mainSounds = this.sound.add('mainSounds'); // Main sound
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    getTipSymbol() { return this.tipSymbol; }
    getRestartSymbol() { return this.restartSymbol; }
    getFeedbackText() { return this.feedbackText; }
    getLimitText() { return this.limitText; }
    getTimeLimitText() { return this.timeLimitText; }
    getLeaderboardText() { return this.leaderboardText; }
    getMainSounds() { return this.mainSounds; }
    // Write your code here
    symbolsArr() {
        return [this.symbol0, this.symbol1, this.symbol2, this.symbol3, this.symbol4, this.symbol5, this.symbol6, this.symbol7, this.symbol8, this.symbol9, this.symbol10, this.symbol11];
    }
    preload() {
        this.load.pack("pack", './Assets/game_pack_sd.json');
        this.load.image('reset', 'Assets/symbols/restartS.png');
        this.load.image('tip', 'Assets/symbols/tip.png');
        this.load.image('transfer', 'Assets/symbols/transfer.png');
        this.load.image('leaderboard', 'Assets/symbols/leaderboard.jpg');
        this.load.audio('mainSounds', ['Assets/sounds/mainSoundtrack.ogg', 'Assets/sounds/mainSoundtrack.mp3']);
        var dateTime = new Date();
        this.timeLimit = 60 * 1000 + dateTime.getTime();
    }
    create() {
        this.editorCreate();
        this.game.events.emit("GameCreated");
    }
    update(time, delta) {
        var dateTime = new Date();
        this.timerGame = Math.floor((this.timeLimit - dateTime.getTime())) / 1000;
        // Timer
        if (this.timerGame > 0) {
            this.timeLimitText.setText("" + this.timerGame);
        }
        else {
            this.timeLimitText.setText("0");
            if (this.timeLimit == 0)
                this.feedbackText.setText("You Won!");
            else
                this.feedbackText.setText("Game Over");
        }
    }
}
exports.default = MainScene;
/* END OF COMPILED CODE */
// You can write more code here
