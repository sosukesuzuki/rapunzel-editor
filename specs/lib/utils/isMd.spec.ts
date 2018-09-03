import { isMd } from '../../../src/lib/utils'

describe('isMd', () => {
  it('checks a file extention is \".md\"', async () => {
    // Given
    const mdFilePath = './test/test.md'
    const txtFilePath = './test/hoge.txt'

    // Then
    expect(isMd(mdFilePath)).toBeTruthy()
    expect(isMd(txtFilePath)).toBeFalsy()
  })
})
