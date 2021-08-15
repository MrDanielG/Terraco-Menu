import { MXN } from '@dinero.js/currencies';
import { dinero } from 'dinero.js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import BackButton from '../../components/buttons/BackButton';
import BigButton from '../../components/buttons/BigButton';
import UploadImgWidget, { uploadImage } from '../../components/UploadImgWidget';
import {
    DishDataInput,
    useAddDishMutation,
    useAddDishToMenuMutation,
    useGetMenusQuery,
} from '../../graphql/graphql';

interface Props {}
interface IAddDishInput extends DishDataInput {
    prepTime: string[];
    menusId: [{ value: string; label: string }];
    selectCategories: [{ value: string; label: string }];
}

const AddDish = (props: Props) => {
    const router = useRouter();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [loadingRequests, setLoadingRequests] = useState(false);
    const { data, loading: loadingMenus } = useGetMenusQuery();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddDishInput>();
    const menusOpts = data?.menus.map((menu) => {
        return {
            value: menu._id,
            label: menu.title,
        };
    });
    const timeValues = [5, 10, 15, 20, 25, 30, 35, 40, 50, 60];
    const timeOpts = timeValues.map((time) => {
        return {
            value: time,
            label: time,
        };
    });
    const categoryValues = ['Comida', 'Bebida', 'Postre', 'Entrada', 'Licor'];
    const categoryOpts = categoryValues.map((category) => {
        return {
            value: category,
            label: category,
        };
    });
    const [addDishMutation] = useAddDishMutation();
    const [addDishToMenuMutation] = useAddDishToMenuMutation();

    const onSubmit: SubmitHandler<IAddDishInput> = async (
        { name, description, price, selectCategories, prepTime, menusId },
        e
    ) => {
        try {
            setLoadingRequests(true);
            const prepValue = prepTime as any;
            const myCategories = selectCategories.map((category) => {
                return category.value;
            });
            if (!imgFile) return;
            const url_img = await uploadImage(imgFile);
            console.log(url_img);

            const addDishData: DishDataInput = {
                name,
                description,
                url_img,
                price: dinero({ amount: +price, currency: MXN }),
                categories: myCategories,
            };

            const res = await addDishMutation({ variables: { addDishData } });
            const dishId = res.data?.addDish._id;

            const menusIds = menusId.map((menu) => menu.value);
            const promises = menusIds.map((menuId) => {
                return addDishToMenuMutation({
                    variables: {
                        addDishToMenuIdDish: dishId!,
                        addDishToMenuIdMenu: menuId,
                    },
                });
            });

            await Promise.all(promises);
            toast.success('Platillo Creado');
            e?.target.reset();
            router.push('/chef/platillos');
        } catch (err) {
            console.error(err);
            toast.error('Error al Crear Platillo');
            setLoadingRequests(false);
        }
    };

    return (
        <div className="bg-gray-200 p-8 min-h-screen">
            <BackButton text="Regresar" pathNameOnBack="/chef/platillos" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center items-center flex-col">
                    <div className="my-3">
                        <UploadImgWidget onChange={setImgFile} />
                    </div>
                    {!imgFile && (
                        <span className="text-sm my-2 text-red-600 text-center">
                            Imagen requerida
                        </span>
                    )}
                </div>

                <div className="my-3">
                    <label htmlFor="name" className="text-gray-600 ml-2">
                        Nombre del Platillo
                    </label>
                    <input
                        {...register('name', {
                            required: true,
                        })}
                        id="name"
                        name="name"
                        type="text"
                        className="appearance-none rounded-3xl relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-light focus:border-brown-light focus:z-10 sm:text-sm "
                        placeholder="Sopa Azteca"
                    />
                    {errors.name && (
                        <span className="text-sm ml-2 text-red-600 text-center">
                            Nombre requerido
                        </span>
                    )}
                </div>

                <div className="my-3">
                    <label htmlFor="price" className="text-gray-600 ml-2">
                        Precio
                    </label>
                    <input
                        {...register('price', {
                            required: true,
                        })}
                        id="price"
                        name="price"
                        type="number"
                        className="appearance-none rounded-3xl relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-light focus:border-brown-light focus:z-10 sm:text-sm "
                        min="1"
                        placeholder="90.00"
                    />
                    {errors.name && (
                        <span className="text-sm ml-2 text-red-600 text-center">
                            Precio requerido
                        </span>
                    )}
                </div>

                <div className="my-3">
                    <label className="text-gray-600 ml-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        {...register('description', {
                            required: true,
                        })}
                        id="description"
                        className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-brown-light focus:ring focus:ring-brown-light focus:ring-opacity-50"
                        placeholder="Platillo con..."
                        rows={3}
                    ></textarea>
                    {errors.description && (
                        <span className="text-sm ml-2 text-red-600 text-center">
                            Descripción requerida
                        </span>
                    )}
                </div>

                <div className="my-3">
                    <label className="text-gray-600 ml-2" htmlFor="menu">
                        Categorías
                    </label>
                    <Controller
                        name="selectCategories"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isMulti
                                placeholder="Bebida, Postre, etc."
                                className="mt-2"
                                id="categories"
                                name="categories"
                                options={categoryOpts}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 30,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'brown',
                                    },
                                })}
                            />
                        )}
                    />
                </div>

                <div className="my-3">
                    <label className="text-gray-600 ml-2" htmlFor="menu">
                        Agregar a Menu
                    </label>
                    <Controller
                        name="menusId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isMulti
                                placeholder="Menus disponibles"
                                className="mt-2"
                                id="menu"
                                name="menu"
                                options={menusOpts}
                                isLoading={loadingMenus}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 30,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'brown',
                                    },
                                })}
                            />
                        )}
                    />
                </div>

                <div className="my-3">
                    <label className="text-gray-600 ml-2" htmlFor="time">
                        Tiempo de Preparación
                    </label>
                    <Controller
                        name="prepTime"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Mins aprox"
                                className="mt-2"
                                id="time"
                                name="time"
                                options={timeOpts}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 30,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'brown',
                                    },
                                })}
                            />
                        )}
                    />
                </div>

                <BigButton text="Agregar Platillo" isDisabled={loadingRequests || !imgFile} />
            </form>
        </div>
    );
};

export default AddDish;
