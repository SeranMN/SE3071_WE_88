import React from 'react'
import { Text, View,StyleSheet } from 'react-native'

export const Activity = () => {
  return (
      <View style={styles.container}>
          <Text >
            Activity
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