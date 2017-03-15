
/* ====== Model ====== */


export const model = {
    LOCAL_STORAGE_NAME: 'footballData',
    jsonData: {},
    GAME_FEE: 2, // £
    LATE_TAX: 1, 
    // const LATE_TAX = 2       // £/min
    // const LOCAL_STORAGE_NAME = 'footballData'
    // let helper.jsonData
    // let teamA = []
    // let teamB = []

    shuffle: function(array) {  // mutates the array
    // Fisher-Yates (aka Knuth) shuffle

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
    },


    // Retrieve data from localStorage
    getData: function(callback) {   
        const str = localStorage.getItem(model.LOCAL_STORAGE_NAME)
        model.jsonData = JSON.parse(str)
        if (!model.jsonData) {
            model.jsonData = {
                players: [],
                games: []
            }
        }
        if (callback) {
            callback()
        }
    },

    // Save data to Local Storage
    saveData: function(jsonData) {
        const str = JSON.stringify(jsonData)
        localStorage.setItem(this.LOCAL_STORAGE_NAME, str)  //setItem and getItem are pretty much all you can do with localStorage
        console.log(JSON.stringify(jsonData, null, 2) )
        // TODO: add error handling, like pass back a return val and throw an error if unable to save 
    },

    deleteAllData: function() {
        localStorage.removeItem(this.LOCAL_STORAGE_NAME)
    },

    deleteCurrentGame: function() {
        this.jsonData.games.splice(-1, 1)
        this.saveData() // TODO: does this need a callback so that it happens only after the splice above?
        // TODO: this should remove any scores added to players scores
        // TODO: add a 'are you sure, yes/no' thing. modal?
    },

    addNewPlayer: function(firstName, lastName, email, skillLevel) {
        let obj = {
            created: Date.now(), // TODO: should this date be human readable? Probably. Or should it be like this so that I could run other functions against the date? e.g. show all games from last month etc.?
            firstName: firstName,
            lastName: lastName,
            email: email,
            active: true,
            skillLevel: skillLevel,
            leagueScore: 0,
            leagueGoalsScored: 0
        }

    // TODO: appears to be a crossover of responsibility between this function and newPlayerForm ? should these be merged? But then I couldn't call createNewPlayer() manually it would need to pull the data from the form. Where should the form validation go? (It currently goes on the createNewPlayerFromForm). MVC pattern: keep the controller logic away from the model logic in separate functions?

        model.jsonData.players.push(obj)
        model.saveData(model.jsonData)
    },

    findPlayerByName: function(firstName, lastName, jsonData) {
        let playerObject = jsonData.players.find(player => player.firstName === firstName && player.lastName === lastName)
        return playerObject
    }
}

