const pool = require('../db');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = function routes(app, logger) {
//Post Customer Session
//Login customer returns session token
app.post('/customer/login', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        connection.query('SELECT * FROM Customer WHERE username = ?', req.body.username, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching customer : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining customer"
            })
          } else {
            if (rows.length === 0) {
              res.status(400).json({
                "data": [],
                "error": "Customer does not exist"
              })
            } else {
                //compare if the password is the same as the entered information without hashing
                if(req.body.password === rows[0].password){
                    //create a token
                    const token = jwt.sign({
                        username: req.body.username,
                        password: req.body.password
                    }, 'secret', {
                        expiresIn: '1h'
                    });
                    //return the token
                    res.status(200).json({
                        "data": [{
                            "token": token
                        }],
                        "error": null
                    })
                } else {
                    res.status(400).json({
                        "data": [],
                        "error": "Incorrect password"
                    })
                }
            }
            }
        });
        }
    });
});



//               if (bcrypt.compareSync(req.body.password, rows[0].password)) {
//                 const token = jwt.sign({
//                   id: rows[0].id,
//                   username: rows[0].username,
//                   name: rows[0].name,
//                   email: rows[0].email,
//                   phone: rows[0].phone
//                 }, process.env.JWT_SECRET, {
//                   expiresIn: '1h'
//                 });
//                 res.status(200).json({
//                   "data": token
//                 });
//               } else {
//                 res.status(400).json({
//                   "data": [],
//                   "error": "Incorrect password"
//                 })
//               }
//             }
//           }
//         });
//       }
//     });
//   });
  
  //Post Shipper Session
  //Login shipper returns session token
  app.post('/shipper/login', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        connection.query('SELECT * FROM Shipper WHERE username = ?', req.body.username, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching shipper : \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining shipper"
            })
          } else {
            if (rows.length === 0) {
              res.status(400).json({
                "data": [],
                "error": "Shipper does not exist"
              })
            } else {
              if (bcrypt.compareSync(req.body.password, rows[0].password)) {
                const token = jwt.sign({
                  id: rows[0].id,
                  username: rows[0].username,
                  name: rows[0].name,
                  email: rows[0].email,
                  phone: rows[0].phone
                }, process.env.JWT_SECRET, {
                  expiresIn: '1h'
                });
                res.status(200).json({
                  "data": token
                });
              } else {
                res.status(400).json({
                  "data": [],
                  "error": "Incorrect password"
                })
              }
            }
          }
        });
      }
    });
  });
};

  //16.14.2