/* ====== View ====== */

import * as h from './helpers'
import model from './model'

export default {
  init: function() {

  },

  render: function() {

  },

  displayRawData: function() {
    document.write(localStorage.getItem(model.LOCAL_STORAGE_NAME))
  },

  toggleNewPlayer: function() { // Show the new player form
    $('.new-player-form').removeClass('hidden')
    $('.intro-para').addClass('hidden')
    $('#new-player-button').addClass('hidden')
    $('#select-players-button').addClass('hidden')
    $('#back-button').removeClass('hidden')
  },

  displayAvailablePlayers: function(players) { 
    // generate an li for each player in players
    let list = $('#select-players ul')
    $(list).html('')
    players.forEach(function(player) {
      //$(list).append(Mustache.render(template, player))
      // FIXME: Mustache: why does this render a load of spaces/tabs? and a newline in the html? see inspect on one of the li elements.
      $(list).append('<li><input type="checkbox" name="player" value="' + player + '"> ' + player + '</li>')
    })
    $('li').addClass('li-checkbox') // rquired after adding the dynamic li players, otherwise the checkboxes were tiny
    $('.intro-para').addClass('hidden')
    $('.available-players').removeClass('hidden')
    $('.generate-teams').removeClass('hidden')
    $('#select-players-button').addClass('hidden')
    $('#new-player-button').addClass('hidden')
    $('#back-button').removeClass('hidden')
  }
}
