import Joi from 'joi';
import { getDB } from '*/config/mongodb';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    UpdatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = (data) => {
    return boardCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        console.log(value);
        const result = await getDB().collection(boardCollectionName).insertOne(value);
        return result.ops[0];
    } catch (error) { 
        throw new Error(error)
    }
}

export const BoardModel = { createNew } 