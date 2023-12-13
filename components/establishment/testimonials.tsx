import { View, Text, StyleSheet, Image } from 'react-native'
import icons from '~/constants/icons'
import { COLORS, SIZES } from '~/constants/theme'


export default function Testimomials() {
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontWeight: "800", fontSize: 40, textAlign: "center" }}>4,8</Text>
                <Text style={{ color: 'gray', textAlign: 'center', fontSize: SIZES.large }}>438 отзывов</Text>
            </View>
            <View style={{ flex: 1, gap: SIZES.xSmall }}>
                <View style={styles.ratingContainer}>
                    <Text>5</Text>
                    <Image source={icons.star} style={styles.star} />
                    <View style={styles.bar}></View>
                    <Text>20</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text>4</Text>
                    {/* <Image source={icons.star} style={styles.star}/> */}
                    <View style={styles.bar}></View>
                    <Text>47</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text>3</Text>
                    {/* <Image source={icons.star} style={styles.star} /> */}
                    <View style={styles.bar}></View>
                    <Text>84</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text>2</Text>
                    {/* <Image source={icons.star} style={styles.star} /> */}
                    <View style={styles.bar}></View>
                    <Text>457</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text>1</Text>
                    {/* <Image source={icons.star} style={styles.star} /> */}
                    <View style={styles.bar}></View>
                    <Text>4</Text>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: SIZES.large,
        padding: SIZES.medium,
    },
    star: {
        width: 18,
        height: 18,
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: SIZES.small,
        height: 24,
        flex: 1,
    },
    ratingText: {
        color: 'gray',
        fontSize: SIZES.small,
        flex: 1,
    },
    bar: {
        flex: 8,
        height:7,
        backgroundColor: 'gray'
    },
    barFilled: {
        width: '75%',
        backgroundColor: COLORS.primary
    }
})