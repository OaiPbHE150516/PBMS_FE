import React from "react";
import { BsThreeDots } from "react-icons/bs";
import * as dayjs from 'dayjs'

const MemberCard=({data}) => {
  return (
    <div class="card mb-3 cardActionItem">
      <div class="row g-0 ps-2 py-2">
        <div class="col-md-4 c-card-member-comment">
          <img src={data.pictureURL} class="img-fluid rounded-start" alt="..." />
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
            <p class="card-text small fst-italic  mb-2">{dayjs(data.createTime).format("DD/MM/YYYY")}</p>
            <p class="card-text c-card-money">
            <BsThreeDots />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard
