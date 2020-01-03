const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const db = {};

db.lesson = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/lesson.js');
db.lesson_elements = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/lesson_elements.js');
db.student = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/student.js');
db.teacher = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/teacher.js');
db.rewards = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/rewards.js');
db.allVideos = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/elements_prop_videos.js');
db.allAudios = sequelize.import( '/Users/fuchsiaff/Documents/electron-ace/app/models/elements_prop_audios.js');
db.allImages = sequelize.import('/Users/fuchsiaff/Documents/electron-ace/app/models/elements_prop_images.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
