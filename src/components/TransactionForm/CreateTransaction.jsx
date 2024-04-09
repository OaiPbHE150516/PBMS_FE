import clsx from "clsx";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputGroup, FormControl, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Button from '../Button';
import MultipleSelect from '../MultipleSelect';
import useAppSelector from '../../hooks/useAppSelector';
import PopupTransaction from '../PopupTransaction';
import dayjs from 'dayjs';
import { getInvoiceScan } from "../../redux/scanInvoiceSlice";
import { fileInvoiceName } from "../../redux/fileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap';

const CreateTransaction = ({ show, showSet, onSubmit = () => { } }) => {
    const dispatch = useDispatch();
    const scan = useSelector((state) => state.scan.values)
    const file = useSelector((state) => state.file.values)
    const accountID = useSelector((state) => state.authen.user?.accountID);
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isValid },
        reset,
        watch
    } = useForm({
        defaultValues: {
            walletID: "",
            categoryID: "",
            totalAmount: "",
            note: "",
            fromPerson: "",
            toPerson: "",
            image: "",
            transactionDate: dayjs().format('YYYY-MM-DDTHH:mm:ss')
        },
    });
    useEffect(() => {
        if (show) {
            reset(); 
            console.log("đã reset form")
        }
    }, [show, reset]);
    const [time, setTime] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
    const [currentCategoryType, setCurrentCategoryType] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [hasScanned, setHasScanned] = useState(false);
    useEffect(() => {
        if (scan) {
            setIsScanned(true);
        }
    }, [scan]);
    const [imagePreview, setImagePreview] = useState(null);
    const [isScanned, setIsScanned] = useState(false);
    const categories = useAppSelector((state) => state.category.values);
    const wallets = useAppSelector((state) => state.wallet.values);
    const walletOptions = wallets.map((item) => ({
        label: item.name,
        value: item.walletID,
        balance: item.balance,
    }));
    useEffect(() => {
        if (isScanned && scan && scan.totalAmount) {
            setValue('totalAmount', scan.totalAmount);
        }
    }, [isScanned, scan, setValue]);
    const filenameRandom = (length = 10) => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomFileName = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomFileName += characters[randomIndex];
        }

        return randomFileName;
    };
    const filename = filenameRandom();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue('image', file);

        if (file) {
            const formData = new FormData();
            formData.append("AccountID", accountID);
            formData.append("File", file);
            formData.append("FileName", filename);
            dispatch(fileInvoiceName(formData));

            const reader = new FileReader();
            reader.onloadend = () => {
                setIsScanning(true);
                setImagePreview(reader.result);
                dispatch(getInvoiceScan(file)).then(() => {
                    setIsScanning(false);
                    setHasScanned(true);
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const hasImage = !!imagePreview;

    const handleClose = () => {
        reset();
        setImagePreview(null);
        showSet(false);
        setIsScanned(false);
    };
    useEffect(() => {
        handleCategoryTypeChange("Thu nhập");
    }, []);
    const handleCategoryTypeChange = (categoryType) => {
        setCurrentCategoryType(categoryType);
        console.log(categoryType)
    };
    useEffect(() => {
        if (isScanned && scan && scan.invoiceDate) {
            setTime(scan.invoiceDate);
        } else {
            setTime(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
        }
    }, [isScanned, scan]);
    useEffect(() => {
        console.log("Default values:", {
            walletID: watch('walletID'),
            categoryID: watch('categoryID'),
            totalAmount: watch('totalAmount'),
            note: watch('note'),
            fromPerson: watch('fromPerson'),
            toPerson: watch('toPerson'),
            image: watch('image'),
            transactionDate: watch('transactionDate'),
        });
    }, []);
    const clearCache = () => {
        
        setIsScanned(false);
        setHasScanned(false);
        setImagePreview(null);
        dispatch(getInvoiceScan(null)); 
    };
    
    
    useEffect(() => {
        if (show) {
            clearCache();
        }
    }, [show]);


    return (
        <PopupTransaction
            title={'Tạo giao dịch mới'}
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            hasImage={hasImage}
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
                    <div className="row">
                        <div className="col-4">
                            <Form.Label>Hạng mục</Form.Label>
                            <Controller
                                control={control}
                                name="categoryID"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} className="form-control">
                                        <option value="">Chọn hạng mục</option>
                                        {categories.map((item) => {
                                            if ((currentCategoryType === null || item.categoryType.name === currentCategoryType) && !item.isRoot) {
                                                return (
                                                    <option key={item.categoryID} value={item.categoryID}>
                                                        {item.nameVN}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </select>
                                )}
                            />
                        </div>
                        <div className="col-8">
                            <Form.Label>Số tiền</Form.Label>
                            <Controller
                                control={control}
                                name="totalAmount"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <>
                                        {isScanned && scan ? (
                                            <FormControl
                                                {...field}
                                                type="text"
                                                defaultValue={scan.totalAmount}
                                            />
                                        ) : (
                                            <Form.Control {...field} type="text" />
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </Form.Group>
                <Form.Group className="mb-2">
                    <div className="row">
                        <div className="col-4">
                            <Form.Label>Ví</Form.Label>
                            <Controller
                                control={control}
                                name="walletID"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} className="form-control">
                                        <option value="">Chọn ví</option>
                                        {walletOptions.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                        <div className="col-8">
                            <Form.Label>Thời gian</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                {...register('transactionDate', { required: true })}
                            />
                        </div>

                    </div>
                </Form.Group>
                <Form.Group className="mb-8">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control as="textarea" {...register("note")}></Form.Control>
                </Form.Group>
                {/* {file && isScanned && (
                    <Form.Group className="col-4" >
                        <Form.Label>file</Form.Label>
                        <Form.Control defaultValue={file} type="text" {...register('invoiceImageURL')} />
                    </Form.Group>
                )} */}
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ flexBasis: '60%', marginRight: '20px' }}>
                        <Form.Group className="mb-2" style={{ position: 'relative' }}>
                            <Form.Label>Chọn hóa đơn</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            {isScanning && (
                                <Spinner animation="border"
                                    role="status"
                                    style={{
                                        position: 'absolute',
                                        top: 25,
                                        right: '-60px',
                                    }}>
                                </Spinner>
                            )}
                            {hasScanned && !isScanning && (
                                <>
                                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', width: '100%' }} />}
                                </>
                            )}
                        </Form.Group>
                    </div>
                    {isScanned && scan && imagePreview && file && (
                        <div style={{ flexBasis: '90%', display: 'flex' }}>
                            <div style={{ marginRight: '20px' }}>
                                <h5 style={{ marginTop: '80px' }}>Nhà cung cấp</h5>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Tên</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierName}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('supplierName', { required: true })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Địa chỉ</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierAddress}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('supplierAddress', { required: true })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">SĐT</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierPhone}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('supplierPhone')}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <h5 style={{ marginTop: '20px' }}>Số tiền</h5>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Net</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.netAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('netAmount', { required: true })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Số tiền</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.totalAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Thuế</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.taxAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('taxAmount', { required: true })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">File</InputGroup.Text>
                                        <FormControl
                                            value={file}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            {...register('invoiceImageURL', { required: true })}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>
                            <div style={{ flexBasis: '70%', marginTop: '80px' }}>
                                <h5>Sản phẩm</h5>
                                <table className="table table-striped table-bordered table-hover" style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Tên sản phẩm</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Số lượng</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Đơn giá</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Thành tiền</th>
                                            {/* <th style={{ fontSize: '10px', padding: '8px' }}>Tag</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(scan.productInInvoices) && scan.productInInvoices.map((product, index) => (
                                            <tr key={index}>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>
                                                    <span
                                                        style={{ fontSize: '10px', padding: '8px' }}
                                                        contentEditable
                                                        onBlur={(e) => register(`productInInvoices[${index}].productName`, { value: e.target.innerText, required: true })}
                                                        dangerouslySetInnerHTML={{ __html: product.productName }}
                                                    />
                                                </td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>
                                                    <span
                                                        style={{ fontSize: '10px', padding: '8px' }}
                                                        contentEditable
                                                        onBlur={(e) => register(`productInInvoices[${index}].quanity`, { value: e.target.innerText, required: true })}
                                                        dangerouslySetInnerHTML={{ __html: product.quanity }}
                                                    />
                                                </td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>
                                                    <span
                                                        style={{ fontSize: '10px', padding: '8px' }}
                                                        contentEditable
                                                        onBlur={(e) => register(`productInInvoices[${index}].unitPrice`, { value: e.target.innerText, required: true })}
                                                        dangerouslySetInnerHTML={{ __html: product.unitPrice }}
                                                    />
                                                </td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>
                                                    <span
                                                        style={{ fontSize: '10px', padding: '8px' }}
                                                        contentEditable
                                                        onBlur={(e) => register(`productInInvoices[${index}].totalAmount`, { value: e.target.innerText, required: true })}
                                                        dangerouslySetInnerHTML={{ __html: product.totalAmount }}
                                                    />
                                                </td>
                                                {/* <td style={{ fontSize: '10px', padding: '8px' }}>
                                                    <span
                                                        style={{ fontSize: '10px' }}
                                                        contentEditable
                                                        onBlur={(e) => register(`productInInvoices[${index}].tag`, { value: e.target.innerText, required: true })}
                                                        dangerouslySetInnerHTML={{ __html: product.tag }}
                                                    />
                                                </td> */}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </PopupTransaction>
    );
};

export default CreateTransaction;