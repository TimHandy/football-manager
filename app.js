// 'use strict'

// const pricePerGame = 3			// £
const LATE_TAX = 2	// £/min
let teamA = []
let teamB = []

const demoPlayers = ['Tim Handy', 'Jade Andrews', 'Chris Rollins', 'Leah Andrews', 'Karl Cedeira', 'Misako Cedeira', 'David Beckham', 'Diego Maradonna', 'Jane Doe', 'Damo Connop', 'Sarah Connop']

// Helper functions ############################################################

function back() {
	location.reload();
}

function shuffle(array) {
	//Fisher-Yates (aka Knuth) shuffle
	// Used like so:
	// var arr = [2, 11, 37, 42];
	// arr = shuffle(arr);
	// console.log(arr);

 	let currentIndex = array.length, temporaryValue, randomIndex;

 	// While there remain elements to shuffle...
 	while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
 	}

  return array;
}

function findPlayerByName(firstName, lastName) {
	return footballData.players.find(player => player.firstName === firstName && player.lastName === lastName)
}

function findPlayersBySkillLevel(playersarr, skill) {
	return playersarr.filter(player => player.skillLevel === skill)
}

function justNames(playersArr) {	// this is and example of pure
	return playersArr.map(function(player) {
		return player.firstName + " " + player.lastName
	})
}

function whichTeam(firstName, lastName) {
	let name = firstName + " " + lastName
	console.log(name);
	if ( currentGame().teamA.includes(name) ) {
		return "teamA"
	} else if ( currentGame().teamB.includes(name) ) {
		return "teamB"
	} else {
		return undefined		// TODO what to return here?
	}
}

function currentGame() {
	return footballData.games[footballData.games.length - 1]
}

function consoleLogDb() {
	console.log(JSON.stringify(footballData, null, 2));
}

function toggleNewPlayer() {
	$('.new-player-form').slideToggle(200)
	$('.intro-para').addClass('hidden')
}

function genTestData() {	// Just for testing
	newPlayer('Tim', 'Handy', 'tim@tim.com', 2)
	newPlayer('Jade', 'Andrews', 'jade@jade.com', 1)
	newPlayer('Sarah', 'Connop', 'sarah@sarah.com', 1)
	newPlayer('Jane', 'Doe', 'jane@jane.com', 2)
	newPlayer('Chris', 'Rollins', 'chris@chris.com', 1)
	newPlayer('Diego', 'Maradona', 'diego@diego.com', 3)
	newPlayer('David', 'Beckham', 'becks@becks.com', 3)
	newPlayer('Misako', 'Cedeira', 'misako@mis.com', 1)
	newPlayer('Karl', 'Cedeira', 'karl@cedeira.com', 2)
	newPlayer('Leah', 'Andrews', 'leah@andrews.com', 1)
	newPlayer('Damo', 'Connop', 'damo@wolves.com', 3)

	// generateTeams(demoPlayers, function () {
	// 	generateGame(teamA, teamB)
	// })	// not people from players! these are just fake names

	//location.reload();

	$('.gen-test-data').addClass('hidden')
}

// End Helper functions ########################################################

// Save data to localStorage
function saveData() {
	let str = JSON.stringify(footballData)
	localStorage.setItem("footballData", str)	//setItem and getItem are pretty much all you can do with localStorage
	console.log( JSON.stringify(footballData, null, 2) )
}

// Retrieve data from localStorage
function getData() {
	let str = localStorage.getItem("footballData")
	footballData = JSON.parse(str)
	if (!footballData) {
		footballData = {
			players: [],
			games: []
		}
	}
}

function deleteAllData() {
	localStorage.removeItem('footballData')
	location.reload();
}

