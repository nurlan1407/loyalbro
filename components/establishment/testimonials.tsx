import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import icons from '~/constants/icons'
import { COLORS, SIZES } from '~/constants/theme'
import Comment from './establishmentDetails/comment'
import LinkButton from '~/shared/ui/LinkButton'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import WriteComment from '~/components/establishment/writeComment'

const LOREM = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime fuga iure, quod, illo quo ullam animi, atque eum eveniet recusandae voluptatum quia officia dolore quas libero. Asperiores nobis modi ut.
Atque quas error numquam blanditiis! Corrupti veritatis facere ex debitis possimus similique aperiam nulla eos enim. Ullam adipisci error totam exercitationem blanditiis qui inventore, nemo id libero maxime corrupti possimus!`

const comments = [{
    text: LOREM, username: "NUrlan", date: Date.now(),

}, {
    text: LOREM, username: "NUrlan", date: Date.now(),

}, {
    text: LOREM, username: "NUrlan", date: Date.now(),

}]

export default function Testimomials() {
    const screenHeight = Dimensions.get('screen').height
    const stars = Array.from({ length: 5 }, (_, i) => i + 1)
    const [isStarsTouching, setIsStarsTouching] = useState(false)
    const [currentRating, setCurrentRating] = useState(0)
    const onTouchStart = (value: number) => {
        setCurrentRating(value)
        setIsStarsTouching(true)
    }
    const onTouchEnd = () => {
        setIsStarsTouching(false)
    }
    const [isModalVisible, setIsModalVisible] = useState(false)
    return (
        <>
            <WriteComment isVisible={isModalVisible} height={screenHeight*0.3} closeModal={()=>{setIsModalVisible(false)}}></WriteComment>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontWeight: "800", fontSize: 40, textAlign: "center" }}>4,8</Text>
                    <Text style={{ color: 'gray', textAlign: 'center', fontSize: SIZES.large }}>438 отзывов</Text>
                </View>
                <View style={{ flex: 1, gap: 1 }}>
                    <View style={styles.ratingContainer}>
                        <Text>5</Text>
                        <Image source={icons.ratingFilled} style={styles.star} />
                        <View style={styles.bar}></View>
                        <Text style={styles.ratingValue}>20</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text>4</Text>
                        <Image source={icons.ratingFilled} style={styles.star} />
                        <View style={styles.bar}></View>
                        <Text style={styles.ratingValue}>47</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text>3</Text>
                        <Image source={icons.ratingFilled} style={styles.star} />
                        <View style={styles.bar}></View>
                        <Text style={styles.ratingValue}>84</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text>2</Text>
                        <Image source={icons.ratingFilled} style={styles.star} />
                        <View style={styles.bar}></View>
                        <Text style={styles.ratingValue}>457</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text>1</Text>
                        <Image source={icons.ratingFilled} style={styles.star} />
                        <View style={styles.bar}></View>
                        <Text style={styles.ratingValue}>4</Text>
                    </View>
                </View>
            </View>
            <View style={{ gap: SIZES.medium, padding: SIZES.medium }}>
                <View style={{ gap: 10, }}>
                    <View>
                        <Text style={{ fontSize: SIZES.large, fontWeight: "500" }}>Оцените заведение</Text>
                        <Text style={{ fontSize: SIZES.medium, fontWeight: "400" }}>Поделитесь своим мнением</Text>
                    </View>
                    <View style={styles.bigStarsContainer} >
                        {stars.map((star) =>
                            <TouchableOpacity
                                style={[styles.bigStar,]}
                                onPressIn={() => { onTouchStart(star) }}
                                onPress={() => { setIsModalVisible(true) }}
                                onPressOut={onTouchEnd}
                            >
                                <Image source={icons.ratingFilled} style={{ width: 60, height: 60, tintColor: isStarsTouching && currentRating >= star ? COLORS.primary : 'lightgray' }}></Image>
                            </TouchableOpacity>
                        )}
                    </View>
                    <LinkButton buttonStyle={{ paddingTop: 15 }} onPress={() => { }} title={'Написать отзыв'}></LinkButton>
                </View>

                {comments.map((comment) =>
                    <Comment text={comment.text} date={comment.date} username={comment.username}></Comment>
                )}
            </View >
        </>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: SIZES.large,
        padding: SIZES.medium,
    },
    bigStarsContainer: {
        flex: 5,
        height: 60,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    bigStar: {
        flex: 1,
    },
    star: {
        width: 18,
        height: 18,
        flex: 1,
        tintColor: COLORS.primary
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.small,
        height: 24,
        flex: 1,
    },
    ratingText: {
        color: 'gray',
        fontSize: SIZES.small,
        flex: 1,
    },
    bar: {
        flex: 10,
        height: 5,
        backgroundColor: 'lightgray'
    },
    barFilled: {
        width: '75%',
        backgroundColor: COLORS.primary
    },
    ratingValue: {
        flex: 2
    }
})