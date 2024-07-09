const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  updateUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend

} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:username').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:username/friends').post(addFriend);


router.route('/:username/friends/:friendId').delete(removeFriend);

module.exports = router;
