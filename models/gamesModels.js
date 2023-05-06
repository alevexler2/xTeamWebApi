const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  images: {
    type: Array,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  fav: {
    type: Boolean,
    required: false,
  },
  // category: {
  //   type:Schema.ObjectId,
  //   ref:'Category',
  //   required : true
  // }
});

module.exports = model('games', gameSchema);
