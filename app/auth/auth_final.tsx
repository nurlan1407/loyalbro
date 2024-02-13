import React, { useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { COLORS, SIZES } from "~/constants/theme";
import CustomTextInput from "~/shared/ui/TextInput";
import images from "~/constants/images";
import Button from "~/shared/ui/Button";
import DatePicker from "~/components/DatePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import formatDate from "~/shared/lib/formateDate";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/redux";
import { editUserInfo } from "~/entities/user/api";
import { router } from "expo-router";

const AuthFinal: React.FC = () => {
    const dispatch = useDispatch()
    const useAppSelector = useSelector((state:RootState)=>state.userReducer)
    const {isLoading,user,error} = useAppSelector
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDay, setBirthday] = useState('')
    const [date, setDate] = useState<Date|null>(null);
    const [show, setShow] = useState(false);

    const [isValid,setIsValid] = useState<boolean|null>(null)
    function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        if (event.type == 'set') {
            const currentDate = selectedDate
            setDate(currentDate!)
            setShow(false)
        } else {
            setShow(false)
        }
    }
    async function onSubmit() {
        if(!date || firstName.length ==0 || lastName.length == 0){
            return
        }
        const timeStamp = date.getTime()
        //@ts-ignore
        await dispatch(editUserInfo({firstName:firstName,lastName:lastName,birthday:timeStamp})).unwrap()
        router.push('/(tabs)')
    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, padding: SIZES.large, paddingTop: 150 }}>
            <View style={styles.container}>
                <Text style={styles.header}>Заполните немного информации о себе</Text>
                <Image source={images.defaultAvatar} style={styles.avatar}></Image>
                <View style={styles.inputContainer}>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Имя</Text>
                        <CustomTextInput
                            style={styles.input}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="Nurlan"
                            maxLength={20}
                            styles={{}}
                        ></CustomTextInput>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Фамилия</Text>
                        <CustomTextInput
                            style={styles.input}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="Baitassov"
                            maxLength={20}
                            styles={{}}
                        ></CustomTextInput>
                    </View>
                </View>
                <View style={styles.datePickerBox}>
                    <Text style={styles.label}>Дата рождения</Text>
                    <TouchableOpacity onPress={() => { setShow(true) }}>
                        <CustomTextInput
                            style={[styles.datePicker]}
                            onChangeText={setLastName}
                            value={formatDate(date?date:new Date())}
                            placeholder="Sat Jul 15 2003"
                            maxLength={20}
                            styles={{}}
                            editable={false}
                        ></CustomTextInput>
                    </TouchableOpacity>
                </View>
                {isValid == false && <Text style={{color:'red',fontSize:SIZES.medium}}>Заполните все поля</Text>}
                <Button onPress={onSubmit} buttonStyle={{ width: "100%" }}><Text style={{ color: "#FFF" }}>Авторизоваться</Text></Button>
                {show && <DatePicker
                    date={date ? date : new Date()}
                    handleDateChange={handleDateChange}
                >
                </DatePicker>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 20
    },
    header: {
        fontSize: SIZES.xxLarge,
        color: COLORS.primary,
        fontWeight: '700',
        textAlign: 'center'
    },
    avatar: {
        width: 150,
        height: 150
    },
    inputContainer: {
        flexDirection: "row",
        gap: SIZES.large,
        justifyContent: "space-between"
    },
    inputBox: {
        flex: 1,
        height: 70,
        gap: 5
    },
    label: {
        color: '#000',
        fontSize: SIZES.medium,
        fontWeight: "600",
        marginLeft: 3
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: SIZES.small,
        fontSize: SIZES.medium,
        padding: SIZES.small
    },
    datePickerBox: {
        width: "100%",
        height: "auto"
    },
    datePicker: {
        width: "100%",
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: SIZES.small,
        fontSize: SIZES.medium,
        padding: SIZES.small
    }
})

export default AuthFinal