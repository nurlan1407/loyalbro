import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { COLORS, SIZES } from '~/constants/theme';
import Button from '~/shared/ui/Button';
import icons from '~/constants/icons';
import CustomTextInput from '~/shared/ui/TextInput';
import LinkButton from '~/shared/ui/LinkButton';
import { useRouter } from 'expo-router';
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
interface CodeVerificationProps {
    onVerify: (code: string) => void,
    onResendCode: () => void,
}

const SLOT_GAP = 10
const SLOT_WIDTH = 50
const SLOT_HEIGHT = 58
const CodeVerificationScreen: React.FC<CodeVerificationProps> = ({ onVerify, onResendCode }) => {
    const router = useRouter()
    const inputRef = useRef<TextInput>(null)
    const [code, setCode] = useState('');

    const handleVerifyPress = () => {
        // onVerify(code);
        //rptuer
    };


    const CODE_LENGTH = new Array(6).fill(0)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [slotWidth, setSlotWidth] = useState<number>(0)
    function onSlotLoad(width: number) {
        if (slotWidth == 0) setSlotWidth(width)
    }
    function handlePress(index: number) {
        inputRef.current?.focus()
        setSelectedIndex(index)
    }
    function handleBlur() {

    }
    function onChange(value: string) {
        if (code.length >= CODE_LENGTH.length) return null
        setCode(value)
        setSelectedIndex(value.length - 1)
    }
    function onDelete(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
        if (e.nativeEvent.key === 'Backspace') {
            console.log(e.nativeEvent.key)
            setCode(code.slice(0, code.length - 1))
        }
    }
    function onVerifyPress(){
        inputRef.current?.blur()
        router.push('/auth/auth_final')
    }
    
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, padding: SIZES.large, paddingTop: 150 }}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Подтведите ваш номер
                </Text>
               
                <View style={styles.slotsContainer}>
                    <View style={styles.slotsWrap}>
                        <TextInput
                            ref={inputRef}
                            value={code}
                            style={[styles.slotInput, { left: selectedIndex ? (selectedIndex * SLOT_WIDTH) + (selectedIndex * 10) : 0 }]}
                            onKeyPress={onDelete}
                            onChangeText={(value) => { onChange(value) }}
                            keyboardType={'numeric'}
                        >
                        </TextInput>
                        {CODE_LENGTH.map((slot, index) =>
                            <TouchableWithoutFeedback onPress={() => { handlePress(index) }} onLayout={(e) => onSlotLoad(e.nativeEvent.layout.width)}>
                                <View
                                    style={[styles.slot, { borderColor: (selectedIndex == index) || code[index] ? COLORS.primary : 'rgba(0,0,0,0.2)' }]}
                                    key={index}
                                >
                                    <Text style={[styles.slotValue, { color: code[index] ? COLORS.primary : 'gray' }]}>{code[index] ? code[index] : '-'}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </View>
                <LinkButton title={`Отправить еще раз ${50}s`} buttonStyle={{ fontSize: SIZES.medium, textAlign: 'center',paddingTop:SIZES.large }} onPress={() => { }} />
                <TouchableOpacity style={styles.verifyButton} onPress={onVerifyPress} >
                    <Image source={icons.arrow} style={styles.arrowImage}></Image>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // gap: 25,
        flex: 0.6,
    },
    header: {
        fontSize: SIZES.xxLarge,
        color: COLORS.primary,
        fontWeight: '700',
        textAlign: 'center'
    },
    verifyButton: {
        alignSelf:'flex-end',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 25
    },
    arrowImage: {
        height: 25,
        width: 25
    },
    slotsContainer: {
        paddingTop:25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slotsWrap: {
        position: "relative",
        flexDirection: "row",
        gap: SLOT_GAP
    },
    slot: {
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.2)",
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
    },
    slotValue: {
        fontSize: 30,
    },
    slotInput: {
        position: "absolute",
        fontSize: 0,
        textAlign: "center",
        // backgroundColor: "red",
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        top: 0,
        bottom: 0,
        borderRadius: 10,
    },

})

export default CodeVerificationScreen;
