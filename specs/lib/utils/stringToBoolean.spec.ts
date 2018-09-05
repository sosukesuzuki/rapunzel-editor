import { stringToBoolean } from '../../../src/lib/utils'

describe('stringToBoolean', () => {
  it('returns true', async () => {
    // When
    const data = stringToBoolean('true')

    // Then
    expect(data).toBeTruthy()
  })

  it('returns false', async () => {
    // When
    const data1 = stringToBoolean('false')
    const data2 = stringToBoolean('test')

    // Then
    expect(data1).toBeFalsy()
    expect(data2).toBeFalsy()
  })
})
