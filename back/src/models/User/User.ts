import Model from "../Model";

import { Types } from "mongoose";

export default class User extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            fullname: { type: String, required: true },
            email: { type: String, required: true },
            username: { type: String, required: true },
            profile: { type: String, default: 'blank.jpg' },
            bio: { type: String, default: 'Art is art' },
            password: { type: String, required: true }
        })

        super(mongoose, 'User', QueryBuilder, schema);
    };

    getByEmailOrUsername = (identifier: string) => this.model.findOneWithOr({
        condition: [
            { email: identifier },
            { username: identifier },
        ]
    })

    isUsernameNotAvailable = (id: Types.ObjectId | string, username: string) => this.model.exists({
        _id: { $ne: id },
        username,
    })

    isEmailNotAvailable = (id: Types.ObjectId | string, email: string) => this.model.exists({
        _id: { $ne: id },
        email,
    })

    getById = (_id: Types.ObjectId | string, select: string = '') => this.model.findOne({
        condition: { _id },
        select
    });

    getByEmail = (email: string) => this.model.findOne({
        condition: { email }
    });

    getByUsername = (username: string) => this.model.findOne({
        condition: { username }
    });

    updateDetails = (_id: Types.ObjectId | string, details) => this.model.updateOne(
        { _id },
        details
    );
};