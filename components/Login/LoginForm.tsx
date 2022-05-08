import Link from 'next/link';
import { createContext, useState } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaLock, FaSignInAlt, FaUser } from 'react-icons/fa';
import loginSchema from '../../validations/login-validation';
import LoginFormInput from './LoginFormInput';

const RegisterLink = styled.a`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

interface DataType {
    username: string;
    password: string;
}

interface ErrorsType {
    [name: string]: string;
}

interface FormInputType {
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    errors: ErrorsType;
}

const FormInputContext = createContext<FormInputType | null>(null);

const LoginForm: React.FC = () => {
    const [data, setData] = useState<DataType>({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState<ErrorsType>({});

    const validateForm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const result = loginSchema.validate(data, { abortEarly: false });
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
        <form action="/login" method="POST" className="text-lg-start text-center">
            <FormInputContext.Provider value={{data, setData, errors}}>
                <LoginFormInput type="text" propKey="username" icon={<FaUser className="text-gold" />} />
                <LoginFormInput type="password" propKey="password" icon={<FaLock className="text-gold" />} />
            </FormInputContext.Provider>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><FaSignInAlt /> Login</button>
            <Link href="/">
                <a className="btn btn-beige w-75 mb-3"><FaArrowLeft /> Back</a>
            </Link>
            <p>Don't have an account? <Link href="/register" passHref><RegisterLink className="register-link text-gold">Register</RegisterLink></Link></p>
        </form>
    );
};

export { FormInputContext };
export default LoginForm;