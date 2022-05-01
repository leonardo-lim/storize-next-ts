import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [amount, setAmount] = useState<number>(0);
    const { asPath } = useRouter();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="E Commerce Web App with Next.js and TypeScript" />
            </Head>

            {(asPath !== '/login' && asPath !== '/register') && <Navbar amount={amount} setAmount={setAmount} />}
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;