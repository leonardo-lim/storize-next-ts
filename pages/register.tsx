import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import RegisterForm from '../components/Register/RegisterForm';

const Register: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - Register</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 d-flex align-items-center text-black">
                    <div className="col-lg-6 col-12 mt-3">
                        <div className="w-75 d-block m-auto">
                            <Image src="/img/rocket.png" alt="Rocket" width="100%" height="100%" layout="responsive" priority />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 my-5">
                        <h1 className="mb-3 text-lg-start text-center">Register</h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;