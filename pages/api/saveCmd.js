import clientPromise from "../../db/mongodb";

const saveCmd = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const { time, user, text } = req.body;

    await db.collection("cmds").insertOne({
      time,
      user,
      text,
    });
    res.json({ message: "command saved." });
  } catch (e) {
    console.error(e);
  }
};

export default saveCmd;
