// Refactoring need
import { Montserrat }                 from '@next/font/google';
import { useEffect }                  from 'react';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import axios                          from 'axios';

import { logOut, setUser } from '../../redux/slices/userSlice';
import { setCartDoors }    from '../../redux/slices/cartSlice';
import { setUniqueUserId } from '../../redux/slices/appSlice';
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
    const basePath = process.env.NEXT_PUBLIC_API_LINK;

    // Вынести в санки.
    const createCart = async(uniqueUserId) => {
        try {
            axios.post(`${basePath}/api/cart`, {uniqueUserId: uniqueUserId})
                .then(response => {
                    dispatch(setCartDoors(response.data[0].cartDoors));
                });
        } catch (error) {}
    };

    // Вынести в санки.
    const getCart = async(uniqueUserId) => {
        try {
            axios.get(`${basePath}/api/cart/${uniqueUserId}`)
                .then(response => {
                    dispatch(setCartDoors(response.data[0].cartDoors));
                });
        } catch (error) {}
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && authorization();

        if (!localStorage.getItem('uniqueUserId')) {
            const uniqueUserId = `${uuidv4()}-${uuidv1()}`;
            localStorage.setItem('uniqueUserId', uniqueUserId);
            dispatch(setUniqueUserId(uniqueUserId));
            createCart(uniqueUserId);
        } else {
            const uniqueUserId = localStorage.getItem('uniqueUserId');
            dispatch(setUniqueUserId(uniqueUserId));
            getCart(uniqueUserId);
        }
    }, []);

    // Вынести в санки.
    const authorization = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.get(`${basePath}/api/auth`, {
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
            { children }
            <Footer />
        </div>
    );
};

export default MainContainer;
