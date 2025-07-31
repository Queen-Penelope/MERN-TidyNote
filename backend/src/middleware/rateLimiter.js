import ratelimit from "../lib/upstash.js";

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success) {
            return res.status(429).json({message: "TOO MANY REQUESTS PLEASE TRY LATER"});
        }
        next();
    } catch (error) {
        console.log("ERROR in ratelimiter",error);
        next(error);
    }
};
export default rateLimiter;