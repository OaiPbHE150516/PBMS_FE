import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import MultipleSelect from "../../components/MultipleSelect";
import Form from "react-bootstrap/Form";
import logo from "../../assets/Logo.png";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getMembersOfCollab } from "../../redux/memberSlice";
function ItemMember() {
  return (
    <div className="d-flex align-items-center gap-2 p-2">
      <div>
        <img
          src={logo}
          alt=""
          className="rounded-full border border-dark img_logo"
          width={50}
          height={50}
        />
      </div>
      <div className="flex-grow-1">
        <p className="mb-0 bold">Member 1</p>
        <p className="mb-0 small">Member 1</p>
      </div>
      <Button>Thêm</Button>
    </div>
  );
}

function AddNewMemberPopup({ show, onClose }) {
  return (
    <Popup show={show} onClose={onClose}>
      <div>
        <h3>Thêm thành viên</h3>
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
          </Form.Group>
        </Form>
      </div>
    </Popup>
  );
}

const MemberTab = ({ collabID }) => {
  const [showAddNewPopup, showAddNewPopupSet] = useState(false);
  const members = useAppSelector((state) => state.member);
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.authen.user);

  useEffect(() => {
    dispatch(getMembersOfCollab({ collabID }));
  }, [collabID, user]);

  const memberAction = members.active || [];
  const membersWaiting = members.pending || [];
  const memberInactive = members.inactive || [];

  console.log("memberAction", memberAction);
  console.log("membersWaiting", membersWaiting);
  console.log("memberInactive", memberInactive);
  return (
    <>
      <AddNewMemberPopup
        show={showAddNewPopup}
        onClose={() => showAddNewPopupSet(false)}
      />

      <h5 className="card-title text-center">Hoạt động</h5>
      {memberAction.length > 0 ? (
        <>
          {memberAction.map((item) => {
            return <MemberCard key={item.id} data={item} />;
          })}{" "}
        </>
      ) : (
        <>
          <div className="card-title text-center">...</div>
        </>
      )}

      <h5 className="card-title text-center">Không hoạt động</h5>
      {memberInactive.length > 0 ? (
        <>
          {memberInactive.map((item) => {
            return <MemberCard key={item.id} data={item} />;
          })}{" "}
        </>
      ) : (
        <>
          <div className="card-title text-center">...</div>
        </>
      )}
      <h5 className="card-title text-center">Đang xét duyệt </h5>
      {membersWaiting.length > 0 ? (
        <>
          {membersWaiting.map((item) => {
            return <MemberCard key={item.id} data={item} />;
          })}{" "}
        </>
      ) : (
        <>
          <div className="card-title text-center">...</div>
        </>
      )}

      <div className="text-center mt-4">
        <Button
          size="btn-lg"
          onClick={() => showAddNewPopupSet(!showAddNewPopup)}
        >
          Thêm thành viên
        </Button>
      </div>
    </>
  );
};

export default MemberTab;
