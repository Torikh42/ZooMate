// eslint-disable-next-line import/no-unresolved
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@env"

export const uploadImageToCloudinary = async (
  imageUri: string
): Promise<string> => {
  try {
    // Create FormData untuk upload
    const formData = new FormData();

    // Append file dengan format yang benar untuk React Native
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile-image.jpg",
    } as any);

    // Gunakan upload preset (tidak perlu API key/secret untuk unsigned upload)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Optional: tambahkan transformasi atau folder
    formData.append("folder", "profile_images");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Image uploaded successfully:", data.secure_url);
      return data.secure_url;
    } else {
      console.error("Cloudinary upload error:", data);
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
