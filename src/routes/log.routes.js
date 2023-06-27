import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/login';
import { Sign } from '../screens/sign';

const Stack = createNativeStackNavigator();

function LogRoutes() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Sign" 
          component={Sign} 
          options={{
            headerShown: false
          }}
        />
    </Stack.Navigator>
  );
}

export {LogRoutes};
