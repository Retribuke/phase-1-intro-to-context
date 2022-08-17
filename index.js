

function createEmployeeRecord(array) {
    const employee = {}
    employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(Array) {
    const employees = []
    for(const array of Array) {
        employees.push(createEmployeeRecord(array))
    }
    return employees
}   

function createTimeInEvent(object, date) {
    const event = {}
    event.type = 'TimeIn'
    event.hour = parseInt(date.slice(-4))
    event.date = date.slice(0, -5)
    object.timeInEvents.push(event)
    return object
}

function createTimeOutEvent(object, date) {
    const event = {}
    event.type = 'TimeOut'
    event.hour = parseInt(date.slice(-4))
    event.date = date.slice(0, -5)
    object.timeOutEvents.push(event)
    return object
}
function hoursWorkedOnDate(object, day) {
    const outPunch = object.timeOutEvents.find(obj => obj.date === day)
    const inPunch = object.timeInEvents.find(obj => obj.date === day)
    const timeWorked = (outPunch.hour/100) - (inPunch.hour/100)
    return timeWorked
}

function wagesEarnedOnDate(object, day) {
    return hoursWorkedOnDate(object, day) * object.payPerHour
}

function allWagesFor(object) {
    let days = object.timeInEvents
    let allDates = []
    for(const item of days) {
        allDates.push(item.date)
    }
    let allWages = []
    for(const item of allDates) {
        allWages.push(parseInt(wagesEarnedOnDate(object, item)))
    }
    return allWages.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue
    })
}

function calculatePayroll(array) {
    let wagesEarned = []
    for(const object of array) {
        wagesEarned.push(allWagesFor(object))
    }
    return wagesEarned.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue
    })
}