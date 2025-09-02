import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {useLocalSearchParams, useRouter} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const Todo = () => {
    const router = useRouter();
    const {id, title} = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo ID : {id}</Text>
            <Text style={styles.header}>Todo Text : {title}</Text>
            <TouchableOpacity
                onPress={()=>router.back()}
                style={styles.backButton}
            >
                <AntDesign name="back" size={24} color="black" style={styles.buttonText} />
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Todo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap:20,
    },
    backButton: {
        backgroundColor: "skyblue",
        paddingHorizontal: 36,
        paddingVertical: 16,
        flexDirection: "row",
        gap:10,
        justifyContent:"center",
        alignItems: "center",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonText:{
        fontWeight: "900",
    }
})
