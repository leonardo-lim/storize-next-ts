import type { ErrorsType, FormInputType } from '../../types/form-input-type';
import type { UserEditType } from '../../types/user-data-type';
import Link from 'next/link';
import { createContext, useState } from 'react';
import { FaArrowLeft, FaArrowUp, FaCity, FaEnvelope, FaGlobe, FaHome, FaMapMarkerAlt, FaPhoneAlt, FaTag, FaUser } from 'react-icons/fa';
import userEditSchema from '../../validations/user-edit-validation';
import UserEditFormInput from './UserEditFormInput';

const FormInputContext = createContext<FormInputType<UserEditType> | null>(null);

const UserEditForm: React.FC = () => {
    const [data, setData] = useState<UserEditType>({
        name: '-',
        phone: '-',
        email: '-',
        username: '-',
        address: '',
        city: '',
        country: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState<ErrorsType>({});

    const validateForm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const result = userEditSchema.validate(data, { abortEarly: false });
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
        <form action="/users/update" method="POST" className="text-lg-start text-center">
            <div className="row">
                <FormInputContext.Provider value={{ data, setData, errors }}>
                    <div className="col-lg-6 col-12">
                        <UserEditFormInput propKey="name" icon={<FaTag className="text-gold" />} readOnly={false} />
                        <UserEditFormInput propKey="phone" icon={<FaPhoneAlt className="text-gold" />} readOnly={false} />
                        <UserEditFormInput propKey="email" icon={<FaEnvelope className="text-gold" />} readOnly={true} />
                        <UserEditFormInput propKey="username" icon={<FaUser className="text-gold" />} readOnly={false} />
                    </div>
                    <div className="col-lg-6 col-12">
                        <UserEditFormInput propKey="address" icon={<FaMapMarkerAlt className="text-gold" />} readOnly={false} />
                        <UserEditFormInput propKey="city" icon={<FaCity className="text-gold" />} readOnly={false} />
                        <UserEditFormInput propKey="country" icon={<FaGlobe className="text-gold" />} readOnly={false} />
                        <UserEditFormInput propKey="zipCode" icon={<FaHome className="text-gold" />} readOnly={false} />
                    </div>
                </FormInputContext.Provider>
            </div>
            <button type="submit" className="btn btn-gold w-100 mb-2" onClick={validateForm}><FaArrowUp /> Update</button>
            <Link href="/users">
                <a className="btn btn-beige w-100"><FaArrowLeft /> Back</a>
            </Link>
        </form>
    );
};

export { FormInputContext };
export default UserEditForm;