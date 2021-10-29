import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';

const paymentTypes = [
    {
        type: 'Efectivo',
        text: 'Un mesero vendrá y traerá tu ticket impreso con el monto a pagar',
    },
    {
        type: 'Tarjeta',
        text: 'Un mesero traerá la terminal para que puedas realizar tu pago',
    },
];

interface Props {
    isOpen: boolean;
    tableId: string;
    onCloseModal: () => any;
}

const PaymentModal = (props: Props) => {
    const router = useRouter();
    const cancelButtonRef = useRef(null);
    const [selected, setSelected] = useState(paymentTypes[0]);

    return (
        <Transition.Root show={props.isOpen} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.onCloseModal}
            >
                <div className="flex items-end justify-center min-h-screen pt-20 px-4 pb-60 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <HiExclamation
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            ¿Cómo deseas pagar?
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Estás apunto de solicitar tu pago y cerrar tu cuenta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-4 py-8">
                                <div className="w-full max-w-md mx-auto">
                                    <RadioGroup value={selected} onChange={setSelected}>
                                        <RadioGroup.Label className="sr-only">
                                            Server size
                                        </RadioGroup.Label>
                                        <div className="space-y-2">
                                            {paymentTypes.map((plan) => (
                                                <RadioGroup.Option
                                                    key={plan.type}
                                                    value={plan}
                                                    className={({ active, checked }) =>
                                                        `${
                                                            active
                                                                ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white bg-mygreen'
                                                                : ''
                                                        } ${
                                                            checked
                                                                ? 'bg-sky-900 bg-opacity-90 text-white bg-mygreen'
                                                                : 'bg-white'
                                                        } relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <div className="flex items-center justify-between w-full">
                                                                <div className="flex items-center">
                                                                    <div className="text-sm">
                                                                        <RadioGroup.Label
                                                                            as="p"
                                                                            className={`font-medium  ${
                                                                                checked
                                                                                    ? 'text-white'
                                                                                    : 'text-gray-900'
                                                                            }`}
                                                                        >
                                                                            {plan.type}
                                                                        </RadioGroup.Label>
                                                                        <RadioGroup.Description
                                                                            as="span"
                                                                            className={`inline ${
                                                                                checked
                                                                                    ? 'text-sky-100'
                                                                                    : 'text-gray-500'
                                                                            }`}
                                                                        >
                                                                            <span>{plan.text}</span>
                                                                        </RadioGroup.Description>
                                                                    </div>
                                                                </div>
                                                                {checked && (
                                                                    <div className="flex-shrink-0 text-white">
                                                                        <CheckIcon className="w-6 h-6" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mygreen text-base font-medium text-white hover:bg-mygreen-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mygreen-dark sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() =>
                                        router.push({
                                            pathname: '/ticketView',
                                            query: {
                                                tableId: props.tableId,
                                                paymentMethod: selected.type,
                                            },
                                        })
                                    }
                                >
                                    Solicitar Pago
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mygreen-dark sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={props.onCloseModal}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

function CheckIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
export default PaymentModal;
