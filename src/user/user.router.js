const express = require('express');
const catchErrors = require('express-catch-errors');
const jwt = require('jsonwebtoken');

const config = require('../config');

const router = express.Router();
const {
  check,
  create,
  remove,
  list,
  report
} = require('./user.controller');

router.use((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, config.SECRET, (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Invalid token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Invalid token.' 
    });
  }
});

router.route('/add').post(catchErrors(create));
router.route('/list').post(catchErrors(list));
router.route('/delete/:id').get(catchErrors(check), catchErrors(remove));
router.route('/report').get(catchErrors(report));

module.exports = router;
