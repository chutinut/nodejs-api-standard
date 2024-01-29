import rateLimit from "express-rate-limit";
export default rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // maximum request rate per window
    statusCode: 429, // http status code
    message: {
        // custom response meessage
        status: 429,
        message: "too many requests, please try again later."
    }
});
