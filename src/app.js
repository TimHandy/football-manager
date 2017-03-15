/*

See README.md

Current status:

I know many of these functions are not 'pure' but want to make it so. Recognise now that should be passing in the state as args to function definitions, and returning the result.

Requires a LOT of jquery page changes to show/hide sections.

Advice on structure/approach would be great! Maybe this is approaching the size that a framework like React would be useful??

This file is getting large. Need to move to some other modules, maybe a game module, a player module.

*/

'use strict'
require('./styles.css')
let $ = require('jquery')

import * as h from './helpers'
import model from './model'
import view from './view'
import controller from './controller'
import * as player from './player'
import {genTestData} from './testData'


let teamA   // this is bad... how to remove these global vars?
let teamB
let chosenPlayers = [] // FIXME: dirty global variable, refactor to remove


// QUESTION: appears to be a lot of firstName, lastName being passed around... can I fix that??? What would be simpler or more appropriate? a lot of what I'm doing is storing names in arrays, then when needing to update the player object, I'm finding the actual object to work on, and updating it. This seems a long way around. Should I pass around the actual player object instead? ie. when players are picked, store the array of player objects and can then act directly on them, updating scores etc, and finally at end of game store that player back to the main store? What's the typical approach?


// Pre-game features ####################################################################


function choosePlayers() {
  let players = document.getElementsByName('player')
  players = Array.prototype.slice.call(players)
  for (let i = 0; i < players.length; i++) { // TODO: dirty for loop, use filter instead
    if (players[i].checked) {
      chosenPlayers.push(players[i])
    }
  }

  chosenPlayers = chosenPlayers.map(function(player) {
    return player.value
  }).map(function(player) {
    return model.findPlayerByName(player.split(' ')[0], player.split(' ')[1], model.jsonData)
  })
  return chosenPlayers // TODO: not sure I need to return this right now, as the function sets the var chosenPlayers. Dirty. make other functions use this function as a return expression.
}

// TODO: this is a massive function. Is this wrong?
// QUESTION: Should the click handler functions be named xxxxHandler so it can be seen that they have an event related to them?
function generateTeams(chosenPlayers, callback) {
  teamA = []
  teamB = []
  let players = chosenPlayers.slice(0) // QUESTION: makes a copy of chosenPlayers  ['Tim Handy', 'Jade Andrews']. Is this the right thing to do so as to not mutate the original array?
        // TODO: validate the generateTeams button, there must be > 1 players selected

  let threeStarPlayers = model.shuffle(h.justNames(h.findPlayersBySkillLevel(players, 3))) // ['David Beckham', 'Diego Maradonna']. TODO Think I've just created objects (choosePlayers) from strings and then back again to strings in here!
  let twoStarPlayers = model.shuffle(h.justNames(h.findPlayersBySkillLevel(players, 2)))
  let oneStarPlayers = model.shuffle(h.justNames(h.findPlayersBySkillLevel(players, 1)))

  let lineUp = threeStarPlayers.concat(twoStarPlayers, oneStarPlayers)
  console.log('Lineup: ', lineUp) // ['David Beckham', 'Diego Maradonna', "Damo Connop", "Tim Handy", "Jane Doe", "Karl Cedeira", "Chris Rollins", "Jade Andrews", "Leah Andrews"]

  while (lineUp.length > 0) {
    teamA.push(lineUp.pop())
    teamB.push(lineUp.pop()) // TODO: does this need to be a callback so that it does it in order? 
  }

  teamB = teamB.filter(Boolean) // remove an 'undefined' from teamB if uneven number of players.

  if (teamA.length !== teamB.length) { // aid in evening up teams if uneven number of skillLevel 3 players
    teamB.unshift(teamA.shift()) // moves a skillLevel 1 player from team A to team B
  }

  console.log('Team A: ', teamA)
  console.log('Team B: ', teamB)

  $('#team-a').html(teamA.map(function(name) { // TODO: this is mixing view code with the model code. Bad? Maybe should have an updateTeamView function or something?
    if (teamA.indexOf(name) === teamA.length - 1) {
      return name
    } else {
      return name + ', '
    }
  }))

  $('#team-b').html(teamB.map(function(name) { // TODO: this is doing same as above, so DRY it up?
    if (teamB.indexOf(name) === teamB.length - 1) {
      return name
    } else {
      return name + ', '
    }
  }))
  $('.intro-para').addClass('hidden') // TODO: should this all be wrapped up in a function?
  $('.generate-teams').addClass('hidden')
  $('.kickoff').removeClass('hidden')
  $('.players').removeClass('hidden')
  $('.available-players').addClass('hidden')
  $('.new-player-form').addClass('hidden')

  if (callback) {
    callback()
  }

    // helper.saveData(model.jsonData)    // don't need to save here, not necessary until the 'Kickoff' button pressed?
}

