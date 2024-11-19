import axios from 'axios';
import {AuthTypeActions} from "./TypeActions";


// Action creators
export const loginSuccess = (userData) => ({
    type: AuthTypeActions.LOGIN_SUCCESS,
    payload: userData,
});

export const loginFailure = (error) => ({
    type:  AuthTypeActions.LOGIN_FAILURE,
    error,
});

export const registerSuccess = (userData) => ({
    type:  AuthTypeActions.REGISTER_SUCCESS,
    payload: userData,
});

export const registerFailure = (error) => ({
    type:  AuthTypeActions.REGISTER_FAILURE,
    error,
});

export const logout = () => ({
    type:  AuthTypeActions.LOGOUT,
});

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type:  AuthTypeActions.AUTH_LOADING });
        const response = await axios.post('/api/login', { email, password });

        // Предполагаем, что сервер возвращает объект пользователя с полями name и avatar
        const userData = {
            name: response.data.name,
            avatar: response.data.avatar,
        };

        dispatch(loginSuccess(userData));
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'AUTH_LOADING' });
        const response = await axios.post('/api/register', { name, email, password });

        const userData = {
            name: response.data.name,
            avatar: response.data.avatar,
        };

        dispatch(registerSuccess(userData));
    } catch (error) {
        dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
    }
};
