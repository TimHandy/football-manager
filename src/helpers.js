




export function shuffle(array) {  // mutates the array
    // Fisher-Yates (aka Knuth) shuffle
    // Used like so:
    // let arr = [2, 11, 37, 42]
    // arr = shuffle(arr)
    // console.log(arr)

    let modifiedArray = array.slice()

    let currentIndex = modifiedArray.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = modifiedArray[currentIndex]
        modifiedArray[currentIndex] = modifiedArray[randomIndex]
        modifiedArray[randomIndex] = temporaryValue
    }

    return modifiedArray
}

export function findPlayerByName(firstName, lastName, jsonData) {
    let playerObject = jsonData.players.find(player => player.firstName === firstName && player.lastName === lastName)
    return playerObject
}


export function findPlayersBySkillLevel(playersarr, skill) {  // requires an array of player objects
    let playersWithSkillArr = playersarr.filter(player => player.skillLevel === skill)
    return playersWithSkillArr
}

export function justNames(playersArr) {  // requires an array of player objects
    let playerNamesArr = playersArr.map(function(player) {
        return player.firstName + ' ' + player.lastName
    })
    return playerNamesArr
}

export function whichTeam(firstName, lastName, jsonData) {
    let name = firstName + ' ' + lastName
    console.log(name)
    if ( currentGame(jsonData).teamA.includes(name) ) {
        return 'teamA'
    } else if ( currentGame(jsonData).teamB.includes(name) ) {
        return 'teamB'
    } else {
        return undefined    // TODO: what to return here?
    }
}

export function currentGame(jsonData) {
    return jsonData.games[jsonData.games.length - 1]
}

export function back() { // used for back-button. Should this be better named?
    location.reload()
}

export function consoleLogDb(jsonData) {
    console.log(JSON.stringify(jsonData, null, 2))
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}
