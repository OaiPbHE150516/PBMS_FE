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
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap';

const CreateTransaction = ({ show, showSet, onSubmit = () => { } }) => {
    const dispatch = useDispatch();
    const scan = useSelector((state) => state.scan.values)
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isValid },
        reset
    } = useForm({
        defaultValues: {
            walletID:"",
            categoryID:"",
            totalAmount: "",
            note: "",
            fromPerson: "",
            toPerson:"",
            image: "",
            transactionDate: dayjs().format('YYYY-MM-DDTHH:mm')
        },
    });
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
    }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setValue('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIsScanning(true);
                setImagePreview(reader.result);
                dispatch(getInvoiceScan(file)).then(() => {
                    setIsScanning(false);
                    setHasScanned(true);
                })
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
            setTime(dayjs().format('YYYY-MM-DDTHH:mm'));
        }
    }, [isScanned, scan]);


    return (
        <PopupTransaction
            title={'Create new Transaction'}
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
                                Thu nhập
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
                                Chi tiêu
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
                                            if (currentCategoryType === null || (item.categoryType.name === currentCategoryType)) {
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
                            {isScanned && scan && (
                                <Form.Control type="text" defaultValue={scan.totalAmount} {...register('totalAmount', { required: true })}/>
                            )}
                            {!isScanned && (
                                <Form.Control type="text" {...register('totalAmount', { required: true })} />
                            )}
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
                                value={time}
                            />
                        </div>

                    </div>
                </Form.Group>
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
                    {isScanned && scan && imagePreview && (
                        <div style={{ flexBasis: '70%', display: 'flex' }}>
                            <div style={{ marginRight: '20px' }}>
                                <h5 style={{ marginTop: '80px' }}>Supplier</h5>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierName}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Address</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierAddress}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Phone</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.supplierPhone}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                               
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <h5 style={{ marginTop: '20px' }}>Receiver</h5>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.receiverName}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Address</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.receiverAddress}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                          
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <h5 style={{ marginTop: '20px' }}>Amount</h5>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Net</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.netAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                        
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Tax</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.taxAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Total</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.totalAmount}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formName">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroupPrepend">Payment terms</InputGroup.Text>
                                        <FormControl
                                            defaultValue={scan.paymentTerms}
                                            type="text"
                                            aria-describedby="inputGroupPrepend"
                                            
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>
                            <div style={{ flexBasis: '80%', marginTop: '60px' }}>
                                <h3>Product</h3>
                                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Tên sản phẩm</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Số lượng</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Đơn giá</th>
                                            <th style={{ fontSize: '10px', padding: '8px' }}>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(scan.productInInvoices) && scan.productInInvoices.map((scan, index) => (
                                            <tr>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>{scan.productName}</td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>{scan.quanity}</td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>{scan.unitPrice}</td>
                                                <td style={{ fontSize: '10px', padding: '8px' }}>{scan.totalAmount}</td>
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
