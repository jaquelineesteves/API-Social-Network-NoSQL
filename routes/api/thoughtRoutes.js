const router = require('express').Router();
const {
  getThought,
  getOneThought,
  updateThought,
  createThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');


router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions:reactionId').delete(removeReaction);

module.exports = router;
