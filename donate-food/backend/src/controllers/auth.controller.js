import bcrypt from "bcrypt";
import { pool } from "../../config/db.js";

export const register = async (req, res) => {
  const { full_name, phone, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await pool.query(
    `INSERT INTO users (full_name, phone, password, role)
     VALUES ($1,$2,$3,$4) RETURNING id, full_name, role`,
    [full_name, phone, hashedPassword, role]
  );

  res.status(201).json(user.rows[0]);
};
