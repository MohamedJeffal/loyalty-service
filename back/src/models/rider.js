const Joi = require('joi')

const insertSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required()
})

const updateSchema = Joi.object().keys({
  id: Joi.number().required(),
  // Todo: check format
  phone_number: Joi.string().required(),
})

const validateRider = schema => riderData => {
  const { error, value } = Joi.validate(riderData, schema)

  return error === undefined || error === null
}

exports.validateRiderSignup = validateRider(insertSchema)
exports.validateRiderPhoneNumberUpdate = validateRider(updateSchema)
