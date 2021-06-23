const users = require('./users')

describe('users', () => {
  test('findUser with id 1', async () => {
      const user = await users.findUser(1);
      console.log(user)
      expect(user).toBeTruthy()
      expect(user.id).toEqual(1)
  })

  test('deleteUser with id 1', async () => {
    expect(async () => {
      await users.deleteUser(1);
      //await users.findUser(1);
    }).toThrow();
  })
})
