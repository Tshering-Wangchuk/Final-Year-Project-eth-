import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Homescreen({ navigation }) {
  return (

    <LinearGradient
    colors={['#6d3c73','#2f2d2f', '#262426', '#141314', '#020202',]}
    style={styles.linearGradient}>

<View style={styles.box1}>
        <Text style={styles.title}>Vehicle License</Text>
        <Text style={styles.title}>Verification</Text>
      </View>

<View style={styles.box1}>
        {/* <Text style={styles.subtitle}>Vehicle License Verification</Text> */}
        <Image source={require('./images/logo.png')}/>
      </View>

      <View style={styles.box2}>
       
        <Text style={styles.subtitle}>This application utilizes blockchain technology to authenticate your driving license. You can easily confirm the validity of your license at any time and from any location by scanning the QR code with your mobile phone.</Text>
        <Button
        title="Verify License"
        onPress={() => navigation.navigate('Scan')}
      />
      </View>

     
  
  </LinearGradient>


  );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
      },
    
      title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#d50ed0',
      },
    
      box1: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        padding: '5%'
    
      },
    
      box2: {
        flex: 2,
        justifyContent: 'center',
        alignItems:'center'
        
      },
      subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        padding: '10%'
      },
});