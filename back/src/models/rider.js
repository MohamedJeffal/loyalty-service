const Joi = require('joi')
const validatePayload = require('./validatePayload')

const createdSchema = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
})

const phoneNumberUpdateSchema = Joi.object().keys({
  id: Joi.number().required(),
  // Todo: check format
  phone_number: Joi.string().required(),
})

exports.buildInsertData = function buildInsertData(riderPayload) {
  return {
    _id: riderPayload.id,
    name: riderPayload.name,
  }
}

exports.validateRiderSignup = validatePayload(createdSchema)
exports.validateRiderPhoneNumberUpdate = validatePayload(
  phoneNumberUpdateSchema
)
