import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

const About = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Designed & Developed By</Text>
            <Text style={styles.text2}>ASHOK KUMAR P</Text>
        </View>
    )
}
export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text1:{
        color:'gray',
        fontSize:15,
        fontStyle:'italic',
    },
    text2:{
        color:'black',
        fontSize:20,
        fontWeight: '900',
    }
})
