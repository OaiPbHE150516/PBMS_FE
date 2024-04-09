import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWallets as walletServices } from "../services/walletService";
import { getTotalWallets as totalwalletServices } from "../services/walletService";
import { addWallet as addWalletServices } from "../services/walletService";
import { updateWallet as updateWalletServices } from "../services/walletService";
import { deleteWallet as deleteWalletServices } from "../services/walletService";
import { updateStateWallet as updateStateWalletServices } from "../services/walletService";

export const getWallets = createAsyncThunk("get-wallets", async (_, {getState}) => {
  const user = getState().authen.user;
  const response = await walletServices(user);
  return response;
});

export const getTotalWallets = createAsyncThunk("get-totalwallets", async (_, {getState}) => {
  const user = getState().authen.user;
  const response = await totalwalletServices(user);
  return response;
});

export const addWallet = createAsyncThunk(
  "add-wallet",
  async ({ accountID, fieldValue }, { dispatch }) => {
    const body = {
      accountID: accountID,
      name: fieldValue.name,
      balance: fieldValue.balance,
      currencyID: 2,
    };
    console.log(body);
    const response = await addWalletServices(body);
    await dispatch(getWallets())
    await dispatch(getTotalWallets())
    return response;
  }
);
export const updateStateWallet = createAsyncThunk(
  "update-Statewallet",
  async ({ accountID, walletID, activeStateID }, { dispatch }) => {
    const body = {
      accountID: accountID,
      walletID: walletID,
      activeStateID: activeStateID,
    };
    console.log("Sửa state ví"+body);
    const response = await updateStateWalletServices(body);
    await dispatch(getTotalWallets());
    return response;
  }
);

export const updateWallet = createAsyncThunk(
  "update-wallet",
  async ({ accountID, walletID, fieldValue }, { dispatch }) => {
    const isBanking =
      typeof fieldValue.isBanking === "string"
        ? fieldValue.isBanking.toLowerCase() === "true"
        : Boolean(fieldValue.isBanking);

    const body = {
      accountID: accountID,
      walletID: walletID,
      name: fieldValue.name,
      note: fieldValue.note,
      isBanking: isBanking,
      qrCodeURL: fieldValue.qrCodeURL,
      bankName: fieldValue.bankName,
      bankAccount: fieldValue.bankAccount,
      bankUsername: fieldValue.bankUsername,
    };
    console.log("Sửa ví"+body);
    const response = await updateWalletServices(body);
    await dispatch(getWallets());
    await dispatch(getTotalWallets());

    return response;
  }
);
export const deleteWallet = createAsyncThunk(
  'delete-wallet',
  async ({ accountID, walletID}, { dispatch }) => { 
    const response = await deleteWalletServices(walletID,accountID);
    await dispatch(getWallets());
    await dispatch(getTotalWallets());
    return response;
  }
);

export const totalwalletSlice = createSlice({
  name: "total-wallet",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTotalWallets.rejected, (state, action) => {
        console.log("rejected");
      })
  },
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getWallets.rejected, (state, action) => {
        console.log("rejected");
      })
  },
});

export default walletSlice;
