const listHelper = require('../utils/list-helper')
const { emptyList } = require('./test-data')

test('dummy return one', () => {
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})