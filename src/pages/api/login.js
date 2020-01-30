import micro from "micro";
import Authentication from "../../handlers/authentication";

async function authenticate(req, res) {
  try {
    const { email } = req.body;

    if (email.includes("@frontmen.nl")) {
      const data = await Authentication.login(email);
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (e) {
    res.status(500).json({ success: false });
  }
}

export default micro(authenticate);
