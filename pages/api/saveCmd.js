import clientPromise from "../../db/mongodb";

const saveCmd = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const { time, user, text } = req.body;

    await db.collection(process.env.DB_COLLECTION).insertOne({
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
