const mostBlogs = require('../utils/list-helper').mostLikes
const { emptyList, listWithOneBlog, biggerList } = require('./test-data')

describe('most likes', () => {
  test('with empty list returns empty object', () => {
    const result = mostBlogs(emptyList)
    expect(result).toEqual({ })
  })

  test('with list of one blog returns the author and number of likes', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('returns the author and total number of likes of that author', () => {
    const result = mostBlogs(biggerList)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})