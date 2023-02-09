import { useState } from 'react';
import axios        from "axios";

import { useAppSelector } from '../../redux/hook';
import MainContainer      from '../../components/mainLayout/mainLayout';
import NotFoundPage       from '../404';

import styles from './styles.module.scss';

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
        material: '',
        construction: '',
        surface: '',
        specs: [],
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { currentUser } = useAppSelector(state => state.user);
    const isAdmin = currentUser.roles?.includes('admin');

    const handleUpload = () => {
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
        formData.append('material', doorForm.material);
        formData.append('construction', doorForm.construction);
        formData.append('surface', doorForm.surface);
        formData.append('specs', doorForm.specs);
        formData.append('image', image);

        try {
            axios.post('http://localhost:5000/api/doors', formData);
            console.log('Дверь успешно создана');
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        if(e.target.files.length !== 0){
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }

    if (!isAdmin) { 
        return <NotFoundPage />
    }

    return (
        <MainContainer>
            <section className={styles.createForm}>
                <h1>Создание двери</h1>
                <div className={styles.wrapper}>
                    <div className={styles.leftSide}>
                        <input value={doorForm.name} placeholder='Наименование модели' onChange={(e) => setDoorForm({...doorForm, name: e.target.value})} />
                        <input value={doorForm.price} placeholder='Цена' onChange={(e) => setDoorForm({...doorForm, price: e.target.value})} />
                        <input value={doorForm.makeDate} placeholder='Год производства' onChange={(e) => setDoorForm({...doorForm, makeDate: e.target.value})} />
                        <input value={doorForm.category} placeholder='Категория' onChange={(e) => setDoorForm({...doorForm, category: e.target.value})} /> {/* Переделать на селект */} 
                        <input value={doorForm.article} placeholder='Артикул' onChange={(e) => setDoorForm({...doorForm, article: e.target.value})} />
                        <input value={doorForm.country} placeholder='Страна производства' onChange={(e) => setDoorForm({...doorForm, country: e.target.value})} />
                        <input value={doorForm.color} placeholder='Цвет' onChange={(e) => setDoorForm({...doorForm, color: e.target.value})} />
                        <input value={doorForm.description} placeholder='Описание' onChange={(e) => setDoorForm({...doorForm, description: e.target.value})} />
                        <input value={doorForm.sizes} placeholder='Размеры' onChange={(e) => setDoorForm({...doorForm, sizes: e.target.value})} /> {/* В поле инпут вводить размер, после нажатия кнопки добавить отражать новосозданный размер, с возможностью дальнейшего удаления. */} 
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
    );
};

export default AdminPage;
