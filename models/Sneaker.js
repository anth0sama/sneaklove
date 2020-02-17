const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sneakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true,
        unique: true
    },
    sizes: {
        type: [Number],
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Men", "Women", "Kids"],
        required: true
    },
    id_tags: {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);
module.exports = sneakerModel;