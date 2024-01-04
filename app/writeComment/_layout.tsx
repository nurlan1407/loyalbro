import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="WriteComment"  options={{ headerShown: true, headerTitle: "EstablishmentIndex" }} ></Stack.Screen>
        </Stack>
    )

}