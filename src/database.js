const mongoose = require("mongoose");
const configObject = require("./config/config");
const { mongo_url } = configObject;

class DataBase {
  static #instance;

  constructor() {
    mongoose.connect(mongo_url);
  }
  static getIntance() {
    if (this.#instance) {
      console.log("Conexion ya existente");
      return this.#instance;
    }
    this.#instance = new DataBase();
    console.log("Conexion exitosa");
    return this.#instance;
  }
}

module.exports = DataBase.getIntance();
