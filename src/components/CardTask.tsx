import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Checkbox, Divider, Text } from 'react-native-paper'

type TProps = {
    name: string
    onPress: ()=> void
    isChecked?: boolean
}

const CardTask = ({
    name,
    onPress,
    isChecked = false
}:TProps) => {
    //TODO: add logic to apply `text` style if 'isChecked === true`
  return (
    <Pressable style={styles.container} onPress={()=>onPress?.()}>
    <Checkbox.Android status={isChecked ? 'checked' : 'unchecked'} />
        <Text style={styles.text} numberOfLines={1}>{name}</Text>
        <Divider />
    </Pressable>
  )
}

export default CardTask

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    text: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
})