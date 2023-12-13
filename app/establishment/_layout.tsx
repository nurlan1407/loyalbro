import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:true, headerTitle:"EstablishmentIndex"}} ></Stack.Screen>
            <Stack.Screen name="[id]" options={{headerTitle:"DETAIL"}}></Stack.Screen>
        </Stack>
    )
}