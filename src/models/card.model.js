import Joi from 'joi';
import { getDB } from '*/config/mongodb';

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    cloumnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cover: Joi.string().default(null),
    createAt: Joi.date().timestamp().default(Date.now()),
    UpdatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async(data) => {
    return  await cardCollectionSchema.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        console.log(value);
        const result = await getDB().collection(cardCollectionName).insertOne(value);
        return result.ops[0];
    } catch (error) { 
        console.log(error);
    }
}

export const CardModel = { createNew } 