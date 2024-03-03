import clsx from 'clsx';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from '../Button';
import MultipleSelect from '../MultipleSelect';
import Popup from '../Popup';
import { categoryListData } from '../../contexts/category';
import { walletListData } from '../../contexts/wallet';


const UpdateWallet = ({ show, showSet }) => {
    const [budgetName, budgetNameSet] = useState('')
    const [category, categorySet] = useState('')
    const [initialAmount, initialAmountSet] = useState('')
    const [wallet, walletSet] = useState('')
    const [repeat, repeatSet] = useState(true)
    const [numberIterations, numberIterationsSet] = useState(1)
    const [note, noteSet] = useState('')
    const [period, periodSet] = useState(
      /** @type {'week' | 'month' | 'other'} */("other")
    );

    const getPeriodTimeBy = (period) => {
        const now = new Date();
        switch (period) {
            case "week": {
                const to = new Date();
                to.setDate(to.getDate() + 7);
                return { from: now, to };
            }
            case "month": {
                const to = new Date();
                to.setMonth(to.getMonth() + 1);
                return { from: now, to };
            }
            case "other":
            default: {
                return { from: now, to: new Date(now) };
            }
        }
    };

    const [periodTime, periodTimeSet] = useState(() => getPeriodTimeBy(period));

    const handlePeriodTime = (period) => {
        periodTimeSet(getPeriodTimeBy(period));
        periodSet(period);
    };

    return (
        <Popup
            title={"Create new wallet"}
            show={show}
            onClose={() => showSet(false)}
            onSubmit={() => alert("submited")}
        >
            <Form className="c-form">
                <Form.Group className="mb-2">
                    <Form.Label>Wallet Name</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={budgetName} onChange={({ target: { value } }) => budgetNameSet(value)}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
            </Form>
        </Popup>
    );
};

export default UpdateWallet