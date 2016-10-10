'use strict'

let fs = require('fs');

const pricePerGame = 3		// £
const lateTax = 1;				// £/min

function newPlayer(name, email) {
	// check for player name and add/error based on name
	// maybe add skillLevel if known, or default to 2
	// name and email are mandatory
}

function retirePlayer(player) {
	// set player as inactive in playerStats, add the date player was disabled (could be useful later for getting rid of old player data)
	// can't set to inactive unless moniesOwed = 0
}

function editPlayer(player){
	// edit player details stored in playerStats
}

function setSkillLevel(player, num) {
	// set player skill level
}

function updateMoniesOwed(player, pounds) { // can be plus or minus
	// update playerStats moniesOwed field
}

function newSeason() {
	// archive off this season's data (previousGameStats and playerStats to another file) then wipe
	//this seasons data, including all stats, but leaving players and moniesOwed (reset their scores)
}

function newFixture() {
	// generate a new game date for the calendar and maybe email the 'active' status players
}

function displayLeagueStats(playerStats) {
	// leaderboard of active players, by leagueScore. If tie, by leagueGoalsScored/forfeit score?
	// games attended
	// for manager: highlight low skill level but high score... indicator of incorrect skill score?
	// scores are emailed out to all active players.
}

function setPlayersOnPitch() {
	// manager selects players in attendance before generateTeams can run, a list of players and tickboxes with a save button?
	// create playersOnPitch array	- updateForfeit() to set the forfeit as paid etc. addForfeit(num) minusForfeit(num)
}

function playerLate(min) {
	let tax = lateTax * min;
	// find player .moniesOwed += tax
	// later could have the app do the time keeping, and generate the mins late from the time of the game start?
}

function generateTeams(playersOnPitch) {
	let TeamA = [];
	let TeamB = [];
	// if setPlayersOnPitch has been created, select evenly matched teams by ability and playersOnPitch
	// Check if teams are evenly matched, difference of players should be +1, -1 or equal players. skill score totals should be almost the same.
	// Each week the teams should be different - the above should sort this? maybe need to randomise the three skill arrs.
	// Create a random(where skill=3) to pick from a single array of players... this might be better idea actually.
	// return array of two team arrays?
	// what if players turn up during the game? How to add them evenly to a team?
}

function randomPlayer(playersOnPitch, skillLevel){
	// Return a random player of specified skill level from playersOnPitch for purpose of generating even teams.
}

function printTeams(TeamA, TeamB){
	// outputs to a file/screen TeamA and TeamB?
}

function startGame(){
	const gameStats = {
		date: 'current date',	// date and time right now
		Players: playersOnPitch,  // well, a copy of playersOnPitch
		TeamAScore: 0,
		TeamBScore: 0,
		TeamAScorers: [],  	// ['tim', 'tim', 'karl']
		TeamBScorers: []	// ['sarah', 'joe']
	};
}

function goalScored(player){
	// add/update TeamAScorers/TeamBScorers, TeamAScore
}

function finalWhistle(){
	// output match stats to display? Winning team (goals scored in game)
	// Output top goal scorer
	// update each Player's stats from TeamAScorers/TeamBScorers to playerStats leagueGoalsScored if they scored. 1 point for each goal
	// leagueScore - for each Players add to their individual playerStats stats 3 for a win, 2 for a draw, 1 for a loss
	// add gameStats to previousGameStats and store back in DB
	// clear gameStats
}

const playersOnPitch = ['dave', 'tim', 'karl', 'jade', 'leah', 'chris'];

const playerStats = [	// this is pulled from a file? DB? at start of game? or each time it needs updating?
	{   created: 'date',
		name: 'Tim Handy',
		email: 'tim@asdf.com',
		skill: 2,				// default is 2
		leagueScore: 0,
		leagueGoalsScored: 0,
		moniesOwed: 0, 			// subs and taxes,
		active: true  			// false for no-longer playing? or date disabled?
	}
];

const previousGameStats = [
	// all prior season's game stats saved here in a file?
	// read from file? and back to file?
];




// GUI click handler interface:
newPlayer();			// add a player to the database

editPlayer();		// edit an existing player

playerLate();		// set how many minutes late the player was

retirePlayer();		// set a player account as disabled

newFixture();		// create an upcoming game in the schedule. Could generate a yes/no email to all 'active' players.

setPlayersOnPitch(); // select all players that are in attendance

generateTeams();	// randomly selects even teams based on skill level. Only do this just before game.
printTeams();	// output teams somehow, maybe to the screen

startGame();		// creates the gameStats object

goalScored();		// record a goal. Not sure how to do the players.... drop down selector somehow?

finalWhistle();		// sorts out final game stats and stores data back to playerStats and previousGameStats objects. Saves data somewhere

displayLeagueStats();	// display current player league stats

updateMoniesOwed();	// update a money owed by the player

newSeason();			// archive off this season's data to another file and wipe this seasons data
