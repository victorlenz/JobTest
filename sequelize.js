var pool = {
    min: process.env.SEQ_POOL_MAX || 0,
    max: process.env.SEQ_POOL_MAX || 2000,
    idle: process.env.SEQ_POOL_IDLE || 20000,
    acquire: process.env.SEQ_POOL_IDLE || 20000
  }
  
  // Setting up a connection
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      define: {
        underscored: true
      },
      dialectOptions: {
        ssl: false
      },
      port: process.env.DB_PORT,
      pool: pool,
      logging: false,
      operatorsAliases: Op
    }
  )
  
  // Test the connection
  sequelize
    .authenticate()
    .then(() => {
      console.log('Sequelize: Connection has been established successfully.')
    })
    .catch((err) => {
      console.error(err)
      throw err
    })
  
  // loop through all files in models directory
  fs.readdirSync(path.join(modelPath, 'models')).forEach(function (file) {
    var model = sequelize.import(path.join(modelPath, 'models', file))
    db[model.name] = model
  })