function wrapperforGenerateTeams() { // TODO: this is bad having to make a wrapper. think now I have moved the onclick events to here from the the html I might not need this. It's also a noun, not a verb.
  generateTeams(choosePlayers()) // TODO: can I put this directly into the click handler?
}

// Game-time  ##################################################################

function kickOff() {
  generateGame(teamA, teamB) // FIXME: this should not have a global vars for teamA and B, they should be stored in jsonData, and be passed in as a args.
  //chargePlayers(model.GAME_FEE, model.jsonData)
  populatePlayerDropdown(teamA.concat(teamB))
  $('.game-date').html(h.currentGame(model.jsonData).date)
  $('.game-date-div').removeClass('hidden')
  $('.game').removeClass('hidden')
  $('.goal').removeClass('hidden')
  $('.final-whistle').removeClass('hidden')
  $('.kickoff').addClass('hidden')
  $('.generate-teams').addClass('hidden')
  $('.delete-game').removeClass('hidden')
  $('#back-button').addClass('hidden')
}

function populatePlayerDropdown(playerNamesArr) {
  let players = playerNamesArr
  let list = $('#dropdown-options')
  $(list).html('<option>Player Name</option>')
  players.forEach(function(player) {
    $(list).append('<option>' + player + '</option>')
  })
}

function generateGame(teamA, teamB) {
  let game = {
    date: Date(),
    teamA: teamA, // ['Tim Handy', 'Karl Cedeira']
    teamB: teamB, // ['Jade Andrews', 'Sarah Connop']
    teamAScore: 0,
    teamBScore: 0,
    scorers: [], // ['Tim Handy', 'Jade Andrews', 'Karl Cedeira']  order in which goals were scored
    endTime: undefined // QUESTION: undefined or null?? which is most appropriate? Think undefined is for properties and vals, and null is for objects.
  }

  model.jsonData.games.push(game)
  model.saveData(model.jsonData)
}

function goalHandler(jsonData) {
  let dropdown = document.getElementById('dropdown-options') // QUESTION: is there a better way to do a dropdown here?
  let player = dropdown.options[dropdown.selectedIndex].value
  let firstName = player.split(' ')[0]
  let lastName = player.split(' ')[1]
  goalScored(firstName, lastName, jsonData)
        // TODO: validation: must choose a real player. 'Player Name' should not be a valid choice.
        // TODO: set dropdown back to 'Player Name' after valid goal button press
        // TODO: make the dropdown more visible  background color?
}

function goalScored(firstName, lastName, jsonData) {
  if (!h.currentGame(model.jsonData).endTime) {
    h.currentGame(model.jsonData).scorers.push(firstName + ' ' + lastName)
    console.log('Scorer: ' + firstName + ' ' + lastName + ' added')
    updatePlayerLeagueGoalsScored(firstName, lastName, 1, model.jsonData) // TODO: should only be added at final whistle in case game is cancelled  move this, or set a cancel function to reverse the change?
    updateGameScore(firstName, lastName, jsonData)
    $('.team-a-score').html(h.currentGame(model.jsonData).teamAScore)
    $('.team-b-score').html(h.currentGame(model.jsonData).teamBScore)
            // TODO: player name on the dropdown should default back to 'Player Name' after goal button is pressed
            // TODO: update the players list at the top with goals scored: Team A: Chris Rollins(1), Damo Connop(5) etc.
    model.saveData(model.jsonData)
  } else {
    console.log('game has already ended')
  }
}

function updateGameScore(firstName, lastName, jsonData) {
  if (h.whichTeam(firstName, lastName, jsonData) === 'teamA') {
    h.currentGame(model.jsonData).teamAScore += 1
  } else if (h.whichTeam(firstName, lastName, jsonData) === 'teamB') {
    h.currentGame(model.jsonData).teamBScore += 1
  } else {
    console.log('player not on either team?')
  }
}

function updatePlayerLeagueGoalsScored(firstName, lastName, goalsScored, jsonData) {
  let player = model.findPlayerByName(firstName, lastName, jsonData)
  console.log(player)
  player.leagueGoalsScored ? player.leagueGoalsScored += 1 : player.leagueGoalsScored = goalsScored // need a ternary because it wouldn't += on a null or missing key
  model.saveData(model.jsonData)
        // TODO: this should only be added at final whistle, in case game is cancelled
}

