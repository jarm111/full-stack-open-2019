const totalLikes = require('../utils/list-helper').totalLikes
const { emptyList, listWithOneBlog, biggerList } = require('./test-data')

describe('total likes', () => {
  test('with empty list is zero', () => {
    expect(totalLikes(emptyList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(biggerList)).toBe(36)
  })
})