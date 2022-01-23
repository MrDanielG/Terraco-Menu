import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
    title?: string | JSX.Element;
    show: boolean;
    acceptLabel?: string;
    cancelLabel?: string;
    onClose: (isOpen: boolean) => void;
    onAccept?: () => void;
    onCancel?: () => void;
}

const TwoActionsModal: React.FC<Props> = ({
    show,
    acceptLabel,
    cancelLabel,
    onClose,
    onAccept,
    onCancel,
    children,
    title,
}) => {
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">{children}</div>

                                <div className="mt-4 gap-4 justify-center flex">
                                    <button
                                        type="button"
                                        className="w-full px-6 py-3 text-sm border-2 border-solid text-gray-500 border-gray-500 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                                        onClick={() => {
                                            if (!!onClose && !!onCancel) {
                                                onCancel();
                                                onClose(false);
                                            }
                                        }}
                                    >
                                        {cancelLabel || 'Cancelar'}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full px-6 py-3 text-sm border-2 border-solid text-mygreen border-mygreen rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                                        // className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={onAccept}
                                    >
                                        {acceptLabel || 'Aceptar'}
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
export default TwoActionsModal;
