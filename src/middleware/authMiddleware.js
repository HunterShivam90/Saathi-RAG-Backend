const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;

     
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied! Please login first. 🚫"
            });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "The user belonging to this token no longer exists."
            });
        }

        // Req object mein user info save kar di taaki aage ke controllers me use ho sake
        req.user = currentUser;
        
        next(); // Agle middleware ya controller par bhej do

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token! Please login again.",
            error: error.message
        });
    }
};

module.exports = { verifyToken };