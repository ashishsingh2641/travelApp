import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleWrapper: {
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 10
    },

    ColoredText: {
        fontSize: 25,
        textTransform: 'capitalize',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        lineHeight: 60
    },
    orLoginUsing: {
        marginTop: 50,
        alignItems: 'center',
    },
    
});

export default LoginStyle;
