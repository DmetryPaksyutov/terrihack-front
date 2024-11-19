import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './payaccept.module.css';

const PayAccept = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    // Отправляем данные карты на сервер или в Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment successful!", paymentMethod);
      // Здесь вы можете сделать запрос на сервер, чтобы завершить оплату
    }
  };

  return (
    <form className={styles.cardContainer} onSubmit={handleSubmit}>
      <div className={styles.cardBackground}>
        <div className={styles.paymentForm}>
          <div className={styles.field}>
            <label>Номер карты</label>
            <input type="text" placeholder="1234 5678 9123 4567" />
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label>Дата</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className={styles.field}>
              <label>CVC</label>
              <input type="text" placeholder="123" />
            </div>
          </div>          
        </div>
        <button className={styles.payButton} type = "submit" disabled={!stripe}>ОПЛАТИТЬ {price}</button>
      </div>
    </form>
  );
};

export default PayAccept;