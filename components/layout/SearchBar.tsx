import { search } from '../../lib/utils';

interface Props<T> {
    list: T[];
    keys: string[];
    onSearch?: (resutls: T[], pattern: string) => void;
}

const SearchBar = <T extends unknown>({ list, keys, onSearch }: Props<T>) => {
    
    const handleInput = (pattern: string) => {
        if (onSearch) {
            const results = search(pattern, list, keys).map((r) => r.item);
            onSearch(results, pattern);
        }
    };
    return (
        <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="p-3 my-10 focus:ring-brown-light focus:border-brown-light block w-full shadow-sm sm:text-sm border-none rounded-3xl"
            placeholder=" Buscar"
            onChange={(e) => handleInput(e.target.value)}
        />
    );
};

export default SearchBar;
