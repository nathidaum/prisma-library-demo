const express = require("express");
const prisma = require("../db");

const router = express.Router();

// POST /movies
router.post("/", async (req, res) => {
  try {
    const { title, genres, year, rating, directorId } = req.body;

    const newMovie = await prisma.movie.create({
      data: {
        title,
        genres,
        year,
        rating,
        directorId
      },
    });

    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error creating a new movie", err);
    res.status(500).json({
      message: "Error creating a new movie",
    });
  }
});

// GET /movies
router.get("/", async (req, res) => {
  try {
    const allMovies = await prisma.movie.findMany({
      include: { director: true },
    });

    res.status(200).json(allMovies);
  } catch (err) {
    console.error("Error getting all movies", err);
    res.status(500).json({
      message: "Error getting all movies",
    });
  }
});

router.get("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    console.log("Received movieId:", movieId); // Debugging log

    const selectedMovie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: { director: true },
    });

    if (!selectedMovie) {
      console.log("Movie not found for id:", movieId);
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(selectedMovie);
  } catch (err) {
    console.error("Error retrieving movie:", err);
    res.status(500).json({ message: "Error retrieving movie" });
  }
});

// UPDATE /movies/:movieId
router.put("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, genres, year, rating, directorId } = req.body;

    const movieToUpdate = await prisma.movie.update({
      data: {
        title,
        genres,
        year,
        rating,
        directorId
      },
      where: { id: movieId },
    });

    res.status(200).json(movieToUpdate);
  } catch (err) {
    console.error("Error updating movie", err);
    res.status(500).json({
      message: "Error updating movie",
    });
  }
});

// DELETE /movies/:movieId
router.delete("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    const movieToDelete = await prisma.movie.delete({
      where: { id: movieId },
    });

    res.status(200).json(movieToDelete);
  } catch (err) {
    console.error("Error deleting movie", err);
    res.status(500).json({
      message: "Error deleting movie",
    });
  }
});

module.exports = router;
