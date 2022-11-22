import { isContext } from "vm";
import MainScene from "../Scenes/MainScene";

/**
 * Use this class for main implementation.
 * 
 */

const GREEN = 0x00ff00;
const YELLOW = 0xffff00;
const RED = 0xff0000;
const NORMAL = 0xffffff;

let board!: String[]; // random board
let symArr!: Phaser.GameObjects.Sprite[]; // All the symbols
let managerScene!: MainScene; // i_Scene
let score!: number // The number of cards revealed
let limit!: number; // Limit wrong
let open!: number; // First open or seconed
let lastOpen!: number; // Last i from board that opened
let mainSound!: Phaser.Sound.BaseSound; // Main sound
var isPause!: boolean; // Pause the game
var gameOver!: boolean; // GAME OVER?
var useTip!: boolean; // Use tip?
let winScore = [[0,0],[0,0],[0,0]] // The score on leaderboard -> arr[rank] = [limit, time]


export class GameManager {
    
    

    constructor(i_Scene: MainScene) {
        managerScene = i_Scene;
        managerScene.scale;
        buildStart();
		
        // tip push
		managerScene.getTipSymbol().on('pointerdown', function (pointer: any) {
            if(!isPause&&!useTip&&!gameOver&&managerScene.getTimeLimitText().text!="0"&&managerScene.getTimeLimitText().text!="-1"&&limit>1&&score<board.length-2){
                
                var tipArr = getTip();
                isPause=true;
                managerScene.getFeedbackText().setText("You lose point!");
                limit--;
                managerScene.getLimitText().setText("Turns left: "+limit);
                symArr[tipArr[0]].tint = YELLOW; //yellow
                symArr[tipArr[1]].tint = YELLOW;
                managerScene.time.delayedCall(2000, function clean(){
                    symArr[tipArr[0]].tint = NORMAL;
                    symArr[tipArr[1]].tint = NORMAL;
                    managerScene.getFeedbackText().setText("");
                    isPause=false;}, [], managerScene);
                useTip=true;
                
            }
            
        });

        // restart push
		managerScene.getRestartSymbol().on('pointerdown', function (pointer: any) {
            managerScene.scene.restart();
            
        });
        // console.log(board);

        // cards push from sym0 to sym11
		for (let i = 0; i < symArr.length; i++) {
			symArr[i].on('pointerdown', function (pointer: any) {
                if(!isPause&&!gameOver&&managerScene.getTimeLimitText().text!="0"){
				if(open==0&&board[i].toString()!="none"){
                    // When you pick the first card
                    // check if: is the first card & not card that correct
					symArr[i].setTexture("symbols", board[i].toString());
                    lastOpen=i;
					open ++;

				}
                else if(open==1 && board[lastOpen].toString()==board[i].toString() && i!=lastOpen){
					// When you pick 2 correct cards, 
                    // check if: is the seconed card & the same card but not same position
                    symArr[i].setTexture("symbols", board[i].toString());
                    //symArr[i].setTexture('transfer').setScale(0.24,0.24);
                    board[lastOpen]="none";
                    board[i]="none";

                    score+=2;
                    if(score==board.length){
                        gameOver=true;
                        managerScene.getFeedbackText().setText("You Won!");
                        setWinScore(managerScene.timerGame);
                        managerScene.timeLimit=0; //set to won!
                    }
                    else{
                    var j = lastOpen; 
                    // Send good message to Feedback Text
                    managerScene.getFeedbackText().setText(getRandText(true));
                    symArr[i].tint = GREEN; 
                    symArr[lastOpen].tint=GREEN;
                    isPause=true;
                    let tempRand=[-1,-1];
                    if(score<board.length-2){
                        tempRand=relocationCard();
                        
                    } 
                    managerScene.time.delayedCall(2000, function clean(){isPause=false;
                        managerScene.getFeedbackText().setText("");
                        symArr[i].tint = NORMAL; //normal
                        symArr[j].tint = NORMAL;
                        if(tempRand[0]>-1){
                            symArr[tempRand[0]].setTexture("symbols", "symbol_0.png").setScale(0.5,0.5);
                            symArr[tempRand[1]].setTexture("symbols", "symbol_0.png").setScale(0.5,0.5);                              
                        }
                  
                    }, [], managerScene
                        );

                        
                    }
                    lastOpen=-1;
					open = 0;
				}
                else if(board[i]!="none" && i!=lastOpen && lastOpen>=0){
                    // When you pick 2 wrong cards
                    // check if: not card that correct & not the same position we choose last time
                    symArr[i].setTexture("symbols", board[i].toString());
                    isPause=true;
                    limit--;
                    managerScene.getLimitText().setText("Turns left: "+limit)
                    if(limit==0){
                        // gameOver 
                        gameOver=true;
                        managerScene.getFeedbackText().setText("Game Over");
                        managerScene.timeLimit=-1; //set to game over!
                    }
                    else{
                        // Limit --
                        symArr[i].tint = RED; 
                        symArr[lastOpen].tint=RED;
                        // Send bad message to Feedback Text
                        managerScene.getFeedbackText().setText(getRandText(false));
                        managerScene.time.delayedCall(2000, wrongEvent, [], managerScene);                        
                    }                     
                    //relocationCard(i, lastOpen); // If wrong replace the card in position i                    
                    lastOpen=-1;
                    open=0;
                    
                }				
			}});
            	
		}



    }




    

}

