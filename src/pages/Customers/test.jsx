import React from 'react';
import { Button, message } from 'antd';
const Message = ({title}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: `${title}`,
            duration: 10,
        });
    };
    return (
        <>
            {contextHolder}
            <Button onClick={success}>Customized display duration</Button>
        </>
    );
};
export default Message;