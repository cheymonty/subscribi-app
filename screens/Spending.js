import React, {useContext} from 'react'
import { StyleSheet, View, Dimensions, ScrollView} from 'react-native'
import {Button} from 'react-native-paper'
import MiniCardList from '../components/MiniCardList'
import Context from '../context/Context'
import Header from '../components/Header'
import {BarChart, LineChart} from 'react-native-chart-kit'

export default function Spending() {
    const {subscriptions, theme} = useContext(Context)
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const chartConfig = {
        // backgroundColor: "yellow",
        backgroundGradientFrom: theme.background,
        backgroundGradientTo: theme.background,
        fillShadowGradient: theme.background,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `${theme.accent}`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, //optional
    }
   
    function getCosts(subs) {
        var filler = []

        for (let i = 0; i < 12; i++) {
            filler[i] = 0
        }

        var points = subs.reduce(function (acc, sub) {
            acc[sub.startDay.getMonth()] = acc[sub.startDay.getMonth()] + sub.cost
            return acc
        }, filler)

        return points
    }

  
    const data = {
        labels: shortMonths,
        datasets: [
          {
            data: getCosts(subscriptions)
          }
        ],
    }

    function pointClick(subs, index) {
        var subsInMonth = subs.filter(sub => sub.startDay.toString().includes(shortMonths[index]))

        console.log(subsInMonth)
    }

   

    return (
        <ScrollView bounces={false} style={styles(theme).container}>
            <Header title="Monthly Spending"/>
            <LineChart
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").height - 300}
                data={data}
                verticalLabelRotation={50}
                chartConfig={chartConfig}
                withInnerLines={false}
                yAxisLabel="$"
                fromZero
                onDataPointClick={({index}) => pointClick(subscriptions, index)} //display all subscriptions that added up to the monthly total when clicked
            />
            
            {/* <MiniCardList subscriptions={subscriptions}/> */}
            <View style={{flexDirection: "row"}}>
                <Button uppercase={false} color={theme.text}>Monthly Spending</Button>
                <Button uppercase={false} color={theme.text}>Option 2</Button>
            </View>
        </ScrollView>
    )
}


const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    }
})