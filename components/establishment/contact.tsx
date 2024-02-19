import React from 'react'
import { ContactType, EstContact } from '~/entities/establishment/types'
import { View, Text, Linking, Image } from 'react-native'
import { SIZES } from '~/constants/theme'
import icons from '~/constants/icons'

interface ContactProps {
    contact: EstContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {


    function onPhonePress(number: string) {
        Linking.openURL(`tel:${number}`)
    }

    switch (contact.type) {
        case ContactType.MAIL:
            return (
                <View style={{ flexDirection: 'row', gap: SIZES.small, marginBottom: SIZES.small }}>
                    <Image width={24} height={24} source={icons.email}></Image>
                    {/* <Feather name="phone-call" size={24} color="black" /> */}
                    <Text onPress={() => { onPhonePress('+77054753526') }} style={{ textDecorationLine: 'underline', fontSize: SIZES.medium }}>{contact.value}</Text>
                </View>
            )
        case ContactType.INSTAGRAM:
            return (
                <View style={{ flexDirection: 'row', gap: SIZES.small, marginBottom: SIZES.small }}>
                    <Image width={24} height={24} source={icons.instagram_contact}></Image>
                    {/* <Feather name="phone-call" size={24} color="black" /> */}
                    <Text style={{ textDecorationLine: 'underline', fontSize: SIZES.medium }}>{contact.value}</Text>
                </View>
            )
        case ContactType.WHATSAPP:
            return (
                <View style={{ flexDirection: 'row', gap: SIZES.small, marginBottom: SIZES.small }}>
                    <Image width={24} height={24} source={icons.phone}></Image>
                    {/* <Feather name="phone-call" size={24} color="black" /> */}
                    <Text onPress={() => { onPhonePress('+77054753526') }} style={{ textDecorationLine: 'underline', fontSize: SIZES.medium }}>{contact.value}</Text>
                </View>
            )
    }

}

export default Contact;