import { Tabs } from "expo-router";
import { View, Text, Platform, StyleSheet, ViewStyle, ImageStyle } from "react-native";
import { Image } from "expo-image";
import icons from "../../constants/icons";
import { COLORS } from "../../constants/theme";
import { TouchableOpacity } from "react-native"
import { useNavigation } from "expo-router";




export default function TabLayout() {
  const navigate = useNavigation()
  const handlePress = (route: string) => {
    navigate.navigate(route)
  }
  return (
    <Tabs

      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: 72,
          elevation: 0,
          backgroundColor: COLORS.white
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarLabel: "",
          headerShown: true,
          headerTitle: "Home",
      
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity onPress={() => {/* handle action */ }}>
                {/* Replace `icon1` with your icon */}
                <Image source={icons.faq} style={{ width: 25, height: 25, marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* handle action */ }}>
                {/* Replace `icon1` with your icon */}
                <Image source={icons.search} style={{ width: 25, height: 25, marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* handle action */ }}>
                {/* Replace `icon1` with your icon */}
                <Image source={icons.menu} style={{ width: 25, height: 25, marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          ),

          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress('index')}
                style={{
                  alignItems: "center",
                  paddingTop: 16,
                  borderTopColor: focused ? COLORS.primary : COLORS.white,
                  borderTopWidth: 2
                }}>
                <Image
                  source={focused ? icons.dashboard : icons.dashboardOutline}
                  contentFit="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Home</Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "",
          tabBarLabel: "",
          headerShown: true,
          headerTitle: "Cards",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <Image
                  source={focused ? icons.card : icons.cardOutline}
                  contentFit="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Cards</Text>
              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="exchange"
        options={{
          tabBarLabel: "",
          headerShown: true,
          headerTitle: "exchange",
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                width: Platform.OS == "ios" ? 50 : 60,
                height: Platform.OS == "ios" ? 50 : 60,
                top: Platform.OS == "ios" ? -10 : -20,
                borderRadius: Platform.OS == "ios" ? 25 : 30,
              }}>
                <Image
                  source={icons.waves}
                  contentFit="contain"
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: COLORS.white
                  }}
                />
              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="loans"
        options={{
          tabBarLabel: "",
          headerShown: true,
          headerTitle: "Loans",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={viewStyle({ focused: focused })}>
                <Image
                  source={focused ? icons.moneyBag : icons.moneyBagOutline}
                  contentFit="contain"
                  style={imageStyle({ focused: focused })}
                />
                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Loans</Text>
              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "",
          headerShown: true,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={viewStyle({ focused: focused })}>
                <Image
                  source={icons.setting}
                  contentFit="contain"
                  style={imageStyle({ focused: focused })}
                />
                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Settings</Text>
              </View>
            )
          }
        }}
      />
    </Tabs>
  );
}


interface Styleprops {
  focused: boolean
}


const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 72,
    elevation: 0,
    backgroundColor: COLORS.white
  },
  icon: {
    height: 24,
    width: 24,
  },

})

const imageStyle = (props: Styleprops): ImageStyle => ({
  height: 24,
  width: 24,
  tintColor: props.focused ? COLORS.primary : COLORS.black,
})

const viewStyle = (props: Styleprops): ViewStyle => ({
  alignItems: "center",
  paddingTop: 16,
  borderTopColor: props.focused ? COLORS.primary : COLORS.white,
  borderTopWidth: 2
})