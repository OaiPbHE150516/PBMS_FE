import React from "react";
import logo from "../../assets/Logo.png";

export const ActionCard=() => {
  return (
    <div class="card mb-3 cardActionItem">
      <div class="row g-0 ps-2 py-2">
        <div class="col-md-4 c-card-member-comment">
          <img src={logo} class="img-fluid rounded-start" alt="..." />
          <div class="card-body py-0">
            <p class="card-text c-card-member mb-2">Member 1</p>
            <p class="card-text">Comment</p>
          </div>
        </div>
        <div class="col-md-8 c-card-time-money">
          <div class="card-body py-0">
            <p class="card-text small fst-italic  mb-2">10:02, 20/12/2023</p>
            <p class="card-text c-card-money">-100.000 đ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
