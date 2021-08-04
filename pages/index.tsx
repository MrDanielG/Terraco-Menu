import { useRouter } from 'next/router';
import ParentCard from '../components/card/ParentCard';
import CategoryBar from '../components/CategoryBar';
import SearchBar from '../components/SearchBar';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';

export default function Home() {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'es-MX' ? esMX : enUS;

    const handleLanguageToggle = (myLocale: 'en-US' | 'es-MX') => {
        console.log('hola');
        switch (myLocale) {
            case 'es-MX':
                router.push('/', '/', { locale: 'en-US' });
                break;

            case 'en-US':
                router.push('/', '/', { locale: 'es-MX' });
                break;

            default:
                break;
        }
    };

    return (
        <div className="bg-gray-200 p-8">
            <h1 className="font-semibold text-3xl text-brown">Menú</h1>

            <SearchBar />

            <CategoryBar />

            <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

            <ParentCard />
        </div>
    );
}
