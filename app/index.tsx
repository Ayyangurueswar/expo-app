import WebView from "react-native-webview";
import { useState, useEffect, useRef } from "react";
import { Platform, BackHandler, Alert, Pressable, Text } from "react-native";

export default function Index() {
  const [redirectState, setRedirectState] = useState('http://tamilmani.in');
  const webViewRef = useRef<WebView>(null);
  const exitApp = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  }
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }
  }, []);
  return (
    <>
    <Pressable style={{marginTop:40, marginLeft:'auto', paddingHorizontal: 20, paddingVertical: 10}} onPress={exitApp}>
      <Text>Exit app</Text>
    </Pressable>
    <WebView 
    style={{flex: 1}}
    source={{uri: redirectState}}
    ref={webViewRef}
    allowsBackForwardNavigationGestures
    originWhitelist={['*']}
    onShouldStartLoadWithRequest={(request)=>{
      if(request.url.includes('/contact')){
        const newURL = "http://tamilmani.in/p/contact.html"
        setRedirectState(newURL);
        return true;
      }
      else if(request.url.includes('/privacy-policy')){
        const newURL = "http://tamilmani.in/p/privacy-policy.html"
        setRedirectState(newURL);
        return true;
      }
      else if(request.url.includes('/terms-and-conditions')){
        const newURL = "http://tamilmani.in/p/terms-and-conditions.html"
        setRedirectState(newURL);
        return true;
      }
      else if(request.url.includes('/disclaimer')){
        const newURL = "http://tamilmani.in/p/disclaimer.html"
        setRedirectState(newURL);
        return true;
      }
      setRedirectState(request.url);
      return true;
    }}/>
    </>
  );
}