const Diary = require("../models/diaryModel");

exports.getDashboard = async (req, res) => {
  try {
    //finding diaries of logged in user
    const diaries = await Diary.find({ user: req.user.id }).lean();
    res.render("dashboard.hbs", {
      name: req.user.firstName,
      diaries,
    });
  } catch (err) {
    console.error(err);
    res.render('error/errorPage')
  }

  //.render is going to look for template called dashboard and renders it.
};
