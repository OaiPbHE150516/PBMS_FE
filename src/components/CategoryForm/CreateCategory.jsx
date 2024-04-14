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
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [existingCategoryNames, setExistingCategoryNames] = useState([]);

    useEffect(() => {
        const names = [];
        categories.forEach(category => {
            names.push(category.nameVN);
            if (category.children) {
                category.children.forEach(childCategory => {
                    names.push(childCategory.nameVN);
                });
            }
        });
        setExistingCategoryNames(names);
    }, [categories]);


    useEffect(() => {
        handleCategoryTypeChange("Thu nhập");
    }, []);

    const handleCategoryTypeChange = (nameVN) => {
        setCurrentCategoryType(nameVN);
    };

    const handleCancel = () => {
        setDuplicateNameError('');
        handleCategoryTypeChange("Thu nhập");
        reset();
        showSet(false);
    };
    const [duplicateNameError, setDuplicateNameError] = useState('');
    const [emptyCategoryError, setEmptyCategoryError] = useState(false);
    const handleFormSubmit = (data) => {
        if (existingCategoryNames.includes(data.nameVN)) {
            setDuplicateNameError('Tên hạng mục đã tồn tại, vui lòng chọn tên khác.');
            return;
        } else {
            setDuplicateNameError('');
        }

        if (!selectedCategoryId) {
            setEmptyCategoryError(true);
            return;
        } else {
            setEmptyCategoryError(false);
        }

        data.categoryID = selectedCategoryId;
        onSubmit(data);
        reset();
        showSet(false);
    };


    const filterCategoryByType = (category, type) => {
        return category.nameVN === type;
    };

    const renderCategoryOptions = (category, level = 0) => {
        if (!category || !category.children) return null;

        if (category.nameVN === "Khác") {
            return null;
        }

        if ((currentCategoryType === "Thu nhập" && category.nameVN === "Chi tiêu") ||
            (currentCategoryType === "Chi tiêu" && category.nameVN === "Thu nhập")) {
            return null;
        }

        return (
            <>
                <option key={category.categoryID} value={category.categoryID}>
                    {level > 0 ? `${'\xa0'.repeat(level * 4)}${category.nameVN}` : category.nameVN}
                </option>
                {category.children
                    .filter((childCategory) => filterCategoryByType(childCategory, currentCategoryType) || filterCategoryByType(category, currentCategoryType))
                    .map((childCategory) => (
                        renderCategoryOptions(childCategory, level + 1)
                    ))}
            </>
        );
    };

    return (
        <PopupWallet
            title="Tạo hạng mục mới"
            show={show}
            onClose={() => handleCancel()}
            onSubmit={handleSubmit(handleFormSubmit)}
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
                    {errors.nameVN && <span className="text-danger">Không được để trống</span>}
                    {duplicateNameError && <span className="text-danger">{duplicateNameError}</span>}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Hạng mục</Form.Label>
                    <select
                        className="form-control"
                        onChange={(event) => setSelectedCategoryId(event.target.value)}
                        required={true}
                    >
                        <option value="">Chọn hạng mục</option>
                        {categories.map((category) => (
                            renderCategoryOptions(category)
                        ))}
                    </select>
                    {emptyCategoryError && <span className="text-danger">Vui lòng chọn hạng mục</span>}
                </Form.Group>


            </Form>
        </PopupWallet>
    );
};

export default CreateCategory;
