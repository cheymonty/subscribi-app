import * as Notifications from 'expo-notifications'

//TODO: need to fire the day BEFORE, not the endDate
async function createNotification(name, endDate, timeOfNotification) {
    let noti = new Date(endDate.getTime())

    noti.setHours(timeOfNotification)
    noti.setMinutes(0)
    noti.setSeconds(0)

    console.log("noti for " + noti)
    await Notifications.scheduleNotificationAsync({
        content: {
            title: `${name} is recurring soon!`,
            body: `Your ${name} subscription is about to recur`,
            data: { data: 'goes here' },
        },
        trigger: noti,
    })

    //TODO: Just for testing
    Notifications.cancelAllScheduledNotificationsAsync()
}

async function changeNotifications(subs, timeOfNotification) {
    Notifications.cancelAllScheduledNotificationsAsync()

    for (let i = 0; i < subs.length; i++) {
        await createNotification(subs[i].name, subs[i].endDay, timeOfNotification)
    }
}

export {createNotification, changeNotifications}