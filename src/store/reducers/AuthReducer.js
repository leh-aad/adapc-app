import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_USER,
    REGISTER_FAIL_PASSWORD,
    REGISTER_FAIL_INVALID_EMAIL,
    REGISTER_FAIL_EMAIL_IN_USE,
    NAME_CHANGED,
    GET_USER_DATA
} from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '', 
    name: '',
    user: null,
    userData: null,
    error: '',
    loading: false,
    success: false
};

export default (state = INITIAL_STATE, action) => { 
    console.log(action);
    switch(action.type){
        case EMAIL_CHANGED: 
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case NAME_CHANGED:
            return { ...state, name: action.payload};
        case LOGIN_USER:
            return { ...state, loading: true, error: '', success: false};
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload, error: '', loading: false };
        case LOGIN_FAIL:
            return { ...state, error: 'Falha de autenticação', password: '', loading: false};
        case REGISTER_USER:
            return { ...state, loading: true, error: ''};
        case REGISTER_SUCCESS:
            return { ...state, user: action.payload, error: '', loading: false, success: true};
        case REGISTER_FAIL_PASSWORD:
            return { ...state, error: 'A senha precisa ter no mínimo 6 caracteres', password: '', loading: false};
        case REGISTER_FAIL_INVALID_EMAIL:
            return { ...state, error: 'Email inválido, tente novamente.', email: '', loading: false};
        case REGISTER_FAIL_EMAIL_IN_USE:
            return { ...state, error: 'Email já cadastrado', email: '', loading: false};
        case LOGOUT_USER:
            return { ...state, email: '', password: '', user: null};
        case GET_USER_DATA:
            return { ...state, userData: action.payload};    
        default:
            return state;
    }
};