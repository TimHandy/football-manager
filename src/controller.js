/* ====== Controller ====== */

import model from './model'
import view from './view'

export default {
    init: function() {
        // controller.init() should set up everything... this should be run at the end of this file as soon as the page is visited.
    },

    createNewPlayer: function(firstName, lastName, email, skillLevel) {
        model.addNewPlayer(firstName, lastName, email, skillLevel)
        $('.intro-para').addClass('hidden')
    },

    deleteAllData: function() {
        model.deleteAllData()
        location.reload()  // QUESTION: is this the best way to reload the page?
    }, 
    deleteCurrentGame: function() {
        model.deleteCurrentGame()
        location.reload()
    }
}
