import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import Footer from './Footer';

interface AmountType {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}

interface LayoutProps {
    children: React.ReactNode;
}

const AmountContext = createContext<AmountType | null>(null);

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

            <AmountContext.Provider value={{ amount, setAmount }}>
                <Background />
                {(asPath !== '/login' && asPath !== '/register') && <Navbar amount={amount} setAmount={setAmount} />}
                <main>{children}</main>
                <Footer />
            </AmountContext.Provider>
        </>
    );
};

export { AmountContext };
export default Layout;