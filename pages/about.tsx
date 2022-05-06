import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FaBox, FaExchangeAlt, FaUser } from 'react-icons/fa';

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - About</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    <div className="col-lg-5 col-12">
                        <Image src="/img/scrolling.png" alt="Scrolling" width="100%" height="100%" layout="responsive" priority />
                    </div>
                    <div className="col-lg-7 col-12">
                        <div className="row mb-3">
                            <h1>Storize</h1>
                            <p>Storize is an online shopping site for people who love to shop. Storize provides a wide range of goods at affordable prices. Storize was founded in 2020 and has become a trusted shopping site for people all over the world. Currently, Storize is the number one online shopping site, especially in Indonesia.</p>
                        </div>
                        <div className="row">
                            <div className="col-4 text-center">
                                <h1><FaBox size={56} className="text-gold" /></h1>
                                <h2>100m+</h2>
                                <h6>products sold</h6>
                            </div>
                            <div className="col-4 text-center">
                                <h1><FaExchangeAlt size={56} className="text-gold" /> </h1>
                                <h2>50m+</h2>
                                <h6>transactions done</h6>
                            </div>
                            <div className="col-4 text-center">
                                <h1><FaUser size={56} className="text-gold" /></h1>
                                <h2>1m+</h2>
                                <h6>actived users</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;