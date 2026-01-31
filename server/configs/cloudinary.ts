import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true, // forces https
});

export default cloudinary;