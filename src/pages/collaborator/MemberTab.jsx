import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Form from "react-bootstrap/Form";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import {
  addMembersToCollab,
  getMembersOfCollab,
} from "../../redux/memberSlice";
import { BsX } from "react-icons/bs";
import { searchMembersByKey } from "../../services/searchMemberSlice";

const AddNewMemberPopup = ({ show, onClose, collabID, founderID }) => {
  const [searchKey, setSearchKey] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const listMemberSearch = useAppSelector((state) => state.searchMember.values);
  const listMemberSearched = listMemberSearch.filter(
    (item) =>
      !selectedMembers.filter((member) => member.accountID === item.accountID)
        .length
  );
  const handleSearch = async () => {
    await dispatch(searchMembersByKey(searchKey));
  };

  return (
    <Popup show={show} onClose={onClose}>
      <div>
        <h3>Thêm thành viên</h3>
        <Form className="c-form">
          <Form.Label>Tìm kiếm thành viên</Form.Label>
          <Form.Group className="mb-3 d-flex gap-3 align-items-center">
            <Form.Control
              type="text"
              className="flex-grow-1"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <Button onClick={handleSearch}>Tìm</Button>
          </Form.Group>
          <div className="member_search_card">
            {listMemberSearched.map((member, index) => (
              <ItemMember
                key={index}
                member={member}
                collabID={collabID}
                founderID={founderID}
                selectedMembers={selectedMembers}
                setSelectedMembers={setSelectedMembers}
              />
            ))}
          </div>
        </Form>
      </div>
    </Popup>
  );
};

const ItemMember = ({
  member,
  collabID,
  founderID,
  selectedMembers,
  setSelectedMembers,
}) => {
  const dispatch = useDispatch();
  const handleAddMember = () => {
    dispatch(
      addMembersToCollab({
        fieldValue: {
          collabFundID: collabID,
          accountFundholderID: founderID,
          accountMemberID: member.accountID,
        },
      })
    );
  };

  const handleAddMemberAndRemove = () => {
    handleAddMember();
    setSelectedMembers([...selectedMembers, member]);
  };

  if (!member) return null;
  return (
    <Form.Group className="mb-3 border border-dark">
      <div className="d-flex align-items-center gap-2 p-2 ">
        <div>
          <img
            src={member.pictureURL}
            alt=""
            className="rounded-full border border-dark"
            width={50}
            height={50}
          />
        </div>
        <div className="flex-grow-1">
          <p className="mb-0 bold">{member.accountName}</p>
        </div>
        <Button onClick={handleAddMemberAndRemove}>Mời</Button>
      </div>
    </Form.Group>
  );
};

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

  const memberFound = {
    active: (members.active || []).filter((member) => member.isFundholder),
    pending: (members.pending || []).filter((member) => member.isFundholder),
    inactive: (members.inactive || []).filter((member) => member.isFundholder),
  };

  const isCurrentUserMember = memberFound.active.some(
    (member) => member.accountID === user.accountID
  );

  return (
    <>
      <AddNewMemberPopup
        show={showAddNewPopup}
        onClose={() => showAddNewPopupSet(false)}
        founderID={user.accountID}
        collabID={collabID}
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
            return (
              <MemberCard
                key={item.id}
                data={item}
                founderID={user.accountID}
              />
            );
          })}{" "}
        </>
      ) : (
        <>
          <div className="card-title text-center">...</div>
        </>
      )}

      {isCurrentUserMember && (
        <div className="text-center mt-4">
          <Button
            size="btn-lg"
            onClick={() => showAddNewPopupSet(!showAddNewPopup)}
          >
            Thêm thành viên
          </Button>
        </div>
      )}
    </>
  );
};

export default MemberTab;
