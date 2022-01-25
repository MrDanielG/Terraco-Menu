import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BackButton from '../../components/buttons/BackButton';
import BigButton from '../../components/buttons/BigButton';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { MenuDataInput, useAddMenuMutation } from '../../graphql/graphql';

interface Props {}

const AddMenu = (props: Props) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MenuDataInput>();
    const [addMenuMutation, { loading }] = useAddMenuMutation();

    const onSubmit: SubmitHandler<MenuDataInput> = async ({ title, description }, e) => {
        try {
            await addMenuMutation({
                variables: {
                    addMenuData: { title, description, isActive: true },
                },
            });
            toast.success('Menú Creado');
            e?.target.reset();
            router.push('/chef');
        } catch (err) {
            console.error(err);
            toast.error('Error al Crear Menú');
        }
    };

    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown mb-8">Crear Menú</h1>

                <BackButton text="Regresar" pathNameOnBack="/chef" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-3">
                        <label className="text-gray-600 ml-2" htmlFor="title">
                            Nombre
                        </label>
                        <input
                            {...register('title', {
                                required: true,
                            })}
                            id="title"
                            name="title"
                            type="text"
                            className="appearance-none rounded-3xl relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-light focus:border-brown-light focus:z-10 sm:text-sm "
                            placeholder="Menú Mexicano"
                        />
                        {errors.title && (
                            <span className="text-sm ml-2 text-red-600 text-center">
                                Título requerido
                            </span>
                        )}
                    </div>

                    <div className="my-3">
                        <label className="text-gray-600 ml-2" htmlFor="description">
                            Descripción:
                        </label>
                        <textarea
                            {...register('description', {
                                required: true,
                            })}
                            id="description"
                            className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-brown-light focus:ring focus:ring-brown-light focus:ring-opacity-50"
                            placeholder="Menú con temática..."
                            rows={3}
                        ></textarea>
                        {errors.description && (
                            <span className="text-sm ml-2 text-red-600 text-center">
                                Descripción requerida
                            </span>
                        )}
                    </div>

                    <BigButton text="Agregar Menu" isDisabled={loading} />
                </form>
            </div>
        </ProtectedPage>
    );
};

export default AddMenu;
