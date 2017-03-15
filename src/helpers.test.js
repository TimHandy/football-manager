let assert = require('assert')
//let chai = require('chai').assert
//let expect = require('expect')
import * as helper from './helpers.js'

describe('findPlayersBySkillLevel()', function() {

  const playersArr = [
        {firstName: 'John', lastName: 'Doe', skillLevel: 3},
        {firstName: 'Jane', lastName: 'Doe', skillLevel: 1},
        {firstName: 'Tim', lastName: 'H', skillLevel: 1}
  ]
    
  it('should return players with specified skill level', function() {
    const actual = helper.findPlayersBySkillLevel(playersArr, 1)
    const expected = [
            {firstName: 'Jane', lastName: 'Doe', skillLevel: 1},
            {firstName: 'Tim', lastName: 'H', skillLevel: 1}
    ]
    assert.deepEqual(actual, expected)
  })
})

describe('capitalizeFirstLetter()', function() {
    
  it('should return capitalized first letter', function() {
    const actual = helper.capitalizeFirstLetter('my string')
    const expected = 'My string'
    assert.equal(actual, expected)
  })
})

describe('currentGame()', function() {

  const jsonData = {
    games: ['olderGame', 'latestGame']
  }
    
  it('should return latest game', function() {
    const actual = helper.currentGame(jsonData)
    const expected = 'latestGame'
    assert.equal(actual, expected)
  })
})

describe('justNames()', function() {

  const playersArr = [
        {firstName: 'John', lastName: 'Doe'},
        {firstName: 'Jane', lastName: 'Doe'}
  ]
    
  it('should return names of players in an array', function() {
    const actual = helper.justNames(playersArr)
    const expected = ['John Doe', 'Jane Doe']
    assert.deepEqual(actual, expected)
  })
})


