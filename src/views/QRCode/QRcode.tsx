import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Style from "./Style"; 
 
const QRCodeScreen = ({ navigation }) => {  
  const [camera, setCamera] = useState(null);   
  const onSuccess = (e) => {
     console.log(e.data)
  };
   
  return ( 
    <View style={Style.container}> 
       {/* <RNCamera
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
        </RNCamera> */}
        <QRCodeScanner 
          onRead={onSuccess} 
          topContent={
            <Text style={Style.centerText}>
              Go to{' '}
              <Text style={Style.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={Style.buttonTouchable}>
              <Text style={Style.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
      />
    </View>
    );
};

export default QRCodeScreen;
