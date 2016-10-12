// 'use strict'

// const pricePerGame = 3			// £
const LATE_TAX = 2				// £/min
let teamA = []
let teamB = []

const demoPlayers = ['Tim Handy', 'Jade Andrews', 'Chris Rollins', 'Leah Andrews', 'Karl Cedeira', 'Misako Cedeira', 'David Beckham', 'Diego Maradonna', 'Jane Doe', 'Damo Connop', 'Sarah Connop']

// Save data to localStorage
function saveData() {
	let str = JSON.stringify(footballData)
	localStorage.setItem("footballData", str)
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

// Just for testing
function genTestData() {
	newPlayer('Tim', 'Handy', 'tim@tim.com')
	newPlayer('Jade', 'Andrews', 'jade@jade.com')
	newPlayer('Sarah', 'Connop', 'sarah@sarah.com')
	newPlayer('Jane', 'Doe', 'jane@jane.com')
	newPlayer('Chris', 'Rollins', 'chris@chris.com')
	newPlayer('Diego', 'Maradonna', 'diego@diego.com')
	newPlayer('David', 'Beckham', 'becks@becks.com')
	newPlayer('Misako', 'Cedeira', 'misako@mis.com')
	newPlayer('Karl', 'Cedeira', 'karl@cedeira.com')
	newPlayer('Leah', 'Andrews', 'leah@andrews.com')
	newPlayer('Damo', 'Connop', 'damo@wolves.com')

	generateTeams(demoPlayers, function () {
		generateGame(teamA, teamB)
	})	// not people from players! these are just fake names
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

function newPlayer(firstName, lastName, email) {
	let obj = {
		created: Date.now(),		// TODO should this be human readable? Probably
		firstName: firstName,		// TODO name and email should be mandatory
		lastName: lastName,			// TODO name and email should be mandatory
		email: email,				// TODO name and email should be mandatory
		active: true,
		skillLevel: 2,				// default to 2
		leagueScore: 0,
		leagueGoalsScored: 0
	}

	// TODO: prevent two players with the same first and last name
	// TODO: prevent two players with the same email address

	footballData.players.push(obj)
	saveData()
}

// function retirePlayerToggle(player) {
// 	// Set player as inactive in footballData, add the date player was disabled (could be useful later for getting rid of old player data)
// 	// Can't set to inactive unless moniesOwed = 0
//
// 	// locate player
// 	// if (active === true)
// 		// player.active = date.now()
// 		// else player.active = true
// 	saveData()
// }

// function editPlayer( player ) {
// 	// Edit player details stored in footballData
// 	// Need a player details display page for this?
//
// 	saveData()
// }

function findPlayerByName(firstName, lastName) {
	return footballData.players.find(player => player.firstName === firstName && player.lastName === lastName)
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

// function displayLeagueStats(footballData) {
// 	// Leaderboard of active players, by leagueScore. If tie, by leagueGoalsScored/forfeit score?
// 	// Games attended
// 	// For manager: highlight low skill level but high score... indicator of incorrect skill score?
// 	// Scores are emailed out to all active players.
// }

function deleteAllData() {
	localStorage.removeItem('footballData')
}

function setPlayersOnPitch(players) {	// array of players in attendance
	// Manager selects players in attendance before generateTeams can run, a list of players and tickboxes with a save button?
	// create playersOnPitch array	- updateForfeit() to set the forfeit as paid etc. addForfeit(num) minusForfeit(num)
}

function playerLate(firstName, lastName, minutesLate) {
	let tax = LATE_TAX * minutesLate;

	player = findPlayerByName(firstName, lastName)
	player.moniesOwed += tax
	// later could have the app do the time keeping, and generate the mins late from the time of the game start?
}



function generateTeams(playersOnPitch, callback) {  // array of players... callback is used in genTestData
	teamA = [];
	teamB = [];
	let players = playersOnPitch.slice(0)		// make a copy of playersOnPitch

	players = shuffle(players)				// shuffle players array

	while (players.length > 0) {
		teamA.push( players.pop() )
		teamB.push( players.pop() )
	}

	teamB = teamB.filter(Boolean)	// remove an 'undefined' from teamB if uneven number of players.

	if (callback) {
		callback()
	}

	console.log(teamA)
	console.log(teamB)

	saveData()

	// let count = 0
	// for (i = 0; i < playersOnPitch.length; i++) {
	// 	teamA.push(playersOnPitch[count])
	// 	count += 1
	// 	teamB.push(playersOnPitch[count])
	// 	count += 1
	// }

	// If setPlayersOnPitch has been created, select evenly matched teams by ability and playersOnPitch
	// Check if teams are evenly matched, difference of players should be +1, -1 or equal players. skill score totals should be almost the same.
	// Each week the teams should be different - the above should sort this? maybe need to randomise the three skill arrs.
	// Create a random(where skill=3) to pick from a single array of players... this might be better idea actually.
	// return array of two team arrays?
	// what if players turn up during the game? How to add them evenly to a team?
}

// function randomPlayer(playersOnPitch, skillLevel) {
// 	// Return a random player of specified skill level from playersOnPitch for purpose of generating even teams.
// }

// function printTeams(teamA, teamB) {
// 	// Outputs to a file/screen teamA and teamB?
// }

function generateGame(teamA, teamB) {
	let game = {
		date: Date(),
		teamA: teamA,		// ['Tim Handy', 'Karl Cedeira']
		teamB: teamB,		// ['Jade Andrews', 'Sarah Connop']
		teamAScore: 0,
		teamBScore: 0,
		scorers: [],	// ['Tim Handy', 'Jade Andrews', 'Karl Cedeira']  order in which goals were scored
		endTime: undefined
	}

	footballData.games.push(game)
	saveData()
}

function kickOff() {
	// any use?
}

function updatePlayerLeagueGoalsScored(firstName, lastName, goalsScored) {
	let player = findPlayerByName(firstName, lastName)
	console.log(player)
	player.leagueGoalsScored ? player.leagueGoalsScored += 1 : player.leagueGoalsScored = goalsScored  // need a ternary because it wouldn't += on a null or missing key
	saveData()
}

function whichTeam(firstName, lastName) {
	let name = firstName + " " + lastName
	console.log(name);
	if ( currentGame().teamA.includes(name) ) {
		return "teamA"
	} else if ( currentGame().teamB.includes(name) ) {
		return "teamB"
	} else {
		return undefined		// what to return here?
	}
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

function goalScored(firstName, lastName) {
	// Add/update teamAScorers/teamBScorers, teamAScore
	if ( !currentGame().endTime ) {
		currentGame().scorers.push(firstName + " " + lastName)
		console.log('Scorer: ' + firstName + " " + lastName + ' added')
		updatePlayerLeagueGoalsScored(firstName, lastName, 1)
		updateGameScore(firstName, lastName)
		saveData()
	} else {
		console.log('game has already ended')
	}
}

function currentGame() {
	return footballData.games[footballData.games.length - 1]
}

function updatePlayerLeagueScore(firstName, lastName, points) {
	let player = findPlayerByName(firstName, lastName)
	if (player.leagueScore) {
		player.leagueScore += points
	} else {
		player.leagueScore = points
	}
	saveData()
}

function assignWinningPoints() {
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

// update latest game's endTime to determine whether game complete or not.
function setGameEndTime() {
	currentGame().endTime = Date()
	saveData()
}

function finalWhistle() {
	setGameEndTime()

	// Output match stats to display? Winning team (goals scored in game)
	// Output top goal scorer
	// update each Player's stats from teamAScorers/teamBScorers to footballData leagueGoalsScored if they scored. 1 point for each goal
	// leagueScore - for each Players add to their individual footballData stats 3 for a win, 2 for a draw, 1 for a loss
	// add gameStats to previousGameStats and store back in DB
	// clear gameStats
}


function latestGameStats() {
	console.log(`Date: ${currentGame().date}`)
	console.log(`Team A: ${currentGame().teamAScore}`)
	console.log(`Team B: ${currentGame().teamBScore}`)
	console.log(`Scorers: ${currentGame().scorers}`)
	console.log(`Team A Players: ${currentGame().teamA}`)
	console.log(`Team B Players: ${currentGame().teamB}`)
}


getData()

// footballData = {
//   "players": [
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




// could be stored in localstorage, on the device.
//
// learn testing: mocha
//
// don't do assertion libraries (eg. chai) yet!
//
// use the node.js built in assert library. require asserts.
//
// testing math.random. pass in a seed value. google seeeded random generator.
