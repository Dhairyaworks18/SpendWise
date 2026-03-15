import { firestore } from "../config/firebase";
import { WalletType, ResponseType } from "../types";
import { uploadFileToCloudinary } from "./imageService";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    // Clone the wallet data to prepare it for saving
    let recordToSave = { ...walletData };

    if (walletData.image) {
      // Upload the local image to cloud storage
      const uploadedImageRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );
      if (!uploadedImageRes) {
        return {
          success: false,
          msg: uploadedImageRes || "Failed to upload wallet icon",
        };
      }
      recordToSave.image = uploadedImageRes.data;
    }

    // Initialize metrics for newly created wallets
    if (!walletData?.id) {
      recordToSave.amount = 0;
      recordToSave.totalIncome = 0;
      recordToSave.totalExpenses = 0;
      recordToSave.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id)
      : doc(collection(firestore, "wallets"));

    // Save the wallet record to Firestore
    await setDoc(walletRef, recordToSave, { merge: true });
    return { success: true, data: { ...recordToSave, id: walletRef.id } };
  } catch (err: any) {
    console.log("Error creating/updating wallet", err);
    return { success: false, msg: err.message };
  }
};

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    await deleteDoc(walletRef);
    
    // Also remove all transactions associated with this wallet
    await deleteTransactionsByWalletId(walletId);
    return { success: true, msg: "Wallet deleted successfully" };
  } catch (err: any) {
    console.log("Error deleting wallet", err);
    return { success: false, msg: err.message };
  }
};

export const deleteTransactionsByWalletId = async (
  walletId: string
): Promise<ResponseType> => {
  try {
    let hasMoreTransactions = true;

    while (hasMoreTransactions) {
      const transactionsQuery = query(
        collection(firestore, "transactions"),
        where("walletId", "==", walletId)
      );

      const transactionsSnapshot = await getDocs(transactionsQuery);
      if (transactionsSnapshot.size === 0) {
        hasMoreTransactions = false;
        break;
      }

      const batch = writeBatch(firestore);

      transactionsSnapshot.forEach((transactionDoc) => {
        batch.delete(transactionDoc.ref);
      });

      await batch.commit();

      console.log(
        `${transactionsSnapshot.size} transactions deleted in this batch`
      );
    }

    return {
      success: true,
      msg: "All transactions deleted successfully!",
    };
  } catch (error: any) {
    console.log("Error deleting wallet", error);
    return { success: false, msg: error.message };
  }
};
