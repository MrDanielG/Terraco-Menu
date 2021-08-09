import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';

interface Props {}

interface IFormInput {
    email: string;
    password: string;
}

const Login = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'es-MX' ? esMX : enUS;
    const { logIn } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
        try {
            setLoading(true);
            await logIn(email, password);
            toast.success('Sesión Iniciada');
        } catch (err) {
            console.error(err);
            toast.error('Error al Iniciar Sesion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="h-screen bg-cover flex items-center justify-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
            }}
        >
            <div className="flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
                <div className="max-w-md w-full space-y-8 m-3">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {t.login.title}
                        </h2>
                    </div>

                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    {t.login.email}
                                </label>
                                <input
                                    {...register('email', {
                                        required: true,
                                    })}
                                    id="email-address"
                                    type="email"
                                    autoComplete="email"
                                    className="rounded-3xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm my-3"
                                    placeholder={t.login.email}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <span className="text-sm text-red-600">
                                    Correo es requerido
                                </span>
                            )}

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    {t.login.password}
                                </label>
                                <input
                                    {...register('password', {
                                        required: true,
                                        minLength: 8,
                                    })}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="rounded-3xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm my-3"
                                    placeholder={t.login.password}
                                />
                            </div>
                            {errors.password && (
                                <span className="text-sm text-red-600">
                                    Contraseña es requerida y al menos 8
                                    caracteres
                                </span>
                            )}
                        </div>

                        <div className="text-sm text-center">
                            <a
                                href="#"
                                className="font-medium text-orange hover:text-orange-dark"
                            >
                                {t.login.forgot}
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-orange hover:bg-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
                            >
                                {t.login.button}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
