const express = require('express');
const Info = require('./../model/formdata');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const checkMail = await Info.findOne({ yourEmail: req.body.yourEmail });
    if (checkMail) {
      return res.status(400).json({
        message: `You have already submit your response with this 👉(${
          checkMail.yourEmail
        }) email address`
      });
    }
    const { yourName, yourEmail, subject, message } = req.body;
    const user = await Info.create({
      yourName,
      yourEmail,
      subject,
      message
    });
    res.render('response');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
});

module.exports = router;
