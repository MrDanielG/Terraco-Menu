import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BackButton from '../../components/buttons/BackButton';
import BigButton from '../../components/buttons/BigButton';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '../../graphql/graphql';
import UploadImgWidget, { uploadImage } from '../../components/UploadImgWidget';

interface Props {}
interface CategoryData {
    name: string;
}
const UpdateCategory: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { id } = router.query;
    const categoryId = id?.toString() || '';
    const { data } = useGetCategoryByIdQuery({
        variables: { categoryId },
    });
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imgURL, setImgURL] = useState(data?.categoryById.url_img);
    useEffect(() => {
        setImgURL(data?.categoryById.url_img);
        setValue('name', data?.categoryById.name || '');
    }, [data]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm<CategoryData>({ mode: 'onChange', defaultValues: { name: 'hola' } });
    const [loading, setLoading] = useState(false);
    const [updateCategory] = useUpdateCategoryMutation();

    const onSubmit: SubmitHandler<CategoryData> = async ({ name }, e) => {
        try {
            setLoading(true);
            let urlImg = imgURL || '';
            if (!!imgFile) {
                urlImg = await uploadImage(imgFile);
            }
            await updateCategory({
                variables: {
                    categoryId,
                    name,
                    urlImg,
                },
            });
            toast.success('Categría Actualizada');
            e?.target.reset();
            router.push('/chef/categorias');
        } catch (err) {
            console.error(err);
            toast.error('Error al Crear la Categoría');
            setLoading(false);
        }
    };
    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown mb-8">Editar Categoría</h1>

                <BackButton text="Regresar" pathNameOnBack="/chef/categorias" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center items-center flex-col">
                        <div className="my-3">
                            <UploadImgWidget onChange={setImgFile} initURL={imgURL} />
                        </div>
                        {!!!imgURL && (
                            <span className="text-sm my-2 text-red-600 text-center">
                                Imagen requerida
                            </span>
                        )}
                    </div>
                    <div className="my-3">
                        <label className="text-gray-600 ml-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            {...register('name', {
                                required: true,
                            })}
                            id="name"
                            name="name"
                            type="text"
                            className="appearance-none rounded-3xl relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-light focus:border-brown-light focus:z-10 sm:text-sm "
                            placeholder="Ejemplo: Postres"
                        />
                        {errors.name && (
                            <span className="text-sm ml-2 text-red-600 text-center">
                                Nombre requerido
                            </span>
                        )}
                    </div>

                    <BigButton
                        text="Actualizar Categoría"
                        isDisabled={!isValid || loading || !!!imgURL}
                    />
                </form>
                {children}
            </div>
        </ProtectedPage>
    );
};

export default UpdateCategory;
