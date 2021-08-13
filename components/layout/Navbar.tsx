import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, MouseEventHandler, useState } from 'react';
import { HiMenuAlt1, HiOutlineBookOpen, HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
/* import { useLocalStorage } from '../hooks/useLocalStorage'; */
interface Props {
    itemsQty?: string;
    onClick?: MouseEventHandler<HTMLDivElement> | any;
    canRedirect?: boolean;
}

const Navbar = (props: Props) => {
    const router = useRouter();
    const { currentUser, logOut } = useAuth();
    const [open, setOpen] = useState(false);

    /* const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
     *     tableId: "",
     *     items: [],
     * });
     * const items = currentOrder.items; */
    const handleMyOrderClick = () => {
        if (props.itemsQty !== null && props.canRedirect) {
            router.push('/newOrder');
        }
    };
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center ">
                <HiMenuAlt1
                    onClick={() => setOpen(true)}
                    className="cursor-pointer text-brown text-2xl"
                />
                {currentUser?.name === 'Chef' && (
                    <figure>
                        <Image
                            src="/assets/images/chef_icon.webp"
                            alt="Chef Icon"
                            width="40"
                            height="40"
                        />
                    </figure>
                )}

                {currentUser?.name === 'Manager' && (
                    <figure>
                        <Image
                            src="/assets/images/admin_icon.webp"
                            alt="Manager Icon"
                            width="40"
                            height="40"
                        />
                    </figure>
                )}

                {currentUser === null && (
                    <div
                        className="rounded-lg bg-orange flex gap-2 px-2 py-1 max-w-sm cursor-pointer"
                        onClick={props.onClick || handleMyOrderClick}
                    >
                        <HiOutlineBookOpen className="text-2xl text-white" />
                        <p className="text-white">{props?.itemsQty || ''}</p>
                    </div>
                )}
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 overflow-hidden"
                    open={open}
                    onClose={setOpen}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                            <button
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <HiX className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-lg font-medium text-center text-orange">
                                                Logo
                                            </Dialog.Title>
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <ul className="text-center">
                                                    {currentUser === null && (
                                                        <>
                                                            <li className="my-8">
                                                                <Link href="/">
                                                                    <a>Inicio</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/login">
                                                                    <a>Iniciar Sesión</a>
                                                                </Link>
                                                            </li>
                                                        </>
                                                    )}
                                                    {currentUser?.name === 'Chef' && (
                                                        <>
                                                            <li className="my-8">
                                                                <Link href="/chef">
                                                                    <a>Menús</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/chef/dashboard">
                                                                    <a>Panel de Pedidos</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/chef/platillos">
                                                                    <a>Platillos</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <a
                                                                    className="cursor-pointer"
                                                                    onClick={logOut}
                                                                >
                                                                    Cerrar Sesión
                                                                </a>
                                                            </li>
                                                        </>
                                                    )}

                                                    {currentUser?.name === 'Manager' && (
                                                        <>
                                                            <li className="my-8">
                                                                <Link href="/manager">
                                                                    <a>Inicio</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/manager/stats/dishes">
                                                                    <a>Estadísticas Platillos</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/manager/stats/sells">
                                                                    <a>Estadísticas Ventas</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <Link href="/manager/tables">
                                                                    <a>Mesas</a>
                                                                </Link>
                                                            </li>
                                                            <li className="my-8">
                                                                <a
                                                                    className="cursor-pointer"
                                                                    onClick={logOut}
                                                                >
                                                                    Cerrar Sesión
                                                                </a>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default Navbar;