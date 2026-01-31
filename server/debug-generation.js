// Debug script to test thumbnail generation flow
require('dotenv').config();
const mongoose = require('mongoose');

// Define the schema directly since we can't import TypeScript
const ThumbnailSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    style: {
        type: String,
        required: true,
        enum: [
            "Bold & Graphic",
            "Tech/Futuristic", 
            "Minimalist",
            "Photorealistic",
            "Illustrated"
        ],
    },
    aspect_ratio: {
        type: String,
        enum: ["16:9", "1:1", "9:16"],
        default: "16:9",
    },
    color_scheme: {
        type: String,
        enum: [
            "vibrant",
            "sunset", 
            "forest",
            "neon",
            "purple",
            "monochrome",
            "ocean",
            "pastel",
        ],
    },
    text_overlay: { type: Boolean, default: false },
    image_url: { type: String, default: "" },
    prompt_used: { type: String },
    user_prompt: { type: String },
    isGenerating: { type: Boolean, default: true },
}, { timestamps: true });

const Thumbnail = mongoose.models.Thumbnail || mongoose.model('Thumbnail', ThumbnailSchema);

async function debugGeneration() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Find all thumbnails
        const allThumbnails = await Thumbnail.find({}).sort({ createdAt: -1 }).limit(10);
        console.log(`\nFound ${allThumbnails.length} thumbnails in database:`);
        
        allThumbnails.forEach((thumb, index) => {
            console.log(`\n${index + 1}. Thumbnail ID: ${thumb._id}`);
            console.log(`   Title: ${thumb.title}`);
            console.log(`   User ID: ${thumb.userId} (type: ${typeof thumb.userId})`);
            console.log(`   Image URL: ${thumb.image_url || 'MISSING'}`);
            console.log(`   Has Image URL: ${!!(thumb.image_url && thumb.image_url.trim() !== '')}`);
            console.log(`   Is Generating: ${thumb.isGenerating}`);
            console.log(`   Created: ${thumb.createdAt}`);
        });
        
        // Check for thumbnails without image URLs
        const noImageThumbnails = allThumbnails.filter(t => !t.image_url || t.image_url.trim() === '');
        console.log(`\nThumbnails without image URLs: ${noImageThumbnails.length}`);
        
        // Check for thumbnails still generating
        const generatingThumbnails = allThumbnails.filter(t => t.isGenerating);
        console.log(`Thumbnails still generating: ${generatingThumbnails.length}`);
        
        mongoose.disconnect();
        
    } catch (error) {
        console.error('Debug error:', error);
        mongoose.disconnect();
    }
}

debugGeneration();