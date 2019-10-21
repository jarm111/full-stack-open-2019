const favoriteBlog = require('../utils/list-helper').favoriteBlog
const { emptyList, listWithOneBlog, biggerList } = require('./test-data')

describe('favorite blog', () => {
  test('with empty list returns empty object', () => {
    expect(favoriteBlog(emptyList)).toEqual({})
  })

  test('with list of one blog returns that blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('returns the blog with most likes', () => {
    expect(favoriteBlog(biggerList)).toEqual(biggerList[2])
  })
})