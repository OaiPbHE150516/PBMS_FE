import clsx from 'clsx';
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from '../Button';
import MultipleSelect from '../MultipleSelect';
import Popup from '../Popup';
import { useForm, Controller } from "react-hook-form";
import useAppSelector from "../../hooks/useAppSelector";


const CreateWallet = ({ show, showSet, onSubmit = () => { } }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: "",
            balance: "",
            currencyID: "",
        },
    });
    const currency = useAppSelector((state) => state.currency.values);
    console.log('Currency:', currency);
    
    const currencyOptions = currency?.map((item) => ({
      label: item.name,
      value: item.currencyID,
    })) ?? [];

    return (
        <Popup
            title={"Create new wallet"}
            show={show}
            onClose={() => showSet(false)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Form className="c-form">
                <Form.Group className="mb-2">
                    <Form.Label>Tên ví</Form.Label>
                    <Form.Control type="text"
                        {...register("name", { required: true })}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Số dư</Form.Label>
                    <Form.Control type="text"
                        {...register("balance", { required: true })}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Đơn vị tiền tệ</Form.Label>
                    <Controller
                        control={control}
                        name="currencyID"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select {...field} className="form-control">
                                <option value="">Select Currency</option>
                                {currencyOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </Form.Group>
            </Form>
        </Popup>
    );
};

export default CreateWallet