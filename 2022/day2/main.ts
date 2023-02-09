const input = await Deno.readTextFile("./input.txt");

const data = input.split('\n');

const handScoreMap = new Map<Hand, number>();

handScoreMap.set("rock", 1);
handScoreMap.set("paper", 2);
handScoreMap.set("scissors", 3);

type Hand = "rock" | "paper" | "scissors";
const won = 6;
const draw = 3;
const lost = 0;

type PlayerSymbols = "A" | "B" | "C" | "X" | "Y" | "Z";

const handTranslate = new Map<PlayerSymbols, Hand>();
handTranslate.set("A", "rock");
handTranslate.set("B", "paper");
handTranslate.set("C", "scissors");
handTranslate.set("X", "rock");
handTranslate.set("Y", "paper");
handTranslate.set("Z", "scissors");



function roundRule(playerHand: Hand, opponentHand:Hand) {
  if(playerHand === opponentHand) {
    return draw;
  }
  if(playerHand === "rock" && opponentHand !== "paper") {
    return won;
  }
  if(playerHand === "paper" && opponentHand !== "scissors") {
    return won;
  }
  if(playerHand === "scissors" && opponentHand !== "rock") {
    return won;
  }

  return lost;
}

function play(playerHandParser: (hand:string, opponentHand?: string) => Hand | undefined) {
  const result = data.reduce((sum:number, value:string) => {
    if(!value) {
      return sum;
    }

    const [opponentHand, playerHand] = value.trim().split(" ");
    const _playerHand = playerHandParser(playerHand, opponentHand);
    const _opponentHand = handTranslate.get(opponentHand as PlayerSymbols);

    if(!_playerHand || !_opponentHand) {
      return sum;
    }
    sum += ((handScoreMap.get(_playerHand) || 0)  + roundRule(_playerHand, _opponentHand));
    return sum;
  },0);
  return result;
}

console.log("First:", play((hand:string) => handTranslate.get(hand as PlayerSymbols)));
console.log("Second:", play((hand:string, opponentHand?: string) => {
  const winMatch = new Map<Hand, Hand>();
  winMatch.set("paper", "scissors");
  winMatch.set("scissors", "rock");
  winMatch.set("rock", "paper");

  const loseMatch = new Map<Hand, Hand>();
  loseMatch.set("scissors", "paper");
  loseMatch.set("rock", "scissors");
  loseMatch.set("paper", "rock");

  const _opponenHand = handTranslate.get(opponentHand as PlayerSymbols);
  if (!_opponenHand) {
    return;
  }

  if(hand === "Z") {
    return winMatch.get(_opponenHand);
  }

  if(hand === "X") {
    return loseMatch.get(_opponenHand);
  }

  return _opponenHand;
}));
