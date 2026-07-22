import { z} from "zod";

export const applyJobSchema = z.object({
    profileImage: z
    .any()
    .refine((file) => file instanceof File, {
        message: "Profile image is required",
    }),
    fullName: z.string()
    .trim()
    .min(1,{message:"Full name is required"})
    .max(50, {message:"Full name must be less than 50 characters"}),
    email: z.string()
    .trim()
    .min(1, {message:"Email is required"})
    .refine((value) => z.string().email().safeParse(value).success, {message:"Invalid email address"}), 
    location: z.string()
    .trim()
    .min(1, {message:"Location is required"})
    .max(50, {message:"Location must be less than 50 characters"}),
    country: z.string()
    .trim()
    .min(1, {message:"Country is required"}),
    mobileNo: z.string()
    .trim()
    .min(1, { message: "Mobile number is required" })
    .refine(
        (value) => {
        const allowedCharacters = /^[0-9+\s\-()]+$/;

        if (!allowedCharacters.test(value)) {
            return false;
        }

        const digitsOnly = value.replace(/\D/g, "");

        return digitsOnly.length >= 7 && digitsOnly.length <= 14;
        },
        {
        message: "Please enter a valid mobile number",
        }
    ),
    gender: z.string()
    .trim()
    .min(1, {message:"Gender is required"}),
    tagLine: z.string()
    .trim()
    .min(1, {message:"Tagline is required"})    
    .max(200, {message:"Tagline must be less than 200 characters"}),
})  