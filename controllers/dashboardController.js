exports.getDashboard = async (req, res) => {
    //.render is going to look for template called dashboard and renders it.
  res.render("dashboard.hbs");
};
