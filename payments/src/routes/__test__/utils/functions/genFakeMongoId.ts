import mongoose from "mongoose";

const genFakeMongoId = () => new mongoose.Types.ObjectId().toHexString();

export default genFakeMongoId;
