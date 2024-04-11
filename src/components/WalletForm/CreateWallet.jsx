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
    const [vowelNameError, setVowelNameError] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleFormSubmit = (data) => {
        const { name, balance } = data;

        if (parseFloat(balance) < 0) {
            setVowelNameError('Số tiền không được âm.');
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
            setIsChecked(false);
        }
    };

    const handleCancel = () => {
        reset();
        showSet(false);
        setIsChecked(false);
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
                    />
                    {errors.name && <span className="text-danger">Không được để trống</span>}
                    {duplicateNameError && <span className="text-danger">{duplicateNameError}</span>}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Số dư hiện tại</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('balance', {
                            required: true,
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Số dư phải là số"
                            }
                        })}
                    />
                    {errors.balance && errors.balance.type === "required" && <span className="text-danger">Không được để trống</span>}
                    {errors.balance && errors.balance.type === "pattern" && <span className="text-danger">{errors.balance.message}</span>}
                    {vowelNameError && <span className="text-danger">{vowelNameError}</span>}
                </Form.Group>


                <Form.Group className="mb-2">
                    <div>
                        <Form.Check
                            type="radio"
                            label="Ví ngân hàng"
                            {...register("isBanking")}
                            checked={isChecked}
                            onClick={() => setIsChecked(!isChecked)}
                        />
                    </div>
                </Form.Group>
                {isChecked && (
                    <>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên ngân hàng</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('bankName', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Số tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('bankAccount', { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('bankUsername', { required: true })}
                            />
                        </Form.Group>
                    </>
                )}
            </Form>
        </PopupWallet>
    );
};

export default CreateWallet;
