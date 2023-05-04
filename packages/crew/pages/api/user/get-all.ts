import User from '../../../db/models/user';

const log = async (req, res) => {
  res.status(200).json(await User.findAll());
};

export default log;
