import _ from "lodash";
import { ObjectId } from "bson";
import MemberModel from "../models/member.model.js";
export async function getMembers(req, res) {
    try {
        const result = await MemberModel.find();
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (error) {
        res.status(500).send({ status: 500, message: "internal server error" }).end();
    }
}
export async function createMember(req, res) {
    try {
        const { body } = req;
        const result = await MemberModel.create(body);
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (error) {
        res.status(500).send({ status: 500, message: "internal server error" }).end();
    }
}
export async function updateMember(req, res) {
    try {
        const { query, body } = req;
        const { _id } = query;
        if (_.isEmpty(_id) || !_.isString(_id) || !ObjectId.isValid(_id))
            throw { status: 422, message: "invalid parameter" };
        const result = await MemberModel.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: body });
        if (_.isEmpty(result)) throw { status: 200, message: "not found" };
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ status: 500, message: "internal server error" }).end();
        } else {
            res.status(error.status).send(error).end();
        }
    }
}
export async function deleteMember(req, res) {
    try {
        const { query } = req;
        const { _id } = query;
        if (_.isEmpty(_id) || !_.isString(_id) || !ObjectId.isValid(_id))
            throw { status: 422, message: "invalid parameter" };
        const result = await MemberModel.deleteOne({ _id: new ObjectId(_id) });
        if (result.deletedCount <= 0) throw { status: 204, message: "not found" };
        res.status(200).send({ status: 200, message: "success" }).end();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ status: 500, message: "internal server error" }).end();
        } else {
            res.status(error.status).send(error).end();
        }
    }
}
