

const FAQ = require('../models/faqModel');

// 1. Top 4 FAQs fetch karne ka function (Public)
exports.getTopFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ priority: 1 }).limit(4);
        res.status(200).json({
            success: true,
            count: faqs.length,
            data: faqs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: FAQs fetch karne mein samasya aayi",
            error: error.message
        });
    }
};

// 2. Naya FAQ add karne ka function (Kewal Admin ke liye)
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer, priority } = req.body;

        // Validation
        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Question aur Answer dono dena anivarya hai!"
            });
        }

        const newFAQ = new FAQ({
            question,
            answer,
            priority: priority || 0
        });

        await newFAQ.save();

        res.status(201).json({
            success: true,
            message: "FAQ safaltapurvak add ho gaya hai!",
            data: newFAQ
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: FAQ save nahi ho paya",
            error: error.message
        });
    }
};