// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {}

  const reducer = (blogWithMaxLikes, currentBlog) =>
    blogWithMaxLikes.likes >= currentBlog.likes ? blogWithMaxLikes : currentBlog

  return blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}