const mostBlogs = require('../utils/list-helper').mostBlogs
const { emptyList, listWithOneBlog, biggerList } = require('./test-data')

describe('most blogs', () => {
  test('with author of most blogs returns the author and number of blogs', () => {
    const result = mostBlogs(biggerList)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('with list of one blog returns the author and number of blogs', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('with empty list returns empty object', () => {
    const result = mostBlogs(emptyList)
    expect(result).toEqual({ })
  })
})