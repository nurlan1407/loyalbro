import React, { useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { COLORS, SIZES } from "~/constants/theme";
import CustomTextInput from "~/shared/ui/TextInput";
import images from "~/constants/images";
import Button from "~/shared/ui/Button";
import DatePicker from "~/components/DatePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import formatDate from "~/shared/lib/formateDate";

const AuthFinal: React.FC = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDat, setBirthday] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        console.log(event.type);
        
        if (event.type == 'set') {
            const currentDate = selectedDate
            setDate(currentDate!)
            setShow(false)
        } else {
            setShow(false)
        }
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
                            value={formatDate(date)}
                            placeholder="Sat Jul 15 2003"
                            maxLength={20}
                            styles={{}}
                            editable={false}
                        ></CustomTextInput>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => { }} buttonStyle={{ width: "100%" }}><Text style={{ color: "#FFF" }}>Авторизоваться</Text></Button>

                {show && <DatePicker
                    date={date}
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