import micro from "micro";
import Authentication from "../../handlers/authentication";

async function validity(req, res) {
  try {
    const { accessToken } = req.body;
    await Authentication.checkValidity(accessToken);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}

export default micro(validity);