function newPlayer(firstName, lastName, email, skillLevel) {
	let obj = {
		created: Date.now(),		// TODO should this be human readable? Probably
		firstName: firstName,		// TODO name and email should be mandatory
		lastName: lastName,			// TODO name and email should be mandatory
		email: email,				// TODO name and email should be mandatory
		active: true,
		skillLevel: skillLevel,				// default to 2
		leagueScore: 0,
		leagueGoalsScored: 0
	}

	// TODO: appears to be a crossover of responsibility between this function and newPlayerForm ? should these be merged? where does the form validation go?
	// TODO: prevent two players with the same first and last name
	// TODO: prevent two players with the same email address

	footballData.players.push(obj)
	$('.intro-para').addClass('hidden')
	saveData()
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

function newPlayerForm() {
	let form = document.getElementById('new-player')
	let firstName = capitalizeFirstLetter(form.fname.value)
	let lastName = capitalizeFirstLetter(form.lname.value)
	let email = form.email.value.toLowerCase()
	let skillLevel = parseInt(form.skill.value)
	// TODO: validations on names and skill entries
		// valid email address
		// email address is mandatory
		// email can't already exist in database
		// valid skill level: integer 1-3
		// skill level is mandatory
		// must have a first name
		// firstname can't be 'first name'
		// firstname is mandatory
		// must have a last name
		// lastname can't be 'last name'
		// lastname is mandatory
		// email address, firstName, and lastname combo can't be in the database

	newPlayer(firstName, lastName, email, skillLevel)

	// TODO notify user of success/fail on adding a new player
}

function retirePlayerToggle(firstName, lastName) {
	let player = findPlayerByName(firstName, lastName)
	if (player.moniesOwed == true) {
		return 'Monies owed is not zero! Unable to retire player'
	} else if (player.active) {
		player.active = false
		player.dateDisabled = Date()
	} else if (!player.active) {
		player.active = true
		delete player.dateDisabled
	}
	saveData()
}

function setSkillLevel(firstName, lastName, skillLevel) {
	// footballData is an object, containing a players key, whose value is an array of player objects.
	var player = findPlayerByName(firstName, lastName)
	if (player) {
		player.skillLevel = skillLevel
	} else {
		console.log('Player does not exist')
	}
	saveData()
}

function updateMoniesOwed(firstName, lastName, currencyValue) { // Can be plus or minus £/$
	// update footballData moniesOwed field

	findPlayerByName(firstName, lastName).moniesOwed += currencyValue
	saveData()
}

// function newSeason() {
// 	// Archive off this season's data (previousGameStats and footballData to another file) then wipe
// 	// Create a new localStorage entry and copy all data to that one
// 	// This seasons data, including all stats, but leaving players and moniesOwed (reset their scores)
// }

// function newFixture() {
// 	// Generate a new game date for the calendar and maybe email the 'active' status players
// }


// TODO: appears to be a lot of firstName, lastName being passed around... can I fix that???

// Pre-game ####################################################################
function playerLate(firstName, lastName, minutesLate) {
	let tax = LATE_TAX * minutesLate;

	player = findPlayerByName(firstName, lastName)
	player.moniesOwed += tax
	// later could have the app do the time keeping, and generate the mins late from the time of the game start?
}

function displayAvailablePlayers() {
	// generate an li for each player in players
	let players = justNames(footballData.players).sort()	// ['Tim Handy', 'Jade Andrews']
	let list = $('#select-players ul')
	$(list).html("")
	players.forEach(function(player) {
		$(list).append('<li><input type="checkbox" name="player" value="' + player + '">' + player + '</li>')
	})
	$('.intro-para').addClass('hidden')
	// TODO append in name order
}

let chosenPlayers = []	// TODO dirty global variable, refactor to remove
function choosePlayers() {
	var players = document.getElementsByName('player')
	players = Array.prototype.slice.call(players)
	for (var i = 0; i < players.length; i++) {		// TODO dirty for loop, use filter instead
		if (players[i].checked) {
			chosenPlayers.push(players[i])
		}
	}

	chosenPlayers = chosenPlayers.map(function(player) {
		return player.value
	}).map(function(player) {
		return findPlayerByName(player.split(' ')[0], player.split(' ')[1])
	})
	return chosenPlayers  // TODO not sure I need to return this right now, as the function sets the var chosenPlayers. Dirty. make other functions use this function as a return expression.
}


function generateTeams(chosenPlayers, callback) {  // pass in an array of player OBJECTS... callback is used in genTestData
	teamA = [];
	teamB = [];
	let players = chosenPlayers.slice(0)		// make a copy of chosenPlayers  ['Tim Handy', 'Jade Andrews']

	let threeStarPlayers = shuffle( justNames( findPlayersBySkillLevel(players, 3) ) )  // ['David Beckham', 'Diego Maradonna']. TODO Think I've just created objects (choosePlayers) from strings and then back again to strings in here!
	let twoStarPlayers = shuffle( justNames( findPlayersBySkillLevel(players, 2) ) )
	let oneStarPlayers = shuffle( justNames( findPlayersBySkillLevel(players, 1) ) )

	let lineUp = threeStarPlayers.concat(twoStarPlayers, oneStarPlayers)
	console.log(lineUp)	// ["David Beckham", "Diego Maradonna", "Damo Connop", "Tim Handy", "Jane Doe", "Karl Cedeira", "Chris Rollins", "Jade Andrews", "Leah Andrews"]

	while (lineUp.length > 0) {
		teamA.push( lineUp.pop() )
		teamB.push( lineUp.pop() )	// TODO does this need to be a callback so that it does it in order?
	}

	teamB = teamB.filter(Boolean)	// remove an 'undefined' from teamB if uneven number of players.

	if (teamA.length !== teamB.length) {	// aid in evening up teams if uneven number of skillLevel 3 players
		teamB.unshift( teamA.shift() )		// moves a skillLevel 1 player from team A to team B
	}

	if (callback) {
		callback()
	}

	console.log(teamA)
	console.log(teamB)

	$('#team-a').html(teamA.map(function(name) {
		return name + ', '		// TODO don't want a comma if it's the last element! maybe a for loop while i < arr.length -1 might do it.
	}))
	$('#team-b').html(teamB.map(function(name) {
		return name + ', '
	}))
	$('.intro-para').addClass('hidden')
	$('.generate-teams').addClass('hidden')
	$('.kickoff').removeClass('hidden')
	$('.players').removeClass('hidden')
	$('.select-players').addClass('hidden')
	$('.new-player').addClass('hidden')

	// saveData()

	// TODO: validate the generateTeams button, there must be > 1 players selected
}

function wrapperforGenerateTeams() {	//TODO this is shitty having to make a wrapper.
	// choosePlayers()
	generateTeams(choosePlayers())
}




// Game-time  ##################################################################

function kickOff() {
	generateGame(teamA, teamB)
	populatePlayerDropdown(teamA.concat(teamB))
	$('.game-date').html(currentGame().date)
	$('.game-date').removeClass('hidden')
	$('.game').removeClass('hidden')
	$('.goal').removeClass('hidden')
	$('.final-whistle').removeClass('hidden')
	$('.kickoff').addClass('hidden')
	$('.generate-teams').addClass('hidden')
	$('.delete-game').removeClass('hidden')
}

function populatePlayerDropdown(playerNamesArr) {		// FIXME dropdown names are lost on refresh. this should be recovered from state instead of chosenPlayers. teamA and teamB store these names.
	let players = playerNamesArr
	let list = $('#dropdown-options')
	$(list).html("<option>Player Name</option>")
	players.forEach(function(player) {
		$(list).append('<option>' + player + '</option>')
	})

	// TODO seems to be a lot going on with variables of chosenPlayers without being saved to storage, maybe chosen players should be stored early on?
}

function generateGame(teamA, teamB) {
	let game = {
		date: Date(),
		teamA: teamA,		// ['Tim Handy', 'Karl Cedeira']
		teamB: teamB,		// ['Jade Andrews', 'Sarah Connop']
		teamAScore: 0,
		teamBScore: 0,
		scorers: [],	// ['Tim Handy', 'Jade Andrews', 'Karl Cedeira']  order in which goals were scored
		endTime: undefined   // TODO: undefined or null?? which is most appropriate?
	}

	footballData.games.push(game)
	saveData()
}

function goalButton() {
	let dropdown = document.getElementById( 'dropdown-options' );
	let player = dropdown.options[ dropdown.selectedIndex ].value
	let firstName = player.split(' ')[0]
	let lastName = player.split(' ')[1]
	goalScored(firstName, lastName)
}


function goalScored(firstName, lastName) {
	if ( !currentGame().endTime ) {
		currentGame().scorers.push(firstName + " " + lastName)
		console.log('Scorer: ' + firstName + " " + lastName + ' added')
		updatePlayerLeagueGoalsScored(firstName, lastName, 1)	// should only be added at final whistle in case game is cancelled
		updateGameScore(firstName, lastName)
		$('.team-a-score').html(currentGame().teamAScore)
		$('.team-b-score').html(currentGame().teamBScore)
		saveData()
	} else {
		console.log('game has already ended')
	}


	let player = document.forms.goal.goalscorer.value   // TODO unfinished! need to get the player from the dropdown and modify the goalScored function above to use it.

}

function updateGameScore(firstName, lastName) {
	if ( whichTeam(firstName, lastName) === 'teamA' ) {
		currentGame().teamAScore += 1
	} else if ( whichTeam(firstName, lastName) === 'teamB' ) {
		currentGame().teamBScore += 1
	} else {
		console.log('player not on either team?')
	}
}

function updatePlayerLeagueGoalsScored(firstName, lastName, goalsScored) {
	let player = findPlayerByName(firstName, lastName)
	console.log(player)
	player.leagueGoalsScored ? player.leagueGoalsScored += 1 : player.leagueGoalsScored = goalsScored  // need a ternary because it wouldn't += on a null or missing key
	saveData()
	// TODO: this should only be added at final whistle, in case game is cancelled
}

function assignWinningPoints() {		// TODO: Looks ripe for refactoring
	// if draw
	if ( currentGame().endTime ) {
		if (currentGame().teamAScore === currentGame().teamBScore ) {
			// each player on both sides gets 2 leagueScore point
			for (let i = 0; i < currentGame().teamA.length; i++) {
				let name = currentGame().teamA[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 2)
			}
			for (let i = 0; i < currentGame().teamB.length; i++) {
				let name = currentGame().teamB[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 2)
			}
		// if teamA won
		} else if (currentGame().teamAScore > currentGame().teamBScore) {
			for (let i = 0; i < currentGame().teamA.length; i++) {
				let name = currentGame().teamA[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 3)
			}
			for (let i = 0; i < currentGame().teamB.length; i++) {
				let name = currentGame().teamB[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 1)
			}
			// if teamB won
		} else if (currentGame().teamAScore < currentGame().teamBScore) {
			for (let i = 0; i < currentGame().teamA.length; i++) {
				let name = currentGame().teamA[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 1)
			}
			for (let i = 0; i < currentGame().teamB.length; i++) {
				let name = currentGame().teamB[i].split(' ')
				let firstName = name[0]
				let lastName = name[1]
				updatePlayerLeagueScore(firstName, lastName, 3)
			}
		}
	} else {
		console.log("game end time not set")
	}

}

function updatePlayerLeagueScore(firstName, lastName, points) {
	let player = findPlayerByName(firstName, lastName)
	if (player.leagueScore) {	// TODO try with a ternary now it's working
		player.leagueScore += points
	} else {
		player.leagueScore = points
	}
	saveData()
}

function finalWhistle() {
	setGameEndTime()
	assignWinningPoints()
	$('.final-score').removeClass('hidden')
	$('.final-score p:nth-of-type(1)').html("Team A: " + currentGame().teamAScore)
	$('.final-score p:nth-of-type(2)').html("Team B: " + currentGame().teamBScore)
	$('.final-score p:nth-of-type(2)').append("<p>Scorers: " + currentGame().scorers + "</p>")
	$('.goal').addClass('hidden')
	$('.final-whistle').addClass('hidden')
	$('.game').addClass('hidden')
	$('.delete-game').addClass('hidden')

	// Output match stats to display? Winning team (goals scored in game)
	// Output top goal scorer
	// update each Player's stats from teamAScorers/teamBScorers to footballData leagueGoalsScored if they scored. 1 point for each goal
	// leagueScore - for each Players add to their individual footballData stats 3 for a win, 2 for a draw, 1 for a loss
	// add gameStats to previousGameStats and store back in DB
	// clear gameStats
}

function setGameEndTime() {
	// update latest game's endTime to determine whether game complete or not.
	currentGame().endTime = Date()
	saveData()
}

function deleteCurrentGame() {
	footballData.games.splice(-1, 1)
	location.reload();		// <= this is a page reload
	saveData()
	// TODO: this should remove any scores added to players scores
}



// Game stats functions ########################################################

function latestGameStats() {
	console.log(`Date: ${currentGame().date}`)
	console.log(`Team A: ${currentGame().teamAScore}`)
	console.log(`Team B: ${currentGame().teamBScore}`)
	console.log(`Scorers: ${currentGame().scorers}`)
	console.log(`Team A Players: ${currentGame().teamA}`)
	console.log(`Team B Players: ${currentGame().teamB}`)
}

// function displayLeagueStats(footballData) {
// 	// Leaderboard of active players, by leagueScore. If tie, by leagueGoalsScored/forfeit score?
// 	// Games attended
// 	// For manager: highlight low skill level but high score... indicator of incorrect skill score?
// 	// Scores are emailed out to all active players.
// }

function displayRawData() {
	document.write( localStorage.getItem('footballData') );
}



// If database is present and game ongoing, i.e. no endTime, restore previous gamestate


$(document).ready(function(){

	if ( localStorage.getItem('footballData') == null ) {
		$('.gen-test-data').removeClass('hidden')
	} else {
		$('.gen-test-data').addClass('hidden')
	}

    getData()

	// TODO make this into a 'recover state' type function that can be called in several places.
	if ( localStorage.getItem('footballData') && currentGame() &&    !currentGame().hasOwnProperty('endTime') ) {
		$('body p:first').addClass('hidden')		// TODO: this is a lot of jquery... might want to combine some of this into divs?
		$('.intro-para').addClass('hidden')
		$('.game-date').html(currentGame().date)
		$('.game-date').removeClass('hidden')
		$('.players').removeClass('hidden')
		$('.select-players').addClass('hidden')
		$('.new-player').addClass('hidden')
		$('.game span').html(currentGame().date)
		$('.game').removeClass('hidden')
		$('.goal').removeClass('hidden')
		$('.final-whistle').removeClass('hidden')
		$('.kickoff').addClass('hidden')
		$('.generate-teams').addClass('hidden')
		$('#team-a').html(currentGame().teamA.map(function(name) {
			return name + ', '
		}))
		$('#team-b').html(currentGame().teamB.map(function(name) {
			return name + ', '
		}))
		$('.team-a-score').html(currentGame().teamAScore)
		$('.team-b-score').html(currentGame().teamBScore)
		$('.delete-game').removeClass('hidden')
		populatePlayerDropdown( currentGame().teamA.concat(currentGame().teamB) )
	} else {
		//$('.gen-test-data').removeClass('hidden')
	}

});


// TODO: allow adding a player once game is in progress. late players? maybe a dropdown of remaining unchosen players displayed whilst game is in progress.

// Data storage format:
// footballData = {
//   "players": [			// array of objects, so can iterate through the array of objects
//     {
//       "created": 1476284285984,
//       "firstName": "Tim",
//       "lastName": "Handy",
//       "email": "tim@tim.com",
//       "active": true,
//       "skillLevel": 2,
//       "moniesOwed": 10,
//		 "leagueScore": 0,
//       "leagueGoalsScored": 5
//     },
//   ],
//   "games": [
//     {
//       "date": "Wed Oct 12 2016 15:58:05 GMT+0100 (BST)",
//       "teamA": [
//         "Jane Doe",
//         "David Beckham",
//         "Leah Andrews",
//         "Tim Handy",
//         "Diego Maradonna",
//         "Misako Cedeira"
//       ],
//       "teamB": [
//         "Chris Rollins",
//         "John Doe",
//         "Joe Bloggs",
//         "Jade Andrews",
//         "Karl Cedeira"
//       ],
//       "teamAScore": 2,
//       "teamBScore": 1,
//       "scorers": [
//         "Dave Jones",
//         "Jade Andrews",
//         "Jade Andrews",
//         "Karl Cedeira",
//         "Tim Handy",
//         "Tim Handy",
//         "Tim Handy",
//         "Chris Rollins"
//       ],
//       "endTime": null
//     }
//   ]
// }

// const previousGameStats = [
//
// 	// All prior season's game stats saved here in a file?
// 	// Read from file? and back to file?
// ];

// GUI click handler interface:
// newPlayer();			// Add a player to the database
//
// editPlayer();			// Edit an existing player
//
// playerLate();			// Set how many minutes late the player was
//
// retirePlayerToggle();			// Set a player account as disabled
//
// newFixture();			// Create an upcoming game in the schedule. Could generate a yes/no email to all 'active' players.
//
// setPlayersOnPitch();	// Select all players that are in attendance
//
// generateTeams();		// Randomly selects even teams based on skill level. Only do this just before game.
// printTeams();			// Output teams somehow, maybe to the screen
//
// kickOff();				// Creates the gameStats object
//
// goalScored();			// Record a goal. Not sure how to do the players.... drop down selector somehow?
//
// finalWhistle();			// Sorts out final game stats and stores data back to footballData and previousGameStats objects. Saves data somewhere
//
// displayLeagueStats();	// Display current player league stats
//
// updateMoniesOwed();		// Update a money owed by the player
//
// newSeason();			// Archive off this season's data to another file and wipe this seasons data


// learn testing: mocha
//
// don't do assertion libraries (eg. chai) yet!
//
// use the node.js built in assert library. require asserts.
//
// testing math.random. pass in a seed value. google seeded random generator.
