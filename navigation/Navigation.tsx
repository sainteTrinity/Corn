import React, { useEffect } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import MoviesScreen from '../screens/MoviesScreen';
import { Home, User2, Users2, Clapperboard, LayoutList} from 'lucide-react-native';
import FriendsNavigator from './FriendsNavigator';
import { useSelector } from 'react-redux';
import ConnectionNavigation from './ConnectionNavigation';
import UsersNavigator from './UserNavigator';
import { getValueFor } from '../utils/secureStore';
import { useDispatch } from 'react-redux';
import { setUserConnected, setUser } from '../redux/actions/userActions';
import Loader from '../components/Loader';




const Navigation = () => {
  // @ts-ignore
  const userConnected = useSelector(state => state.appReducer.userConnected)
  const dispatch = useDispatch();



  useEffect(() => {
    getValueFor("userConnected").then((res) => {
      const connected = true ? res === "true" : false;
      
      if(connected){
        getValueFor("user").then((res) => {
          const user = JSON.parse(res);
          dispatch(setUser(user));
        }).then(() => {
        
          dispatch(setUserConnected(connected));
        })
      }
    })

    

  }, [userConnected])

  

  if(userConnected){


    const Tab = createBottomTabNavigator();

    return (

      <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: screenOptions.tabBarStyle,
          tabBarIcon: ({ focused, color, size }) => {
           
            size = 30;

            if (route.name === 'Home') {
              return <View style={screenOptions.tabView}>
                
                  <Clapperboard size={size} color={color}   />
                </View>
            }
            else if (route.name === "Movie"){
              return <View style={screenOptions.tabView}><LayoutList size={size} color={color} /></View>
            }
            else if(route.name === "FriendsNavigator"){
              return <View style={screenOptions.tabView}>
                      <Users2 size={size} color={color} />
                    </View>
            }

            // You can return any component that you like here!
            return <View><Home size={size} color={color} /></View>;
          },
          tabBarActiveTintColor: '#34D1BF',
          tabBarItemStyle: screenOptions.tabBarItemStyle,
          tabBarInactiveTintColor: '#17645B',
          
        })}
      > 
        <Tab.Screen name="Movie" component={UsersNavigator}
          options={{
            title:"",
            
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen}
          
          options={{
            title:"",
            
          }}
        />
        <Tab.Screen name="FriendsNavigator" component={FriendsNavigator}
          options={{
            title:"",
            
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>  
    )

        }
        else{
          return <ConnectionNavigation />
        }

}




const screenOptions = {
    tabBarStyle:{
      padding:14,
      paddingBottom:20,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      
      //margin:25,
      //backgroundColor:'rgba(171, 35, 70,  1)',
      backgroundColor:'black',
      height:70,
      borderTopWidth:1,
      borderTopColor:'#3d3d3d',
    },
    tabBarItemStyle:{
      margin:5,
      marginBottom:0,
      borderRadius:10,
      height:40,
      width:30,
  
    },
    tabView:{
      
    },
  };


export default Navigation