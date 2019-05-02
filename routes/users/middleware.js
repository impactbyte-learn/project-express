let usersData = require('./data')

const usersMiddleware = {
  // ---------------------------------------------------------------------------
  // Get all users
  get: (req, res, next) => {
    usersData
      ? res.send({
          message: 'Get all users',
          data: usersData
        })
      : res.status(404).send({
          message: 'Get all users failed'
        })
  },

  // ---------------------------------------------------------------------------
  // Get one user by id
  getOneById: (req, res, next) => {
    const id = Number(req.params.id)

    const foundUser = usersData.find(user => {
      return user.id === id
    })

    foundUser
      ? res.send({
          message: 'Get one user by id',
          id: id,
          data: foundUser
        })
      : res.status(404).send({
          message: 'Get one user by id failed',
          id: id
        })
  },

  // ---------------------------------------------------------------------------
  // Post a new user
  post: (req, res, next) => {
    // get only relevant keys from request body
    const { name, username, email, phone } = req.body

    if (name && username && email && phone) {
      // combine all keys and values into one object
      const newUser = { name, username, email, phone }

      // concate new item to existing data
      const newUsersData = usersData.concat(newUser)

      // replace existing data with new data
      usersData = newUsersData

      res.send({
        message: 'Created new user',
        data: newUser
      })
    } else {
      res.status(400).send({
        message: 'Created new user failed'
      })
    }
  },

  // ---------------------------------------------------------------------------
  // Delete all users
  delete: (req, res, next) => {
    const newUsersData = []
    usersData = newUsersData

    res.send({
      message: 'Deleted all users'
    })
  },

  // ---------------------------------------------------------------------------
  // Delete one user by id
  deleteOneById: (req, res, next) => {
    const id = Number(req.params.id)
    const newUsersData = usersData.filter(user => {
      return user.id !== id
    })
    usersData = newUsersData

    newUsersData
      ? res.send({
          message: 'Deleted one user by id',
          id: id,
          data: usersData
        })
      : res.status(500).send({
          message: 'Deleted one user by id failed',
          id: id
        })
  },

  // ---------------------------------------------------------------------------
  // Update one user by id
  putOneById: (req, res, next) => {
    const id = Number(req.params.id)
    const { name, username, email, phone } = req.body
    const newUser = { name, username, email, phone }

    if (name || username || email || phone) {
      const newUsersData = usersData.map(user => {
        if (user.id === id) {
          if (newUser.name) user.name = newUser.name
          if (newUser.username) user.username = newUser.username
          if (newUser.email) user.email = newUser.email
          if (newUser.phone) user.phone = newUser.phone

          return user
        } else {
          return user
        }
      })

      usersData = newUsersData

      res.send({
        message: 'Updated one user by id',
        data: newUser
      })
    } else {
      res.status(400).send({
        message: 'Updated one user by id failed'
      })
    }
  },

  // ---------------------------------------------------------------------------
  // Search user(s)
  searchByKeyword: (req, res, next) => {
    const keyword = req.query.q.toLowerCase()

    const foundUsers = usersData.filter(user => {
      if (user.name.toLowerCase().includes(keyword)) return user
      if (user.username.toLowerCase().includes(keyword)) return user
      if (user.email.toLowerCase().includes(keyword)) return user
      if (user.phone.toLowerCase().includes(keyword)) return user
    })

    res.send({
      message: 'Searched user(s) by keyword',
      keyword: keyword,
      data: foundUsers
    })
  }
}

module.exports = usersMiddleware
