import { default as mongoose, Schema } from "mongoose";
const structure = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: String, default: "normal" }
    },
    { collection: "member" }
);
export default mongoose.model("member", structure);
