const express = require("express");
const prisma = require("../db");

const router = express.Router();

// POST /directors
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;

    const newDirector = await prisma.director.create({
      data: {
        firstName,
        lastName,
        bio,
      },
    });

    res.status(201).json(newDirector);
  } catch (err) {
    console.error("Error creating a new director", err);
    res.status(500).json({
      message: "Error creating a new director",
    });
  }
});

// GET /directors
router.get("/", async (req, res) => {
  try {
    const allDirectors = await prisma.director.findMany({
      include: { movies: true }, // Ensure the property name matches your schema
    });

    res.status(200).json(allDirectors);
  } catch (err) {
    console.error("Error getting all directors", err);
    res.status(500).json({
      message: "Error getting all directors",
    });
  }
});

// GET /directors/:directorId
router.get("/:directorId", async (req, res) => {
  try {
    const { directorId } = req.params;

    const selectedDirector = await prisma.director.findUnique({
      where: { id: parseInt(directorId) },
      include: { movies: true }, // Ensure the property name matches your schema
    });

    if (!selectedDirector) {
      return res.status(404).json({ message: "Director not found" });
    }

    res.status(200).json(selectedDirector);
  } catch (err) {
    console.error("Error retrieving director", err);
    res.status(500).json({
      message: "Error retrieving director",
    });
  }
});

// UPDATE /directors/:directorId
router.put("/:directorId", async (req, res) => {
  try {
    const { directorId } = req.params;
    const { firstName, lastName, bio } = req.body;

    const directorToUpdate = await prisma.director.update({
      data: {
        firstName,
        lastName,
        bio,
      },
      where: { id: parseInt(directorId) }, // Assuming id is an integer
    });

    res.status(200).json(directorToUpdate);
  } catch (err) {
    console.error("Error updating director", err);
    res.status(500).json({
      message: "Error updating director",
    });
  }
});

// DELETE /directors/:directorId
router.delete("/:directorId", async (req, res) => {
  try {
    const { directorId } = req.params;

    const directorToDelete = await prisma.director.delete({
      where: { id: parseInt(directorId) },
    });

    res.status(200).json(directorToDelete);
  } catch (err) {
    console.error("Error deleting director", err);
    res.status(500).json({
      message: "Error deleting director",
    });
  }
});

module.exports = router;
