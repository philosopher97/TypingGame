var canvas;
var context;

var x = 0;
var y = 30;

var text = "안녕";

var score = 0;

var words_1 = ["안녕", "일곱시", "샤워", "철학", "학교", "공부", "프로그래밍"];

var img= new Image();
img.src="images/bg.jpg";

var x2 = -400;
var y2 = 300;
var text2 = "일곱시"

function loaded(){
	canvas= document.getElementById('canvas');
	context= canvas.getContext('2d');

	runGame(); //게임을 진행하는 함수
	//10ms 마다 runGame()를 다시 호출
	setInterval(runGame,10); //1초에 100번 호출
}

function runGame(){
	moveAll(); //캐릭터 움직이기
	drawAll(); // 이미지들 그리기
}

function moveAll(){
	x += 2;

    if (x >= 1020) {
        score -= 10;
        x = -100;
        y = Math.floor(Math.random() * 500) + 30;
        text = words_1[Math.floor(Math.random() * words_1.length)];
    }

    x2 += 2;

    if (x2 >= 1020) {
        score -= 10;
        x2 = -500;
        y2 = Math.floor(Math.random() * 500) + 30;
        text2 = words_1[Math.floor(Math.random() * words_1.length)];
    }
	
}
function drawAll(){
    context.drawImage(img,0,0);
    context.font = "30px 바탕체";
    context.fillText(text, x, y);

    context.fillText(text2, x2, y2);

    context.fillText('점수: ' + score, 880, 650);
}

function change() {
    var word = document.getElementById("input");

    if (word.value == text) {
        x = -100;
        y = Math.floor(Math.random() * 500) + 30;
        score += 10;
        text = words_1[Math.floor(Math.random() * words_1.length)];
    }

    else if (word.value == text2) {
        x2 = -100;
        y2 = Math.floor(Math.random() * 500) + 30;
        score += 10;
        text2 = words_1[Math.floor(Math.random() * words_1.length)];
    }

    word.value = '';
}