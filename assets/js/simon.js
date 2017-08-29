var start = $("#start");
var strict = $(".strict");
var greenInp = $('#sGreen');
var redInp = $('#sRed');
var yellowInp = $('#sYellow');
var blueInp = $('#sBlue');
var countCon = $("#countCon");
var counter = $('#count');
var audioG = document.querySelector("#gAudio");
var audioR = document.querySelector("#rAudio") ;
var audioY = document.querySelector("#yAudio");
var audioB = document.querySelector("#bAudio");
var audioArray = [audioG,audioR,audioY,audioB];
var inputArray = [greenInp, redInp, yellowInp, blueInp];
var count = 0;
var strictStatus = 0;
var sequenceArray = [];
var randomChoicesArray = [];
var playerChoicesArray = [];

function startGame() {
	start.on("click", function() {
		start.off("click");
		resetGame()
		setTimeout(function() {
			return playGame()
		},1000);
	});
}

function strictBtn() {
strict.on("click", function() {
	strict.toggleClass('strictE');
		if (strictStatus === 0) {			
			strictStatus = 1;
		} else {
			strictStatus = 0;
		}
	});
}

function randomIndex() {
	return Math.floor(Math.random() * inputArray.length);
}

function playGame() {
	if (count === 20) {
		resetGame();
		return gameWon();
	}
	var randomInd = randomIndex();
	sequenceArray.push(inputArray[randomInd]);
	randomChoicesArray.push(randomInd);
	return animate(sequenceArray);
}

function animate(sequence){
		counter.text(count + 1);
		countCon.text('ROUND');
    var i = 0;
    var interval = setInterval(function () {
    	chooseSound(sequence[i])
      chooseColor(sequence[i]);
      i++;
      if(i >= sequenceArray.length){
        clearInterval(interval);
        playerChoices();
      }
    }, 1400);
}

function chooseColor(input) {
	if (input === greenInp) {
		var color = 'gHighlight';
		colorTimeout(input, color);
	} else if (input === redInp) {
		var color = "rHighlight";
		colorTimeout(input, color);
	} else if (input === yellowInp) {
		var color = "yHighlight";
		colorTimeout(input, color);
	} else if (input === blueInp) {
		var color = "bHighlight";
		colorTimeout(input, color);
	} 

}

function colorTimeout(input, color) {
		input.toggleClass(color);	
		setTimeout(function() {
		input.toggleClass(color);
		},800);
}

function chooseSound(sequence) {
	if (sequence === greenInp) {
		audioG.play();
	} else if (sequence === redInp) {
		audioR.play();
	} else if (sequence === yellowInp) {
		audioY.play();
	} else if (sequence === blueInp) {
		audioB.play();
	}
}

function playerChoices() {
	for (let i =0; i < inputArray.length; i++) {
		inputArray[i].on("click", function() {
		if (playerChoicesArray.length <= sequenceArray.length ) {
			audioArray[i].play();
			playerChoicesArray.push(i);
			playerCheck();
		} 
		});
	}
}
	
function playerChoicesOff() {
	for (let i =0; i < inputArray.length; i++) {
		inputArray[i].off("click");
	} 
}

function playerCheck() {
	playerChoicesOff();
	for (var i=0; i < playerChoicesArray.length; i++) {
		if (strictStatus === 0) {
			if (playerChoicesArray[i] !== randomChoicesArray[i]) {
				playerChoicesArray = [];
				return noStrictGame();
				}
		} else if (strictStatus === 1) {
				if (playerChoicesArray[i] !== randomChoicesArray[i]) {
					resetGame();
					return strictGame();
				}
		}
	}
	if (randomChoicesArray.length === playerChoicesArray.length) {
		playerChoicesArray = [];
		count++;
		counter.text(count).delay(400).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(400);
		playGame();
	} else {
		playerChoices();
	}	
}

function resetGame() {
	playerChoicesOff();
	count = 0;
	randomChoicesArray = [];
	playerChoicesArray = [];
	sequenceArray = [];
	startGame();
}
	
function noStrictGame() {
	counter.text("");
	countCon.text("WRONG!").delay(400).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(400);
	setTimeout(function() {
		return animate(sequenceArray);
	}, 5000);
}

function strictGame() {
	counter.text("")
	countCon.text("WRONG!").delay(400).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(400);
	setTimeout(function() {
		return playGame();
	}, 5000);
}

function gameWon() {
	counter.text("")
	countCon.text("WINNER!").delay(400).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(400);
	setTimeout(function() {
		return playGame();
	}, 5000);
}
strictBtn();
startGame();






