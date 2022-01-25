import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetCategoriesQuery, useDelCategoryByIdMutation, Category } from '../../graphql/graphql';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import Navbar from '../../components/layout/Navbar';
import AddButton from '../../components/buttons/AddButton';
import DangerModal from '../../components/modals/DangerModal';
import { useSwipe } from '../../hooks/useSwipe';
import { animated } from 'react-spring';
import toast from 'react-hot-toast';

interface Props {}

const Categorias: React.FC<Props> = () => {
    const router = useRouter();
    const { data, refetch } = useGetCategoriesQuery();
    const [delCategoryById] = useDelCategoryByIdMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const currentCategory = useRef<Category | undefined>();
    const handleDelete = (categoryId: string) => {
        const category = categories.find((c) => c._id === categoryId);
        currentCategory.current = category;
        setIsOpen(true);
    };
    refetch();
    const deleteCategory = async () => {
        try {
            if (currentCategory.current) {
                await delCategoryById({ variables: { categoryId: currentCategory.current._id } });
                await refetch();
                setIsOpen(false);
                toast.success('Categoría Eliminada');
            }
        } catch (err) {
            toast.error('Error al eliminar la categoría');
            console.error(err);
        }
    };
    useEffect(() => {
        setCategories(data?.categories || []);
    }, [data]);

    const [springs, bind] = useSwipe(categories.length, handleDelete);
    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />

                <h1 className="text-3xl font-semibold text-brown">Categorías</h1>
                <p className="mt-4 text-xs text-center text-gray-500">
                    Desliza a la izquierda para eliminar una categoría
                </p>
                <div>
                    {springs.map(({ x }, i) => (
                        <animated.div
                            key={i}
                            {...bind(i, categories[i]._id)}
                            style={{ x, touchAction: 'pan-y' }}
                        >
                            <ParentCard
                                url_img={categories[i].url_img || undefined}
                                onClick={() =>
                                    router.push(`/chef/updateCategory?id=${categories[i]._id}`)
                                }
                            >
                                <CardInfo
                                    onClick={() =>
                                        router.push(`/chef/updateCategory?id=${categories[i]._id}`)
                                    }
                                >
                                    <CardInfo.Title>
                                        <span>{categories[i].name}</span>
                                    </CardInfo.Title>
                                </CardInfo>
                            </ParentCard>
                        </animated.div>
                    ))}
                </div>
                <AddButton onClick={() => router.push('/chef/addCategory')} />
            </div>
            <DangerModal
                title="Eliminar Categoría"
                description={`Deseas eliminar la categoria "${currentCategory.current?.name}"`}
                isOpen={isOpen}
                dangerBtnTitle="Eliminar"
                onCloseModal={() => setIsOpen(false)}
                onClickDangerBtn={deleteCategory}
            ></DangerModal>
        </ProtectedPage>
    );
};

export default Categorias;
