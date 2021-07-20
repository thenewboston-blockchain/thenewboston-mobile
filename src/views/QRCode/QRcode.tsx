import { Colors, Custom, Typography } from "styles";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Style from "./Style"; 
import { useSelector, useDispatch} from 'react-redux';
import {Account, Bank} from 'thenewboston' 
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { ProtocolAction, IpAddressAction, PortAction, NickNameAction } from '../../actions/loginActions'
import LinearGradient from 'react-native-linear-gradient';
import InfoModalWidget from "../../components/InfoModalWidgets/InfoModalview";
 
const QRCodeScreen = ({ navigation }) => {  
  const [camera, setCamera] = useState(null);   
  const dispatch = useDispatch(); 
  const validator_IpAddress = "54.219.183.128"
  const [dlgVisible, setDlgVisible] = useState(false)
  const [dlgMessage, setDlgMessage] = useState("") 
  const onSuccess = (e) => {
     console.log(e.data)
  };

  async function tryConnect(barcodes) {
    if(barcodes != null && barcodes.length > 0 && barcodes[0].url != null){
      try{   
        let bank_url = barcodes[0].protocol + '://' + barcodes[0].ipAddress + ':' + barcodes[0].port;
        const bank = new Bank(bank_url);  
        const accounts = await bank.getAccounts();  
        let validator_rul = barcodes[0].protocol + validator_IpAddress  
        const validator_bank = new Bank(validator_rul);  
        const Aaccount = await validator_bank.getAccounts({ limit: 1, offset: 0 }); 
        var validator_accounts = [];
        let account_size = Aaccount.count; 
        for(let i = 0; i < account_size; i+=100){
          const part_accounts = await validator_bank.getAccounts({ limit: 100, offset: i });  
          validator_accounts = [...validator_accounts, ...part_accounts.results]; 
        }  
  
        dispatch(ProtocolAction(barcodes[0].protocol));
        dispatch(IpAddressAction(barcodes[0].ipAddress))
        dispatch(NickNameAction(barcodes[0].nickName))
        dispatch(PortAction(barcodes[0].port)) 
        navigation('login', {
          nickname: barcodes[0].nickName,
          accounts: accounts,
          validator_accounts: validator_accounts,
          bank_url: bank_url, 
        });  
      } catch(err){ 
        setDlgMessage(err);
        setDlgVisible(true)
        console.log(err)
      }
    }
  }
   
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
          onGoogleVisionBarcodesDetected={({ barcodes }) => tryConnect(barcodes)}
          onBarCodeRead = {(e) =>{
            alert(e);  
          }}
        >
        </RNCamera>
        {/* <QRCodeScanner 
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
               <View style={Style.cameraRatioBackground}>

               </View> 
            </TouchableOpacity>
          }
      /> */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={dlgVisible}  
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}
        
      >
         <BlurView
          style={Style.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
             
         <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['rgba(29, 39, 49, 0.9)', 'rgba(53, 96, 104, 0.9)']} style={Style.doInofContainer}>
            <InfoModalWidget 
                    title={""}
                    message={dlgMessage} 
                    button={"Ok"} 
                    handleOk={() => {
                    setDlgVisible(false);
                }} />
        </LinearGradient> 
        
        
      </Modal>
    </View>
    );
};

export default QRCodeScreen;
