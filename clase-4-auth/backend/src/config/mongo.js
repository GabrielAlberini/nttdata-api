import mongoose from "mongoose"

const mongoConnect = async (URI_DB_MONGO) => {
  try {
    await mongoose.connect(URI_DB_MONGO)
    console.log("Conexión exitosa a la base de datos")
  } catch (error) {
    console.log('Error al conectar a la base de datos:', error)
  }
}

export { mongoConnect }