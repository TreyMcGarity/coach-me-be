const db = require("../data/db_config");
const httpError = require("http-errors");
const UserModel = require("./user-model");

class CoachModel extends UserModel {
	async getCoachList() {
		try {
			return await db("coach").select("id", "first_name", "last_name");
		} catch (error) {
			throw error;
		}
	}
	async addCoach(data) {
		try {
			return await db("coach").insert({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data.phone,
				password: data.password,
			});
		} catch (error) {
			throw error;
		}
	}

	async getClientListByCoachID(id) {
		try {
			return await db("coach_client as cc")
				.join("client as cl", "cl.id", "cc.client_id")
				.where("cc.coach_id", id)
				.select("cc.coach_id", "cl.id", "cl.first_name", "cl.last_name");
		} catch (error) {
			throw error;
		}
	}

	async getCoachClientByID(id, clientID) {
		try {
			return await db("coach_client as cc")
				.join("client as cl", "cl.id", "cc.client_id")
				.where("cc.coach_id", id)
				.where("cl.id", clientID)
				.select("cc.coach_id", "cl.first_name", "cl.last_name");
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new CoachModel();
