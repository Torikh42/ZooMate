import Constants from 'expo-constants';

const CLOUDINARY_CLOUD_NAME = Constants.expoConfig?.extra?.cloudinaryCloudName;
const CLOUDINARY_UPLOAD_PRESET = Constants.expoConfig?.extra?.cloudinaryUploadPreset;

/**
 * Mengunggah gambar ke Cloudinary menggunakan unsigned upload preset.
 * @param imageUri URI lokal dari gambar yang dipilih (dari ImagePicker).
 * @returns Promise yang resolve dengan secure_url dari gambar yang diunggah.
 */
export const uploadImage = async (imageUri: string): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Variabel lingkungan Cloudinary belum diatur di app.config.js");
  }
  
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg", 
    name: "upload.jpg",
  } as any);

  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
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
      console.log("Gambar berhasil diunggah:", data.secure_url);
      return data.secure_url;
    } else {

      console.error("Gagal mengunggah ke Cloudinary:", data.error.message);
      throw new Error(data.error.message || "Upload gagal");
    }
  } catch (error) {
    console.error("Terjadi error saat proses upload:", error);
    throw error;
  }
};