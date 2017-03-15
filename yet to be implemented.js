function retirePlayerToggle(firstName, lastName, jsonData) { // sets player as not active. Removes player from stats display
    let player = h.findPlayerByName(firstName, lastName, jsonData)
    if (player.moniesOwed !== 0) {
        return `Monies owed is not zero! Unable to retire player. Monies owed: £${player.moniesOwed}`
    } else if (player.active) {
        player.active = false
        player.dateDisabled = Date()
    } else if (!player.active) {
        player.active = true
        delete player.dateDisabled
    }
    model.saveData(model.jsonData)
}




function setSkillLevel(firstName, lastName, skillLevel, jsonData) {
    // jsonData is an object, containing a players key, whose value is an array of player objects.
    let player = h.findPlayerByName(firstName, lastName, jsonData)
    if (player) {
        player.skillLevel = skillLevel
    } else {
        console.log('Player does not exist')
    }
    model.saveData(model.jsonData)
}







function editPlayer() {
    // TODO: or just do it from a view of player data? Drop down for player to display their info, then edit required fields and save back to the DB in one go.
}






function updateMoniesOwed(firstName, lastName, currencyValue, jsonData) { // Can be plus or minus £/$
    // update helper.jsonData moniesOwed field
    h.findPlayerByName(firstName, lastName, jsonData).moniesOwed += model.saveData(model.jsonData)
}



function playerLate(firstName, lastName, minutesLate, jsonData) { // TODO: Add this to edit player page?
    let tax = model.LATE_TAX * minutesLate

    let player = h.findPlayerByName(firstName, lastName, jsonData)
    player.moniesOwed += tax
        // later could have the app do the time keeping, and generate the mins late from the time of the game start?
}



function displayRawData() {
    document.write(localStorage.getItem(model.LOCAL_STORAGE_NAME))
}

function chargePlayers(gameFee, jsonData) {
    let teamA = h.currentGame(jsonData).teamA
    let teamB = h.currentGame(jsonData).teamB
    let players = teamA.concat(teamB)
    players.forEach(function(player) {
        let first = player.split(' ')[0]
        let last = player.split(' ')[1]
        model.findPlayerByName(first, last, jsonData).moniesOwed += gameFee
    })
    h.currentGame(jsonData)
}



// TODO: write this newSeason function
// function newSeason() {
//   // Archive off this season's data (previousGameStats and helper.jsonData to another file) then wipe
//   // Create a new localStorage entry and copy all data to that one
//   // This seasons data, including all stats, but leaving players and moniesOwed (reset their scores)
// }

// function newFixture() {
//   // Generate a new game date for the calendar and maybe email the 'active' status players
// }