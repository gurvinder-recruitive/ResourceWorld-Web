import { z} from "zod";

export const applyJobSchema = z.object({
    profileImage: z
        .any()
        .refine((file) => file instanceof File, {
            message: "Profile image is required",
        })
        .refine(
            (file) =>
            file &&
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
            {
            message: "Only JPG, JPEG, PNG and WEBP images are allowed.",
            }
        )
        .refine(
            (file) => file && file.size <= 5 * 1024 * 1024,
            {
            message: "Image size must be less than 5 MB.",
            }
        ),
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
    .max(150, {message:"Tagline must be less than 200 characters"}),

    //Step - 2
    // Step 2
  executiveSummary: z
    .string()
    .min(1, "Executive Summary must be at least 20 characters"),

  skills: z
    .array(z.string())
    .min(1, "Please select at least one skill"),

  currentEmployer: z.string().optional(),

  currentRole: z.string().optional(),

  joinedOn: z.date().optional(),

  freelancer: z.enum(["yes", "no"]),

  freelancerLink: z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true; // allow empty when freelancer = no

      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
    {
      message: "Please enter a valid URL.",
    }
  ),

 cv: z
  .any()
  .optional()
  .refine(
    (file) =>
      !file ||
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    {
      message: "Only PDF, DOC and DOCX files are allowed.",
    }
  )
  .refine(
    (file) => !file || file.size <= 5 * 1024 * 1024,
    {
      message: "CV size must be less than 5 MB.",
    }
  ),
}).superRefine((data, ctx) => {
  // Freelancer profile link validation
  if (
    data.freelancer === "yes" &&
    (!data.freelancerLink || data.freelancerLink.trim() === "")
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["freelancerLink"],
      message: "Profile link is required.",
    });
  }

    const employerFilled = (data.currentEmployer ?? "").trim() !== "";
    const roleFilled = (data.currentRole ?? "").trim() !== "";
    const joinedFilled = !!data.joinedOn;

    const anyFilled = employerFilled || roleFilled || joinedFilled;
    const allFilled = employerFilled && roleFilled && joinedFilled;

    if (anyFilled && !allFilled) {
    if (!employerFilled) {
        ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentEmployer"],
        message: "Current Employer is required.",
        });
    }

    if (!roleFilled) {
        ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentRole"],
        message: "Current Role is required.",
        });
    }

    if (!joinedFilled) {
        ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["joinedOn"],
        message: "Joined On is required.",
        });
    }
    }
  
})  