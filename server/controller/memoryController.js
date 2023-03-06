const Memory = require("../models/memories");
const User = require("../models/user");

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

// exports.addFavouriteMemory = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const favouriteIdToPush = req.body;

//     User.find({ favorites: { $in: [favouriteIdToPush] } }).toArray(
//       (err, docs) => {
//         // Handle the result
//         if(err){
//           console.log(err);
//         }else{
//           console.log('got it');
//         }
//       }
//     );

//     // User.findOneAndUpdate(
//     //   { _id: userId },
//     //   { $push: { favorites: favouriteIdToPush } },
//     //   { new: true },
//     //   (err, success) => {
//     //     if (err) {
//     //       console.log(err);
//     //     } else {
//     //       res.status(200).json({ success: true });
//     //     }
//     //   }
//     // );
//   } catch (error) {
//     return res.status(400).json({ success: false, err: error });
//   }
// };

exports.addFavouriteMemory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favouriteIdToPush = req.body;

    User.findOne(
      { _id: userId, favorites: { $elemMatch: { $eq: favouriteIdToPush } } },
      (err, favorite) => {
        if (err) {
          console.log("An error occurred:", err);
          return;
        }

        if (!favorite) {
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { favorites: favouriteIdToPush } },
            { new: true },
            (err, success) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({ success: true });
              }
            }
          );
          return;
        }

        User.findOneAndUpdate(
          { _id: userId },
          { $pull: { favorites: favouriteIdToPush } },
          { new: true },
          (err, success) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({ success: true });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(400).json({ success: false, err: error });
  }
};
