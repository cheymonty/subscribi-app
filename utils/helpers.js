const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function dateToString(date) {
    // let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // let firstDate = new Date();
    // let secondDate = date;

    // let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    // if (diffDays === 0)
    //     return `Recurring today!`
    // else if (diffDays <= 6)
    //     return `${diffDays} days left!`

    let year = date.getFullYear()
    let month = months[date.getMonth()]
    let day = date.getDate()

    if (year === new Date().getFullYear())
        return `${month} ${day}`
    
    return `${month} ${day}, ${year}`  
    
}

function timeToString(hour) {
    let displayTime;

    if (hour < 12)
        displayTime = `${hour}:00 AM` //am
    else if (hour > 12)
        displayTime = `${hour-12}:00 PM` //pm
    else
        displayTime = `${hour}:00 PM` //noon

    return displayTime
}

function getEndDate(startDate, duration) {
    let endDate = new Date(startDate.getTime())
    let num = Number(duration.match(/\d+/)[0])

    if (duration.includes("days"))
        endDate.setDate(endDate.getDate() + num)
    else if (duration.includes("weeks"))
        endDate.setDate(endDate.getDate() + (num * 7))
    else if (duration.includes("months"))
        endDate.setMonth(endDate.getMonth() + num)
    else
        endDate.setFullYear(endDate.getFullYear() + num) 

    console.log(endDate)
    return endDate
}

function reviveDate(k, v) {
    if (k === "startDay" || k === "endDay")
        return new Date(v)
    return v
}


export {dateToString, timeToString, getEndDate, reviveDate}