import { View, Text, StyleSheet, Image } from 'react-native'
import images from '~/constants/images'
import Rating from './rating'
import { SIZES } from '~/constants/theme'
import formatDate from '~/app/shared/lib/formatData'

interface props {
    text: string,
    username: string,
    date: number,
}

const Comment: React.FC<props> = ({ text, username, date }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={images.defaultAvatar} style={styles.avatar}></Image>
                <Text style={styles.username}> {username}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Rating rating={4} starStyle={{width:12, height:12}} gap={2} ></Rating>
                <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
            <Text style={styles.comment}>
                {text}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40
    },
    container: {
        // padding: SIZES.xSmall,
    },
    userInfo: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        gap: SIZES.large,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: SIZES.small,
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    username: {
        fontSize: SIZES.large
    },
    date: {
        fontSize: SIZES.small,
        fontWeight: '300'
    },
    comment: {
        fontSize: SIZES.medium,
        fontWeight: "400",
    }
})

export default Comment