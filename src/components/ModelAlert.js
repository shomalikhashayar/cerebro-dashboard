import React from 'react';
import { Modal} from 'antd';


const ModalAlert = ({isOpen, title, description, okButtonClick, cancelButtonClick, okButtonText, cancelButtonText}) => {

    return (
        <Modal title={title} open={isOpen}
               onOk={okButtonClick}
               onCancel={cancelButtonClick}
               okButtonProps={{title: okButtonText}}
               cancelButtonProps={{title: cancelButtonText}}
        >
            <p>{description}</p>
        </Modal>
    );
};

export default ModalAlert;
