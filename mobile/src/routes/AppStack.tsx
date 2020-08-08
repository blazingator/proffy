import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Landing, GiveClasses } from '../pages'
import StudyTabsNavigation from './StudyTabs'

const { Navigator, Screen } = createStackNavigator()

export default function AppStackNavigation(){
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabsNavigation} />
      </Navigator>
    </NavigationContainer>
  )
}
