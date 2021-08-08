import BigButton from '../../components/BigButton';

interface Props {}

const AddDish = (props: Props) => {
    return (
        <div className="bg-gray-200 p-8 h-screen">
            <div className="flex justify-center">
                <div className="w-32 h-32 flex justify-center items-center text-sm text-white text-center bg-brown rounded-full">
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <span>Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                        />
                    </label>
                </div>
            </div>
            <form>
                <div className="rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Nombre del Platillo
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-3xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm my-3"
                            placeholder="Nombre del Platillo"
                        />
                    </div>

                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Precio
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-3xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm my-3"
                            placeholder="Precio"
                        />
                    </div>

                    <textarea
                        className="mt-1 block w-full rounded-3xl border-gray-300 shadow-sm focus:border-bronw focus:ring focus:ring-brown focus:ring-opacity-50"
                        rows={3}
                        placeholder="Descripcion"
                    ></textarea>

                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Menu
                        </label>
                        <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brown focus:border-brown sm:text-sm"
                        >
                            <option>Menu 1</option>
                            <option>Menu 2</option>
                            <option>Menu 3</option>
                        </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tiempo de preparación
                        </label>
                        <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brown focus:border-brown sm:text-sm"
                        >
                            <option>5 min</option>
                            <option>10 mins</option>
                            <option>15 mins</option>
                            <option>20 mins</option>
                            <option>25 mins</option>
                            <option>30 mins</option>
                        </select>
                    </div>

                    <BigButton
                        onClick={() => console.log('Add Platillo')}
                        text="Agregar Menu"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddDish;
