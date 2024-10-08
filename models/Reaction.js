const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
const Reaction = model('Reaction', reactionSchema);

module.exports = { Reaction, reactionSchema };