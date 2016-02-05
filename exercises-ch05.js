var prompt = require ('sync-prompt').prompt;

//////////Flatten
console.log("Flatten: [[2, 4, 6], [8], [10, 12]] ");
var flatten = function(){
	var arr = [[2, 4, 6], [8], [10, 12]]; 

	console.log(arr.reduce(function(a, b){
		return a.concat(b);
	}, []));
}

flatten();



//////////Every and Then Some
console.log("\nEvery and Then Some:");
var every1 = function(){
	console.log("Running every...");
	var arr = [9, 48, 204, 528942];

	var TF = false;
	arr.forEach(function (a){
		if ((a % 3) === 0){
			TF = true; 
		}
	});
	console.log(TF);
}

var some2 = function(){
	console.log("Running some...");
	var arr = ['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'];

	var TF = false;
	arr.forEach(function (a){
		if (a.length === 9){
			TF = true; 
		}
	});
	console.log(TF);	
}

every1();
some2();