import React from 'react'
import { Text, View,StyleSheet } from 'react-native'

export const Account = () => {
  return (
      <View style={styles.container}>
          <Text style={{justifyContent:'center'}}>
            Account
          </Text>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});