import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BackButton from '../../components/buttons/BackButton';
import BigButton from '../../components/buttons/BigButton';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { useAddCategoryMutation } from '../../graphql/graphql';
import UploadImgWidget, { uploadImage } from '../../components/UploadImgWidget';

interface Props {}
interface CategoryData {
    name: string;
}
const AddCategory: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryData>();
    const [addCategoryMutation, { loading }] = useAddCategoryMutation();

    const onSubmit: SubmitHandler<CategoryData> = async ({ name }, e) => {
        try {
            if (!!!imgFile) return;
            const urlImg = await uploadImage(imgFile);
            await addCategoryMutation({
                variables: {
                    name,
                    urlImg,
                },
            });
            toast.success('Categría Creada');
            e?.target.reset();
            router.push('/chef/categorias');
        } catch (err) {
            console.error(err);
            toast.error('Error al Crear la Categoría');
        }
    };

    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown mb-8">Crear Categoría</h1>

                <BackButton text="Regresar" pathNameOnBack="/chef/categorias" />

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
                            placeholder="Postres"
                        />
                        {errors.name && (
                            <span className="text-sm ml-2 text-red-600 text-center">
                                Nombre requerido
                            </span>
                        )}
                    </div>

                    <BigButton text="Crear Categoría" isDisabled={loading || !!!imgFile} />
                </form>
                {children}
            </div>
        </ProtectedPage>
    );
};

export default AddCategory;
