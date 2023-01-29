import { useRouter }             from 'next/router';
import { useState, useEffect }   from 'react';

import Loader                    from '../components/shared/loader/loader';
import MainContainer             from '../components/mainLayout/mainLayout';

import '../styles/global.scss';

const Loading = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    return loading && (
        <Loader />
    );
};

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Loading />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
