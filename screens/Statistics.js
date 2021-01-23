import React, {useContext} from 'react'
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import {Text, Headline} from 'react-native-paper'
import MiniCardList from '../components/MiniCardList'
import Context from '../context/Context'
import Header from '../components/Header'
import {BarChart, LineChart} from 'react-native-chart-kit'

export default function Statistics() {
    const {subscriptions, theme} = useContext(Context)
  

    function showChart(key) {
        
    }

    const chartConfig = {
        // backgroundColor: "yellow",
        backgroundGradientFrom: theme.background,
      backgroundGradientTo: theme.background,
        color: (opacity = 1) => `${theme.accent}`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }

   
        

    function getCosts(subs) {
        var filler = []

        for (let i = 0; i < 12; i++) {
            filler[i] = 0
        }

        var points = subs.reduce(function (acc, sub) {
            acc[sub.startDay.getMonth()] = (acc[sub.startDay.getMonth()] || 0) + sub.cost
            return acc
        }, filler)

        return points
    }

  
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            data: getCosts(subscriptions)
          }
        ]
    }

   

    return (
        <View style={styles(theme).container}>
            <Header title="Statistics"/>

            {/* chart part of the screen */}
            {/* <View style={{height: "45%"}}>
                <Headline style={{left: "2%", color: theme.text}}>Subscriptions: {subscriptions.length}</Headline>
            </View>



            <MiniCardList
                subscriptions={subscriptions}
            /> */}
            <ScrollView horizontal>
                <LineChart
                    data={data}
                    width={Dimensions.get("window").width}
                    height={Dimensions.get("window").height - 400}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    withInnerLines={false}
                    yAxisLabel="$"
                    fromZero
                />
            </ScrollView>
            <MiniCardList
                subscriptions={subscriptions}
            />
        </View>
    )
}


const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    }
})