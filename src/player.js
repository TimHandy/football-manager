import * as h from './helpers'
import model from './model'

export function createNewPlayerFromForm() {
    $('#back-button').removeClass('hidden')

    let form = document.getElementById('new-player')
    let firstName = h.capitalizeFirstLetter(form.fname.value.trim().split(' ').join(''))
    let lastName = h.capitalizeFirstLetter(form.lname.value.trim().split(' ').join(''))
    let email = form.email.value.toLowerCase()
    let skillLevel = parseInt(form.skill.value)
    if (firstName === 'Firstname' || firstName === '') {
        let msg = 'First Name is required'
        $('#user-input-error').html('<h3>' + msg + '</h3>').removeClass('hidden') // TODO: lots of code to DRY up.
        return
    } else if (lastName === 'Lastname' || lastName === '') {
        let msg = 'Last Name is required'
        $('#user-input-error').html('<h3>' + msg + '</h3>').removeClass('hidden')
        return
    } else if (fullNameExists(firstName, lastName)) {
        let msg = 'Player name already exists'
        $('#user-input-error').html('<h3>' + msg + '</h3>').removeClass('hidden')
    } else if (email === 'email' || emailExists(email) || !validateEmail(email || email === '')) {
        let msg = 'A valid email address is required. Email must not be a duplicate.'
        $('#user-input-error').html('<h3>' + msg + '</h3>').removeClass('hidden')
        return
    } else if (skillLevel === 'Skill level (1-3)' || !(skillLevel > 0 && skillLevel < 4)) {
        let msg = 'Skill level is required: 1-3'
        $('#user-input-error').html('<h3>' + msg + '</h3>').removeClass('hidden')
        return
    } else {
        controller.createNewPlayer(firstName, lastName, email, skillLevel)
        $('#user-input-error').addClass('hidden')
        $('#user-input-error').html('<h3>' + 'Player added successfully' + '</h3>').removeClass('hidden')
    }

    // FIXME: When click in the form fields the contents should highlight select all to allow overwrite. jquery onclick? onactive?
}

export function emailExists(email) {       // QUESTION: helper function; keep this in a module? or close by to where it's used?
    return model.jsonData.players.some(player => player.email === email)
}

export function fullNameExists(firstName, lastName) {
    return model.jsonData.players.some(player => player.firstName === firstName && player.lastName === lastName)
}

export function validateEmail(email) { // quick & dirty regex email validation
    let regex = /^(([^<>()\[\]\\., :\s@"]+(\.[^<>()\[\]\\., :\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

// TODO: need GUI to be able to add moniesOwed to player. Maybe in the edit page?