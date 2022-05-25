interface UserDataType {
    name: string;
    phone: string;
    email: string;
    username: string;
}

interface UserRegisterType extends UserDataType {
    password: string;
    confirmPassword: string;
}

interface UserEditType extends UserDataType {
    address: string;
    city: string;
    country: string;
    zipCode: string;
}

interface UserLoginType {
    username: string;
    password: string;
}

export type { UserDataType, UserRegisterType, UserEditType, UserLoginType };