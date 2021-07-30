import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

function Home({ navigation }) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const Separator = () => (
    <View
      style={{
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10
      }}
    />
  )
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { item })}>
              <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
export default Home