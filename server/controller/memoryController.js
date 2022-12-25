const Memory = require('../models/memories');

exports.addMemory = async (req, res) => {
    try {
        const memory = new Memory(req.body);
        await memory.save();
        res.status(200).json({ success: true, message: 'Added successfully' });
    } catch (error) {
        return res.status(400).json({ success: false, err: error });
    }

};