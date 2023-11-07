class ErrorHandler {

    static handleError(err, req, res, next) {
        const { statusCode, message } = err;
        console.error(`[Error] ${message}`, err);

        res.status(statusCode || 500).json({
            status: "error",
            statusCode: statusCode || 500,
            message: message || "Internal Server Error",
        });
    }

    static getPublicErrorMessage(err, statusCode) {
        if (statusCode < 500) {
            return err.message;
        }

        return "Internal Server Error";
    }
}

export default ErrorHandler;