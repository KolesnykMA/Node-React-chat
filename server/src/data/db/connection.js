const mongoose = require('mongoose');
const dataBaseConfig = require("../config/dataBaseConfig");
const mode = "dev"

class DataBaseConnector {

    constructor(dataBaseConfig, mode) {
        const { database, databaseURLDev, databaseURLProd } = dataBaseConfig;
        this.dataBaseName = database

        if (mode === "dev") {
            this.dataBaseUrl = databaseURLDev
        } else if (mode === "prod") {
            this.dataBaseUrl = databaseURLProd
        }
    }

    async connect() {
        try {
            const connectionString = `${this.dataBaseUrl}${this.dataBaseName}`

            mongoose.set('useCreateIndex', true);
            await mongoose.connect(
                connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
            )
        } catch (e) {
            throw `Error when connecting to ${this.dataBaseName} error: ${e}.`
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
        } catch (e) {
            throw `Error when disconnecting to ${this.dataBaseName} error: ${e}.`
        }
    }
}

module.exports = new DataBaseConnector(dataBaseConfig, mode);