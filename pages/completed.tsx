import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const Completed: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - Completed</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 pt-5 d-flex align-items-center">
                    <div className="col text-center">
                        <h1 className="text-beige"><FaCheck size={140} /></h1>
                        <h2 className="text-gold">Order completed</h2>
                        <p className="text-beige">Your order will be immediately processed by the seller.</p>
                        <Link href="/products">
                            <a className="btn btn-gold mb-3">Shop again <FaArrowRight /></a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Completed;