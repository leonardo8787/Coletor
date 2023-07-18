import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SimpleIcon } from '../components/icons'
import { Colors,Theme } from '../constants/setting'
import { Size28 } from '../constants/scales'

const Tab = createBottomTabNavigator();

import { Home }   from "../screens/home"
import { Profile } from "../screens/profile"
import { ChatScreen } from "../screens/chat";
import { NotificacoesScreen } from "../screens/notificacoes";
import { Map } from "../screens/map";

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
      {/* <Tab.Screen 
        name="Notificacoes" 
        component={NotificacoesScreen} 
        options={{
          title: "Notificacoes",
          tabBarIcon: ({ color }) => ( <SimpleIcon name="bell" color={color}  size={Size28} />),
        }}
      />   */}
      <Tab.Screen 
        name="Mapa" 
        component={Map} 
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => ( <SimpleIcon name="road" color={color}  size={Size28} />),
        }}
      /> 
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => ( <SimpleIcon name="chat" color={color}  size={Size28} />),
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

