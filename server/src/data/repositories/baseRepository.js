class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_BASE_REPOSITORY_GET_ALL`)
        }
    }

    async getById(id) {
        try {
            return await this.model.findOne({ "_id": id });
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_BASE_REPOSITORY_GET_BY_ID`)
        }
    }

    async create(data) {
        try {
            const newModelObject = new this.model(data);
            await newModelObject.save(newModelObject);

            return {
                message: `New ${this.model.collection.collectionName} created.`,
                data
            };
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_REPOSITORY_CREATE`)
        }

    }

    async updateById(id, data) {
        try {
            return await this.model.updateOne({ "_id": id }, { $set: data })
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_REPOSITORY_UPDATE`)
        }
    }

    async deleteById(id) {
        try {
            return await this.model.deleteOne({ "_id": id})
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_REPOSITORY_DELETE`)
        }
    }
}

module.exports = BaseRepository