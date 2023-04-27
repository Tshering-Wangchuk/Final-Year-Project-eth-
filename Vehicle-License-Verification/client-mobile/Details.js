import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";
import { LinearGradient } from 'expo-linear-gradient';


export default function Details() {

const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Not yet scanned');


const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status == 'granted');
  };

//useEffect(()=>{
  //  getBarCodeScannerPermissions();
    
//},[])

const handleBarCodeScanned = async ({type,data}) => {
    setScanned(true);

    const datas = {
      "code": `${data}`
  };

    await fetch('http://10.2.23.64:3001/verificationapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message)
          if (data.message === 'True'){
            setText("Valid License")
          }
          else{
            setText("License Not Valid")
          }
        })
        .catch(error => console.error(error));
    //setText(data);
    //console.log('Type: '+type+'\nData'+ data)
}

if(hasPermission === null){
  console.log('Rendering Requesting for camera permission');
    return(
      <View style={styles.container}>
      <Text style={styles.title}>No permission</Text>
      <Button title='Allow Camera' onPress={()=> getBarCodeScannerPermissions()}/>
   
    </View>
    )
}

// if(hasPermission === false){
//     return(
//         <View style={styles.container}>
//             <Text>No access to camera</Text>
//             
//         </View>
//     )
// }


  return(

    
      <View style={styles.container}>
         <View style={styles.barcodebox}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{height: 500, width: 500}}
            />
         </View>
         <Text style={styles.maintext}>{text}</Text>

         {scanned && <Button title='scan again?' onPress={()=> setScanned(false)} />}
        
      </View>
  )


 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa62b3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'},

  barcodebox: {
    alignItems:'center',
    justifyContent:'center',
    height:500,
    width: 500,
    overflow:'hidden',
    borderRadius: 30,
    backgroundColor: '#a44caf'
  },

  maintext: {
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold'
  }
  });

  
  