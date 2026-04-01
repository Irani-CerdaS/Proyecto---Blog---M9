const getCategories = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Categorías listadas (pendiente)', data: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories
};
