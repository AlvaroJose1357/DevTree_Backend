import { v2 as cloudinary } from "cloudinary";
import {
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINARY,
  CLOUD_NAME,
} from "./Process";

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

export default cloudinary;
