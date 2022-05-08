import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import LoginForm from '../components/Login/LoginForm';

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - Login</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 d-flex align-items-center text-black">
                    <div className="col-lg-6 col-12">
                        <div className="w-75 d-block m-auto">
                            <Image src="/img/motorcycle.png" alt="Motorcycle" width="100%" height="100%" layout="responsive" priority />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 my-5">
                        <h1 className="mb-3 text-lg-start text-center">Login</h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;