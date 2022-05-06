import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const Tagline = styled.h1`
    font-size: 4vw;
`;

const Img = styled.img`
    width: auto;
    height: 35vh;

    @media (min-width: 576px) {
        & {
            width: auto;
            height: 50vh;
        }
    }

    @media (min-width: 992px) {
        & {
            width: auto;
            height: 65vh;
        }
    }
`;

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    <div className="col-lg-7 col-12">
                        <Tagline>Your reliable and</Tagline>
                        <Tagline>most updated</Tagline>
                        <Tagline>shopping site</Tagline>
                        <Link href="/products">
                            <a className="btn btn-gold mt-3">Explore <FaArrowRight /></a>
                        </Link>
                    </div>
                    <div className="col-lg-5 col-12">
                        <Img src="/img/scrolling.png" className="d-block ms-auto" alt="Scrolling" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;