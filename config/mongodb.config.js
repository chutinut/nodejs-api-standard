import mongoose from "mongoose";

export default async function () {
    return new Promise((resolve, reject) => {
        try {
            const conn = mongoose.connect(process.env.MONGODB_URI);
            resolve(conn);
        } catch (error) {
            reject(error);
        }
    });
}
