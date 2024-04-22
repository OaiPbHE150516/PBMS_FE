import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import PopupTransaction from '../PopupTransaction';
import { Controller, useForm } from "react-hook-form";

const DetailTransaction = ({ show, onClose, data }) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      ...data,
    },
  });
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const hasImage = data?.payload?.invoice?.invoiceImageURL.includes("https://storage.googleapis.com/pbms-user") ? true : false;
  return (
    <PopupTransaction
      title={"Chi tiết giao dịch"}
      show={show}
      onClose={() => onClose()}
      hasImage={hasImage}
    >
      <Form className="c-form">
        <Form.Group className="mb-2" style={{ marginTop: '10px' }}>
          <div className="row">
            <div className="col-4">
              <Form.Label>Hạng mục</Form.Label>
              <Form.Control type="text" {...register('payload.category.nameVN')} readOnly disabled />
            </div>
            <div className="col-8">
              <Form.Label>Số tiền</Form.Label>
              <Form.Control type="text" value={formatCurrency(data?.payload?.totalAmount || 0)} readOnly disabled />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-2">
          <div className="row">
            <div className="col-4">
              <Form.Label>Ví</Form.Label>
              <Form.Control type="text" {...register('payload.wallet.name')} readOnly disabled />
            </div>
            <div className="col-8">
              <Form.Label>Thời gian</Form.Label>
              <Form.Control
                type="text"
                {...register('payload.transactionDateStr')}
                readOnly disabled
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-2">
          <div className="row">
            {hasImage && data?.payload?.invoice?.invoiceImageURL && data.payload.invoice.invoiceImageURL.includes("https://storage.googleapis.com/pbms-user") && (
              <div className="col-4">
                <Form.Label>URL Hóa đơn</Form.Label>
                <Form.Control type="text" {...register("payload.invoice.invoiceImageURL")} readOnly disabled></Form.Control>
              </div>
            )}
            <div className="col-8">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control as="textarea" {...register("payload.note")} readOnly disabled></Form.Control>
            </div>
          </div>
        </Form.Group>
      </Form>
      <div style={{ marginTop: "70px", display: 'flex' }}>
        {hasImage && data?.payload?.invoice?.invoiceImageURL && data.payload.invoice.invoiceImageURL.includes("https://storage.googleapis.com/pbms-user") && (
          <div style={{ flex: 1 }}>
            <img src={data.payload.invoice.invoiceImageURL} alt="Ảnh" style={{ maxWidth: "80%" }} />
          </div>
        )}
        {hasImage && data?.payload?.invoice?.invoiceImageURL && data.payload.invoice.invoiceImageURL.includes("https://storage.googleapis.com/pbms-user") && (
          <div style={{ flex: 1 }}>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payload.invoice.products.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ width: '25%' }}>{product.productName}</td>
                      <td style={{ width: '5%' }}>{product.quanity}</td>
                      <td style={{ width: '5%' }}>{product.unitPrice}</td>
                      <td style={{ width: '15%' }}>{product.totalAmount}</td>
                      <td style={{ width: '20%' }}>{product.tag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PopupTransaction>
  );
};

export default DetailTransaction;
