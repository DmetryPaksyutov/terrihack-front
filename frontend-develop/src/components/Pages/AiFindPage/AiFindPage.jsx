import React, {useCallback, useState} from 'react';
import {Button, Col, Row, Tag} from 'antd';
import st from './AiFindPage.module.css';
import {useMediaQuery} from 'react-responsive';

import SearchBar from "../../Widgets/SearchBar/SearchBar";
import {FindAsyncActions, setTextFind} from '../FindReduser/FindActions';
import FindReducer, {initialState} from "../FindReduser/FindReducer";
import {useReducerAsync} from "use-reducer-async";
import {configApi} from "../../../configApi";
import RcQueueAnim from "rc-queue-anim";
import debounce from "lodash.debounce";

const AiFindPage = () => {

    const [state, dispatch] = useReducerAsync(FindReducer, initialState, FindAsyncActions);
    const {text_find} = state;

    const [tags, setTags] = useState([]);
    const [search_results, setSearchResults] = useState([]);

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const onLoadSearch = (results) => {
        setSearchResults(results)

        const newTags = Object.keys(results).map(key => `${key}: ${results[key]}`)
        setTags(newTags)
    };

    const isMobile = useMediaQuery({maxWidth: 768});

    const onUpdateSearchBar = (text) => {
        dispatch(setTextFind(text))
        debouncedSearch(text)
    };

    const debouncedSearch = useCallback(
        debounce(async (value) => await onSearch(value), 1000),
        []
    );

    const onSearch = async (text) => {
        if (text.length < 5) {
            return
        }

        try {
            let response = await fetch(
                configApi.LOADING_HINTS + `?` + new URLSearchParams({
                    q: text,
                }),
                {
                    headers: {
                        Accept: 'application/json',
                    }
                })

            onLoadSearch((await response.json()).data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={st.page}>
            <Row justify="space-between" align="middle" className={st.header}>
                <Col span={18}>
                    <SearchBar onSearch={onUpdateSearchBar} text={text_find}/>
                </Col>
                <Col span={6}>
                    <Button type={"primary"} onClick={debouncedSearch} className={st.button}>поиск</Button>
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <RcQueueAnim
                        component="div"
                        type="bottom"
                        interval={300}
                    >
                    {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                closable="true"
                                style={{userSelect: 'none'}}
                                onClose={() => handleClose(tag)}
                            >
                                {tag}
                            </Tag>
                    ))}
                    </RcQueueAnim>
                </Col>
            </Row>
        </div>
    );
};

export default AiFindPage;
