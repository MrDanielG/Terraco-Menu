interface Props {}

const SearchBar = (props: Props) => {
    return (
        <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="p-3 my-10 focus:ring-brown-light focus:border-brown-light block w-full shadow-sm sm:text-sm border-none rounded-3xl"
            placeholder=" Buscar"
        />
    );
};

export default SearchBar;
