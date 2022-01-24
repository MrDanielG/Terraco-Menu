import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetCategoriesQuery } from '../../graphql/graphql';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import Navbar from '../../components/layout/Navbar';
import AddButton from '../../components/buttons/AddButton';
interface Props {}

const Categorias: React.FC<Props> = () => {
    const router = useRouter();
    const { data, refetch } = useGetCategoriesQuery();
    useEffect(() => {
        refetch();
    }, [refetch]);
    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />

                <h1 className="text-3xl font-semibold text-brown">Categorías</h1>
                <div>
                    {data ? (
                        data.categories.map((cat, i) => (
                            <ParentCard key={i} url_img={cat.url_img || undefined}>
                                <CardInfo>
                                    <CardInfo.Title>
                                        <span>{cat.name}</span>
                                    </CardInfo.Title>
                                </CardInfo>
                            </ParentCard>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <AddButton onClick={() => router.push('/chef/addCategory')} />
            </div>
        </ProtectedPage>
    );
};

export default Categorias;
