import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "krs-products",
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov", "avi"],
  },
});

export const upload = multer({ storage });