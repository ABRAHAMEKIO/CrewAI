const check = async (req, res) => {
  if (req.method === 'POST') {
    try {
      res.setHeader(
        'set-cookie',
        `is_logged_on=; path=/; samesite=lax; httponly; Max-Age=-1`
      );

      return res.status(200).json({
        logout: false,
      });
    } catch (e) {
      return res.status(405).json({ error: e.message });
    }
  } else {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default check;
