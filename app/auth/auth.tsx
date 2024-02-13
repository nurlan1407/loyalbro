import React, { useState, useRef } from "react";
import images from "~/constants/images";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image
} from "react-native";
import { Checkbox } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { SIZES } from "~/constants/theme";
import Button from "~/shared/ui/Button";
import { COLORS } from "~/constants/theme";
import LinkButton from "~/shared/ui/LinkButton";
import { router } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "~/lib/redux";
import { sendNumber } from "~/entities/user/api";
import { Action, ThunkAction, unwrapResult } from "@reduxjs/toolkit";


const Auth: React.FC = () => {
    const [isAgree, setIsAgree] = useState<boolean>(false)
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state);
    console.log(userName);
    return (
        <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={images.logo} style={{ width: 150, height: 150 }}></Image>
                    <Text style={styles.logo}>LoayalBro</Text>
                </View>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="KZ"
                    onChangeFormattedText={(text) => {
                        setValue(text);
                    }}
                    withShadow
                    autoFocus
                />
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isAgree}
                        onValueChange={setIsAgree}
                        style={styles.checkbox}
                    ></Checkbox>
                    <Text style={styles.checkboxText}>Lorem ipsum olestiae reprehenderit recusandae quo nobis soluta neque fuga rerum odio impedit magni. <LinkButton buttonStyle={{ fontSize: SIZES.small }} onPress={() => { }} title="lorem lorem loadasd"></LinkButton></Text>
                </View>
                <Button onPress={async () => {
                    //@ts-ignore
                    const actionResult: ThunkAction = await dispatch(sendNumber(value))
                    const result = unwrapResult(actionResult)
                    router.push({ pathname: `/auth/code_verification`, params: { requestId: result.request_id } })
                }} buttonStyle={{}}>
                    <Text style={{ textTransform: 'uppercase', color: COLORS.white }}>Войти в аккаунт</Text>
                </Button>
            </View>
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.medium,
        paddingTop: 80,
        gap: SIZES.xLarge
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        fontSize: 45,
        fontFamily: 'Genos',
        // fontStyle:'italic',
        color: COLORS.primary, 
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxText: {
        fontSize: SIZES.small,
        flexShrink: 1
    }

})

export default Auth;