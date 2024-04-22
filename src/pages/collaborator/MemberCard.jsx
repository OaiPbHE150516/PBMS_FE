import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import * as dayjs from "dayjs";
import PopupDelete from "../../components/PopupDelete";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { deleteCollaborator } from "../../redux/collaboratorSlice";
import { deleteMemberToCollab } from "../../redux/memberSlice";

const MemberCard = ({ data, founderID, collabID }) => {
  const dispatch = useDispatch();
  const [show, showSet] = useState(false);
  const [showFormDeleteMember, setShowFormDeleteMember] = useState(false);

  const handleDeleteMember = () => {
    const fieldValue = {
      accID: data.accountID,
      founderID: founderID,
      collabFundID: collabID,
    };
    dispatch(deleteMemberToCollab({ fieldValue }))
      .unwrap()
      .then(() => setShowFormDeleteMember(false));
  };
  return (
    <div class="card mb-3 cardActionItem">
      <div class="row g-0 ps-2 py-2">
        <div class="col-md-4 c-card-member-comment">
          <img
            src={data.pictureURL}
            class="img-fluid rounded-start img_logo"
            alt="..."
          />
          <div class="card-body py-0">
            <p class="card-text c-card-member mb-2">{data.accountName}</p>
            {data.isFundholder ? (
              <p className="card-text">Chủ quỹ</p>
            ) : (
              <p className="card-text">Thành viên</p>
            )}
          </div>
        </div>
        <div class="col-md-8 c-card-time-money">
          <div class="card-body py-0">
            <p class="card-text small fst-italic  mb-2">
              {dayjs(data.lastTime).format("DD/MM/YYYY")}
            </p>
            <p class="card-text c-card-money">
              {!data.isFundholder && (
                <BsThreeDots onClick={() => setShowFormDeleteMember(true)} />
              )}
              {/* {founderID === data.isFundholder ? (
                <></>
              ) : (
                <>
                  <BsThreeDots onClick={() => setShowFormDeleteMember(true)} />
                </>
              )} */}
            </p>
          </div>
        </div>
        {showFormDeleteMember && (
          <PopupDelete
            title={"Xoá thành viên "}
            show={showFormDeleteMember}
            onClose={() => setShowFormDeleteMember(false)}
            onSubmit={handleDeleteMember}
          />
        )}
      </div>
    </div>
  );
};

export default MemberCard;
