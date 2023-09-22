let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck = [];
let round = 1;
let roundResults = [];
let userMoney = 100;
let userBet = 0;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
    document.getElementById("place-bet").addEventListener("click", placeBet);
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function placeBet() {
    const betInput = document.getElementById("bet");
    const betAmount = parseInt(betInput.value);

    if (betAmount <= 0 || betAmount % 10 !== 0 || betAmount > userMoney) {
        alert("유효하지 않은 베팅입니다. 10의 배수이고 가진 돈 이내에서 베팅하세요.");
        return;
    }

    userBet = betAmount;
    userMoney -= userBet;
    document.getElementById("user-money").innerText = userMoney;

    document.getElementById("place-bet").disabled = true;

    startGame();
}

function startGame() {
    if (round > 5) {
        document.getElementById("next-round").style.display = "none";
        document.getElementById("restart").style.display = "block";
        return;
    }

    if (userBet > 0) {
        return;
    }

    dealerSum = 0;
    yourSum = 0;

    document.getElementById("results").innerText = "";

    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("your-cards").innerHTML = "";

    document.getElementById("round-number").innerText = round;

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.id = "hidden"; 
    hiddenCardImg.src = "/static/img/cards/BACK.png";
    document.getElementById("dealer-cards").appendChild(hiddenCardImg);

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/static/img/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").appendChild(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/static/img/cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").appendChild(cardImg);
    }

    console.log(yourSum);

    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("bet").value = "";
    document.getElementById("place-bet").disabled = false;

    
    document.getElementById("next-round").style.display = "block";
}



function nextRound() {
    returnToDeck();

    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;

    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("results").innerText = "";
    document.getElementById("hidden").src = "/static/img/cards/BACK.png";
    document.getElementById("place-bet").disabled = false;
    
    if (round > 5) {
        
        document.getElementById("user-money").innerText = userMoney;
        document.getElementById("next-round").style.display = "none";
        document.getElementById("restart").style.display = "block";
    } else {
        document.getElementById("next-round").style.display = "block";
        document.getElementById("restart").style.display = "none";
        startGame(); 
    }
}


document.getElementById("next-round").addEventListener("click", nextRound);


function hit() {
    if (deck.length === 0) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "/static/img/cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        document.getElementById("hit").removeEventListener("click", hit);
        endRound("패배");
    }
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    document.getElementById("hidden").src = "/static/img/cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "패배";
    } else if (dealerSum > 21) {
        message = "승리";
    } else if (yourSum == dealerSum) {
        message = "무승부";
    } else if (yourSum > dealerSum) {
        message = "승리";
    } else if (yourSum < dealerSum) {
        message = "패배";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;

    endRound(message);
}

function endRound(result) {
    // 라운드 결과를 기록
    roundResults.push(`라운드 ${round}: ${result}`);
    round++;

    // 사용자와 딜러의 합에서 Ace를 처리
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    // 딜러의 숨겨진 카드를 공개
    document.getElementById("hidden").src = "/static/img/cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "패배";
    } else if (dealerSum > 21) {
        message = "승리";
    } else if (yourSum == dealerSum) {
        message = "무승부";
    } else if (yourSum > dealerSum) {
        message = "승리";
    } else if (yourSum < dealerSum) {
        message = "패배";
    }

    // 결과를 화면에 업데이트
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;

    if (result === "승리") {
        userMoney += 2 * userBet;
    } else if (result === "무승부") {
        userMoney += userBet;
    }

    // 사용자의 베팅 금액 초기화
    userBet = 0;

    // 사용자의 금액을 업데이트하고 베팅 관련 요소 리셋
    document.getElementById("user-money").innerText = userMoney;
    document.getElementById("bet").value = "";
    document.getElementById("place-bet").disabled = false;

    // 라운드 결과 업데이트
    updateRoundHistory();

    // 사용자의 돈이 0이면 게임 오버 처리
    if (userMoney <= 0 || round > 5) {
        // 5라운드가 종료되었을 때 또는 사용자 돈이 0일 때
        document.getElementById("results").innerText = "GAME OVER";
        document.getElementById("next-round").style.display = "none"; // 다음 라운드 버튼 숨기기
        document.getElementById("restart").style.display = "block"; // 다시하기 버튼 표시
    }
}


function endGame() {
    // Hit 및 Stand 버튼 비활성화
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;

    // 게임 초기화
    round = 1;
    roundResults = [];
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;

    // 사용자의 금액과 베팅 관련 요소 초기화
    userMoney = 100;
    userBet = 0;
    document.getElementById("user-money").innerText = userMoney;
    document.getElementById("bet").value = "";
    document.getElementById("place-bet").disabled = false;

    // 라운드 결과 목록 초기화
    const roundResultsList = document.getElementById("round-results");
    roundResultsList.innerHTML = "";

    // 게임 관련 요소 초기화
    document.getElementById("round-number").innerText = round;
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("your-sum").innerText = "";
    document.getElementById("results").innerText = "";
    document.getElementById("hidden").src = "/static/img/cards/BACK.png";
    document.getElementById("your-cards").innerHTML = "";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("next-round").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;

    // 덱 다시 섞고 게임 시작
    buildDeck();
    shuffleDeck();
    startGame();
}


function returnToDeck() {
    deck.push(hidden); 

    const yourCards = document.getElementById("your-cards").querySelectorAll("img");
    const dealerCards = document.getElementById("dealer-cards").querySelectorAll("img");

    yourCards.forEach((cardImg) => {
        const cardFileName = cardImg.src.split("/").pop();
        const cardName = cardFileName.split(".")[0];
        deck.push(cardName);
    });

    dealerCards.forEach((cardImg) => {
        const cardFileName = cardImg.src.split("/").pop();
        const cardName = cardFileName.split(".")[0];
        deck.push(cardName);
    });

    shuffleDeck();
}


function updateRoundHistory() {
    const roundResultsList = document.getElementById("round-results");
    roundResultsList.innerHTML = "";
    for (let i = 0; i < roundResults.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = roundResults[i];
        roundResultsList.appendChild(listItem);
    }
}



function restartGame() {
    round = 1;
    roundResults = [];
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    userMoney = 100;
    
    const roundResultsList = document.getElementById("round-results");
    roundResultsList.innerHTML = "";

    document.getElementById("round-number").innerText = round;
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("your-sum").innerText = "";
    document.getElementById("results").innerText = "";
    document.getElementById("hidden").src = "/static/img/cards/BACK.png";
    document.getElementById("your-cards").innerHTML = "";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("next-round").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;

    buildDeck();
    shuffleDeck();
    startGame();
}



function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

document.getElementById("restart").addEventListener("click", restartGame);
