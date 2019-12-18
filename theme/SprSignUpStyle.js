import {StyleSheet} from 'react-native';

const SprSignUpStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    titleWrapper: {
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 50
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
        marginTop: 30,
        alignItems: 'center',
    },
    
});


export default SprSignUpStyle;