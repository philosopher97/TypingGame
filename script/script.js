// GUI 관련 변수 선언
var canvas;
var context;

// 단어 리스트
var words_1 = ["안녕", "일곱시", "샤워", "철학", "학교", "공부", "프로그래밍"];

// 출현하는 단어 클래스
class Word {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.text = words_1[Math.floor(Math.random() * words_1.length)];
    }
}

// 출현하는 단어 객체들
let word1 = new Word(-100, 30);
let word2 = new Word(-300, 200);
let word3 = new Word(-500, 400);

// 출현하는 단어 객체들을 담은 리스트
var classList = [word1, word2, word3];

// 점수 변수
var score = 0;

// 배경 이미지 생성
var img= new Image();
img.src="images/bg.jpg";

// html파일이 실행될 때 처음 로딩되는 함수
function loaded(){
	canvas= document.getElementById('canvas');
	context= canvas.getContext('2d');

	runGame(); //게임을 진행하는 함수
	//10ms 마다 runGame()를 다시 호출
	setInterval(runGame,10); //1초에 100번 호출
}

// 게임을 진행하는 함수
function runGame(){
	moveAll(); //캐릭터 움직이기
	drawAll(); // 이미지들 그리기
}

// 게임 요소들을 움직이는 함수(update)
function moveAll(){
	for (var i=0; i<classList.length; i++) {
        classList[i].x += 2;
    }

    for (var i=0; i<classList.length; i++) {
        if (classList[i].x >= 1020) {
            score -= 10;
            classList[i].x = -100;
            classList[i].y = Math.floor(Math.random() * 500) + 30;
            classList[i].text = words_1[Math.floor(Math.random() * words_1.length)];
        }
    }

}

// 게임 요소들을 캔버스에 그리는 함수
function drawAll(){
    context.drawImage(img,0,0);
    context.font = "30px 바탕체";
    
    for (var i=0; i<classList.length; i++) {
        context.fillText(classList[i].text, classList[i].x, classList[i].y);
    }

    context.fillText('점수: ' + score, 880, 650);
}

// 텍스트 입력창에 단어를 입력하고 엔터를 치면 실행되는 함수
function change() {
    var word = document.getElementById("input");

    for (var i=0; i<classList.length; i++) {
        if (word.value == classList[i].text) {
            classList[i].x = -100;
            classList[i].y = Math.floor(Math.random() * 500) + 30;
            score += 10;
            classList[i].text = words_1[Math.floor(Math.random() * words_1.length)];
            break;
        }
    }

    word.value = ''; // 텍스트 입력창은 다시 빈 상태로 돌아감
}
