import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min'!);
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;