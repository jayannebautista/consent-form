import { StyleSheet } from 'react-native';
const BLACK = '#000000';
const WHITE = '#FFF';
const GREY = '#CCC';
export const styles = StyleSheet.create({
    main: {
        backgroundColor: WHITE,
        flex: 1,
    },
    container: {
        padding: 40,
        marginTop: 30,
        position: 'relative'
    },
    center: {
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: BLACK,
        fontWeight: '500',
        marginBottom: 20
    },
    form: {
        padding: 20
    },
    label: {
        fontSize: 20,
        color: BLACK
    },
    formDiv: {
        marginVertical: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: GREY,
        marginVertical: 5,
    },
    placeholder: {
        color: GREY
    },
    btnRight: {
        width: 160,
        alignSelf: 'flex-end',
        padding: 15,
    },
    btnGrey: {
        backgroundColor: GREY,
        height: 45,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    consentDiv: {
        marginVertical: 20,
    },
    consentText: {
        fontSize: 20,
        color: BLACK,
        textAlign: 'justify'
    },
    microphone: {
        backgroundColor: GREY,
        borderRadius: 40,
        padding: 20
    },
    btnContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
    },
    customBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customBtnInner: {

        flexDirection: 'row',
        alignItems: 'center'
    },
    customBtnText: {
        marginRight: 5,
        fontSize: 16
    }

});