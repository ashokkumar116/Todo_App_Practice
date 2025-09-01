import {View, Text, Image} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';


const TabIcon = ({focused,title,icon}:any) =>{
        if(!focused){
            return <AntDesign name={icon} size={24} color="black" />
        }
        return <Entypo name={icon} size={24} color="black" />
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarItemStyle:{
                    width:'100%',
                    height:'100%',
                    justifyContent:'center',
                    alignItems:'center'
                },
                tabBarStyle:{
                    width:'100%',
                    backgroundColor:"white",
                    borderTopColor:"gray",
                    paddingTop:5,
                    height:60,
                    justifyContent:'center',
                    alignItems:'stretch'
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={
                    {
                        headerShown: false,
                        title: "Home",
                        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="home" title="Home" />,
                    }
                }
            />
            <Tabs.Screen
                name="About"
                options={{
                    title: "About",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={focused ? "info-with-circle" : "infocirlceo"} title="About" />
                }}
            />
        </Tabs>
    )
}
export default _Layout