//-----------------------------------------------------
/**
 * Reboots the game
 * @param managerScene 
 */
function buildStart(){
    let date = new Date();
    managerScene.timeLimit = date.getTime()+100*1000;
    score=0;
    limit = 6;
    open = 0;
    lastOpen = -1;
    isPause = false;     
    gameOver = false;
    useTip = false;
    board = getBoard(4,3,6);
    symArr = managerScene.symbolsArr();
    managerScene.getLimitText().setText("Turns left: "+limit);
    managerScene.getFeedbackText().setText("Start!");
    for (let i = 0; i < winScore.length; i++) {
        managerScene.getLeaderboardText()[i].setText(winScore[i][0]+"       "+winScore[i][1]);
        
    }
    if(mainSound == undefined){
        // Create the main sound one time
        mainSound = managerScene.getMainSounds();
	    mainSound.play();
        managerScene.time.delayedCall(80000, playSoundRec, [], managerScene); // Repeats every 80 seconds
        //console.log(1111);
        
    }
    else playSoundRec(); // If restart

}
//-----------------------------------------------------

/**
 * When 2 different cards were selected,
 * Waits 2 seconds and returns back
 */
function wrongEvent(){

    for (let j = 0; j < symArr.length; j++) {
        if(board[j]!="none"){
            symArr[j].tint = NORMAL; 

            symArr[j].setTexture("symbols", "symbol_0.png");
        }
    }
    open =0;
    isPause=false;
    managerScene.getFeedbackText().setText("");
}

/**
 * 
 * @param isGood -> Get good text or bad
 * @returns -> one word
 */
function getRandText(isGood: boolean){
    var len;
    let words;
    if(isGood){
        words = ["Nice","Very good","Excellent"];
    }
    else{
        words = ["Try again","Wrong","Try to remember"];
    }
        len=words.length;
        return words[Math.floor(Math.random() * len)];
}

/**
 * The function give a random board to play
 * @param {integer} n -> Row
 * @param {integer} m -> Columns
 * @param {integer} numCards -> Amount of cards per game
 * @returns Board - Description of the board by array
 */
function getBoard( n: number, m: number, numCards: number): String[] {
    if(Math.floor((n*m)%2)!=0) return [];
    let board = [];

	var mn = n*m;
    let numOfOrder = 0;
    let i=2;
    for (let i = 0; i < mn; i++) {
        board[i]="symbol_0.png";
    }	
    while(numOfOrder<(m*n)){
       
        var rand = Math.floor(Math.random() * mn);
        while(board[rand]!="symbol_0.png"||rand>=mn){
            if(rand>=mn) rand=0;
            else rand++;
        }
        if(board[rand]=="symbol_0.png"){

            board[rand]="symbol_"+Math.floor(i/2)+".png";
            i++;
            numOfOrder++;
            if(numCards+1==Math.floor(i/2)) i=2;
        }
    }

    return board;
}



/**
 * shuffle 2 random cards
 * @returns 2 random numbers -> that shuffle
 */
function relocationCard(){
    var n = board.length;
    var rand1 = Math.floor(Math.random() * n);
    while(rand1>=12||board[rand1]=="none"){
        if(rand1>=n) rand1=0;
        else rand1++;
    }
    
    var rand2 = Math.floor(Math.random() * n);
    
    while(rand2==rand1||rand2>=12||board[rand2]=="none"){
        if(rand2>=n) rand2=0;
        else rand2++;
    }

    var temp = board[rand2];
    board[rand2]=board[rand1];
    board[rand1]=temp;
    symArr[rand1].setTexture('transfer').setScale(0.24,0.24);
    symArr[rand2].setTexture('transfer').setScale(0.24,0.24);
    return [rand1, rand2];
}

/**
 * Get 2 location of same cards
 * @returns array of 2 location
 */
function getTip(){
    var n = board.length;
    var rand = Math.floor(Math.random() * n);
    while(rand>=12||board[rand]=="none"){
        if(rand==n) rand=0;
        else rand++;
    }
    var i =0;
    for (; i < n; i++) {
        if(i!=rand&&board[i]==board[rand]){
            return [rand,i];
        }
        
        
    }
    return [0,0];
}


/**
 * Update the score array
 * @param timeS -> Game end time
 */
function setWinScore(timeS:number){
    var newScore = (limit*1000)+timeS;
    for (let i = 0; i < winScore.length; i++) {
        if(newScore>((winScore[i][0]*1000)+winScore[i][1])){
            //Checks if the current score is better
            var tempArr = [winScore[i][0],winScore[i][1]];
            winScore[i++]=[limit,timeS];               
            for (; i < winScore.length; i++) {
                // Push the rest score ("swap")
                var tempArrj = [winScore[i][0],winScore[i][1]];
                winScore[i]=tempArr;
                tempArr=tempArrj;
            }
        }
    }

}


/**
 * Repeats main sound every 80 seconds
 */
function playSoundRec(){
    mainSound.stop();
    mainSound.play();
    console.log(1111);
    managerScene.time.delayedCall(80000, function rePlay(){
        playSoundRec();
    }, [], managerScene);
    console.log(1111);
    
}