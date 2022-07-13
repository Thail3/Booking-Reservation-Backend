import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(201).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//GET
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//GET ALL
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(201).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
