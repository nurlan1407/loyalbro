import { View, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import { SIZES } from '../../../constants/theme';
import { advertMati, advertRedPart, advertWestCash } from '../../../constants/backrounds';


const adverts = [
    { img: advertMati },
    { img: advertRedPart },
    { img: advertWestCash }
  ]
  
export default function Adverts() {
    return (
        <View>
            <FlatList
                style={{ marginTop: SIZES.small, marginBottom: SIZES.small }}
                data={adverts}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ width: 200, height: 150 }}>
                        <ImageBackground source={item.img} imageStyle={{ borderRadius: 20 }} style={{ flex: 1, height: "100%", width: "100%" }} resizeMode='contain'></ImageBackground>
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