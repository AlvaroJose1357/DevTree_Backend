import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  links: string;
}

const userSchema = new Schema({
  // el lowercase lo que hace es que si se ingresa un string con mayusculas, lo convierte a minusculas
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  // el trim lo que hace es que si existen espacios en blanco al principio o al final de la cadena, los elimina
  name: { type: String, required: true, trim: true },
  // el unique lo que hace es que no se pueden repetir los elementos en la base de datos
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  links: { type: String, default: "[]" },
});

const User = model<IUser>("User", userSchema);
export default User;
