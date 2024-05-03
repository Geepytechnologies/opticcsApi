import Joi from "joi";

export class wardvalidation {
  static create(values: Object) {
    const schema = Joi.object({
      state: Joi.string().required(),
      lga: Joi.string().required(),
      ward: Joi.string().required(),
    });
    return schema.validate(values);
  }
}
