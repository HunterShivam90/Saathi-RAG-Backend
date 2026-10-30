const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    answer: { 
        type: String, 
        required: true 
    },
    priority: { 
        type: Number, 
        default: 0 
    } // Top FAQs ko order karne ke liye (1, 2, 3...)
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);