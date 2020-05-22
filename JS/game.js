class Game {
  constructor() {
      this.playerScore = 0;
      this.computerScore = 0;
      this.tie = 0;
      this.win;
      this.aiSelect;
  }

  computerPlay() {
      const arr = ["rock", "paper", "scissors"];
      const randNum = Math.floor(Math.random() * 3);
      const randPlay = arr[randNum];
      return randPlay;
  }

  isWin(player, computer) {
      if((player === "rock" && computer === "scissors") || (player === "paper" && computer === "rock") || (player === "scissors" && computer === "paper")) {
          return true;
      } else if ((player === "rock" && computer === "rock") || (player === "paper" && computer === "paper") || (player === "scissors" && computer === "scissors")) {
          return "tie";
      } else {
          return false;
      }
  }

  isValid(player) {
      if((player =="rock") || (player =="paper") || (player =="scissors")) {
          return true;
      } else {
          return false;
      }
  }

  playRound(playerSelection) {
      let player = String(playerSelection);
      player = player.toLowerCase();

      const computer = this.computerPlay().toLowerCase();

      this.aiSelect = `.ai-${computer}`;
      
      if(this.isWin(player, computer) && this.isWin(player, computer) !== "tie"){
          this.playerScore += 1;
          this.win = true;
          return `You Win! Player: ${player} beats Computer: ${computer}`;
      } else if (this.isWin(player, computer) === "tie") {
          this.tie += 1;
          this.win = 'tie';
         return "It's a tie";
      
      } else {
          this.computerScore += 1;
          this.win = false;
          return `You Lose! Computer: ${computer} beats Player: ${player}`;
      }
  }

  resetScore() {
      this.tie = 0;
      this.playerScore = 0;
      this.computerScore = 0;
  }

   game(playerSelection) {
   
          console.log(this.playRound(playerSelection));
          console.log(`tie: ${this.tie} player score: ${this.playerScore} computer score ${this.computerScore}`);
      
  }
}

const GameStart = new Game();


class View {
  constructor(){
    this.youScore = $('.you-score');
    this.aiScore = $('.ai-score');


    this.animBox = $('.animation-box');
    this.youAnim = $('.animation-atk-player');
    this.aiAnim = $('.animation-atk-ai');
  }

  showScore(your, ai) {
      this.youScore.text(your);
      this.aiScore.text(ai);
  }

  showAnimation(youWin) {
    if(youWin && youWin !== "tie") {
      this.animBox.addClass('display')

      setTimeout(() => {
        this.youAnim.addClass('atk--active1');
          GameController.playsound(youWin);  
      }, 500);

      setTimeout(() => {
        this.animBox.removeClass('display');
        this.youAnim.removeClass('atk--active1');
        this.showScore();
      },6500);
    } else if(youWin === false && youWin !== 'tie'){
      this.animBox.addClass('display')
      setTimeout(() => {
        this.aiAnim.addClass('atk--active2');
        GameController.playsound(youWin);  
      }, 500);

      setTimeout(() => {
        this.animBox.removeClass('display');
        this.aiAnim.removeClass('atk--active2');
        this.showScore();
      },4000);
    }
  }
}

const GameView = new View();

class GameControl{
  constructor() {
    this.playBoard = $('.playboard');
    this.reStart = $('.restart');

    this.pRock = $('.player-rock');
    this.PpAper = $('.player-paper');
    this.Pscissors = $('.player-scissors');

    this.aiRock = $('.ai-rock');
    this.aiPaper = $('.ai-paper');
    this.aiScissors = $('.ai-scissors');

  }

  init() {
    this.playBoard.on('click', (e) => {
      this.selectAct(e);
    })
    this.reStart.on('click', () => {
      GameStart.resetScore();
      GameView.showScore(GameStart.playerScore, GameStart.computerScore);
    })
  }
  
  selectAct(e) {
    const act = $(e.target);
    if(act.hasClass('player-rock')) {
      act.addClass('selected');
      GameStart.game('rock')
      const aiAct = $(GameStart.aiSelect);

      setTimeout(() => {
        aiAct.addClass('selected');
      },500)

      GameView.showAnimation(GameStart.win);

      GameView.showScore(GameStart.playerScore, GameStart.computerScore);
    } else if(act.hasClass('player-paper')) {
      act.addClass('selected');
      GameStart.game('paper')
      const aiAct = $(GameStart.aiSelect);

      setTimeout(() => {
        aiAct.addClass('selected');
      },500)

      GameView.showAnimation(GameStart.win);

      GameView.showScore(GameStart.playerScore, GameStart.computerScore);
    } else if(act.hasClass('player-scissors')) {
      act.addClass('selected');
      GameStart.game('scissors')
      const aiAct = $(GameStart.aiSelect);

      setTimeout(() => {
        aiAct.addClass('selected');
      },500)

      GameView.showAnimation(GameStart.win);

      GameView.showScore(GameStart.playerScore, GameStart.computerScore);
    }

    setTimeout(() => {
      this.removeSelect();
    },1500);
    
  }

  removeSelect() {
    this.pRock.removeClass('selected');
    this.PpAper.removeClass('selected');
    this.Pscissors.removeClass('selected');
    this.aiRock.removeClass('selected');
    this.aiPaper.removeClass('selected');
    this.aiScissors.removeClass('selected');
  }

  playsound(youWin) {
    const youAudio = new Audio('./sounds/saitama-atk.mp3');
    const aiAudio = new Audio('./sounds/boros-atk.mp3');

    if(youWin && youWin !== "tie") {
      youAudio.play();
    } else if(youWin === false && youWin !== 'tie') {
      aiAudio.play();
    }
  }
}

const GameController = new GameControl();

GameController.init();