function assignWinningPoints(jsonData, callback) { // TODO: Looks ripe for refactoring. Tried it, didn't work... try again!
    // if draw
  if (h.currentGame(model.jsonData).endTime) {
    if (h.currentGame(model.jsonData).teamAScore === h.currentGame(model.jsonData).teamBScore) {
            // each player on both sides gets 2 leagueScore point
      for (let i = 0; i < h.currentGame(model.jsonData).teamA.length; i++) { // TODO: use a .map here?
        let name = h.currentGame(model.jsonData).teamA[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 2, jsonData)
      }
      for (let i = 0; i < h.currentGame(model.jsonData).teamB.length; i++) {
        let name = h.currentGame(model.jsonData).teamB[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 2, jsonData)
      }
            // if teamA won
    } else if (h.currentGame(model.jsonData).teamAScore > h.currentGame(model.jsonData).teamBScore) {
      for (let i = 0; i < h.currentGame(model.jsonData).teamA.length; i++) {
        let name = h.currentGame(model.jsonData).teamA[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 3, jsonData)
      }
      for (let i = 0; i < h.currentGame(model.jsonData).teamB.length; i++) {
        let name = h.currentGame(model.jsonData).teamB[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 1, jsonData)
      }
            // if teamB won
    } else if (h.currentGame(model.jsonData).teamAScore < h.currentGame(model.jsonData).teamBScore) {
      for (let i = 0; i < h.currentGame(model.jsonData).teamA.length; i++) {
        let name = h.currentGame(model.jsonData).teamA[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 1, jsonData)
      }
      for (let i = 0; i < h.currentGame(model.jsonData).teamB.length; i++) {
        let name = h.currentGame(model.jsonData).teamB[i].split(' ')
        let firstName = name[0]
        let lastName = name[1]
        updatePlayerLeagueScore(firstName, lastName, 3, jsonData)
      }
    }
  } else {
    console.log('game end time not set')
  }

  if (callback) {
    callback()
  }

}

function updatePlayerLeagueScore(firstName, lastName, points, jsonData) {
  let player = model.findPlayerByName(firstName, lastName, jsonData)
  if (player.leagueScore) { // TODO: try with a ternary now it's working
    player.leagueScore += points
  } else {
    player.leagueScore = points
  }
  model.saveData(model.jsonData)
}

function finalWhistle(jsonData) { // TODO: rename with ...Handler?
  setGameEndTime()
  assignWinningPoints(jsonData, function() {
    getLeagueStats(jsonData)

    $('.final-score').removeClass('hidden')
    $('.final-score p:nth-of-type(1)').html('Team A: ' + h.currentGame(jsonData).teamAScore)
    $('.final-score p:nth-of-type(2)').html('Team B: ' + h.currentGame(jsonData).teamBScore)
    let gameScorers = h.currentGame(jsonData).scorers
    gameScorers = gameScorers.map(function(player) {
      if (gameScorers.indexOf(player) === gameScorers.length - 1) {
        return player
      } else {
        return player + ', '
      }
    })

    $('.final-score p:nth-of-type(2)').append('<p>Scorers: ' + gameScorers.join('') + '</p>')
    $('.goal').addClass('hidden')
    $('.final-whistle').addClass('hidden')
    $('.game').addClass('hidden')
    $('#back-button').removeClass('hidden')
    $('#back-button').addClass('btn-primary').removeClass('btn-default')
  })
}

function setGameEndTime() {
    // update latest game's endTime. This is used to determine whether game complete or not.
  h.currentGame(model.jsonData).endTime = Date()
  model.saveData(model.jsonData)
}

// Game stats functions ########################################################

function getLeagueStats(jsonData) { // Mixed model and view? ...this also displays data. maybe this should be broken into two: a getstats and an update view type function
  let players = jsonData.players.map(function(player) {
    return {
      playerName: player.firstName + ' ' + player.lastName,
      leagueScore: player.leagueScore,
      leagueGoalsScored: player.leagueGoalsScored
    }
  })
        // TODO: require a .filter here to remove the player.active === false users. Don't want to display the inactive users.
  players.sort(function(a, b) {
    return b.leagueScore - a.leagueScore
  })
  $('#league-stats').removeClass('hidden')
  $('#league-stats ul').html('')
  players.forEach(function(player) {
    if (player.leagueScore > 0 || player.leagueGoalsScored > 0) {
      $('#league-stats ul').append('<li>' + player.leagueScore + ' points: ' + player.playerName + ' (Goals: ' + player.leagueGoalsScored + ') </li>')
    }
    console.log(player.leagueScore + ': ' + player.playerName)
  })

    // IDEA: For manager: highlight low skill level but high score... indicator of incorrect skill score?
    // IDEA: Scores are emailed out to all active players.
}

