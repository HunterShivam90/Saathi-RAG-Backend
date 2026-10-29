const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn:  '1d'
    });
};



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check karein ki sabhi fields di gayi hain ya nahi
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill all the required fields" 
            });
        }

        // Check karein ki user pehle se registered toh nahi hai
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User with this email already exists" 
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Naya user create karein (Password model ke pre-save hook se automatic hash ho jayega)
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        });

        const token = generateToken(user._id);
        res.cookie('token', token);

        res.status(201).json({
            success: true,
            message: "User registered successfully! 🎉",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check karein ki email aur password diya gaya hai ya nahi
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide both email and password" 
            });
        }

        // 2. Database mein email se user ko dhoondhein 
        // (Note: Schema mein password par `select: false` lagaya tha, isliye `.select('+password')` likhna zaroori hai taaki password compare karne ke liye fetch ho sake)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        // 3. User ka entered password aur database ka hashed password match karein
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        const token = generateToken(user._id);

        res.cookie('token', token);

        // 4. Successful login response
        res.status(200).json({
            success: true,
            message: "Logged in successfully! 🚀",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Cookie ko clear karne ke liye uski expiry ko past time par set kar dete hain ya 'token' ko empty kar dete hain
        res.status(200)
           .cookie('token', '', {
               expires: new Date(0)
              
           })
           .json({
               success: true,
       message: "Logged out successfully! 👋"
           });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};






module.exports = { registerUser ,loginUser,logoutUser};