import React from 'react';
import { Spin } from 'antd';

const Loading = ({ message = 'Загрузка...', size = 'large' }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Spin size={size} tip={message} />
        </div>
    );
};

export default Loading;
