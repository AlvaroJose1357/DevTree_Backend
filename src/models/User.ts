import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  // el trim lo que hace es que si existen espacios en blanco al principio o al final de la cadena, los elimina
  name: { type: String, required: true, trim: true },
  // el unique lo que hace es que no se pueden repetir los elementos en la base de datos
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
