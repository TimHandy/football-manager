// Retrieve data from localStorage
export function getData(callback) {
    const str = localStorage.getItem(LOCAL_STORAGE_NAME)
    jsonData = JSON.parse(str)
    if (!jsonData) {
        jsonData = {
            players: [],
            games: []
        }
    }
    if (callback) {
        callback()
    }
}

// Save data to localStorage
export function saveData() {
    const str = JSON.stringify(jsonData)
    localStorage.setItem(LOCAL_STORAGE_NAME, str)  //setItem and getItem are pretty much all you can do with localStorage
    console.log(JSON.stringify(jsonData, null, 2) )
}

export function deleteAllData() {
    localStorage.removeItem(LOCAL_STORAGE_NAME)
    location.reload()  // is the best way to reload the page?
}


export function shuffle(array) {  // mutates the array
    // Fisher-Yates (aka Knuth) shuffle
    // Used like so:
    // let arr = [2, 11, 37, 42]
    // arr = shuffle(arr)
    // console.log(arr)

    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export function findPlayerByName(firstName, lastName) {
    return jsonData.players.find(player => player.firstName === firstName && player.lastName === lastName)
}

export function findPlayersBySkillLevel(playersarr, skill) {  // requires an array of player objects
    return playersarr.filter(player => player.skillLevel === skill)
}

export function justNames(playersArr) {  // requires an array of player objects
    return playersArr.map(function(player) {
        return player.firstName + ' ' + player.lastName
    })
}

export function whichTeam(firstName, lastName) {
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
