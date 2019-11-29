import * as yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


const validation = yup.object().shape({
    // firstName: yup
    // .string().label('firstName').required(),
    // lastName: yup
    // .string().label('lastName').required(),
    // email: yup
    //     .string()
    //     .label('Email')
    //     .email()
    //     .required(),
    // password: yup
    //     .string()
    //     .label('Password')
    //     .required()
    //     .min(2, 'Seems a bit short...')
    //     .max(15, 'We prefer insecure system, try a shorter password.'),
    //     phnNumber: yup
    //         .string()
    //         .label('Phone Number')
    //         .required()
    //         .matches(phoneRegExp, 'Phone number is not valid')
});

export default validation;

