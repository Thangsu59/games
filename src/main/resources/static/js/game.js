// 단어 카테고리와 단어들을 정의한 객체
const categories = {
    "쉬움": ["구두", "교도소", "구멍", "상처", "손길", "달리기", "등장", "받침", "혈투", "봉화", "부사관", "호박전", "감자탕", "냉장고", "완두콩", "배신감", "물결", "헤매임", "콩나물", "햇빛", "눈동자", "미역국", "지혈대", "외갓집", "영화관", "잔디밭", "올여름", "연체료", "벚꽃", "캠코더", "카메라", "샴페인", "숨결", "빛줄기", "나뭇잎", "물거품", "놀이터", "육개장"],
    "보통": ["샥스핀", "역사학", "칡국수", "선생님", "감정적", "플랫폼", "먹잇감", "숨막힘", "용봉탕", "탕평책", "계산기", "함께하다", "수수께끼", "도깨비", "예술품", "폐기물", "콩깍지", "꼼장어", "꽁치찜", "단팥빵", "미숫가루", "격세지감", "미완예찬", "구렛나루", "뛰어남", "채찍질", "값싸다", "바람둥이", "웃음소리", "꼴뚜기", "팬케이크", "플라스틱", "바퀴벌레", "오매불망", "징검다리", "젊은이", "꿈틀거림", "반짝임", "마음가짐", "울음소리", "제비뽑기"],
    "어려움": ["고운점박이푸른부전나비", "모시금자라남생이잎벌레", "송곳벌레살이납작맵시벌", "어리등에살이뭉툭맵시벌", "폴립테루스세네갈", "라리앙안경원숭이", "데이빗경긴코바늘두더지", "짧은코가시두더지", "바실리스크도마뱀", "남극하트지느러미오징어", "슈돌리파리스앰블리스토몹시스", "프세우돌리파리스엠블리스토몹시스", "스트롱길로센트로투스드로에바치엔시스", "후무후무누쿠누쿠아푸아아", "잔점배무늬독수리", "클로니아비타타", "동헤르만육지거북", "아시안포레스트전갈", "데스스토커전갈", "메피스토펠레스루카스"]
};

let allWords = [];  // 모든 단어를 한 배열로 합침
for (let category in categories) {
    allWords = allWords.concat(categories[category].map(word => ({ word: word, category: category })));
}

// HTML 요소들을 변수로 저장
const startButton = document.getElementById("startButton");
const wordContainer = document.getElementById("wordContainer");
const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const message = document.getElementById("message");
const triesDisplay = document.getElementById("tries");
const wordCountDisplay = document.getElementById("wordCount");
const restartButton = document.getElementById("restartButton");
const timerDisplay = document.getElementById("timer");

const backgroundMusic = document.getElementById("backgroundMusic");
const arrowSound = document.getElementById("arrowSound");
const flyingSound = document.getElementById("flyingSound");
const hitSound = document.getElementById("hitSound");
const failSound = document.getElementById("failSound");
const destSound = document.getElementById("destSound");
const scoreDisplay = document.getElementById("score");


// 게임 상태와 타이머 등을 관리하는 변수들
let currentCategoryIndex = 0;
let currentWordIndex = 0;
let triesLeft = 5;
let startTime = 0;
let timerInterval;
let gameStarted = false;
let animationFrameId;
// 게임에 사용될 점수 변수 초기화
let score = 0;
let gameEndTime = 0; // 게임 종료 시간을 기록할 변수

// 음악 재생 여부를 나타내는 변수
let isMusicPlaying = true;
backgroundMusic.volume = 0.5;
arrowSound.volume = 0.7;
flyingSound.volume = 0.6;
hitSound.volume = 0.2;

// 음악 토글 버튼 클릭 이벤트 처리
musicToggleButton.addEventListener("click", function () {
    if (isMusicPlaying) {
        backgroundMusic.pause(); // 음악을 일시 정지
    } else {
        backgroundMusic.play(); // 음악을 재생
    }
    isMusicPlaying = !isMusicPlaying; // 상태를 토글
    updateMusicToggleButton(); // 버튼 상태 업데이트
});

// 음악 플레이어 상태에 따라 버튼 텍스트 업데이트
function updateMusicToggleButton() {
    if (isMusicPlaying) {
        musicToggleButton.textContent = "음악 끄기";
    } else {
        musicToggleButton.textContent = "음악 켜기";
    }
}


// 시작 버튼 클릭 이벤트 처리
startButton.addEventListener("click", function () {
    startGame();
});

