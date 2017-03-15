import controller from './controller'

const genTestData = () => { // Just for testing
    controller.createNewPlayer('Tim', 'Handy', 'tim@tim.com', 2)
    controller.createNewPlayer('Jade', 'Andrews', 'jade@jade.com', 1)
    controller.createNewPlayer('Sarah', 'Connop', 'sarah@sarah.com', 1)
    controller.createNewPlayer('Jane', 'Doe', 'jane@jane.com', 2)
    controller.createNewPlayer('Chris', 'Rollins', 'chris@chris.com', 1)
    controller.createNewPlayer('Diego', 'Maradona', 'diego@diego.com', 3)
    controller.createNewPlayer('David', 'Beckham', 'becks@becks.com', 3)
    controller.createNewPlayer('Misako', 'Cedeira', 'misako@mis.com', 1)
    controller.createNewPlayer('Karl', 'Cedeira', 'karl@cedeira.com', 2)
    controller.createNewPlayer('Leah', 'Andrews', 'leah@andrews.com', 1)
    controller.createNewPlayer('Damo', 'Connop', 'damo@wolves.com', 3)

    $('.gen-test-data').addClass('hidden')
}

export {genTestData}
