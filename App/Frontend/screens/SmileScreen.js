import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class SmileScreen extends Component {
  render() {
    return (
      <View sttyle={{ alignItems:'center'}}>
        <Text style={{ marginHorizontal:80, marginTop:300, fontWeight:'bold', fontSize:25}}> SmileScreen </Text>
      </View>
    )
  }
}

export default SmileScreen
