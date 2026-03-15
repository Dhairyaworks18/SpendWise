import { firestore } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "../types";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    // Check if there is an image that needs to be uploaded to cloud storage
    if (updatedData.image && updatedData?.image?.uri) {
      const uploadResult = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );
      if (!uploadResult) {
        return {
          success: false,
          msg: uploadResult || "Failed to upload image",
        };
      }
      // Assign the newly uploaded image URL to the user data
      updatedData.image = uploadResult.data;
    }

    // Update document in Firestore
    const userDocRef = doc(firestore, "users", uid);
    await updateDoc(userDocRef, updatedData);

    return { success: true, msg: "User data updated successfully" };
  } catch (err: any) {
    console.log("Error updating user:", err);
    return { success: false, msg: err?.message };
  }
};
