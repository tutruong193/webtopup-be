const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: false },
        role: { type: String, enum: ['MarketingManager', 'MarketingCoordinator', 'Student', 'Admin'], required: true },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null}
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;