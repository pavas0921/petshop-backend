import jwt from "jsonwebtoken";
export const generateToken = (req, res) => {
  try {
    const { user } = req.body;

    const payload = {
      userId: user._id,
      rolId: user.rolId,
      companyId: user.companyId._id,
      logo: user.companyId.logo,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "5h" });
    res.status(200).json({ status: 200, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
