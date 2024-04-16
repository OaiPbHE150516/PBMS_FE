import clsx from "clsx";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import PopupCategory from '../PopupCategory';
import useAppSelector from "../../hooks/useAppSelector";
import Button from '../Button';

const UpdateAndDeleteCategory = ({ showUD, data, onSubmit, onClose }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const categories = useAppSelector((state) => state.category.values);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [currentCategoryType, setCurrentCategoryType] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    useEffect(() => {
        if (data) {
            setValue('nameVN', data.nameVN);
            setSelectedCategoryId(data.categoryID);
            determineCategoryType(data.categoryID);
            setParentCategoryId(data.parentCategoryID ? data.parentCategoryID : parentCategoryId);
        }
    }, [data, setValue]);


    const determineCategoryType = (categoryId) => {
        const rootCategory = categories.find(cat => cat.children.some(child => child.categoryID === categoryId));
        if (rootCategory) {
            setCurrentCategoryType(rootCategory.nameVN);
        }
    };

    const handleFormSubmit = (formData) => {
        if (!selectedCategoryId) {
            alert("Please select a category.");
            return;
        }
        formData.categoryID = selectedCategoryId;
        formData.parentCategoryID = selectedCategoryId ? parentCategoryId : data.parentCategoryID;
        onSubmit(formData);
        reset();
    };


    const filterCategoryByType = (category) => {
        return category.nameVN === currentCategoryType;
    };
    const renderCategoryOptions = (categories, level = 0) => {
        return (
            <>
                {categories.map(category => (
                    <option key={category.categoryID} value={category.categoryID}>
                        {' '.repeat(level * 4) + category.nameVN}
                    </option>
                ))}
            </>
        );
    };

    const renderCategoriesRecursively = (categories, level = 0) => {
        return (
            <>
                {categories.map(category => (
                    category.nameVN !== "Khác" && (
                        <React.Fragment key={category.categoryID}>
                            <option value={category.categoryID} style={{ fontWeight: (category.nameVN === "Thu nhập" || category.nameVN === "Chi tiêu") ? "bold" : "normal" }}>
                                {' '.repeat(level * 4) + category.nameVN}
                            </option>
                            {(category.nameVN === "Thu nhập" || category.nameVN === "Chi tiêu") && category.children.length > 0 &&
                                renderCategoriesRecursively(category.children, level + 1)}
                        </React.Fragment>
                    )
                ))}
            </>
        );
    };
    
    
    
    
    useEffect(() => {
        console.log("Selected Category ID:", selectedCategoryId);
        console.log("Parent Category ID:", parentCategoryId);
    }, [selectedCategoryId, parentCategoryId]);


    return (
        <PopupCategory
            title="Chỉnh sửa hạng mục"
            show={showUD}
            onDelete={onClose}
            onClose={onClose}
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <Form className="c-form">
                <Form.Group className="mb-3">
                    <Form.Label>Tên hạng mục</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('nameVN', { required: "Tên hạng mục không được để trống" })}
                    />
                    {errors.nameVN && <span className="text-danger">{errors.nameVN.message}</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hạng mục cha</Form.Label>
                    <select
                        className="form-control"
                        onChange={(e) => {
                            const newCategoryId = e.target.value;
                            setParentCategoryId(newCategoryId ? newCategoryId : data.parentCategoryID);
                        }}
                    >
                        <option value="">Chọn hạng mục (Nếu có)</option>

                        {renderCategoriesRecursively(categories)}

                    </select>


                </Form.Group>
            </Form>
        </PopupCategory>
    );
};

export default UpdateAndDeleteCategory;
