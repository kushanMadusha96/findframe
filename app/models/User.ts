import mongoose from 'mongoose';

function getLocalDateTime() {
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localTime;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String },
    image: String,
    role: { type: String, required: false },
    grapher_info: {
        district: String,
        address: String,
        contact_01: Number,
        contact_02: Number,
        business_email: String,
        watsapp: Number,
    },
    social_urls: {
        fb: String,
        tik_tok: String,
        insta: String,
    },
    packages: [
        {
            type: Map,
            of: String,
        }
    ],
    reviews: [
        {
            writer_email: String,
            writer_name: String,
            writer_img_url: String,
            star_count: Number,
            review: String,
            date: { type: Date, default: getLocalDateTime },
        }
    ],
}, { timestamps: true });
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);


export default UserModel;
