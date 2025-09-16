import { TaskProvider } from "@/context/TaskContext";
import { Stack } from "expo-router";

export default function UntabsLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="addSchedule" options={{ headerShown: false }} />
        <Stack.Screen name="animalDetail" options={{ headerShown: false }} />
        <Stack.Screen
          name="editAnimalDetail"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="satwaData" options={{ headerShown: false }} />
        <Stack.Screen name="schedule" options={{ headerShown: false }} />
        <Stack.Screen
          name="successConfirmation"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="zooMap" options={{ headerShown: false }} />
        <Stack.Screen name="addKandang" options={{ headerShown: false }} />
        <Stack.Screen name="animalList" options={{ headerShown: false }} />
        <Stack.Screen name="addAnimal" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
