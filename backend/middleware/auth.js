const jwt = require("jsonwebtoken");

require("dotenv").config();

const getTokenFrom = (req) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer")) {
		return authorization.substring(7);
	} else {
		return null;
	}
};

const isAuth = (req, res, next) => {
	const token = getTokenFrom(req);
	if (!token) {
		return res.status(401).json({ error: "auth token missing" });
	}

	let decodedToken = null;

	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.log("jwt error");
	}

	if (!decodedToken || !decodedToken.id) {
		return res.status(401).json({ error: "invalid token" });
	}

	res.locals.auth = { userId: decodedToken.id };
	next();
};

const getAuthId = (req) => {
	const token = getTokenFrom(req);
	if (!token) {
		return null;
	}
	
	let decodedToken = null;

	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.log("jwt error");
	}

	if (!decodedToken || !decodedToken.id) {
		return null;
	}

	return decodedToken.id;
};


module.exports = {
	isAuth,
	getAuthId,
};
