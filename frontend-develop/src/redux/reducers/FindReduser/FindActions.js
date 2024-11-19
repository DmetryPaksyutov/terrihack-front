import {FindTypeActions} from "./TypeActions";
import axios from "axios";
import {registerFailure, registerSuccess} from "../AuthReducer/AuthActions";
import {configApi} from "../../../configApi";

export const setFilters = (filters) => ({
    type: FindTypeActions.SET_FILTERS,
    filters,
});

export const setTextFind = (text) => ({
    type: FindTypeActions.SET_TEXT_FIND,
    text,
});

export const setTecPage = (page) => ({
    type: FindTypeActions.SET_TEC_PAGE,
    page,
});

export const setLastPage = (lastPage) => ({
    type: FindTypeActions.SET_LAST_PAGE,
    lastPage,
});

export const setCards = (cards) => ({
    type: FindTypeActions.SET_CARDS,
    cards,
});

export const loadingCards = (page, text, filters) => async (dispatch) => {
    try {
        dispatch({ type: FindTypeActions.SET_LOADING });
        const answer = await axios.get(configApi.LOADING_CARDS,
            {search_words : text, ...filters, page });



        //dispatch(registerSuccess(userData));
    } catch (error) {
        //dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
    }
};
