import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Icon = ({name}) => {
    name = name.toLowerCase()
    return getLogo(name)
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const preselects = [
    {name: "playstation", color:"#006FCD"},
    {name: "hulu", color:"#3DBB3D"},
    {name: "nintendo-switch", color: "#E70009"},
    {name: "spotify", color: "#1ED761"},
    {name: "amazon", color: "#FF9900"},
    {name: "netflix", color: "#E50914"}, 
    {name: "apple", color: "#000000"}, 
    {name: "xbox", color: "#107C11"},
]

function getLogo(name) {
    let logo;
    preselects.forEach(function (item) {
        if (name === item.name)   
          logo = item
    })


    if (logo)
        return <MaterialCommunityIcons name={logo.name} size={24} color={logo.color} />
    return <MaterialCommunityIcons name="calendar" size={24} color="#7328FF"/>
}

function getColor(name) {
    let color;

    preselects.forEach(function (item) {
        if (name === item.name)
            color = item.color
    })

    if (color)
        return color
    return "#7328FF"
}

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


export {Icon, getColor, dateToString, timeToString, getEndDate, reviveDate}