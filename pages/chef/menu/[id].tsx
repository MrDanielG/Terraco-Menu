import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddButton from '../../../components/buttons/AddButton';
import ParentCard from '../../../components/card/ParentCard';
import CardInfo from '../../../components/card/CardInfo';
import CardActions from '../../../components/card/CardActions';
import CategoryBar from '../../../components/CategoryBar';
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar';
import SearchBar from '../../../components/SearchBar';
import { useGetMenyByIdQuery } from '../../../graphql/graphql';
import { formatDinero, intlFormat } from '../../../lib/utils';
import BackButton from '../../../components/buttons/BackButton';

interface Props {}

const categoryData = [
    {
        name: 'Platillos',
        url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Bebidas',
        url: 'https://images.unsplash.com/photo-1599225745889-5697ac8ed5d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80',
    },
    {
        name: 'Postres',
        url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Ensaladas',
        url: 'https://images.unsplash.com/photo-1595670002930-b30d563cf121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1490&q=80',
    },
];

const MenuDetail = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const { data } = useGetMenyByIdQuery({
        variables: {
            menuByIdId: id?.toString() || ""
        }
    });
    const menu = data?.menuById || null;
    
    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <BackButton  text="Inicio" pathNameOnBack="/chef" />
                <h1 className="font-semibold text-3xl text-brown">
                    {
                        menu && menu.title
                    }
                </h1>
                <p>
                    {
                        menu && menu.description
                    }
                </p>
                <div>
                    {
                        menu && menu.dishes.map(dish =>
                            <ParentCard
                                url_img={ dish.url_img?.toString() }
                                key={dish._id}
                            >
                                <CardInfo>
                                    <CardInfo.Title>
                                        {
                                            dish.name
                                        }
                                    </CardInfo.Title>
                                    <CardInfo.Footer>
                                        {
                                            intlFormat(dish.price, 'es-MX')
                                        }
                                    </CardInfo.Footer>
                                </CardInfo>
                            </ParentCard>
                        )
                    }
                </div>


                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal
                isOpen={isOpen}
                title="Agrega Platillos al Menú"
                closeModal={() => setIsOpen(false)}
                onCloseModal={() => console.log('Modal clsed')}
                closeBtnTitle="Cerrar"
            >
                <div>
                    <SearchBar />

                    <CategoryBar data={categoryData} />

                    <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

                    <ParentCard />
                </div>
            </Modal>
        </>
    );
};

export default MenuDetail;
