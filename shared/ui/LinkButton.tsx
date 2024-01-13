import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '~/constants/theme';

interface LinkButtonProps {
    onPress: () => void,
    title: string,
    buttonStyle: any
}

const LinkButton: React.FC<LinkButtonProps> = ({ onPress, title, buttonStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={StyleSheet.flatten([styles.linkText,buttonStyle ])}>{title}</Text>
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