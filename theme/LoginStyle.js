import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleWrapper: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 10
    },

    ColoredText: {
        fontSize: 30,
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        marginBottom: 40
    },
    orLoginUsing: {
        marginTop: 50,
        alignItems: 'center',
    },
    
});

export default LoginStyle;
