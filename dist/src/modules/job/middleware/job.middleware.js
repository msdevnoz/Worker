export const jobMiddleware = (req, res, next) => {
    const role = req.body.role;
    if (role === 'jobseeker') {
        next();
    }
    else {
        res.status(403).json({ error: true, message: 'Access denied for this role', data: null });
    }
};
