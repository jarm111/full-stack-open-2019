const mostBlogs = require('../utils/list-helper').mostBlogs
const { emptyList, listWithOneBlog, biggerList } = require('./test-data')

describe('most blogs', () => {
  test('returns the author and number of blogs with author of most blogs', () => {
    const result = mostBlogs(biggerList)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('returns the author and number of blogs with list of one blog', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('returns empty object with empty list', () => {
    const result = mostBlogs(emptyList)
    expect(result).toEqual({ })
  })
})