// If database is present and game ongoing, i.e. no endTime, restore previous gamestate
// FIXME: this has stopped working
$(document).ready(function() {

  model.getData(function() {
    if (model.jsonData.players.length === 0) {
      $('.intro-para').removeClass('hidden')
    }
    if (model.jsonData.players.length > 0) {
      $('.gen-test-data').addClass('hidden')
      $('.intro-para').addClass('hidden')
    }

    if (model.jsonData.games.length > 0) {
      getLeagueStats(model.jsonData)
      $('#league-stats').removeClass('hidden')
    }

        // TODO: make this into a 'recover state' type function that can be called in several places.
    if (localStorage.getItem(h.LOCAL_STORAGE_NAME) && h.currentGame(model.jsonData) && !h.currentGame(model.jsonData).hasOwnProperty('endTime')) {
      $('.intro-para').addClass('hidden') // TODO: this is a lot of jquery... might want to combine some of this into divs?
      $('.gen-test-data').addClass('hidden')
      $('#select-players-button').addClass('hidden')
      $('#new-player-button').addClass('hidden')
      $('.game-date').html(h.currentGame(model.jsonData).date) // TODO: chop off the GMT bit: Tue Oct 18 2016 16:52:29 GMT+0100 (BST)
      $('.game-date-div').removeClass('hidden')
      $('.players').removeClass('hidden')
      $('.available-players').addClass('hidden')
      $('.new-player-form').addClass('hidden')
      $('.game span').html(h.currentGame(model.jsonData).date)
      $('.goal').removeClass('hidden')
      $('.final-whistle').removeClass('hidden')
      $('.kickoff').addClass('hidden')
      $('.generate-teams').addClass('hidden')
      $('#team-a').html(h.currentGame(model.jsonData).teamA.map(function(name) {
        return name + ', '
      }))
      $('#team-b').html(h.currentGame(model.jsonData).teamB.map(function(name) {
        return name + ', '
      }))
      $('.team-a-score').html(h.currentGame(model.jsonData).teamAScore)
      $('.team-b-score').html(h.currentGame(model.jsonData).teamBScore)
      $('.delete-game').removeClass('hidden')
      $('#back-button').addClass('hidden')
      populatePlayerDropdown(h.currentGame(model.jsonData).teamA.concat(h.currentGame(model.jsonData).teamB))
    } else {
            //$('.gen-test-data').removeClass('hidden')
      $('#back-button').addClass('hidden')
    }
  }) // TODO: should this be wrapped in an 'init' function so it's clear what's going on?
})

// QUESTION: lots of click handlers here. Is this the right thing to do? 

$('#new-player-button').click(function() {
  view.toggleNewPlayer()
})

//clear form fields on focus
$('.input-lg').focus(function() {
  this.value = ''
})

$('#new-player-submit-button').click(function() {
  player.createNewPlayerFromForm()
})

$('#select-players-button').click(function() {
  controller.getAndDisplayAvailablePlayers()
})

$('#generate-teams-button').click(function() {
  wrapperforGenerateTeams()
})

$('#kickoff-button').click(function() {
  kickOff()
})

$('#goal-button').click(function() {
  goalHandler(model.jsonData)
})

$('#final-whistle-button').click(function() {
  finalWhistle(model.jsonData)
})

$('#back-button').click(function() {
  h.back()
})

$('#delete-game-button').click(function() {
  controller.deleteCurrentGame()
})

$('#delete-db-button').click(function() {
  controller.deleteAllData()
  location.reload()
})

$('#generate-test-players-button').click(function() {
  genTestData()
    //location.reload()
})

$('#consolelog-db-button').click(function() {
  h.consoleLogDb(model.jsonData)
    // location.reload()
})

$('#export-raw-data').click(function() {
  view.displayRawData()
    // location.reload()
})


// TODO: check for remaining functions written but not implemented
// TODO: add bootstrap - it looks bad on a phone in particular
// TODO: allow adding a player once game is in progress. late players? maybe a dropdown of remaining unchosen players displayed whilst game is in progress.
// TODO: add some font awesome icons to buttons


