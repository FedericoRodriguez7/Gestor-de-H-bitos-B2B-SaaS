import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "empleado"], default: "empleado" },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
