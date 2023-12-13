import { StyleSheet, Touchable } from 'react-native';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image, ScrollView, Dimensions } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme';
import icons from '~/constants/icons'
import { Catergories, Adverts, EstablishMents } from '../../components/home';
import { EstablishmentDemo } from '~/types/Establishment';

export default function TabOneScreen() {

  const windowWidth = Dimensions.get("window").width;


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Adverts></Adverts>
          <Catergories></Catergories>
          <View style={[styles.cardContainer, { paddingBottom: 50 }]}>
            <Text style={[styles.title, { paddingLeft: 0, paddingBottom: 10 }]} >Все Магазины</Text>
            <EstablishMents></EstablishMents>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50
  },
  cardContainer: {
    flexDirection: "column",
    padding: SIZES.small
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: '700',
    paddingLeft: SIZES.small,
    color: "gray",
    alignSelf: "flex-start",

  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    // Add your text styling here
  },
});

