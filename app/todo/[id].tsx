import {View, Text} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";

const Todo = () => {
    const {id,title} = useLocalSearchParams();
    return (
        <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>
            <Text>Todo ID : {id}</Text>
            <Text>Todo Text : {title}</Text>
        </View>
    )
}
    export default Todo
