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
          className="rounded-full border border-dark"
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
            <hr className="border-b border-dark opacity-100 m-0" />
            <ItemMember />
          </Form.Group>
        </Form>
      </div>
    </Popup>
  );
}

const MemberTab = ({ collabID, data }) => {
  const [showAddNewPopup, showAddNewPopupSet] = useState(false);
  const members = useAppSelector((state) => state.member.values);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersOfCollab(collabID));
  }, [collabID]);

  const membersActive = members.filter((item) => {
    return item.activeStateID === 1;
  });
  const membersInActive = members.filter((item) => {
    return item.activeStateID === 2;
  });

  const membersWaiting = members.filter((item) => {
    return item.activeStateID === 3;
  });

  return (
    <>
      <AddNewMemberPopup
        show={showAddNewPopup}
        onClose={() => showAddNewPopupSet(false)}
      />
      {membersActive.length > 0 && (
        <>
          <h5 className="card-title text-center">Hoạt động</h5>
          {membersActive.map((item) => {
            return <MemberCard data={item} />;
          })}
        </>
      )}
      {membersInActive.length > 0 && (
        <>
          <h5 className="card-title text-center">Không hoạt động</h5>
          {membersInActive.map((item) => {
            return <MemberCard data={item} />;
          })}
        </>
      )}
      {membersWaiting.length > 0 && (
        <>
          <h5 className="card-title text-center">Đang xét duyệt </h5>
          {membersWaiting.map((item) => {
            return <MemberCard data={item} />;
          })}
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
