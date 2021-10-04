import mongoose from 'mongoose'

const postsModel = mongoose.Schema({
    caption: String,
    user: String,
    image: String
})

export default mongoose.model('posts', postsModel)