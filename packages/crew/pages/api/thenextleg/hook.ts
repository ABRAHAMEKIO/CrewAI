const SECRET = process.env.WEBHOOK_THENEXTLEG_SECRET;
export default function handler(req, res) {
  const secret = req?.query?.hook;
  try {
    if(atob(secret) !== SECRET) return res.status(401).json({ message: 'Not authorized' });
  } catch(e) {
    return res.status(400).json({ message: 'Invalid secret format' });
  }

  const { body } = req;
  console.log({body, req});
  res.status(200).json({ success: true });
}
