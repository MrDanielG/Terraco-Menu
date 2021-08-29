import { forwardRef, useImperativeHandle, Ref, useRef, ReactElement } from 'react';
import { search } from '../../lib/utils';

export interface SearchBarRef {
    clear: () => void;
    setInput: (text: string) => void;
}

interface Props<T> {
    list: T[];
    keys: string[];
    onSearch?: (resutls: T[], pattern: string) => void;
    ref?: Ref<SearchBarRef>;
}

function SearchBarT<T>({ list, keys, onSearch }: Props<T>, ref: Ref<SearchBarRef>) {
    const input = useRef<HTMLInputElement>(null);
    const handleInput = (pattern: string) => {
        if (onSearch) {
            const results = search(pattern, list, keys).map((r) => r.item);
            onSearch(results, pattern);
        }
    };

    useImperativeHandle(ref, () => ({
        clear: () => {
            if (input.current) {
                input.current.value = '';
                handleInput('');
            }
        },
        setInput: (text) => {
            if (input.current) {
                input.current.value = text;
            }
        },
    }));
    return (
        <input
            ref={input}
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="p-3 my-10 focus:ring-brown-light focus:border-brown-light block w-full shadow-sm sm:text-sm border-none rounded-3xl"
            placeholder=" Buscar"
            onChange={(e) => handleInput(e.target.value)}
        />
    );
}
const SearchBar = forwardRef(SearchBarT) as <T>(
    props: Props<T> & { ref?: Ref<SearchBarRef> }
) => ReactElement;
//SearchBar.displayName = 'SearchBar';
export default SearchBar;
