import Constants from 'expo-constants';

// 1. Ambil variabel dari app.config.js (yang membaca dari .env)
const CLOUDINARY_CLOUD_NAME = Constants.expoConfig?.extra?.cloudinaryCloudName;
const CLOUDINARY_UPLOAD_PRESET = Constants.expoConfig?.extra?.cloudinaryUploadPreset;

/**
 * Mengunggah gambar ke Cloudinary menggunakan unsigned upload preset.
 * @param imageUri URI lokal dari gambar yang dipilih (dari ImagePicker).
 * @returns Promise yang resolve dengan secure_url dari gambar yang diunggah.
 */
export const uploadImage = async (imageUri: string): Promise<string> => {
  // Pastikan variabel lingkungan sudah ter-setup
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Variabel lingkungan Cloudinary belum diatur di app.config.js");
  }
  
  const formData = new FormData();

  // Append file dengan format yang benar untuk React Native
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg", // Asumsi tipe gambar adalah jpeg, bisa disesuaikan
    name: "upload.jpg",
  } as any);

  // Gunakan upload preset (tidak perlu API key/secret untuk unsigned upload)
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
      // Jika ada error dari Cloudinary, tampilkan pesannya
      console.error("Gagal mengunggah ke Cloudinary:", data.error.message);
      throw new Error(data.error.message || "Upload gagal");
    }
  } catch (error) {
    console.error("Terjadi error saat proses upload:", error);
    throw error;
  }
};