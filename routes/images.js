var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//Get all images
router.get("/", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM images;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get image by id
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`SELECT * FROM images WHERE id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "Image not found" });
    } else {
      res.send(results.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// //Posting an image ()
// router.post("/", async (req, res) => {
//   try {
//     // Assuming you receive user_id and image_url in the request body
//     const { user_id, image_url } = req.body;

//     // Validate that the user_id and image_url are provided
//     if (!user_id || !image_url) {
//       return res
//         .status(400)
//         .send({ error: "Both user_id and image_url are required" });
//     }

//     // Insert the image data into the "images" table
//     await db(
//       `INSERT INTO images (image_url, user_id) VALUES (${image_url}, ${user_id});`,
//       [image_url, user_id]
//     );

//     res.status(201).send({ message: "Image data added successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to add image record" });
//   }
// });

//Delete an image
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const image = await db(`SELECT * FROM images WHERE id = ${id};`);
    if (!image.data.length) {
      res.status(404).send({ msg: "Image not found" });
    } else {
      // Delete the image from the database
      await db(`DELETE FROM images WHERE id = ${id};`);
      res.status(204).send(); // Respond with a 204 No Content status to indicate successful deletion
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
