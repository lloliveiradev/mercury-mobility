const CustomError = require("./customError");
const { capitalize } = require("./utils");

function validateContract(cls, update = false) {
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
        if (contract[key].max) {
            if (data[key] && data[key].length > contract[key].max) invalid = true;
        };
        if (invalid) throw new CustomError({
            message: `The attribute '${key}' is required and only accepts the data type ${capitalize(contract[key].type)}`,
            status: 400
        });
    };
};

module.exports = { validateContract };