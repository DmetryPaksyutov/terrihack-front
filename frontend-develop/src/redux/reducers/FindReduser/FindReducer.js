import { FindTypeActions } from './TypeActions';

export const initialState = {
    filters: { },
    tec_page: 1,
    last_page: null,
    cards: [],
    text_find: '',
    isLoading: false,
};



const FindReducer = (state = initialState, action) => {

    switch (action.type) {
        case FindTypeActions.SET_FILTERS:
            return {
                ...state,
                filters: action.filters,
            };

        case FindTypeActions.SET_TEXT_FIND:
            return {
                ...state,
                text_find: action.text,
            };

        case FindTypeActions.SET_TEC_PAGE:
            return {
                ...state,
                tec_page: action.payload.page,
            };

        case FindTypeActions.SET_LAST_PAGE:
            return {
                ...state,
                last_page: action.lastPage,
            };

        case FindTypeActions.SET_CARDS:
            return {
                ...state,
                cards: action.cards,
            };

        case FindTypeActions.SET_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            }

        default:
            return state;
    }
};

export default FindReducer;

