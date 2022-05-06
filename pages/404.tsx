import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaFrown } from 'react-icons/fa';

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - Not Found</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    <div className="col-lg-6 col-12">
                        <div className="w-75 d-block m-auto">
                            <Image src="/img/scrolling.png" alt="Scrolling" width="100%" height="100%" layout="responsive" priority />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 text-lg-start text-center">
                        <h1 className="status">4 <FaFrown /> 4</h1>
                        <h5>Looks like the page you're looking for doesn't exist</h5>
                        <Link href="/">
                            <a className="btn btn-gold mt-3"><FaArrowLeft /> Go Back</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;