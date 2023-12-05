const envPath = process.env.NODE_ENV !== "prod" ? "dev.env" : ".env";

module.exports = { envPath };
