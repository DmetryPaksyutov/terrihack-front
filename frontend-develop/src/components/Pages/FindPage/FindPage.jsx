import React, {useRef} from 'react';
import {Row, Col, Pagination, Button} from 'antd';
import st from './FindPage.module.css';
import { useMediaQuery } from 'react-responsive';

import SearchBar from "../../Widgets/SearchBar/SearchBar";
import Filters from "../../Widgets/Filters/Filters";
import CardList from "../../Widgets/CandidateCard/CardList";
import {setTextFind, setFilters, FindAsyncActions, loadingCards} from '../FindReduser/FindActions';
import Loading from "../../Widgets/Loading/Loading";

import {useReducerAsync} from "use-reducer-async";
import FindReducer, {initialState} from "../FindReduser/FindReducer";


const FindPage = () => {
    //const dispatch = useDispatch();

    //const {filters, tec_page, last_page, cards, text_find, isLoading} = useSelection((state) => state.find);
    //const data = useSelection((state) => state);

    const [state, dispatch] = useReducerAsync(FindReducer, initialState, FindAsyncActions);
    const {tec_page, last_page, cards, text_find, isLoading} = state;

    const formData = useRef(()=>null);

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const onUpdateSearchBar = (text) => {
        dispatch(setTextFind(text))
    };

    const onSearchCards = () => {
        /*if (formData.current) {
            console.log(formData.current());
        }
        console.log(text_find);*/
        dispatch(loadingCards(text_find, formData.current(), 1));

    }
    const handlePageChange = (page) => {

    }

console.log(cards);
    return (
        <div className={st.page}>
            <Row justify="space-between" align="middle" className={st.header}>
                <Col span={18}>
                    <SearchBar onSearch={onUpdateSearchBar} text={text_find}/>
                </Col>
                <Col span={6}>
                    <Button type={"primary"} onClick={onSearchCards} className={st.button}>поиск</Button>
                </Col>
            </Row>


            <Row gutter={16}>
                <Col xs={24} sm={8} span={6}>

                    <Filters  refData={formData}/>
                </Col>
                <Col xs={24} sm={16} span={18}>
                    {isLoading && <Loading/>}

                    {cards && <CardList candidates={cards}/>}
                </Col>
            </Row>


            {last_page && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Pagination
                    current={tec_page}
                    total={last_page}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper
                />
            </div>) }
        </div>
    );
};

export default FindPage;


