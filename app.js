'use strict'

let fs = require( 'fs' );

const pricePerGame = 3			// £
const lateTax = 1				// £/min

function newPlayer( name, email ) {
	// Check for player name and add/error based on name
	// maybe add skillLevel if known, or default to 2
	// name and email are mandatory
}

function retirePlayer( player ) {
	// Set player as inactive in playerStats, add the date player was disabled (could be useful later for getting rid of old player data)
	// Can't set to inactive unless moniesOwed = 0
}

function editPlayer( player ) {
	// Edit player details stored in playerStats
}

function setSkillLevel( player, num ) {
	// Set player skill level
}

function updateMoniesOwed( player, pounds ) { // Can be plus or minus
	// update playerStats moniesOwed field
}

function newSeason() {
	// Archive off this season's data (previousGameStats and playerStats to another file) then wipe
	// This seasons data, including all stats, but leaving players and moniesOwed (reset their scores)
}

function newFixture() {
	// Generate a new game date for the calendar and maybe email the 'active' status players
}

function displayLeagueStats( playerStats ) {
	// Leaderboard of active players, by leagueScore. If tie, by leagueGoalsScored/forfeit score?
	// Games attended
	// For manager: highlight low skill level but high score... indicator of incorrect skill score?
	// Scores are emailed out to all active players.
}

function setPlayersOnPitch() {
	// Manager selects players in attendance before generateTeams can run, a list of players and tickboxes with a save button?
	// create playersOnPitch array	- updateForfeit() to set the forfeit as paid etc. addForfeit(num) minusForfeit(num)
}

function playerLate( min ) {
	let tax = lateTax * min;

	// Find player .moniesOwed += tax
	// later could have the app do the time keeping, and generate the mins late from the time of the game start?
}

function generateTeams( playersOnPitch ) {
	let TeamA = [];
	let TeamB = [];

	// If setPlayersOnPitch has been created, select evenly matched teams by ability and playersOnPitch
	// Check if teams are evenly matched, difference of players should be +1, -1 or equal players. skill score totals should be almost the same.
	// Each week the teams should be different - the above should sort this? maybe need to randomise the three skill arrs.
	// Create a random(where skill=3) to pick from a single array of players... this might be better idea actually.
	// return array of two team arrays?
	// what if players turn up during the game? How to add them evenly to a team?
}

function randomPlayer( playersOnPitch, skillLevel ) {
	// Return a random player of specified skill level from playersOnPitch for purpose of generating even teams.
}

function printTeams( TeamA, TeamB ) {
	// Outputs to a file/screen TeamA and TeamB?
}

function startGame() {
	const gameStats = {			//dont do this!!!!
		date: 'current date',	// Date and time right now
		Players: playersOnPitch,  // Well, a copy of playersOnPitch
		TeamAScore: 0,
		TeamBScore: 0,
		TeamAScorers: [],	// ['tim', 'tim', 'karl']
		TeamBScorers: []	// ['sarah', 'joe']
	};
}

function goalScored( player ) {
	// Add/update TeamAScorers/TeamBScorers, TeamAScore
}

function finalWhistle() {
	// Output match stats to display? Winning team (goals scored in game)
	// Output top goal scorer
	// update each Player's stats from TeamAScorers/TeamBScorers to playerStats leagueGoalsScored if they scored. 1 point for each goal
	// leagueScore - for each Players add to their individual playerStats stats 3 for a win, 2 for a draw, 1 for a loss
	// add gameStats to previousGameStats and store back in DB
	// clear gameStats
}

const playersOnPitch = [ 'dave', 'tim', 'karl', 'jade', 'leah', 'chris' ];
const playerStats = [	// This is pulled from a file? DB? at start of game? or each time it needs updating?
	{
		created: 'date',
		name: 'Tim Handy',
		email: 'tim@asdf.com',
		skill: 2,				// Default is 2
		leagueScore: 0,
		leagueGoalsScored: 0,
		moniesOwed: 0,			// Subs and taxes,
		active: true			// False for no-longer playing? or date disabled?
	}
];

const previousGameStats = [

	// All prior season's game stats saved here in a file?
	// Read from file? and back to file?
];

// GUI click handler interface:
newPlayer();			// Add a player to the database

editPlayer();			// Edit an existing player

playerLate();			// Set how many minutes late the player was

retirePlayer();			// Set a player account as disabled

newFixture();			// Create an upcoming game in the schedule. Could generate a yes/no email to all 'active' players.

setPlayersOnPitch();	// Select all players that are in attendance

generateTeams();		// Randomly selects even teams based on skill level. Only do this just before game.
printTeams();			// Output teams somehow, maybe to the screen

startGame();			// Creates the gameStats object

goalScored();			// Record a goal. Not sure how to do the players.... drop down selector somehow?

finalWhistle();			// Sorts out final game stats and stores data back to playerStats and previousGameStats objects. Saves data somewhere

displayLeagueStats();	// Display current player league stats

updateMoniesOwed();		// Update a money owed by the player

newSeason();			// Archive off this season's data to another file and wipe this seasons data




// could be stored in localstorage, on the device.
//
// learn testing
//
// mocha
//
// don't do assertion libraries (eg. chai) yet!
//
// use the node.js built in assert library. require asserts.
//
// testing math.random. pass in a seed value. google seeeded random generator.
