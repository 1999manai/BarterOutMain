import Textbook from '../models/textbook';
import User from '../models/user';

import Transactions from '../models/transaction';

const jwt = require('jsonwebtoken');


const express = require('express');

const router = express.Router();

// will return an array of JSON objects in reverse cronological order (Newest at the top)
function sortReverseCronological(JSONArray) {
  JSONArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return JSONArray;
}

router.get('/isAdmin/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          res.sendStatus(200);
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/permissionLv/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          res.sendStatus(200).json({ permissionType: 1 });
        } else {
          res.json({ permissionType: 0 });
        }
      });
    }
  });
});

router.get('/getPurchasedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 2 }, (err, books) => {
            res.status(200).json(books);
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getTransactions/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 1 }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getUsers/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          User.find({}, {
            password: 0, resetPasswordToken: 0, resetPasswordExpires: 0, notifications: 0, cart: 0,
          }, (err, users) => {
            res.status(200).json(users);
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.post('/confirmBook', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else if (authData.userInfo.permissionType === 1) {
      Textbook.update(
        { _id: req.body.data.id },
        {
          $set:
            {
              status: 2,
            },
        }, (err) => {
          if (!err) {
            res.sendStatus(200);
          }
        },
      );
    } else {
      res.redirect('/home');
    }
  });
});


/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getAllBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            // Finds all of the books
          }, (err, books) => {
            User.findById(authData.userInfo._id, (err, user) => { //this search is not needed
              res.status(200).json(sortReverseCronological(books));
            });
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getCompletedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: 4, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getInProcessBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: { $lt: 4 }, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            User.findById(authData.userInfo._id, (err, user) => { //this search is not needed
              res.status(200).json(sortReverseCronological(books));
            });
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.post('/setBookStatus/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later when we have admin accounts
          Textbook.update(
            { _id: req.body.data.bookID },
            {
              $set:
                {
                  status: req.body.data.status,
                },
            },
          );
          res.status(200);
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getPendingTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 0, // Finds all of the transactions of status 0 (pending)
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});


/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getAllTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getCompletedTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});


router.get('/getPendingSpecificPendingTransaction/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});


router.post('/confirmTransaction', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Transactions.update(
            { _id: req.body.data.id },
            {
              $set:
                {
                  status: 1,
                },
            }, (err) => {
              if (!err) {
                res.sendStatus(200);
              }
            },
          );
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getTransactionsByName/:token/:firstName/:LastName', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Transactions.find({ $and: [{ buyerFirstName: req.params.firstName }, { buyerLastName: req.params.lastName }] }, (err, transactions) => {
            res.json(sortReverseCronological(transactions));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});


router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});


module.exports = router;
