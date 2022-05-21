import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const disableReactDevTools = () => {
        const noop = () => undefined;
        const DEV_TOOLS = (window as unknown as Record<string, Record<string, unknown>>).__REACT_DEVTOOLS_GLOBAL_HOOK__;

        if (typeof DEV_TOOLS === 'object') {
            for (const [key, value] of Object.entries(DEV_TOOLS)) {
                DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
            }
        }
    };

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min'!);
        disableReactDevTools();
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;