// Test script to check API endpoints
require('dotenv').config();
const axios = require('axios');

async function testAPI() {
    const baseURL = 'http://localhost:3000';
    
    console.log('Testing API endpoints...\n');
    
    try {
        // Test 1: Check server is running
        console.log('1. Testing server health...');
        const healthResponse = await axios.get(`${baseURL}/`);
        console.log('✅ Server is running:', healthResponse.data);
        
        // Test 2: Test Cloudinary configuration
        console.log('\n2. Testing Cloudinary configuration...');
        try {
            const cloudinaryResponse = await axios.get(`${baseURL}/api/thumbnail/test-cloudinary`);
            console.log('✅ Cloudinary test:', cloudinaryResponse.data);
        } catch (cloudinaryError) {
            console.log('❌ Cloudinary test failed:', cloudinaryError.response?.data || cloudinaryError.message);
        }
        
        // Test 3: Test thumbnails endpoint (will fail due to auth, but we can see the error)
        console.log('\n3. Testing thumbnails endpoint (expect auth error)...');
        try {
            const thumbnailsResponse = await axios.get(`${baseURL}/api/user/thumbnails`);
            console.log('✅ Thumbnails response:', thumbnailsResponse.data);
        } catch (thumbnailsError) {
            console.log('Expected auth error:', thumbnailsError.response?.data || thumbnailsError.message);
        }
        
        // Test 4: Check if we can access the Cloudinary image directly
        console.log('\n4. Testing direct Cloudinary image access...');
        const imageUrl = 'http://res.cloudinary.com/dtgqultbt/image/upload/v1768504148/v3ecauxezaanfm1a6h3w.png';
        try {
            const imageResponse = await axios.head(imageUrl);
            console.log('✅ Cloudinary image accessible:', {
                status: imageResponse.status,
                contentType: imageResponse.headers['content-type'],
                contentLength: imageResponse.headers['content-length']
            });
        } catch (imageError) {
            console.log('❌ Cloudinary image not accessible:', imageError.message);
        }
        
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testAPI();