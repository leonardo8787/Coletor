import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleIcon } from '../components/icons'
import { Colors,Theme } from '../constants/setting'
import { Size28 } from '../constants/scales'

const Tab = createBottomTabNavigator();

import { Home }   from "../screens/home"
import { Profile } from "../screens/profile"
import { Map } from "../screens/map";
import { ChatScreen } from "../screens/chat";

function TabsRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[Theme][2],
        tabBarInactiveTintColor: Colors[Theme][5],
        tabBarStyle: { 
          borderTopColor: Colors[Theme][0],
          backgroundColor: Colors[Theme][0],
          opacity: 0.85,
          height: 55, 
          paddingBottom: 8,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => ( <SimpleIcon name="recycle" color={color}  size={Size28} />),
        }}
      />  
      <Tab.Screen 
        name="Mapa" 
        component={Map} 
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => ( <SimpleIcon name="road" color={color}  size={Size28} />),
        }}
      /> 
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (<SimpleIcon name="account" color={color} size={Size28} />),
        }}
      />   
    </Tab.Navigator>
  );
}


export {TabsRoutes};

