const express = require('express');
const router = express.Router();

function checkHasAnswers(req, res, next) {
  if (req.session.data.answers === undefined) {
    res.redirect(req.baseUrl + '/');
  } else {
    next();
  }
}

// --------------------------------------------------
// Start
// --------------------------------------------------

router.get('/', (req, res) => {
  delete req.session.data;

  res.render('index', {
    actions: {
      start: req.baseUrl + '/medical-equipment'
    }
  });
});


// --------------------------------------------------
// Add routes above this line
// --------------------------------------------------
module.exports = router
