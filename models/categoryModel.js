const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'games'
  }]
})

module.exports = model("Category", categorySchema)