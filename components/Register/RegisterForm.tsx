import type { ErrorsType, FormInputType } from '../../types/form-input-type';
import type { UserRegisterType } from '../../types/user-data-type';
import Link from 'next/link';
import { createContext, useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaLock, FaPhoneAlt, FaTag, FaUnlock, FaUser, FaUserPlus } from 'react-icons/fa';
import registerSchema from '../../validations/register-validation';
import RegisterFormInput from './RegisterFormInput';

const FormInputContext = createContext<FormInputType<UserRegisterType> | null>(null);

const RegisterForm: React.FC = () => {
    const [data, setData] = useState<UserRegisterType>({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<ErrorsType>({});

    const validateForm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const result = registerSchema.validate(data, { abortEarly: false });
        const { error } = result;

        if (error) {
            e.preventDefault();

            const errorData: ErrorsType = {};

            for (const err of error.details) {
                const name = err.path[0];
                const message = err.message;
                errorData[name] = message;
            }

            setErrors(errorData);
        }
    };

    return (
        <form action="/register" method="POST" className="text-lg-start text-center">
            <FormInputContext.Provider value={{ data, setData, errors }}>
                <RegisterFormInput type="text" propKey="name" icon={<FaTag className="text-gold" />} />
                <RegisterFormInput type="text" propKey="phone" icon={<FaPhoneAlt className="text-gold" />} />
                <RegisterFormInput type="text" propKey="email" icon={<FaEnvelope className="text-gold" />} />
                <RegisterFormInput type="text" propKey="username" icon={<FaUser className="text-gold" />} />
                <RegisterFormInput type="password" propKey="password" icon={<FaUnlock className="text-gold" />} />
                <RegisterFormInput type="password" propKey="confirmPassword" icon={<FaLock className="text-gold" />} />
            </FormInputContext.Provider>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><FaUserPlus /> Register</button>
            <Link href="/login">
                <a className="btn btn-beige w-75"><FaArrowLeft /> Back</a>
            </Link>
        </form>
    );
};

export { FormInputContext };
export default RegisterForm;