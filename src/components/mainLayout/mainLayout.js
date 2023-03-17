// Refactoring need
import { Montserrat } from '@next/font/google';
import { useEffect }  from 'react';
import axios          from 'axios';

import { logOut, setUser } from '../../redux/slices/userSlice';
import { useAppDispatch }  from '../../redux/hook'; 
import CustomHead          from "../head/head";
import Footer              from "../footer/footer";
import Header              from "../header/header";

import styles from './mainLayout.module.scss';

const font = Montserrat({
    subsets: ['cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MainContainer = ({ children, keywords, title, customDescription }) => { 
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && authorization();
    }, []);

    const authorization = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.get('http://localhost:5000/auth/auth', {
                headers: { Authorization: `Bearer ${token}`}
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser(response.data.user));
            });
        } catch (error) {
            dispatch(logOut());
        }
    };

    return (
        <div className={styles.container} style={font.style}>
            <CustomHead 
                keywords={keywords} 
                title={title} 
                customDescription={customDescription}
            />
            <Header />
            {/* {title && <h1>{title}</h1>} */}
            { children }
            <Footer />
        </div>
    );
};

export default MainContainer;
