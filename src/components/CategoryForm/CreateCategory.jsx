import clsx from "clsx";
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PopupWallet from '../PopupWallet';
import { useForm, Controller } from 'react-hook-form';
import useAppSelector from "../../hooks/useAppSelector";
import Button from '../Button';
import { getCategories } from "../../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const CreateCategory = ({ show, showSet, onSubmit }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();
    const categories = useAppSelector((state) => state.category.values);
    const [currentCategoryType, setCurrentCategoryType] = useState(null);
    useEffect(() => {
        handleCategoryTypeChange("Thu nhập");
    }, []);
    const handleCategoryTypeChange = (nameVN) => {
        setCurrentCategoryType(nameVN);
    };

    const handleCancel = () => {
        reset();
        showSet(false);
    };

    return (
        <PopupWallet
            title="Tạo hạng mục mới"
            show={show}
            onClose={() => handleCancel()}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Form className="c-form">
                <Controller
                    name="period"
                    control={control}
                    defaultValue="income"
                    render={({ field }) => (
                        <div className="d-flex gap-2">
                            <Button
                                onClick={() => {
                                    field.onChange("income");
                                    handleCategoryTypeChange("Thu nhập");
                                }}
                                className={clsx("btn-light", {
                                    active: field.value === "income",
                                })}
                                size="btn-sm"
                            >
                                Thu
                            </Button>
                            <Button
                                onClick={() => {
                                    field.onChange("expense");
                                    handleCategoryTypeChange("Chi tiêu");
                                }}
                                className={clsx("btn-light", {
                                    active: field.value === "expense",
                                })}
                                size="btn-sm"
                            >
                                Chi
                            </Button>
                        </div>
                    )}
                />
                <Form.Group className="mb-2" style={{ marginTop: '10px' }}>
                    <Form.Label>Tên hạng mục</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('nameVN', { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Hạng mục</Form.Label>
                    <Controller
                        control={control}
                        name="categoryID"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select {...field} className="form-control">
                                {categories.map((category) => {
                                    if (currentCategoryType === null || category.nameVN === currentCategoryType) {
                                        if (category.children.length === 0) {
                                            return (
                                                <option key={category.categoryID} value={category.categoryID}>
                                                    {category.nameVN}
                                                </option>
                                            );
                                        } else if (category.isRoot) { // Chỉ hiển thị các hạng mục gốc của loại hiện tại
                                            return (
                                                <optgroup key={category.categoryID} label={category.nameVN}>
                                                    {category.children.map((childCategory) => {
                                                        return (
                                                            <React.Fragment key={childCategory.categoryID}>
                                                                <option value={childCategory.categoryID}>
                                                                    {childCategory.nameVN}
                                                                </option>
                                                                {childCategory.children.map((grandChildCategory) => {
                                                                    return (
                                                                        <React.Fragment key={grandChildCategory.categoryID}>
                                                                            <option value={grandChildCategory.categoryID}>
                                                                                &nbsp;&nbsp;&nbsp;&nbsp;{grandChildCategory.nameVN}
                                                                            </option>
                                                                            {grandChildCategory.children.map((greatGrandChildCategory) => {
                                                                                return (
                                                                                    <option key={greatGrandChildCategory.categoryID} value={greatGrandChildCategory.categoryID}>
                                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{greatGrandChildCategory.nameVN}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </React.Fragment>
                                                                    );
                                                                })}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </optgroup>
                                            );
                                        }
                                    }
                                    return null;
                                })}


                            </select>
                        )}
                    />
                </Form.Group>
            </Form>
        </PopupWallet>
    );
};
export default CreateCategory;
