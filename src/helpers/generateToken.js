import jwt from "jsonwebtoken";
export const generateToken = (req, res) => {
  try {
    const { user } = req.body;
    const payload = {
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: null,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    payload.token = token;
    res.status(200).json({ status: 200, data: payload });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
