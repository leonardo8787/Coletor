import P from 'prop-types';
import {useReducer} from 'react'

import { ColetorContext } from "./context";
import { reducer } from "./reducer";
import { coletor } from "./data";

export const ColetorProvider = ({children}) => {
    const [coletorState, coletorDispach] = useReducer(reducer, coletor);

    return (
        <ColetorContext.Provider value={{coletorState, coletorDispach}}>
            {children}
        </ColetorContext.Provider>);
};

ColetorProvider.propTypes = {
    children: P.node.isRequired
};