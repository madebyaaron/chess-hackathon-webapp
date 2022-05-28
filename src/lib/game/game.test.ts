import { generateGameObject } from '.'

describe(`generateGameObject`, () => {
  it(`returns a game object`, () => {
    const gameObject = generateGameObject()
    expect(gameObject).toBeTruthy()
  })
})
