import {AuthTypeActions} from "./TypeActions";

const initialState = {
    isLogin: false,
    name: '',
    avatar: '',
    error: null,
    loading: false,
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypeActions.LOGIN_SUCCESS:
        case AuthTypeActions.REGISTER_SUCCESS:
            return {
                ...state,
                isLogin: true,
                name: action.payload.name,
                avatar: action.payload.avatar,
                error: null,
                loading: false,
            };
        case AuthTypeActions.LOGIN_FAILURE:
        case AuthTypeActions.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case AuthTypeActions.LOGOUT:
            return {
                ...state,
                isLogin: false,
                name: '',
                avatar: '',
            };
        case AuthTypeActions.AUTH_LOADING:
            return {
                ...state,
                loading : !state.loading,
            }
        default:
            return state;
    }
};

export default authReducer;