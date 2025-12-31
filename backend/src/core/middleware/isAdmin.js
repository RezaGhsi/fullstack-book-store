const isAdmin = (req, res, next) => {
  if (req.user.role.toUpperCase() !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "You Don't Have Access To This Route !!",
    });
  }
  next();
};

module.exports = isAdmin;
