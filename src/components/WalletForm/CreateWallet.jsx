import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PopupWallet from '../PopupWallet';
import { useForm } from 'react-hook-form';
import useAppSelector from "../../hooks/useAppSelector";

const CreateWallet = ({ show, showSet, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset 
    } = useForm();

    const wallet = useAppSelector((state) => state.wallet.values);

    const [duplicateNameError, setDuplicateNameError] = useState('');
    const [vowelNameError, setvowelNameError] = useState('');
    const [formData, setFormData] = useState({ name: '', balance: '' });

    const handleFormSubmit = (data) => {
        const { name, balance } = data;
    
        if (parseFloat(balance) < 0) {
            // Nếu số tiền là âm, hiển thị thông báo lỗi
            setvowelNameError('Số tiền không được âm.');
            return;
        }
    
        const isDuplicate = wallet.some(walletItem => walletItem.name === name);
    
        if (isDuplicate) {
            setDuplicateNameError('Tên ví đã tồn tại, vui lòng chọn tên khác.');
        } else {
            setDuplicateNameError('');
            onSubmit(data);
            reset(); 
            showSet(false); 
        }
    };
    

    const handleCancel = () => {
        reset(); 
        showSet(false); 
    };

    return (
        <PopupWallet
            title="Tạo ví mới"
            show={show}
            onClose={() => handleCancel()}
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <Form className="c-form">
                <Form.Group className="mb-2">
                    <Form.Label>Tên ví</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('name', { required: true })}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    />
                    {errors.name && <span className="text-danger">Không được để trống</span>}
                    {duplicateNameError && <span className="text-danger">{duplicateNameError}</span>}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Số dư hiện tại</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('balance', { required: true })}
                        onChange={(e) => setFormData({ ...formData, balance: e.target.value })} 
                    />
                    {errors.balance && <span className="text-danger">Không được để trống</span>}
                    {vowelNameError && <span className="text-danger">{vowelNameError}</span>}
                </Form.Group>
            </Form>
        </PopupWallet>
    );
};
export default CreateWallet;
