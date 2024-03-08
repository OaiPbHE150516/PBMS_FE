import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addWallet, getTotalWallets, getWallets ,updateWallet} from "../../redux/walletSlice";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import CreateWallet from "../../components/WalletForm/CreateWallet";
import UpdateWallet from "../../components/WalletForm/UpdateWallet";
import { getCurrency } from "../../redux/currencySlice";
const Wallet = () => {
    const dispatch = useDispatch();

    const wallet = useSelector((state) => state.wallet.values);
    const walletID = useSelector((state) => state.wallet?.walletID);
    const totalwallets = useSelector((state) => state.totalwallet.values);
    const accountID = useSelector((state) => state.authen.user?.accountID);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const [editIdModal, editIdModalSet] = useState(false);
    const updateWalletData = wallet.find(
        (item) => item.walletID === editIdModal
    );
    const retrieveValues = () => {
        console.log("retrieveValues");
        dispatch(getWallets());
        dispatch(getTotalWallets());
        dispatch(getCurrency());
    };

    const [show, showSet] = useState(false);

    useEffect(() => {
        retrieveValues();
    }, []);
    return (
        <div className="Wallet">
            <PageTitle title="Wallet" />
            <div className="addWallet">
                <Button
                    size="btn-lg"
                    onClick={() => showSet(!show)}
                    className="active bold btn-light"
                >
                    Create new Wallet
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
                        Total: <p>{totalwallets.totalBalance}</p>
                    </span>
                )}
            </div>
            <div className="wallet-list-container">
                <div className="wallet-list">
                    {wallet?.map((wallet) => (
                        <div class="wallet-container" key={wallet.id}>
                            <div class="wallet">
                                <div class="wallet-body">
                                    <h5 class="wallet-title">{capitalizeFirstLetter(wallet.name)}<span>{wallet.balance} {wallet.currency.symbol}</span></h5>
                                    <h6 class="wallet-sub">Created date: {wallet.createTimeStr}</h6>
                                    <h6 class="wallet-sub">Currency unit: {wallet.currency.name} - {wallet.currency.symbol}</h6>
                                    <h6 class="wallet-sub">Note: {wallet.note}</h6>
                                    <div class="active-container">
                                        <div class="active1">
                                            <div>
                                                <Form.Check
                                                    className="mb-0"
                                                    type="switch"
                                                    reverse
                                                    label="Active"
                                                    size={"lg"}
                                                    checked={wallet.currency.activeState.activeStateID === 1}
                                                ></Form.Check>
                                            </div>
                                        </div>
                                        <div class="active2">
                                            <button className="icon-button">
                                                <IoReload />
                                            </button>
                                            {wallet && (
                                                <button className="icon-button" onClick={() => editIdModalSet(wallet.walletID)}>
                                                    <BsPencilSquare />
                                                </button>)}
                                            {updateWalletData && (
                                                <UpdateWallet
                                                    data={updateWalletData}
                                                    show={Boolean(editIdModal)}
                                                    onClose={() => editIdModalSet(false)}
                                                    onSubmit={(fieldValue) =>
                                                        dispatch(updateWallet({ accountID: accountID,walletID: editIdModal, fieldValue: fieldValue }))
                                                            .unwrap()
                                                            .then(() => editIdModalSet(false))}
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