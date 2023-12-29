import Model from "../Model";

import { Types } from "mongoose";

export default class Artwork extends Model {
	constructor (mongoose, QueryBuilder) {
		const schema = new mongoose.Schema({
			name: { type: String },
			user: { type: Types.ObjectId, ref: 'User', required: true },
			image: { type: String },
			kind: { type: String },
			description: { type: String },
			model: {
				type: { type: String },
				file: { type: String, default: 'scene.gltf' },
				folder: { type: String },
				scale: { type: Types.Decimal128, default: 1 }
			},
			hasImage: { type: Boolean, default: false },
			hasModel: { type: Boolean, default: false },
			isReady: { type: Boolean, default: false },
			isDeleted: { type: Boolean, default: false },
		})

		super(mongoose, 'artwork', QueryBuilder, schema);
	};

	getNotReadyByUser = (user: Types.ObjectId | string, kind: string) => this.model.findOne({
		condition: { user, kind, isDeleted: false, isReady: false }
	});

	getNotReadyOrMakeNew = async (user: Types.ObjectId | string, kind: string) => {
		let artwork = await this.getNotReadyByUser(user, kind);

		if (!artwork) {
			artwork = await this.add({
					user,
					kind
			})
		}

		return artwork;
	}

	getAllReady = () => this.model.find({
		condition: { isDeleted: false, isReady: true },
		populate: [['user', '-password']]
	});

	getAllReadyByKind = (kind: string) => this.model.find({
		condition: { kind, isDeleted: false, isReady: true },
		populate: [['user', '-password']]
	});

	getAllReadyByUser = (user: Types.ObjectId | string) => this.model.find({
		condition: { user, isDeleted: false, isReady: true },
		populate: [['user', '-password']]
	});

	getAllReadyByUserAndKind = (user: Types.ObjectId | string, kind: string) => this.model.find({
		condition: { user, kind, isDeleted: false, isReady: true },
		populate: [['user', '-password']]
	});

	getById = (_id: Types.ObjectId | string, select: string = '') => this.model.findOne({
		condition: { _id, isDeleted: false, isReady: true },
		select
	});
};