import { useRouter }             from 'next/router';
import { useState, useEffect }   from 'react';

import { useAppSelector }        from '../../../redux/hook';
import Loader                    from '../loader/loader';

const Loading = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { globalLoading } = useAppSelector(state => state.app);

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

    return (loading || globalLoading) && (
        <Loader />
    );
};

export default Loading;
