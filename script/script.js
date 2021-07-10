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

        this.img= new Image();
        this.img.src="images/obj_0.png";

        this.imgNumber = 0;

        this.animationTool = 0;
    }

    animation() {
        if (this.animationTool >= 1) {
            this.img.src = "images/obj_" + this.imgNumber + ".png";
            if (this.imgNumber < 3) {
                this.imgNumber += 1;
            }
            else if (this.imgNumber == 3) {
                this.imgNumber = 0;
            }

            this.animationTool = 0;
        }
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
//img.src="images/bg.jpg";

var img2 = new Image();
img.src = "images/background1.png";
img2.src = "images/background2.png";
ix = 0;
iy = 0;
i2x = 1020;
i2y = 0;

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

    for (var i=0; i<classList.length; i++) {
        classList[i].animationTool += 0.1;
    }

    for (var i=0; i<classList.length; i++) {
        classList[i].animation();
    }

    ix--;
    i2x--;
    if (ix<=-740) {
        ix = 1020;
    }
    if (i2x<=-740) {
        i2x = 1020;
    }
}

// 게임 요소들을 캔버스에 그리는 함수
function drawAll(){
    context.clearRect(0, 0, 1020, 680);
    context.drawImage(img,ix,iy);
    context.drawImage(img2,i2x,i2y);
    context.font = "30px 바탕체";
    
    for (var i=0; i<classList.length; i++) {
        context.fillText(classList[i].text, classList[i].x, classList[i].y);
    }

    for (var i=0; i<classList.length; i++) {
        context.drawImage(classList[i].img, classList[i].x, classList[i].y, 100, 100);
    }

    context.fillText('점수: ' + score, 880, 650);
}

// 텍스트 입력창에 단어를 입력하고 엔터를 치면 실행되는 함수
function change() {
    var word = document.getElementById("input");

    var max = 0; // 단어들의 x좌표값중 제일 최댓값을 저장하는 변수
    var target;  // 제일 큰 x좌표값을 가진 단어 자체를 저장하는 변수

    for (var i=0; i<classList.length; i++) {
        if (word.value == classList[i].text) {
            
            if (classList[i].x >= max) {
                max = classList[i].x;
                target = classList[i];
            }
            
        }
    }

    target.x = -100;
    target.y = Math.floor(Math.random() * 500) + 30;
    score += 10;
    target.text = words_1[Math.floor(Math.random() * words_1.length)];

    word.value = ''; // 텍스트 입력창은 다시 빈 상태로 돌아감
}

function Hover() {
    var x = document.getElementById("newGame");
    x.src = "images/newGame_on.png";
}

function Leave() {
    var x = document.getElementById("newGame");
    x.src = "images/newGame_off.png";
}

function Click() {
    var x = document.getElementById("main");
    x.style.display = "none";
    var y = document.getElementById("game");
    y.style.display = "block";
    var z = document.getElementById("textbox");
    z.style.display = "block";
    loaded();
}