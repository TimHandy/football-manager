export const LOCAL_STORAGE_NAME = 'footballData'

export let jsonData = {}

// Retrieve data from localStorage
export function getData(callback) {   //QUESTION: is this correct to pass in global vars like this in a module function?
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
