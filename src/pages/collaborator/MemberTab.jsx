import React, { useState } from "react";
import MemberCard from "./MemberCard";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import MultipleSelect from "../../components/MultipleSelect";
import Form from "react-bootstrap/Form";
import logo from "../../assets/Logo.png";
function ItemMember () {
  return <div className="d-flex align-items-center gap-2 p-2">
    <div>
      <img src={logo} alt="" className="rounded-full border border-dark" width={50} height={50} />
    </div>
    <div className="flex-grow-1">
      <p className="mb-0 bold">Member 1</p>
      <p className="mb-0 small">Member 1</p>
    </div>
    <Button>Invite</Button>
  </div>
}

function AddNewMemberPopup({ show, onClose }) {
    return (
        <Popup show={show} onClose={onClose}>
            <div>
                <h3>Attendees</h3>
                <Form className="c-form">
                    <Form.Group className="mb-3">
                      <MultipleSelect
                          value={[{ value: "member1", label: "member 1" }]}
                          options={[
                              { value: "member1", label: "member 1" },
                              { value: "member2", label: "member 2" },
                          ]}
                      ></MultipleSelect>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex gap-3 align-items-center">
                      <Form.Control type="text" className="flex-grow-1" />
                      <Button>Search</Button>
                    </Form.Group>
                    <Form.Group className="mb-3 border border-dark">
                      <ItemMember />
                      <hr className="border-b border-dark opacity-100 m-0" />
                      <ItemMember />
                    </Form.Group>
                </Form>
            </div>
        </Popup>
    );
}

const MemberTab = () => {
    const [showAddNewPopup, showAddNewPopupSet] = useState(false);
    return (
        <>
            <AddNewMemberPopup
                show={showAddNewPopup}
                onClose={() => showAddNewPopupSet(false)}
            />
            <h5 class="card-title text-center">Action</h5>
            <MemberCard />
            <MemberCard />
            <h5 class="card-title text-center">Waiting for confirmation</h5>
            <MemberCard />
            <MemberCard />
            <h5 class="card-title text-center">Inactive</h5>
            <MemberCard />
            <MemberCard />
            <div className="text-center mt-4">
                <Button size="btn-lg" onClick={() => showAddNewPopupSet(!showAddNewPopup)}>
                    Add new member
                </Button>
            </div>
        </>
    );
};

export default MemberTab;
