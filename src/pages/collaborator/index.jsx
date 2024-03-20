  import React, { useEffect, useState } from "react";
  import { PageTitle } from "../../components";
  import "../../css/Collaborator.css";
  import { CollaItemCard } from "./CollaItemCard";
  import { ActionTable } from "./ActionTable";
  import Button from "../../components/Button";
  import { useDispatch, useSelector } from "react-redux";
  import useAppSelector from "../../hooks/useAppSelector";
  import { addCollaborator, getCollaborator } from "../../redux/collaboratorSlice";
  import CreateCollabFund from "../../components/CollabFundForm/CreateCollabFund";

  const Callaborator = () => {
    const [show, showSet] = useState(false);

    const dispatch = useDispatch();
    const collaborators = useAppSelector((state) => state.collaborator.values);
    useEffect(() => {
      dispatch(getCollaborator());
    }, []);

    const accountID = useSelector((state) => state.authen.user?.accountID);
    const [selectedCollab, setSelectedCollab] = useState(null);

    const handleCollabItemClick = (collabId) => {
      setSelectedCollab(collabId);
    };
    
    return (
      
      <div className="Callaborator">
        <PageTitle title="Quỹ cộng tác" />
        <Button
          size="btn-lg"
          onClick={() => showSet(!show)}
          className="active bold btn-light"
        >
          Tạo quỹ cộng tác mới
        </Button>

        <CreateCollabFund
          show={show}
          showSet={showSet}
          onSubmit={(fieldValue) =>
            dispatch(addCollaborator({accountID: accountID, fieldValue: fieldValue}))
              .unwrap()
              .then(() => showSet(false))
          }
        />

        <section className="section dashboard">
          <div className="row">
            {collaborators.length > 0 && (
              <>
                <div className="col-lg-4 listColla">
                  {collaborators.map((item) => (
                    <CollaItemCard
                      key={item.collabFundID}
                      data={item}
                      onItemClick={handleCollabItemClick}
                    />
                  ))}
                </div>
                <div className="col-lg-8 actionTable">
                  {selectedCollab && <ActionTable collabID={selectedCollab} />}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    );
  };

  export default Callaborator;
