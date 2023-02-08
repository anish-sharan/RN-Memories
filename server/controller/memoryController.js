const Memory = require("../models/memories");

exports.addMemory = async (req, res) => {
  try {
    const memory = new Memory(req.body);
    await memory.save();
    res.status(200).json({ success: true, message: "Added successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, err: error });
  }
};

exports.getMemory = async (req, res) => {
  try {
    Memory.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, err: error });
  }
};

exports.searchMemory = async (req, res) => {
  try {
    const toSearch = req.query.title;
    const memoryToSearch = {};
    if (toSearch) {
      memoryToSearch.title = { $regex: toSearch, $options: "i" };
    }
    Memory.find(memoryToSearch, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: data });
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, err: error });
  }
};
