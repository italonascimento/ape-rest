module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port     : 5432,
      user     : 'postgres',
      password : '07italo08abn90',
      database : 'ape-rest',
      charset  : 'utf8'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port     : 5432,
      user     : 'postgres',
      password : '07italo08abn90',
      database : 'ape-rest',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port     : 5432,
      user     : 'postgres',
      password : '07italo08abn90',
      database : 'ape-rest',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
