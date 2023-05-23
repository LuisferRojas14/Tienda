
import {createContext} from 'react';

interface ContexProps {
    isMenuOpen: boolean

    //Method
    toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContexProps);