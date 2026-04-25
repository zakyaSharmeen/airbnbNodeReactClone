import uploadOnCloudinary from "../config/cloudinary.js";
import ListingModel from "../model/ListingModel.js";
import UserModel from "../model/UserModel.js";

// export const addListing = async (req, res) => {
//   try {
//     let host = req.userId;
//     let { title, description, rent, city, landMark, category } = req.body;

//     let image1 = await uploadOnCloudinary(req.files.image1[0].path);
//     let image2 = await uploadOnCloudinary(req.files.image2[0].path);
//     let image3 = await uploadOnCloudinary(req.files.image3[0].path);
//     let listing = await ListingModel.create({
//       title,
//       description,
//       host,
//       rent,
//       city,
//       landMark,
//       category,
//       image1,
//       image2,
//       image3,
//     });
//     // await listing.save();

//     let user = await UserModel.findByIdAndUpdate(
//       host,
//       { $push: { listings: listing._id } },
//       { new: true },
//     );
//     if (!user) {
//       return res.status(404).json({ error: "Host user not found." });
//     }
//     res.status(201).json({ message: "Listing added successfully.", listing });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the listing." });
//   }
// };
export const addListing = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("USER:", req.userId);

    if (!req.files || !req.files.image1) {
      return res.status(400).json({ error: "Images missing" });
    }

    let host = req.userId;
    let { title, description, rent, city, landMark, category } = req.body;

    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await ListingModel.create({
      title,
      description,
      host,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3,
    });

    let user = await UserModel.findByIdAndUpdate(
      host,
      { $push: { listings: listing._id } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: "Host user not found." });
    }

    res.status(201).json({ message: "Listing added successfully.", listing });
  } catch (error) {
    console.log("ERROR:", error); // ✅ IMPORTANT
    res.status(500).json({ error: error.message });
  }
};
