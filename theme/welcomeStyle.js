import {StyleSheet} from 'react-native';

const WelcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 50
    },
    titleText : {
        display: 'flex',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
    },
    ColoredText: {
        color: '#2c3e50',
        fontFamily: "'Roboto', sans-serif",
    },
    inputWrapper: {
        alignSelf: 'center'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 5,
        width: "90%",
        alignSelf:'center',
        marginTop: 20,
        elevation: 2,
        zIndex: 3,
        borderRadius: 4
      },
      linearGradient1: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "90%",
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 10,
        elevation: 2,
        zIndex: 3,
        elevation: 5,
        marginTop: 20,
        borderRadius: 4
      },
      buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        width: '100%',
        color: '#ffffff',
        fontWeight: 'bold'
      },
    
    signup: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
    },
    text: {
        color: '#262626',
        fontSize: 18,
        margin: 10, 
        fontWeight: 'bold',
        width:"100%",
        textAlign: 'center'
    },
    terms: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    termsText: {
        fontSize: 16,
        margin: 10, 
        width:"100%",
        textAlign: 'center',
        color: '#2c3e50'
    }
});

export default WelcomeStyle;
