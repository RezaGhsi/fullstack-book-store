const isAuthor = (req, res, next) => {
  if (req.user.role.toUpperCase() !== "AUTHOR") {
    return res.status(403).json({
      success: false,
      error: "You Don't Have Access To This Route !!",
    });
  }
  next();
};

module.exports = isAuthor;
