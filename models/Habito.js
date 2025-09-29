import mongoose from "mongoose";

const habitoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" },
  creadorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  asignados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }]
}, { timestamps: true });

export default mongoose.model("Habito", habitoSchema);
