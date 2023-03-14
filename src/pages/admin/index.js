// Refactoring need
import { Montserrat }          from '@next/font/google';
import { useRouter }           from 'next/router';
import { useState, useEffect } from 'react';
import axios                   from "axios";

import { notify }         from './../../components/shared/notify/notify';
import { useAppSelector } from '../../redux/hook';
import MainContainer      from '../../components/mainLayout/mainLayout';

import styles from './styles.module.scss';

const font = Montserrat({
    subsets: ['cyrillic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const AdminPage = () => {
    const [doorForm, setDoorForm] = useState({
        name: '',
        price: '',
        makeDate: '',
        addDate: '',
        category: '',
        article: '',
        country: '',
        color: '',
        description: '',
        sizes: [],
        withLeftRight: false,
        material: '',
        construction: '',
        surface: '',
        specs: [],
    });
    const [currentWidthSize, setCurrentWidthSize] = useState('');
    const [currentHeightSize, setCurrentHeightSize] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const currentUser = useAppSelector(state => state.user.currentUser);
    const isAdmin = currentUser.roles?.includes('admin');

    const [count, setCount] = useState(5);
    const router = useRouter();
  
    useEffect(() => {
        if (!isAdmin) {
            setInterval(() => {
              setCount(prevState => prevState - 1);
            }, 1000);
        
            setTimeout (() => {
              router.push('/');
            }, 5000);
        }
    }, []);

    const setDefaultForm = () => {
        setDoorForm({
            name: '',
            price: '',
            makeDate: '',
            addDate: '',
            category: '',
            article: '',
            country: '',
            color: '',
            description: '',
            sizes: [],
            withLeftRight: false,
            material: '',
            construction: '',
            surface: '',
            specs: [],
        });
    };

    const handleUpload = async() => {
        const formData = new FormData();
        formData.append('name', doorForm.name);
        formData.append('price', doorForm.price);
        formData.append('makeDate', doorForm.makeDate);
        formData.append('category', doorForm.category);
        formData.append('article', doorForm.article);
        formData.append('country', doorForm.country);
        formData.append('color', doorForm.color);
        formData.append('description', doorForm.description);
        formData.append('sizes', doorForm.sizes);
        formData.append('withLeftRight', doorForm.withLeftRight);
        formData.append('material', doorForm.material);
        formData.append('construction', doorForm.construction);
        formData.append('surface', doorForm.surface);
        formData.append('specs', doorForm.specs);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            await axios({
                method: 'post',
                url: 'http://localhost:5000/api/doors',
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDefaultForm();
            notify('success', 'Дверь успешно создана');
        } catch (error) {
            console.log(error);
            notify('error', 'При создании двери возникли проблемы');
        }
    };

    const handleImageChange = (e) => {
        if(e.target.files.length !== 0){
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }

    const addSize = () => {
        setDoorForm({...doorForm, sizes: [...doorForm.sizes, `${currentHeightSize} x ${currentWidthSize}`]});
        setCurrentWidthSize('');
        setCurrentHeightSize('');
    };

    return (
        isAdmin ?
            <MainContainer>
                <section className={styles.createForm}>
                    <h1>Создание двери</h1>
                    <div className={styles.wrapper}>
                        <div className={styles.leftSide}>
                            {/* Создать универсальный компонент инпута. */}
                            <input value={doorForm.name} placeholder='Наименование модели' onChange={(e) => setDoorForm({...doorForm, name: e.target.value})} />
                            <input value={doorForm.price} placeholder='Цена' onChange={(e) => setDoorForm({...doorForm, price: e.target.value})} />
                            {/* <input value={doorForm.makeDate} placeholder='Год производства' onChange={(e) => setDoorForm({...doorForm, makeDate: e.target.value})} /> */}
                            <input value={doorForm.category} placeholder='Категория' onChange={(e) => setDoorForm({...doorForm, category: e.target.value})} /> {/* Переделать на селект */} 
                            <input value={doorForm.article} placeholder='Артикул' onChange={(e) => setDoorForm({...doorForm, article: e.target.value})} />
                            <input value={doorForm.country} placeholder='Страна производства' onChange={(e) => setDoorForm({...doorForm, country: e.target.value})} />
                            <input value={doorForm.color} placeholder='Цвет' onChange={(e) => setDoorForm({...doorForm, color: e.target.value})} />
                            <input value={doorForm.description} placeholder='Описание' onChange={(e) => setDoorForm({...doorForm, description: e.target.value})} />
                            {/* Добавить пресеты в соответствии с категорией, возможно, добавляющиеся по выбору категории с возможностью редактирования и удаления. */}
                            <div style={{display: 'flex'}}>
                                <input value={currentHeightSize} placeholder='Высота' onChange={(e) => setCurrentHeightSize(e.target.value)} /> 
                                <input value={currentWidthSize} placeholder='Ширина' onChange={(e) => setCurrentWidthSize(e.target.value)} /> 
                                <button onClick={() => addSize()}>+</button>
                            </div>
                            <div>
                                {doorForm.sizes.map(size => <li key={size}>{size}</li>)}
                            </div>

                            <label>Нужно ли добавить выбор стороны открытия двери?</label>
                            <input type='checkbox' value={doorForm.withLeftRight} onChange={(e) => setDoorForm({...doorForm, withLeftRight: e.target.checked})} />

                            <input value={doorForm.material} placeholder='Материал' onChange={(e) => setDoorForm({...doorForm, material: e.target.value})} />
                            <input value={doorForm.construction} placeholder='Конструкция' onChange={(e) => setDoorForm({...doorForm, construction: e.target.value})} />
                            <input value={doorForm.surface} placeholder='Покрытие' onChange={(e) => setDoorForm({...doorForm, surface: e.target.value})} />
                            <input value={doorForm.specs} placeholder='Характеристики' onChange={(e) => setDoorForm({...doorForm, specs: e.target.value})} /> {/* Такая же фишка, что и с размерами. */} 
                        </div>
                        <div className={styles.rightSide}>
                            <img width={250} src={previewImage} />
                            <input type='file' onChange={(e) => handleImageChange(e)} />
                        </div>
                    </div>
                    <button onClick={handleUpload}>Создать дверь</button>  
                </section>
            </MainContainer>
            :
            <div style={font.style} className='not-found-page'>
                <span>404</span>
                <span></span>
                <div className='not-found-page__message'>
                <p>Страница не найдена</p>
                <p>Переход на главную через {count} секунд</p>
                </div>
            </div>
    );
};

export default AdminPage;
