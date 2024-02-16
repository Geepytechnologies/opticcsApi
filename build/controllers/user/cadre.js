"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createACadre = exports.updateACadre = exports.deleteACadre = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../config/db"));
const createACadre = (req, res, next) => {
    const { value } = req.body;
    try {
        const q = `INSERT INTO cadre (cadre_name) VALUES ('${value}');
      `;
        db_1.default.query(q, (err, result) => {
            if (err)
                return res.json(err);
            return res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createACadre = createACadre;
const updateACadre = (req, res, next) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const q = `UPDATE cadre SET cadre_name = '${value}' WHERE id = '${id}';
      `;
        db_1.default.query(q, (err, result) => {
            if (err)
                return res.json(err);
            return res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateACadre = updateACadre;
const deleteACadre = (req, res, next) => {
    const { id } = req.params;
    try {
        const q = `DELETE FROM cadre WHERE id = '${id}';
      `;
        db_1.default.query(q, (err, result) => {
            if (err)
                return res.json(err);
            return res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteACadre = deleteACadre;
