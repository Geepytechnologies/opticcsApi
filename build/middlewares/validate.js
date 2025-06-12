"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                statusCode: 400,
                message: "Validation failed",
                errors: result.error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        req.body = result.data; // validated and typed
        next();
    };
};
exports.validateBody = validateBody;
