import React, { useEffect, useState } from "react";
import { PageHelper, PageTitle } from "../../components";
import "../../css/Collaborator.css";
import { CollaItemCard } from "./CollaItemCard";
import { ActionTable } from "./ActionTable";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import {
  addCollaborator,
  getCollaborator,
} from "../../redux/collaboratorSlice";
import CreateCollabFund from "../../components/CollabFundForm/CreateCollabFund";
import { IoMdClose } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { acceptToCollab, declineToCollab } from "../../redux/memberSlice";
import { getActionsOfCollab } from "../../redux/actionSlice";
import { getTotalAmountCollaborator } from "../../redux/totalAmountCollabSlice";

const Callaborator = () => {
  const [show, showSet] = useState(false);
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const collaborators = useAppSelector((state) => state.collaborator.values);
  useEffect(() => {
    dispatch(getCollaborator());
  }, [user]);

  const [selectedCollab, setSelectedCollab] = useState(null);

  const handleCollabItemClick = (collabId) => {
    setSelectedCollab(collabId);
  };

  const handleAcceptCollab = (collabID, accID, user) => {
    dispatch(acceptToCollab({ collabID, accID, user }));
  };

  const handleDeclineCollab = (collabID, accID, user) => {
    dispatch(declineToCollab({ collabID, accID, user }));
  };

  const [totalAmounts, setTotalAmounts] = useState({});

  useEffect(() => {
    const fetchTotalAmounts = async () => {
      const amounts = {};
      for (const collaborator of collaborators) {
        if (collaborator.accountState.activeStateID !== 3) {
          const response = await dispatch(getTotalAmountCollaborator(collaborator.collabFundID));
          const totalAmountStr = response.payload.totalAmountStr;
          amounts[collaborator.collabFundID] = totalAmountStr;
        }
      }
      setTotalAmounts(amounts);
    };

    fetchTotalAmounts();
  }, [collaborators, dispatch]);

  return (
    <div className="Callaborator">
      {user ? (
        <>
          <PageTitle title="Chi tiêu chung" />
          {collaborators?.map((item) =>
            item.accountState.activeStateID === 3 ? (
              <div
                class="alert alert-secondary alert-dismissible fade show"
                role="alert"
                style={{ background: "#EFEDE4" }}
              >
                <div className="cardAccept">
                  <div className="contentAccept ">
                    Bạn được mời tham gia vào quỹ "{item.name}"
                  </div>
                  <div className="listIcon">
                    <IoMdClose
                      className="iconClose"
                      onClick={() =>
                        handleDeclineCollab(
                          item.collabFundID,
                          user.accountID,
                          user
                        )
                      }
                    />
                    <BiCheck
                      className="iconCheck"
                      onClick={() =>
                        handleAcceptCollab(
                          item.collabFundID,
                          user.accountID,
                          user
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          )}

          <Button
            size="btn-lg"
            onClick={() => showSet(!show)}
            className="active bold btn-light"
          >
            Tạo khoản chi tiêu chung
          </Button>

          <CreateCollabFund
            show={show}
            showSet={showSet}
            onSubmit={(fieldValue) =>
              dispatch(
                addCollaborator({
                  fieldValue: fieldValue,
                })
              )
                .unwrap()
                .then(() => showSet(false))
            }
          />
          <section className="section dashboard">
            <div className="row">
              {collaborators.length > 0 && (
                <>
                  <div className="col-lg-4 listColla">
                    {collaborators?.map((item, index) =>
                      (item.accountState.activeStateID !== 3 && item.accountState.activeStateID !== 2) ? (
                        <CollaItemCard
                          key={index}
                          data={item}
                          collabFundID={item.collabFundID}
                          onItemClick={handleCollabItemClick}
                          totalAmount={totalAmounts[item.collabFundID]} 
                        />
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                  <div className="col-lg-8 actionTable">
                    {selectedCollab && (
                      <ActionTable collabID={selectedCollab} />
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          <PageHelper />
        </>
      )}
    </div>
  );
};

export default Callaborator;
