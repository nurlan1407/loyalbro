import { View, Text, Image, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React, { useState } from 'react'
import images from '~/constants/images'
import icons from '~/constants/icons'
import { SIZES, COLORS } from '~/constants/theme'

const WriteComment = () => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1)
    const [currentRating, setCurrentRating] = useState(0)
    const onRatingSelect = (value: number) => {
        setCurrentRating(value)
    }

    const [text, setText] = useState('');
    return (
        <View>
            <View style={styles.credentials}>
                <Image style={{width:40,height:40}} source={images.defaultAvatar}></Image>
                <Text style={{ fontSize: SIZES.large }}>Username lasname</Text>
            </View>
            <View style={styles.bigStarsContainer} >
                {stars.map((star) =>
                    <TouchableOpacity
                        style={[styles.bigStar,]}
                        onPress={() => {
                            setCurrentRating(star)
                        }}
                    >
                        <Image source={icons.ratingFilled} style={{ width: 40, height: 40, tintColor: currentRating >= star ? 'red' : 'lightgray' }}></Image>
                    </TouchableOpacity>
                )}
            </View>
            <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4} // You can adjust the number of lines
                onChangeText={setText}
                value={text}
                placeholder="Type something..."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    credentials: {
        flexDirection: 'row',
        alignItems:'flex-start',
        gap: SIZES.large,
    },

    bigStarsContainer: {
        paddingStart: 20,
        paddingEnd: 20,
        flex: 5,
        height: 60,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    bigStar: {
        flex: 1,
    },
    textArea: {
        height: 100, // Adjust the height as needed
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top' // For aligning text to the top
    }
})


export default WriteComment