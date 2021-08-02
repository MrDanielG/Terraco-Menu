import { useRouter } from 'next/router';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';

interface Props {}

const Login = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'es-MX' ? esMX : enUS;

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

                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    {t.login.email}
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm my-3"
                                    placeholder={t.login.email}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    {t.login.password}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm my-3"
                                    placeholder={t.login.password}
                                />
                            </div>
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
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange hover:bg-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
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
