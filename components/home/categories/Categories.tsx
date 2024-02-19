import { StyleSheet, Touchable } from 'react-native';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { SIZES } from '../../../constants/theme';
import { firstBg, secondBg, beauty, food, accessories, cloth, foodBg, clothBg, beautyBg, accessoriesBg } from '../../../constants/backrounds';
import { LinearGradient } from 'expo-linear-gradient';


const categories = [
    { title: "Красота и Здоровье", img: { src: beauty, size: 70 }, bg: '#01DCBA', bgImg: beautyBg },
    { title: "Аксессуары", img: { src: accessories, size: 90 }, bg: '#3d7af3', bgImg: accessoriesBg },
    { title: "Еда", img: { src: food, size: 90 }, bg: '#dc6401', bgImg: foodBg },
    { title: "Одежда", img: { src: cloth, size: 90 }, bg: '#dc7a01', bgImg: clothBg }
]


export default function Catergories() {

    return (
        <View>
            <Text style={styles.title}>Категории</Text>
            <FlatList
                style={styles.categoriesContainer}
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <ImageBackground source={item.bgImg} imageStyle={{
                            borderTopLeftRadius: 40,
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                            borderTopRightRadius: 100,
                        }} style={styles.categorieItem} resizeMode='cover'>
                            <Text style={{ width: '70%', color: "#FFF", fontSize: SIZES.large, padding: SIZES.small }}>{item.title}</Text>
                            <Image source={item.img.src} resizeMode='contain' style={{ width: item.img.size, height: item.img.size, position: 'absolute', right: 20, bottom: 5 }} />
                        </ImageBackground>
                    </TouchableOpacity>

                )}
                horizontal
                keyExtractor={item => item.title}
                contentContainerStyle={{ columnGap: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: '700',
        paddingLeft: SIZES.small,
        color: "gray",
        alignSelf: "flex-start",

    },
    categorieItem: {
        flex: 1,
        position: 'relative',
        width: 190,
        height: 120,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 100,

    },
    categoriesContainer: {
        marginTop: SIZES.small,
        marginBottom: SIZES.small,
    },

    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        // Add your text styling here
    },
});
