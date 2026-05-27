import jwt from "jsonwebtoken";

const protect = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();

    } catch (error) {

        console.log("Error in the protect middleware", error)

        return res.status(401).json({ message: "Invalid token" });
    }
};

export default protect;