// 배열을 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 단어 이동 애니메이션 함수
function animateWord() {
    // 게임이 시작되지 않았을 때는 애니메이션을 실행하지 않음
    if (!gameStarted) {
        return;
    }

    // 아직 모든 단어가 표시되지 않은 경우
    if (currentCategoryIndex < allWords.length) {
        // 새로운 단어 엘리먼트 생성
        const dragon = document.createElement("div");
        const word = document.createElement("div");
        dragon.className = "dragon";
        word.textContent = allWords[currentCategoryIndex].word;
        word.className = "word";
        dragon.appendChild(word);
        wordContainer.appendChild(dragon);

        // 애니메이션에 사용되는 변수들 초기화
        const containerWidth = wordContainer.offsetWidth; // 컨테이너의 너비
        const wordWidth = dragon.offsetWidth; // 단어 엘리먼트의 너비
        const startPos = containerWidth; // 시작 위치

        // 문자 길이에 따른 애니메이션 속도 설정
        const durationByCategory = {
            "쉬움": 3,
            "보통": 5,
            "어려움": 7
        };

        const category = allWords[currentCategoryIndex].category;
        let duration = durationByCategory[category] || 7;

        let position = startPos; // 현재 위치
        let startTime = Date.now(); // 애니메이션 시작 시간

        // 단어 이동 애니메이션 함수
        function moveWord() {
            // 게임이 시작되지 않았을 때는 애니메이션을 실행하지 않음
            if (!gameStarted) {
                return;
            }
            const currentTime = Date.now();
            const elapsed = (currentTime - startTime) / 1000;
            // 현재 위치 계산
            position = startPos - (elapsed / duration) * (containerWidth + wordWidth);
            // 단어 위치 업데이트
            dragon.style.left = position + "px";

            // 단어가 화면 왼쪽을 벗어났는지 확인
            if (position + wordWidth < -10) {
                cancelAnimationFrame(animationFrameId); // 애니메이션 중지
                wordContainer.removeChild(dragon); // 단어 엘리먼트 제거
                currentCategoryIndex++; // 다음 단어로 넘어감
                destSound.play(); // 실패 효과음 재생

                triesLeft--; // 남은 시도 횟수 감소
                triesDisplay.textContent = `남은 횟수: ${triesLeft}`; // 남은 시도 횟수 업데이트
                wordCountDisplay.textContent = `남은 단어: ${allWords.length - currentCategoryIndex}`; // 남은 단어 차감

                if (triesLeft === 0) {
                    gameStarted = false;
                    message.textContent = "GAME OVER";
                    wordInput.disabled = true;
                    stopTimer();
                    restartButton.style.display = "block";
                    return;
                }

                // 현재 카테고리의 모든 단어가 표시되지 않은 경우
                if (currentCategoryIndex < allWords.length) {
                    displayWord(); // 다음 단어 표시
                } else {
                    message.textContent = "게임 종료!";
                    wordInput.disabled = true;
                    stopTimer();
                    restartButton.style.display = "block";
                    wordContainer.innerHTML = "";
                }
            } else {
                animationFrameId = requestAnimationFrame(moveWord);
            }
        }

        // 첫 번째 애니메이션 프레임 요청
        moveWord();
    }
}


// 다음 단어 표시 함수
function displayWord() {
    // 아직 모든 단어가 표시되지 않은 경우
    if (currentCategoryIndex < allWords.length) {
        // 입력 필드 활성화 및 초기화
        wordInput.disabled = false;
        wordInput.value = "";
        wordInput.focus();

        // 단어 이동 애니메이션 시작
        animateWord();
    } else {
        // 모든 단어가 표시된 경우
        setGameEndTime(); // 게임 종료 시간 설정

        // 게임 종료 시간에 따라 점수 계산
        const elapsedTime = Math.floor((gameEndTime - startTime) / 1000);
        let timeBasedScore = 0;
        if (elapsedTime >= 0 && elapsedTime <= 100) {
            timeBasedScore = 300;
        } else if (elapsedTime > 100 && elapsedTime <= 200) {
            timeBasedScore = 200;
        } else {
            timeBasedScore = 100;
        }

        // 최종 점수 계산
        const finalScore = score + timeBasedScore;

        // 점수 표시
        message.textContent = `게임 종료! 최종 점수: ${finalScore}`;
        scoreDisplay.textContent = `현재 점수: ${finalScore}`;
        wordInput.disabled = true; // 입력 필드 비활성화
        restartButton.style.display = "block"; // 재시작 버튼 표시
        wordContainer.innerHTML = ""; // 단어 컨테이너 내용 비우기
        clearSound.play(); // 클리어 효과음 재생
    }
}


