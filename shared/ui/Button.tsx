import React, { ReactNode } from 'react'
import { View, TouchableOpacity, ViewStyle, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '~/constants/theme'



interface ButtonProps {
    onPress: () => void,
    children:ReactNode,
    // text: string,
    buttonStyle: ViewStyle
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    buttonStyle,
    children
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
            {/* <Text style={styles.buttonText}>{text}</Text> */}
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{        
        alignItems:'center',
        justifyContent:'center',
        borderRadius:SIZES.large,
        padding:SIZES.medium,
        backgroundColor:COLORS.primary
    },
    buttonText:{
        fontSize:SIZES.medium,
        letterSpacing:0.25,
        color:'white'
    }
})

export default Button