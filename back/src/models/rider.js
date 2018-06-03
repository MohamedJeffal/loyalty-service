const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  phone_number: Joi.string().length(13),
})

exports.createRiderData = function createRiderData(riderData) {
  return {
    id: riderData.id,
    name: riderData.name,
  }
}

exports.validateRider = function validateRider(riderData) {
  const { error, value } = Joi.validate(riderData, schema)

  return !!error
}
