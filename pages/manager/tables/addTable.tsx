import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BackButton from '../../../components/buttons/BackButton';
import BigButton from '../../../components/buttons/BigButton';
import Navbar from '../../../components/Navbar';
import { useGenerateTableMutation } from '../../../graphql/graphql';

interface IFormValues {
    tableName: string;
}

const AddTable = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>();
    const [generateTableMutation, { loading }] = useGenerateTableMutation();

    const onSubmit: SubmitHandler<IFormValues> = async ({ tableName }, e) => {
        try {
            await generateTableMutation({
                variables: { generateTableName: tableName },
            });
            toast.success('Mesa Creada');
            e?.target.reset();
            router.push('/manager/tables');
        } catch (err) {
            console.error(err);
            toast.error('Error al Crear Mesa');
        }
    };

    return (
        <div className="bg-gray-200 p-8 h-auto min-h-screen">
            <Navbar />

            <BackButton text="Regresar" pathNameOnBack="/manager/tables" />

            <h1 className="font-semibold text-3xl text-brown ml-1">
                Crear Mesa
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                    <label htmlFor="name" className="text-gray-600 ml-2">
                        Nombre del Platillo
                    </label>
                    <input
                        {...register('tableName', {
                            required: true,
                        })}
                        id="tableName"
                        name="tableName"
                        type="text"
                        className="appearance-none rounded-3xl relative block w-full px-3 py-2 my-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown-light focus:border-brown-light focus:z-10 sm:text-sm "
                        placeholder="Mesa del Sol"
                    />
                    {errors.tableName && (
                        <span className="text-sm ml-2 text-red-600 text-center">
                            Nombre de Mesa requerido
                        </span>
                    )}
                </div>

                <BigButton text="Agregar Mesa" isDisabled={loading} />
            </form>
        </div>
    );
};
export default AddTable;
