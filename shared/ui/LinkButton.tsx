import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '~/constants/theme';

interface LinkButtonProps {
    onPress: () => void,
    title: string,
    buttonStyle: ViewStyle
}

const LinkButton: React.FC<LinkButtonProps> = ({ onPress, title, buttonStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={StyleSheet.flatten([buttonStyle,  styles.linkText ])}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linkText: {
        color: COLORS.primary,
        fontSize: SIZES.medium,
        textDecorationLine: 'none'
    }
});

export default LinkButton;