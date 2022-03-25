import Joi from 'joi';
import { ObjectID } from 'mongodb';
import { getDB } from '*/config/mongodb';
import { ColumnModel } from './column.model';
import { CardModel } from './card.model';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(30).trim(),
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

/**
 * @param {string} boardId 
 * @param {string} columnId 
 */
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectID(boardId) },
            { $push: { columnOrder: columnId } },
            { returnOriginal: false }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}
const getFullBoard = async (boardId) => {
    try {
        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectID(boardId),
                    _destroy: false
                }
            },
            {
                $lookup: {
                    from: ColumnModel.columnCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: CardModel.cardCollectionName,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray()
        console.log(result)
        return result[0] || {}
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { createNew, pushColumnOrder, getFullBoard } 