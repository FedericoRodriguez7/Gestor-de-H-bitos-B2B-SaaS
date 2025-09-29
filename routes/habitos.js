import express from "express";
import Habito from "../models/Habito.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Crear hábito (solo admin)
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, asignados } = req.body;
    const nuevoHabito = new Habito({
      titulo,
      descripcion,
      empresaId: req.user.id, // el admin pertenece a la empresa
      creadorId: req.user.id,
      asignados
    });
    await nuevoHabito.save();
    res.json(nuevoHabito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener hábitos (empleados y admins)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const habitos = await Habito.find({
      $or: [
        { asignados: req.user.id },
        { creadorId: req.user.id }
      ]
    });
    res.json(habitos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar hábito (solo admin)
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const habito = await Habito.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Eliminar hábito (solo admin)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Habito.findByIdAndDelete(req.params.id);
    res.json({ msg: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
