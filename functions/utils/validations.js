const CustomError = require("./customError");

function validateContract(cls, update) {
    const contract = cls.contract;
    const data = cls.data;
    let invalid = false;
    for (const key in contract) {
        if (contract[key].required) {
            if (data[key]) {
                if (contract[key].type != typeof data[key]) invalid = true;
            } else {
                if (!update && !Object.prototype.hasOwnProperty.call(data, key)) invalid = true;
            };
        };
    };
    if (invalid) throw new CustomError({
        message: `The attribute '${key}' is required and only accepts the data type ${capitalize(contract[key].type)}`,
        status: 400
    });
};

module.exports = { validateContract };