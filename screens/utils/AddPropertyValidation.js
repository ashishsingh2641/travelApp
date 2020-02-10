import * as yup from 'yup';
const pin =  new RegExp("[0-9]{5}(-[0-9]{4})?");
const pwd = new RegExp("/^[a-zA-Z0-9]+$/");
export const validateProperty = yup.object().shape({  
    ownerName: yup
    .string().label('name').required(),
    address1: yup
        .string().label('Address').required(),
    address2: yup
        .string().label('Adress second').required(),
    // City: yup
    //     .string().label('city').required(),
    pinCode: yup
        .string()
        .label('pincode')
        .required()
        .matches(pin, 'Pin number is not valid'),
    landmark: yup
        .string().label('landmark').required(),
    price: yup
        .number()
        .label('price')
        .required(),
    });

