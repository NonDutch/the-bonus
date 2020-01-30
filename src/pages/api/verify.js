import micro from "micro";
import Authentication from "../../handlers/authentication";

async function authenticate(req, res) {
  try {
    const { email, code } = req.body;
    const { data } = await Authentication.verify(email, code);
    res.status(200).json({ success: true, token: data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}

export default micro(authenticate);
