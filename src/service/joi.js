const joi = require('@hapi/joi');

function checkPhone(value, helpers) {
  if (value.length !== 10) {
    if (value == '') {
      return value;
    }
    return helpers.error('Phone number');
  }

  return value;
}

function checkPhoneSignup(value, helpers) {
  if (value.length !== 10) {
    return helpers.error('Phone number');
  }

  return value;
}

const schema = {
  // signup schema
  signup: joi.object({
    name: joi.string().min(3).max(30).required(),

    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io', 'in', 'co'] } })
      .required(),

    phone: joi.custom(checkPhoneSignup, 'Phone number validator'),

    password: joi.string().required(),

    role: joi.string().required(),
  }),

  // login schema
  login: joi.object({
    phone: joi.custom(checkPhoneSignup, 'Phone number validator').required(),
    password: joi.string().required(),
  }),

  // adding institute shchema
  addInstitute: joi.object({
    basicInfo: joi.object({
      name: joi.string().required(),
      instituteContact: joi.custom(checkPhone, 'Phone number validator').required(),
    }),

    address: joi
      .object({
        addressLine: joi.string().allow(''),
        locality: joi.string().allow(''),
        state: joi.string().allow(''),
        city: joi.string().allow(''),
        pincode: joi.string().allow(''),
      })
      .optional(),

    paymentDetails: joi.object({
      amount: joi.string().required(),
      planType: joi.string().required(),
      orderId: joi.string().required(),
      receiptId: joi.string().required(),
    }),

    location: joi
      .object({
        type: joi.string().trim(),
        coordinates: joi.array(),
      })
      .optional(),

    category: joi.array().optional(),

    metaTag: joi.array().optional(),
  }),

  resetPassword: joi.object({
    phone: joi.custom(checkPhone, 'Phone number validator').required(),
    password: joi.string().required(),
  }),

  //@addStudent schema
  addStudent: joi.object({
    instituteId: joi.string().required(),
    basicDetails: joi.object({
      name: joi.string(),
      rollNumber: joi.string(),
      studentEmail: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      studentContact: joi.custom(checkPhone, 'Phone number validator').allow(''),
    }),
    parentDetails: joi.object({
      name: joi.string().allow(''),
      parentContact: joi.custom(checkPhone, 'Phone number validator').allow(''),
      parentEmail: joi.string().allow(''),
      address: joi.string().allow(''),
    }),
    courseDetails: joi.object({
      course: joi.string().allow(''),
      batch: joi.string().allow(''),
      discount: joi.string().allow(''),
      additionalDiscount: joi.string().allow(''),
      nextPayble: joi.string().allow(''),
    }),
    fee: joi.object({
      installmentNumber: joi.string().allow(''),
      nextInstallment: joi.string().allow(''),
      amountCollected: joi.string().allow(''),
      mode: joi.string().allow(''),
    }),
    materialRecord: joi.string(),
  }),

  addCourse: joi.object({
    name: joi.string().required(),
    courseCode: joi.string().required(),
    fees: joi.string().allow(''),
    discription: joi.string().allow(''),
    duration: joi.string().allow(''),
    gst: joi.string().allow(''),
    gstValue: joi.string().allow(''),
    totalFee: joi.string().allow(''),
  }),

  addBatch: joi.object({
    course: joi.string().required(),
    batchCode: joi.string().required(),
    description: joi.string().allow(''),
  }),

  addDiscount: joi.object({
    discountCode: joi.string().required(),
    discountType: joi.string().required(),
    description: joi.string().allow(''),
    amount: joi.string().required(),
  }),

  addReciept: joi.object({
    businessName: joi.string().allow(''),
    address: joi.string().allow(''),
    gstNumber: joi.string().allow(''),
    termsAndCondition: joi.string().allow(''),
    fee: joi.string().allow(''),
  }),

  //@addSchedule schema
  addSchedule: joi.object({
    instituteId: joi.string().required(),
    batchCode: joi.string().required(),
    topic: joi.string().required(),
    teacher: joi.string().required(),
    scheduleStart: joi.string().allow(''),
    scheduleEnd: joi.string().allow(''),
    recurrence: joi.boolean(),
  }),

  //@addAttendence schema
  addAttendence: joi.object({
    batchId: joi.string().required(),
    allPresent: joi.boolean(),
    absentStudents: joi.array().items(joi.string()).unique(),
  }),

  //@Role_assign schema
  assignRole: joi.object({
    phone: joi.custom(checkPhoneSignup, 'Phone is required for role assign'),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: joi.string().required(),
    instituteId: joi.string().required(),
  }),
};

module.exports = function (SchemaName) {
  return schema[SchemaName];
};
