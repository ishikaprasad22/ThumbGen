// Simple test script to verify Cloudinary configuration
require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');

console.log('Testing Cloudinary Configuration...\n');

// Check environment variable
console.log('1. Environment Variable Check:');
console.log('CLOUDINARY_URL exists:', !!process.env.CLOUDINARY_URL);
if (process.env.CLOUDINARY_URL) {
    console.log('CLOUDINARY_URL format:', process.env.CLOUDINARY_URL.substring(0, 20) + '...');
}

// Configure Cloudinary
cloudinary.config({ secure: true });

// Check configuration
console.log('\n2. Cloudinary Configuration:');
const config = cloudinary.config();
console.log('Cloud Name:', config.cloud_name);
console.log('API Key:', config.api_key ? config.api_key.substring(0, 6) + '...' : 'missing');
console.log('API Secret:', config.api_secret ? 'present' : 'missing');
console.log('Secure:', config.secure);

// Test connection
console.log('\n3. Testing Connection...');
cloudinary.api.ping()
    .then(result => {
        console.log('✅ Cloudinary connection successful!');
        console.log('Response:', result);
    })
    .catch(error => {
        console.log('❌ Cloudinary connection failed:');
        console.log('Error:', error.message);
        console.log('HTTP Code:', error.http_code);
    });