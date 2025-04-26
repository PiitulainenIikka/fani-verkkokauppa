const Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true });

const validateSchema = (schema) => {
	return function (req, res, next) {
		const reqmethod = req.method;
		if (reqmethod === "POST" || reqmethod === "PUT") {
			const body = req.body;
			var validate = ajv.compile(schema);
			var valid = validate(body);
			if (!valid) {
				return res.status(401).json({ error: validate.errors })
			} else {
				next();
			}
		}
		else {
			next();
		}
	}
}

module.exports = validateSchema;