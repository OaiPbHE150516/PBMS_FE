import Modal from "react-bootstrap/Modal";
import "./PopupDelete.css";
import Button from "../Button";
const Popup = ({
  title,
  onClose,
  onSubmit,
  show,
  members,
  children,
  closeName = "Hủy",
  submitName = "Xóa",
}) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      show={show}
      onExit={onClose}
      onHide={onClose}
    >
      <div className="popup-content">
        <h3 className="bold">{title}</h3>
        <div>{children}</div>
        {members ? (
          <>
            {" "}
            <div>
              Thành viên gồm:
              <div style={{ margin: "20px 50px" }}>
                {members.map((item) => (
                  <p>{item.accountName}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="d-flex justify-content-end">
          <div className="d-flex gap-2 mt-2">
            {onClose && (
              <Button
                className="btn-light bold"
                variant="secondary"
                onClick={onClose}
              >
                {closeName}
              </Button>
            )}
            {onSubmit && (
              <Button
                className="btn-danger bold"
                variant="primary"
                onClick={onSubmit}
                type="submit"
              >
                {submitName}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
