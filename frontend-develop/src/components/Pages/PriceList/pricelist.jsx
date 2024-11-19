import React, { useState } from 'react';
import { Layout, Menu, Button, Card, Col, Row, Modal} from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { HomeOutlined, UserOutlined, AppstoreOutlined, LoginOutlined } from '@ant-design/icons';
import st from "./pricelist.module.css";
import {Link} from "react-router-dom";
import PayAccept from '../../Widgets/PayAccept/PayAccept.jsx';

const { Header } = Layout;

const PriceList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const plans = [
        {
          title: "Базовый",
          description: "Основные функции для повседневных задач.",
          price: "9.99$ / месяц",
          label: "BASIC",
          stars: 1
        },
        {
          title: "Продвинутый",
          description: "Расширенные функции и аналитика.",
          price: "19.99$ / месяц",
          label: "EXTRA",
          stars: 2
        },
        {
          title: "Премиум",
          description: "Все функции и приоритетная поддержка.",
          price: "29.99$ / месяц",
          label: "PRO",
          stars: 3
        }
      ];


      const showModal = (plan) => {
    setIsModalVisible(true);
    setSelectedPlan(plan);
  };

  const handleCancel = (plan) => {
    setIsModalVisible(false);
    setSelectedPlan(null);
  };
  const stripePromise = loadStripe('pk_test_51QJ9F6KlFwcan3LpCVMmRToxUOYygPDbNX8eOcfP4TEOyG2q1cDAqUGg2RLQHTwxFdt73AP8HPORGaftmoHotNF000b8EUEwq2');

    return (
      <div className={st.mainContainer}>
        <Row className = {st.pricelist_container}gutter={16}>
          {plans.map((plan, index) => (
            <Col className={st.antcol}xs={24} sm={8} md={8} lg={6} key={index}>
              <Card title={plan.title} bordered={false} bodyStyle={{ minHeight: '320px' }}>
              <div className={st.cardBackground}>
                  <div className={`${st.cardLabel} ${st[`cardLabel${plan.label}`]}`}>
                    {plan.label}
                  </div>
                  <div className={st.stars}>
                    {Array.from({ length: plan.stars }).map((_, idx) => (
                      <span key={idx} className={st.star}>★</span>
                    ))}
                  </div>
              </div>
                <div className={st.description}>{plan.description}</div>
                <h1 className={st.priceLabel}>{plan.price}</h1>
                <div className={st.btnContainer}>
                  <Button className={st.infoBtn}type="link" style={{ marginTop: '10px' }}>
                    Подробнее
                  </Button>
                  <Button type="primary" onClick={() => showModal(plan)}>
                    Выбрать
                  </Button>                
                </div>                
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Оплата подписки"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Elements stripe={stripePromise}>
            <PayAccept price={selectedPlan?.price}/>
          </Elements>
        </Modal>
    </div>
      );
};

export default PriceList;