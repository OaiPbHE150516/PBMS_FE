import React from "react";
import MemberTab from "./MemberTab";
import {ActionCard} from "./ActionCard";
import {AddNewMember} from "./AddNewMember";

export const ActionTable=() => {
  return (
    <div class="card h-100 pt-3">
      <div class="card-body d-flex flex-column">
        <ul
          class="nav nav-tabs d-flex"
          id="myTabjustified"
          role="tablist"
        >
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100 active"
              id="action-tab"
              data-bs-toggle="tab"
              data-bs-target="#action-justified"
              type="button"
              role="tab"
              aria-selected="true"
            >
              Action
            </button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100"
              id="member-tab"
              data-bs-toggle="tab"
              data-bs-target="#member-justified"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Member
            </button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100"
              id="history-tab"
              data-bs-toggle="tab"
              data-bs-target="#history-justified"
              type="button"
              role="tab"
              aria-selected="false"
            >
              History
            </button>
          </li>
        </ul>
        <div
          class="tab-content pt-2 h-100"
          id="myTabjustifiedContent"
        >
          <div
            class="tab-pane fade show active h-100"
            id="action-justified"
            role="tabpanel"
            aria-labelledby="action-tab"
          >
            <div className="d-flex flex-column h-100">
              <div className="flex-grow-1">
                <ActionCard />
                <ActionCard />
                <ActionCard />
              </div>
              <AddNewMember />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="member-justified"
            role="tabpanel"
            aria-labelledby="member-tab"
          >
            <MemberTab />
          </div>
          <div
            class="tab-pane fade"
            id="history-justified"
            role="tabpanel"
            aria-labelledby="history-tab"
          ></div>
        </div>
      </div>
    </div>
  );
};
