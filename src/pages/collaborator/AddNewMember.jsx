import React from "react";
import logo from "../../assets/Logo.png";
import {Form} from "react-bootstrap";
import Button from "../../components/Button";
import {IoIosSend} from "react-icons/io";
import {FaFileImage} from "react-icons/fa";

export const AddNewMember=() => {
  return <div className="d-flex gap-2">
    <div className="d-flex gap-3">
      <img src={logo} className="img-fluid rounded-full border border-dark" alt="..." width={50} height={50}></img>
      <div className="">
        <p className="mb-0 bold">Member 1</p>
        <p className="mb-0 small">Trustee</p>
      </div>
    </div>
    <Form className="c-form d-flex align-items-center flex-grow-1">
      <div className="flex-grow-1"><Form.Control type="text" /></div>

      <Button reset className="fs-4 px-1"><IoIosSend /></Button>
      <Button reset className="fs-5 px-1"><FaFileImage /></Button>
      <Button>Add new</Button>
    </Form>
  </div>;
};
