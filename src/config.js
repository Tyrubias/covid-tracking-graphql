import "dotenv/config";
import log from "loglevel";

if (process.env.NODE_ENV === "development") {
    log.setLevel("trace");
}

const COVID_API_URL = new URL(process.env.COVID_API_URL);
const COVID_API_VERSION = process.env.COVID_API_VERSION.trim();

export { COVID_API_URL, COVID_API_VERSION };
