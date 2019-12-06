import * as yup from 'yup';
const pin =  new RegExp("[0-9]{5}(-[0-9]{4})?");

export const validateProperty = yup.object().shape({    
    AddressLine1: yup
        .string().label('Address').required(),
    AddressLine2: yup
        .string().label('Adress second').required(),
    // City: yup
    //     .string().label('city').required(),
    pincode: yup
        .string()
        .label('pincode')
        .required()
        .matches(pin, 'Pin number is not valid')
});

