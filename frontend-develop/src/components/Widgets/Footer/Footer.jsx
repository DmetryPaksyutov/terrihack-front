import React from 'react';
import { Layout, Row, Col } from 'antd';
import st from './Footer.module.css';
import {useMediaQuery} from "react-responsive";

const { Footer } = Layout;

const AppFooter = () => {
    const isMobile = useMediaQuery({ maxWidth: 577 });
    return (
        <Footer className={st.footer}>
            <Row justify="center" className={st.row}>
                <Col>
                    <p className={st.p}>Разработчики</p>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <a href="https://t.me/SamuilKlad" target="_blank" rel="noopener noreferrer" className={st.link}>
                        Самуил Клад
                    </a>
                    <a href="https://t.me/dmitry_klad" target="_blank" rel="noopener noreferrer" className={st.link}>
                        Дмитрий Клад
                    </a>
                    <a href="https://t.me/DemaPaxyutov" target="_blank" rel="noopener noreferrer" className={st.link}>
                        Дмитрий Паксютов
                    </a>
                    <a href="https://t.me/existentialbutnofateless" target="_blank" rel="noopener noreferrer" className={st.link}>
                        Даниил Симутин
                    </a>
                </Col>
            </Row>
        </Footer>
    );
};

export default AppFooter;