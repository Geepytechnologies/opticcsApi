import Joi from "joi";

export class healthfacilityvalidation {
  static createAccount = (values: Object) => {
    const schema = Joi.object({
      ward: Joi.string(),
      healthfacilityname: Joi.string(),
      lga: Joi.string(),
      state: Joi.string(),
      healthfacilityID: Joi.string(),
      officeaddress: Joi.string(),
      phone: Joi.string().trim().length(11),
      email: Joi.string().trim().email(),
    });
    return schema.validate(values);
  };
  static createUserAccount = (values: Object) => {
    const schema = Joi.object({
      ward: Joi.string(),
      staffname: Joi.string(),
      staffid: Joi.string(),
      gender: Joi.string(),
      cadre: Joi.string(),
      lga: Joi.string(),
      state: Joi.string(),
      // healthfacilityid: Joi.string(),
      userid: Joi.string(),
      password: Joi.string(),
      phone: Joi.string().trim().length(13),
      email: Joi.string().trim().email(),
    });
    return schema.validate(values);
  };
  static gethealthfacilityaccountsfiltered = (values: Object) => {
    const schema = Joi.object({
      lga: Joi.string().required(),
      state: Joi.string().required(),
    });
    return schema.validate(values);
  };
}
