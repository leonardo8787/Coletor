const initialState = {
    tipo: '',
    caixas: '',
    coleta: '',
    endereco: '',
    observacao: '',
    peso: '',
    sacolas: '',
};

const SET_TIPO = 'SET_TIPO';
const SET_CAIXAS = 'SET_CAIXAS';
const SET_COLETA = 'SET_COLETA';
const SET_ENDERECO = 'SET_ENDERECO';
const SET_OBSERVACAO = 'SET_OBSERVACAO';
const SET_PESO = 'SET_PESO';
const SET_SACOLAS = 'SET_SACOLAS';

const reducer2 = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIPO:
        return {
            ...state,
            tipo: action.payload,
        };
        case SET_CAIXAS:
        return {
            ...state,
            caixas: action.payload,
        };
        case SET_COLETA:
        return {
            ...state,
            coleta: action.payload,
        };
        case SET_ENDERECO:
        return {
            ...state,
            endereco: action.payload,
        };
        case SET_OBSERVACAO:
        return {
            ...state,
            observacao: action.payload,
        };
        case SET_PESO:
        return {
            ...state,
            peso: action.payload,
        };
        case SET_SACOLAS:
        return {
            ...state,
            sacolas: action.payload,
        };
        default:
        return state;
    }
};

export default reducer2;
