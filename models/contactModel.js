const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // referencing to User model
    },
    name: {
        type: String,
        required: [true, "please add your contact name"],
        unique: [true, "Email address already taken"],
    },
    email: {
        type: String,
        // email validation
        required: [true, "Please enter a valid Email address"]
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 15,
        required: [true, "Please enter a contact number "]
    },
    image: {
        type: String,
        default: null 
        // Field to store the filename of the uploaded image
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);
