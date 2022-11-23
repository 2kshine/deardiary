exports.userLogin = async (req, res) => {
    //pass in login object for layout
  res.render("login.hbs", {layout:'login'});
};
