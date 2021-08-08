import { useRouter } from 'next/router';
import BigButton from '../../components/BigButton';
import Navbar from '../../components/Navbar';
import { enUS } from '../../lib/i18n/enUS';
import { esMX } from '../../lib/i18n/esMX';

interface Props {}

const AddMenu = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'es-MX' ? esMX : enUS;

    return (
        <div className="bg-gray-200 p-8 h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown mb-8">
                Crear Menú
            </h1>

            <div className="rounded-md shadow-sm">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        {t.login.email}
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-3xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm my-3"
                        placeholder={t.login.email}
                    />
                </div>

                <textarea
                    className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-orange focus:ring focus:ring-orange focus:ring-opacity-50"
                    rows={3}
                    placeholder="Descripcion"
                ></textarea>
            </div>

            <BigButton
                text="Agregar Menu"
                onClick={() => console.log('add Menu')}
            />
        </div>
    );
};

export default AddMenu;
