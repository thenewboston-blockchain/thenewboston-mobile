import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
 
import { RNCamera } from 'react-native-camera';
import Style from "./Style"; 
 
const QRCodeScreen = ({ navigation }) => {  
  const [camera, setCamera] = useState(null);   
   
  return ( 
    <View style={Style.container}> 
       <RNCamera
          ref={ref => { 
            setCamera(ref)
          }}
          style={{ 
            width: '100%',
            height: '100%'
          }}  
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          //googleVisionBarcodeType = {GoogleVisionBarcodeType.QR_CODE}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }} 
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            alert(barcodes); 
          }}
          onBarCodeRead = {(e) =>{
            alert(e);  
          }}
        >
        </RNCamera>
    </View>
    );
};

export default QRCodeScreen;
