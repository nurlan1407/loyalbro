import React, { useState } from 'react'
import { View, TextInput, TextInputProps, StyleProp, StyleSheet, TextStyle } from 'react-native'
import { COLORS } from '~/constants/theme';


interface CustomTextInputProps extends TextInputProps {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    styles: StyleProp<TextStyle>
}


const CustomTextInput: React.FC<CustomTextInputProps> = ({
    onChangeText,
    value,
    placeholder,
    styles,
    ...restProps
}) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <TextInput
            style={[styles, { borderColor: isFocused ? COLORS.primary : 'gray' }]}
            multiline
            onFocus={() => { setIsFocused(true) }}
            onBlur={() => { setIsFocused(false) }}
            scrollEnabled={true}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            {...restProps} // Spread the remaining props
        />
    )
}

const styles = StyleSheet.create({
    textArea: {

    }
})

export default CustomTextInput


