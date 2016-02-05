//Eun-Joo Won

//had problems with json website. problem was with stringify (do not need to stringify!)
var prompt = require ('sync-prompt').prompt;
var request = require('request');

//get json info from the url
var importData = function(jsonWeb){
	var jsObject = JSON.parse(jsonWeb);
	return jsObject;
}

//Print out final score of the game based on data
//(reduce)
var finalScore = function(Array){
	var aScore = 0, bScore = 0;
	var aTeamName = Array[0].team;
	var bTeamName = Array[(Array.length - 1)].team;		
	aScore = Array.reduce(function(a, b){
		if(b.team === aTeamName){
			return a + (b.freeThrowsMade +  (2 * (b.fieldGoalsMade - b.threesMade)) + (3 * b.threesMade));
		}
		else{ //spurs score
			return a; //add nothing to it
		}}, 0);
	bScore = Array.reduce(function(a, b){
		if(b.team === bTeamName){
			return a + (b.freeThrowsMade +  (2 * (b.fieldGoalsMade - b.threesMade)) + (3 * b.threesMade));
		}
		else{ //heat score
			return a; //add nothing to it
		}}, 0);	
	console.log("Final Score: "+ aTeamName + " " + aScore + ", " + bTeamName + " " + bScore );

}

//Player with the highest Percentage of points from three pointers
//(filter)
var highPercent = function(Array){
	var filterArray = Array.filter(function(a){
		if ((a.freeThrowsMade + (2 * (a.fieldGoalsMade - a.threesMade)) + (3 * a.threesMade))> 10){
			return a;
		}
	});
	var topInd = 0; //first player
	for (var x = 1; x < filterArray.length; x++){
		var currTop = ((3 * filterArray[topInd].threesMade) / (filterArray[topInd].freeThrowsMade + (2 * (filterArray[topInd].fieldGoalsMade - filterArray[topInd].threesMade)) + (3 * filterArray[topInd].threesMade)));
		var temp = ((3 * filterArray[x].threesMade) / (filterArray[x].freeThrowsMade + (2 * (filterArray[x].fieldGoalsMade - filterArray[x].threesMade)) + (3 * filterArray[x].threesMade)));
		if (temp > currTop){ //new person is higher
			topInd = x;
		}
	}
	console.log("* Player with highest percentage of points from three pointers: " + filterArray[topInd].name);
}

//Team with the most rebounds
//(reduce)
var mostRebounds = function(Array){
	var aReb =0, bReb = 0;
	var aTeamName = Array[0].team;
	var bTeamName = Array[(Array.length - 1)].team;
	aReb = Array.reduce(function(a, b){
		if(b.team === aTeamName){
			return a + (b.offensiveRebounds + b.defensiveRebounds);
		}
		else{ //b team score
			return a; //add nothing to it
		}}, 0);
	bReb = Array.reduce(function(a, b){
		if(b.team !== aTeamName){
			return a + (b.offensiveRebounds + b.defensiveRebounds);
		}
		else{ //a team score
			return a; //add nothing to it
		}}, 0);	
	if (aReb > bReb){
		console.log("* Team with the most rebounds: "+ aTeamName + " with " +  aReb);
	}
	else if (aReb > bReb){
		console.log("* Team with the most rebounds: " + bTeamName + " with " +  bReb);
	}	
	else{
		console.log("* Same number of rebounds");
	}
}

//Non Guard with the most assists
//(filter)
var nonGuardAssist = function(Array){
	var filterNonG = Array.filter(function(a){
		if (a.position !== "g"){
			return a;
		}
	});	
	var topInd = 0; //first player
	for (var x = 1; x < filterNonG.length; x++){
		var currTop = filterNonG[topInd].assists;
		var temp = filterNonG[x].assists;
		if (temp > currTop){ //new person is higher
			topInd = x;
		}
	}
	console.log("* Non guard player with most assists: " + filterNonG[topInd].name + " with " + filterNonG[topInd].assists);	
}

//More turnovers rather than assists
//(forEach)
var moreTurnovers = function(Array){
	console.log("* Players with more turnovers than assists: ");
	Array.forEach(function(a){
		if (a.turnovers > a.assists){
			console.log("   " + a.name);
		}
	});
}


//===================================
var game = function(url, gamenum){
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var jsonWeb = body;
	    var eachPlayer = importData(jsonWeb); //hold array of each players info
	    console.log("====++Game " + gamenum + "++====");
		finalScore(eachPlayer);
		console.log("=====");
		highPercent(eachPlayer);
		mostRebounds(eachPlayer);
		nonGuardAssist (eachPlayer);
		moreTurnovers (eachPlayer);
	  }
	});
}
//===================================

//needed to time it since it took a while for the request
game("http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-06-15-heat-spurs.json", 1);
setTimeout(function(){
	game("http://foureyes.github.io/csci-ua.0480-fall2014-002/homework/02/2014-04-09-thunder-clippers.json", 2);
}, 100);
