

const adminMiddleware = (req, res, next) => {
    try {
        // Maan kar chal rahe hain ki auth middleware ne req.user attach kar diya hai
        // Jisme user ka role ya isAdmin status hoga
        if (req.user && req.user.role === 'admin') {
            next(); // Agar admin hai toh aage jane do
        } else {
            return res.status(403).json({
                success: false,
                message: "Access Denied: Kewal Admin hi yeh action perform kar sakta hai!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Admin Verification",
            error: error.message
        });
    }
};

module.exports = adminMiddleware;