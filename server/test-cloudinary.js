// test-cloudinary.js

require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");

console.log("Testing Cloudinary Configuration...\n");

/* ===============================
   1️⃣ Environment Variable Check
================================ */

console.log("1. Environment Variable Check");

console.log("CLOUDINARY_URL exists:", !!process.env.CLOUDINARY_URL);
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET exists:", !!process.env.CLOUDINARY_API_SECRET);


/* ===============================
   2️⃣ Configure Cloudinary
================================ */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


/* ===============================
   3️⃣ Show Config
================================ */

const config = cloudinary.config();

console.log("\n2. Cloudinary Configuration");

console.log("Cloud Name:", config.cloud_name);
console.log("API Key:", config.api_key ? config.api_key.substring(0, 6) + "..." : "missing");
console.log("API Secret:", config.api_secret ? "present" : "missing");
console.log("Secure:", config.secure);


/* ===============================
   4️⃣ Test API Connection
================================ */

console.log("\n3. Testing API Connection");

cloudinary.api
  .ping()
  .then((result) => {
    console.log("✅ Cloudinary API connection successful");
    console.log(result);

    return testUpload();
  })
  .catch((error) => {
    console.log("❌ Cloudinary connection failed");
    console.log("Error:", error.message);
  });


/* ===============================
   5️⃣ Test Image Upload
================================ */

function testUpload() {
  console.log("\n4. Testing Image Upload");

  return cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      { folder: "test_uploads" }
    )
    .then((result) => {
      console.log("✅ Upload successful");
      console.log("Public ID:", result.public_id);
      console.log("URL:", result.secure_url);
    })
    .catch((error) => {
      console.log("❌ Upload failed");
      console.log(error.message);
    });
}