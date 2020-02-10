import {StyleSheet} from 'react-native';

const WelcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    termsText: {
        fontSize: 16,
        margin: 10, 
        width:"100%",
        textAlign: 'center',
        color: '#2c3e50'
    }
});

export default WelcomeStyle;
