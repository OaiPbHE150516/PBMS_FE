import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addWallet, getTotalWallets, getWallets, updateWallet, deleteWallet } from "../../redux/walletSlice";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import CreateWallet from "../../components/WalletForm/CreateWallet";
import UpdateWallet from "../../components/WalletForm/UpdateWallet";
import DeleteWallet from "../../components/WalletForm/DeleteWallet";
import { getCurrency } from "../../redux/currencySlice";
const Wallet = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.wallet.values);
    const totalwallets = useSelector((state) => state.totalwallet.values);
    const accountID = useSelector((state) => state.authen.user?.accountID);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const [editIdModal, editIdModalSet] = useState(false);
    const [removeIdModal, removeIdModalSet] = useState(false);
    const editWalletData = wallet.find(
        (item) => item.walletID === editIdModal
    );
    const deleteWalletData = wallet.find(
        (item) => item.walletID === removeIdModal
    );

    const retrieveValues = () => {
        console.log("retrieveValues");
        dispatch(getWallets());
        dispatch(getTotalWallets());
        dispatch(getCurrency());
    };
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const [show, showSet] = useState(false);

    useEffect(() => {
        retrieveValues();
    }, []);
    return (
        <div className="Wallet">
            <PageTitle title="Ví" />
            <div className="addWallet">
                <Button
                    size="btn-lg"
                    onClick={() => showSet(!show)}
                    className="active bold btn-light"
                >
                    Tạo ví mới
                </Button>
                <CreateWallet
                    show={show}
                    showSet={showSet}
                    onSubmit={(fieldValue) =>
                        dispatch(addWallet({ accountID: accountID, fieldValue: fieldValue }))
                            .unwrap()
                            .then(() => showSet(false))
                    }
                />
                {totalwallets && (
                    <span>
                        Tổng tiền: <p>{totalwallets.totalBalance}</p>
                    </span>
                )}
            </div>
            <div className="wallet-list-container">
                <div className="wallet-list">
                    {wallet?.map((wallet) => (
                        <div class="wallet-container" key={wallet.id}>
                            <div class="wallet">
                                <div class="wallet-body">
                                    <h5 class="wallet-title">{capitalizeFirstLetter(wallet.name)}<span>{formatCurrency(wallet.balance)} {wallet.currency.symbol}</span></h5>
                                    <h6 class="wallet-sub">Ngày tạo ví: {wallet.createTimeStr}</h6>
                                    <h6 class="wallet-sub">Đơn vị tiền: {wallet.currency.name} - {wallet.currency.symbol}</h6>
                                    <h6 class="wallet-sub">Ghi chú: {wallet.note}</h6>
                                    <div class="active-container">
                                        <div class="active-container">
                                            {/* <div class="active1">
                                                <div className="pe-4">
                                                    <div>
                                                        <Form.Check
                                                            className="mb-0"
                                                            type="switch"
                                                            reverse
                                                            label="Hoạt động"
                                                            size={"lg"}
                                                            defaultChecked={wallet.currency.activeState.activeStateID === 1}
                                                        ></Form.Check>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div class="active2">
                                            {wallet && (
                                                <button className="icon-button" onClick={() => editIdModalSet(wallet.walletID)}>
                                                    <BsPencilSquare />
                                                </button>)}
                                            {editWalletData && (
                                                <UpdateWallet
                                                    data={editWalletData}
                                                    show={Boolean(editIdModal)}
                                                    onClose={() => editIdModalSet(false)}
                                                    onSubmit={(fieldValue) =>
                                                        dispatch(updateWallet({ accountID: accountID, walletID: editIdModal, fieldValue: fieldValue }))
                                                            .unwrap()
                                                            .then(() => editIdModalSet(false))}
                                                />)}
                                            {wallet && (
                                                <button className="icon-button" onClick={() => removeIdModalSet(wallet.walletID)}>
                                                    <BsTrash />
                                                </button>)}
                                            {deleteWalletData && (
                                                <DeleteWallet
                                                    name={deleteWalletData.name}
                                                    balance={deleteWalletData.balance + ' ' + deleteWalletData.currency.symbol}
                                                    note={deleteWalletData.note}
                                                    data={deleteWalletData}
                                                    show={Boolean(removeIdModal)}
                                                    onClose={() => removeIdModalSet(false)}
                                                    onSubmit={() =>
                                                        dispatch(deleteWallet({ accountID: accountID, walletID: removeIdModal }))
                                                            .unwrap()
                                                            .then(() => removeIdModalSet(false))}
                                                />)}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;