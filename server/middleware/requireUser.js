export default function requireUser(req, res, next) {
	// WHY (Functionality): Protected endpoints should fail predictably when no
	// authenticated user is present, so clients can handle auth state correctly.
	if (!req.user) {
		return res.status(401).json({ error: "Authentication required." });
	}

	next();
}
