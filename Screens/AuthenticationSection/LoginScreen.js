import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput, Button, StyleSheet, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { GetPhoneOTP, GetSignIn, GetSignUp } from '../../FirebaseHandler/FirebaseAuthHandler';
import { STATUS } from '../../Constants/API_RESPONSE_HANDLER';
import PagerView from 'react-native-pager-view';
import { CommonActions } from '@react-navigation/native';

const LoginComponent = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState(null)

    const HandleOtp = async () => {

        const result = await GetPhoneOTP("+919167637866")

        if (result.status == STATUS.SUCCESS) {
            navigation.navigate("OtpScreen", { confirmationResult: result.data })
        }
        else {
            Alert.alert(result.message)
        }
    }


    const SignInRoute = () => {

        const [email, setEmail] = useState(null)
        const [password, setPassword] = useState(null)

        const HandleSignIn = () => {
            GetSignIn(email, password).then((response)=>{
                if(response.status == STATUS.FAILED){
                    Alert.alert(response.message)
                    return
                }
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'HomeScreen' }],
                    })
                  );
            })
        }        
        return <View style={styles.scene}>
            <Text>Email</Text>
            <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail}/>
            <Text>Password</Text>
            <TextInput style={styles.input} placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign In" onPress={() => HandleSignIn()} />

            
            <View style={{flexDirection:"row", alignSelf:"center", marginTop:20}}>
                    <Text>Forget your password ? </Text>
                    <Pressable onPress={()=>{}}><Text style={{color:"blue"}}>Click Here</Text></Pressable>
                </View>
        </View>
    }

    const SignUpRoute = () => {

        const [email, setEmail] = useState(null)
        const [password, setPassword] = useState(null)
        
        const HandleSignUp = () => {
            GetSignUp(email, password).then((response)=>{
                if(response.status == STATUS.FAILED){
                    Alert.alert(response.message)
                    return
                }
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'HomeScreen' }],
                    })
                  );

            })
        }   


        return <View style={styles.scene}>
            <Text>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter Email" />
            <Text>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry />
            <Button title="Sign Up" onPress={() => HandleSignUp()} />
        </View>
    }

    const [index, setIndex] = useState(0);

    const pagerViewRef = useRef(null);

    const handlePageChange = (event) => {
        setIndex(event.nativeEvent.position); // Update the current page index
    };

    return (

        <KeyboardAvoidingView style={styles.parentContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.tabStyle}>
                    <Pressable style={styles.tabButtonStyle} onPress={() => { pagerViewRef.current?.setPage(0) }}>
                        <Text>SIGN IN</Text>
                    </Pressable>
                    <Pressable style={styles.tabButtonStyle} onPress={() => { pagerViewRef.current?.setPage(1) }}>
                        <Text>SIGN UP</Text>
                    </Pressable>
                </View>
                <View style={styles.tabStyle}>
                    <View style={[styles.tabIndicatorStyle, { height: (index == 0 ? 3 : 0) }]} />
                    <View style={[styles.tabIndicatorStyle, { height: (index == 1 ? 3 : 0) }]} />
                </View>
                <PagerView
                    ref={pagerViewRef}
                    style={styles.pagerViewContainer}
                    initialPage={index}
                    onPageSelected={handlePageChange}
                    
                >
                    <SignInRoute />

                    <SignUpRoute />



                </PagerView>


            </ScrollView>

        </KeyboardAvoidingView>

    );
};


const styles = StyleSheet.create({



    parentContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    },
    tabStyle:{ flexDirection: "row", marginHorizontal: 10 },
    tabButtonStyle:{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 12 },
    tabIndicatorStyle:{ flex: 1, backgroundColor: "green",  },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Center the content when the keyboard is hidden
        padding: 20,
    },
    pagerViewContainer: {
        height: "40%",
        justifyContent: "center",

    },
    PhoneNumberStyle: {
        borderColor: "black",
        margin: 10,
        borderWidth: 1
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    tabBar: {
        backgroundColor: '#fff',
    },
    tabLabel: {
        fontWeight: 'bold',
        color: '#000',
    },
    indicator: {
        backgroundColor: '#000',
    },
})
export default LoginComponent;