// 사용자 입력 단어 확인 함수
function checkWord() {
    // 입력된 사용자 단어 가져오기 (공백 제거)
    const userInput = wordInput.value.trim();

    // 현재 단어 카테고리의 정답 단어와 카테고리 가져오기
    const { category, word } = allWords[currentCategoryIndex];

    const wordValue = getCategoryValue(category);


    // 사용자 입력이 정답과 일치하는 경우
    if (userInput === allWords[currentCategoryIndex].word) {
        message.textContent = "맞음!"; // 정답 메시지 표시
        score += wordValue;
        // 점수 업데이트
        updateScore();
        const currentWord = document.querySelector(".dragon");
        cancelAnimationFrame(animationFrameId); // 애니메이션 중지
        wordContainer.removeChild(currentWord); // 현재 단어 엘리먼트 제거
        currentCategoryIndex++; // 다음 단어로 넘어감
        displayWord(); // 다음 단어 표시
        wordCountDisplay.textContent = `남은 단어: ${allWords.length - currentCategoryIndex}`; // 남은 단어 개수 업데이트
        arrowSound.play();
        flyingSound.play();
        setTimeout(() => hitSound.play(), 170);
    } else {
        message.textContent = "틀림!"; // 오답 메시지 표시
        wordInput.value = ""; // 입력 필드 초기화
        triesLeft--; // 남은 시도 횟수 감소
        triesDisplay.textContent = `남은 횟수: ${triesLeft}`; // 남은 시도 횟수 업데이트
        failSound.play(); // 실패 효과음 재생

        // 시도 횟수가 0인 경우
        if (triesLeft === 0) {
            gameStarted = false; // 게임 상태를 끝낸 상태로 변경
            message.textContent = "GAME OVER"; // 게임 오버 메시지 표시
            wordInput.disabled = true; // 입력 필드 비활성화
            stopTimer(); // 타이머 정지
            restartButton.style.display = "block"; // 재시작 버튼 표시
        }

        // 시도 횟수가 3보다 작아지면 배경 이미지 변경
        if (triesLeft < 3) {
            document.body.style.backgroundImage = "url('/img/background1.png')";
        }
    }

    
}

// 카테고리에 따른 단어 점수를 반환하는 함수
function getCategoryValue(category) {
    switch (category) {
        case "쉬움":
            return 2;
        case "보통":
            return 4;
        case "어려움":
            return 6;
        default:
            return 0; // 다른 카테고리가 들어온 경우 0점으로 처리
    }
}

// 점수를 업데이트하는 함수
function updateScore() {
    scoreDisplay.textContent = `현재 점수: ${score}`;
}

// 게임 시작 함수
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startButton.style.display = "none";
        startTime = Date.now();
        shuffleArray(allWords);
        wordContainer.innerHTML = "";
        displayWord();
        startTimer();
        backgroundMusic.play();
    }
}


// 타이머 시작 함수
function startTimer() {
    if (gameStarted) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// 타이머 정지 함수
function stopTimer() {
    clearInterval(timerInterval);
}

// 타이머 업데이트 함수
function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `시간: ${elapsedTime}초`;
}
// 입력 필드 엔터 키 이벤트 처리 -> 엔터를 쳐서 단어를 입력시킴
wordInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkWord();
    }
});

// 게임 종료 시간을 설정하는 함수
function setGameEndTime() {
    const currentTime = Date.now();
    gameEndTime = currentTime;
}


// 게임 종료 시에 점수를 0으로 초기화하는 함수
function resetScore() {
    score = 0;
    updateScore(); // 점수 업데이트
}

// 게임 종료 시에 호출할 함수
function endGame() {
    setGameEndTime(); // 게임 종료 시간 설정

    // 게임 종료 시간에 따라 점수 계산
    const elapsedTime = Math.floor((gameEndTime - startTime) / 1000);
    let timeBasedScore = 0;
    if (elapsedTime >= 0 && elapsedTime <= 100) {
        timeBasedScore = 300;
    } else if (elapsedTime > 100 && elapsedTime <= 200) {
        timeBasedScore = 200;
    } else {
        timeBasedScore = 100;
    }

    // 최종 점수 계산
    const finalScore = score + timeBasedScore;

    // 점수 표시
    message.textContent = `게임 종료! 최종 점수: ${finalScore}`;
    scoreDisplay.textContent = `현재 점수: ${finalScore}`;
    wordInput.disabled = true; // 입력 필드 비활성화
    restartButton.style.display = "block"; // 재시작 버튼 표시
    wordContainer.innerHTML = ""; // 단어 컨테이너 내용 비우기
    clearSound.play(); // 클리어 효과음 재생

    // 점수 초기화
    resetScore();
}

// 다시 시작 버튼 클릭 이벤트 처리
restartButton.addEventListener("click", function () {
    // 게임 상태 초기화
    currentCategoryIndex = 0;
    triesLeft = 5;
    startTime = 0;

    // UI 초기화
    timerDisplay.textContent = "시간: 0";
    message.textContent = "";
    triesDisplay.textContent = `남은 횟수: ${triesLeft}`;
    wordCountDisplay.textContent = `남은 단어: ${allWords.length}`;
    restartButton.style.display = "none";
    wordInput.disabled = false;
    wordInput.value = "";

    // 배경 이미지를 원래 이미지로 변경
    document.body.style.backgroundImage = "url('/img/background.png')";

    // 게임 시작
    gameStarted = false; // 게임 상태를 끝낸 상태로 만든 후,
    startGame(); // 게임을 다시 시작합니다.

    // 점수 초기화
    resetScore();
});


// 초기 게임 정보 표시
wordCountDisplay.textContent = `남은 단어: ${allWords.length}`;