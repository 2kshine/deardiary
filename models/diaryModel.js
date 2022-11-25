const mongoose = require('mongoose');

const diaryModel = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      body: {
        type: String,
        trim: true,
        required: true,
      },
      status: {
        type: String,
        default: 'public',
        enum: ['public','private']
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    },
    { timestamps: true }
  );
  
  const Diary = mongoose.model("Diary", diaryModel);
  module.exports = Diary;
  