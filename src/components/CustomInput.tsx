import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

type TProps = {
    placeholder?: string
    label: string
    value?: string
    onChangeText?: (text:string) => void
    containerStyle?: ViewStyle
}

const CustomInput = ({
    placeholder = 'Ingresa una tarea...',
    label = '',
    value = '',
    containerStyle = {},
    onChangeText
}:TProps) => {
  return (
    <View style={[styles.container,{...containerStyle}]}>
      <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChangeText?.(text)}
    />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container:{
backgroundColor: '#FFF'
    }
})