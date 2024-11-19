import {FindTypeActions} from "./TypeActions";
import axios from "axios";
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

export const setDataPage = (cards, last_page, tec_page) => ({
    type : FindTypeActions.SET_DATA_PAGE,
    cards, last_page, tec_page,
})
export const loadingCards = (text, filters, page) => ({
    type : 'LOADING_CARDS',
    text, filters, page,
})

export const FindAsyncActions = {
    LOADING_CARDS : ({ dispatch } ) => async ( action ) => {
        const {text, filters, page} = action;
        try {
            console.log(1);
            dispatch({ type: FindTypeActions.SET_LOADING });
            const answer = await axios.get(
                configApi.LOADING_CARDS,
                {
                    params: {
                        search_words: text,
                            ...Object.fromEntries(
                                Object.entries(filters).map(([key, value]) =>
                                    value === true ? [key, 1] : value === false ? [key, 0] : [key, value]
                                )
                            ),
                        page,
                    }
                }
            );

            console.log(answer);
            console.log(2);
            /*dispatch(setLastPage(answer.meta.last_page));
            dispatch(setTecPage(answer.meta.current_page));
            dispatch(setCards(answer.data.data));*/
            console.log(setDataPage(answer.data.data, answer.data.meta.last_page, answer.data.meta.current_page));
            dispatch(setDataPage(answer.data.data, answer.data.meta.last_page, answer.data.meta.current_page));
            dispatch({ type: FindTypeActions.SET_LOADING });
            console.log(3);


        } catch (error) {
            console.log(4);
            console.log(error);
            dispatch({ type: FindTypeActions.SET_LOADING });
        }


    }
}
