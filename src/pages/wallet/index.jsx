import React from 'react';
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
const Wallet = () => {
    return (
        <div className="Wallet">
            <PageTitle title="Wallet" />
            <div className="addWallet" /*onClick={() => handleActionItemClick("AddWallet")}*/>
                <button>New Wallet</button>
                <span>
                    Total: <p>1.000.000.0000 đ</p>
                </span>
            </div>
            <div class="card-container">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Cash<span>1.000.000.0000 đ</span></h5>
                        <h6 class="card-sub">Created date: 31/2/2024</h6>
                        <h6 class="card-sub">Currency unit: VND - đ</h6>
                        <h6 class="card-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />   <BsPencilSquare /></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">TP Bank<span>1.000.000.0000 đ</span></h5>
                        <h6 class="card-sub">Created date: 31/2/2024</h6>
                        <h6 class="card-sub">Currency unit: VND - đ</h6>
                        <h6 class="card-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />    <BsPencilSquare /></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Cash<span>1.000.000.0000 đ</span></h5>
                        <h6 class="card-sub">Created date: 31/2/2024</h6>
                        <h6 class="card-sub">Currency unit: VND - đ</h6>
                        <h6 class="card-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />    <BsPencilSquare /></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">TP Bank<span>1.000.000.0000 đ</span></h5>
                        <h6 class="card-sub">Created date: 31/2/2024</h6>
                        <h6 class="card-sub">Currency unit: VND - đ</h6>
                        <h6 class="card-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />    <BsPencilSquare /></div>
                    </div>
                </div>              
            </div>
        </div>
    );
};

export default Wallet;