import {useState} from 'react'

const useForm = (validate) => {

    const [values, setValues] = useState({
        userName: '',
        email: '',
        comment: ''
    });

    const emptyValues = () => {
        setValues({
            userName: '',
            email: '',
            comment: ''
        })
    };

    const [errors,setErrors] = useState({});
    const emptyErrors = () => {
        setErrors({})
    };

    const handleChange = e => {

        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    async function handleSubmit() {

        setErrors(validate({values}));

    };

    return { handleChange, values, setValues, errors,emptyErrors,emptyValues, handleSubmit }



};
export default useForm;
