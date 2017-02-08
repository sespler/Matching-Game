var tiles = document.querySelectorAll(".tile");
var messageDisplay = document.querySelector("h1");
var restartButton = document.querySelector("h3");
var clickCount = 0;


//set function for deleting classes after two clicks
var funcVar;
function runTimeOut(){
	funcVar = setTimeout(removeClasses, 1500);
}

// remove the classes from the tiles
function removeClasses(){
	if(clickCount >= 2){
		checkForMatch();
		for(var i = 0; i < tiles.length; i++){
			tiles[i].classList.remove("match1");
			tiles[i].classList.remove("match2");
		}
		// set click back to 0
		clickCount = 0;
	}
}

//set the match variables
var match1 = Math.floor(Math.random() * 2).toString;
var match2;
if(match1 == 1){
	match2 = "2";
} else {
	match2 = "1";
}

// assign each tile a random number value 
var tileNumbers = ["one", "two", "three", "four"];
for(var i = 0; i < tiles.length; i++){
	var num = Math.floor(Math.random() * tileNumbers.length);
	tiles[i].classList.add(tileNumbers[num]);
	tileNumbers.splice(num, 1);
}

// the list that the clicked tiles are added to to check if you matched them
var winList =[];
// put all the even numbers into list and same with odd
var evenTiles = [];
var oddTiles = [];
oddTiles.push(document.querySelector(".one"));
evenTiles.push(document.querySelector(".two"));
oddTiles.push(document.querySelector(".three"));
evenTiles.push(document.querySelector(".four"));

// all the even tiles get a "match1" class on a click
for(var i = 0; i < evenTiles.length; i++){
	evenTiles[i].addEventListener("click", function(){
			this.classList.add("match1");
			clickCount++;
			runTimeOut();
			winList.push(this);
	})
}

// all the odd tiles get a "match2" class
for(var i = 0; i < oddTiles.length; i++){
	oddTiles[i].addEventListener("click", function(){
			this.classList.add("match2");
			clickCount++;
			runTimeOut();
			winList.push(this);	
	})
}

// check to see if the ones you clicked are the same
function checkForMatch(){
	if(winList[0].classList[2] == winList[1].classList[2]){
		console.log("nice");
		onMatch();
		winList.splice(winList[0], 2);
		checkForWin();
	} else {
		console.log("nope");
		winList.splice(winList[0], 2);
	}
}

// add won class to matching tiles to make them dissapear
function onMatch(){
	for(var i = 0; i < winList.length; i++){
		winList[i].classList.add("won");
	}
}


// check for a win function and do stuff
function checkForWin(){
	var result;
	for(var i = 0; i < tiles.length; i++){
		// if all the tiles have "won" class 
		if(tiles[i].classList[2] === "won"){
			result = true;
		}
	}
	// change message to gratz
	if(result){
		// after you win send a message 
		messageDisplay.innerHTML = "Congratulations!";
		restartButton.innerHTML = "Click to restart";
	}
}

// restart button on contragts thing
restartButton.addEventListener("click", function(){
	location.reload();
})
