const { ObjectId } = require('mongoose').Types;
const {User} = require('../models');

module.exports = {

  async getUsers(req, res) {
    try {
      const usersData = await User.find();

      res.json(usersData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getOneUser(req, res) {
    try {
      const usersData = await User.findOne({ username: req.params.username })
      res.json(usersData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this username!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ username: req.params.username });

      if (!userData) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { $addToSet: { friends: req.body.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that username ' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that username:(' });
      }

      res.json({message: 'Friend removed'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
