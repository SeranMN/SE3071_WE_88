import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './Tabs/Home'
import {Activity} from './Tabs/Activity'
import { Account } from './Tabs/Account'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export const Tabs = () => {
    const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator
          screenOptions={{
              tabBarShowLabel: false,
              headerShown:false,
              tabBarStyle: {
                  position: 'absolute',
                  bottom: 25,
                  left: 20,
                  right: 20,
                  elevation: 0,
                  borderRadius: 15,
                  height: 60,
                 ...style.shadow
              }
         }}
      >
          <Tab.Screen 
              name='Home'
              component={Home}
              options={{
                  tabBarIcon: (({ focused }) => (
                      <View style={{ alignItems: 'center', justifyContent: 'center',top:10 }}>
                          <Entypo name="home" size={24} color={focused?"black":"gray"} />
                          <Text >Home</Text>
                      </View>
                  )) 
              }}
              />
          <Tab.Screen 
              name='Activity'
              component={Activity}
           options={{
                  tabBarIcon: (({ focused }) => (
                      <View style={{ alignItems: 'center', justifyContent: 'center',top:10  }}>
                          <Entypo name="calendar" size={24} color={focused?"black":"gray"} />
                          <Text>Time Table</Text>
                      </View>
                  )) 
              }}/>
          <Tab.Screen 
              name='Account'
              component={Account}
           options={{
                  tabBarIcon: (({ focused }) => (
                   <View style={{
                       alignItems: 'center',
                       justifyContent: 'center',
                       top: 10
                       
                   }}>
                         <MaterialIcons name="account-circle" size={24 }color={focused?"black":"gray"} />
                          <Text>Account</Text>
                      </View>
                  )) 
              }}/>
     </Tab.Navigator>
  )
}


const style = StyleSheet.create(
    {
        shadow: {
            shadowColor: '#7F5DF0',
            shadowOffset: {
                width: 0,
                height:10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation:5,
        },
        tab: {
            
        }
    }
    
)
