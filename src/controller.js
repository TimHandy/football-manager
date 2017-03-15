/* ====== Controller ====== */

import model from './model'
import view from './view'
import * as h from './helpers'

export default {
  init: function() {
    // controller.init() should set up everything... this should be run at the end of app.js as soon as the page is visited.
  },

  createNewPlayer: function(firstName, lastName, email, skillLevel) {
    model.addNewPlayer(firstName, lastName, email, skillLevel)
    $('.intro-para').addClass('hidden')
  },

  deleteAllData: function() {
    model.deleteAllData()
    location.reload() // QUESTION: is this the best way to reload the page?
  },
  deleteCurrentGame: function() {
    model.deleteCurrentGame()
    location.reload()
  },
  getAndDisplayAvailablePlayers: function() {
    let players = h.justNames(model.jsonData.players).sort() // ['Tim Handy', 'First Last']
    view.displayAvailablePlayers(players)
  }
}
