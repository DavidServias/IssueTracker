import { User } from '../model/models.js';


// route: router.get('/login', userController.getUserByCredentials);
const getUserByCredentials = async (req, res) => {
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  // example useage of "findOne()"
  // Adventure.findOne({ country: 'Croatia' }).exec();
  await User.findOne({username: reqUsername})
    .then(result => {
      // case: user not found
      if (!result ){
        let response = {"message":"user not found"};
        res.status(404).send(response);
      }
      // case: wrong password
      else if (result.password !== reqPassword) {
        let response = {"message":"invalid password"};
        res.status(404).send(response);
      }  
      // case: success
      else if (result.password === reqPassword) { 
        res.status(200).send(result);
        console.log("success test");
      }  
      
    })
    .catch(err => {res.status(400)
      .send(err);
    });
}


//router.post('/create_user', userController.createUser); //create user
const createUser = async (req, res) => {
  const userNameTaken = await User.exists(
    {username: req.body.username});
  if (!userNameTaken) {
    console.log("creating user");
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    }); 
    await newUser.save();
    res.status(200).send(newUser);
  } else {
    console.log("username taken");
    res.status(401).send(JSON.stringify(
      {"message":"username already taken"}) );
      
  }

};

const getUserById = async (req, res) => {
  const user_id = req.params.userId;
  let response = await User.findById(user_id);
  console.log(response);
  res.status(200).send(response);

};

export default {
  getUserByCredentials,
  createUser,
  getUserById
}