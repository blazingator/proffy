import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import api from '../../services/api'
import { PageHeader, TeacherItem } from '../../components'
import { Teacher } from '../../components/TeacherItem'
import styles from './styles'

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  function handleToggleFiltersVisible(){
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit(){
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    
    setIsFiltersVisible(false)
    setTeachers(response.data)
  }

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(response => {                                     
      if(response){                                                                          
        const favoritedTeachers = JSON.parse(response)                                       
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id) 
        
        setFavorites(favoritedTeachersIds)                                                   
      }
    })

  }

  useFocusEffect(() => {
    loadFavorites()
  })
  
  return (
    <View style={styles.container}>
      <PageHeader title="Proffys Disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={setWeekDay}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />
              </View>

            </View>
            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
            paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => (
            <TeacherItem
              teacher={teacher}
              key={teacher.id}
              favorited={favorites.includes(teacher.id)}
            />
          )
        )}
      </ScrollView>
    </View>
  )
}

export default TeacherList
