"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserIcon from "@/assets/icons/user.svg";
import { Stepper } from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Upload, CalendarDays, Camera} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useParams , useRouter} from "next/navigation";
import { Controller, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";  
import { z} from "zod";
import { applyJobSchema } from "@/validations/applyJobSchema";  

const steps = [
  {
    id: "step1",
    label: "Step 1",
  },
  {
    id: "step2",
    label: "Step 2",
  },
];

const skills = [
  "Graphic",
  "Photography",
  "User Interface",
  "Logo Design",
  "Artist",
  "User Experience",
  "Ecommerce Market",
];


const ApplyForJob = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [ countries, setCountries] = useState<{ countryId: number; countryName: string }[]>([]);
  const [ skills, setSkills] = useState<{ skillId: number; skillName: string }[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [typedSkill, setTypedSkill] = useState("");
  const [completedStep1, setCompletedStep1] = useState(false);

 

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  type applyJobFormData = z.infer<typeof applyJobSchema>;

  const {
     register,
     control,
     handleSubmit,
      trigger,
      setValue,
      getValues,
      clearErrors,
     formState: { errors },
    
  } = useForm<applyJobFormData>({
     resolver: zodResolver(applyJobSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
      fullName: "",
      email: "",
      location: "",
      country: "",
      mobileNo: "",
      gender: "",
      tagLine: "",
      profileImage: null,

      executiveSummary: "",
      skills: [],
      currentEmployer: "",
      currentRole: "",
      joinedOn: undefined,
      freelancer: "yes",
      freelancerLink: "",
      cv: null,
     }
  })

  const stepOneValues = useWatch({
  control,
  name: [
    "fullName",
    "email",
    "location",
    "country",
    "mobileNo",
    "gender",
    "tagLine",
    "profileImage",
  ],
});
 const isStepOneValid = stepOneValues.every(
  (value) => value !== "" && value !== null && value !== undefined
);

 

   const nextStep = async () => {
    const isValid = await trigger([
      "fullName",
      "email",
      "location",
      "country",
      "mobileNo",
      "gender",
      "tagLine",
      "profileImage",

    ]);

    if (!isValid) return;

     setCompletedStep1(true);

    const data = getValues();
    const selectedCountry = countries.find(
      (c) => c.countryName === data.country
    );
    const formData = new FormData();  
    formData.append("fullName", data.fullName); 
    formData.append("emailAddress", data.email); 
    formData.append("location", data.location);
    formData.append("countryId", selectedCountry ? selectedCountry.countryId.toString() : ""); 
    formData.append("mobileNo", data.mobileNo); 
    formData.append("gender", data.gender); 
    formData.append("tagLine", data.tagLine);
    formData.append("JobTitle", jobDetails.title);
    formData.append("jobGuid", jobDetails.jobGuid);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage); 
    }
    
    try {
  const userId = sessionStorage.getItem("userProfileId");
  let response;

  if (!userId || userId === "undefined" || userId === "null" || userId ==null) {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/UserProfile/step-1`,
      {
        method: "POST",
        body: formData,
      }
    );
  } else {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/UserProfile/step-1?userProfileId=${userId}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  }

  const result = await response.json();

  if (!response.ok) {
    toast.error(result.message);
    return;
  }

  if (result.data?.userProfileId) {
    sessionStorage.setItem(
      "userProfileId",
      result.data.userProfileId.toString()
    );
  }
  toast.success(result.message || "Step 1 completed successfully.");

  if (currentStep < steps.length - 1) {
    setCurrentStep((prev) => prev + 1);
  }
} catch (error) {
  toast.error("Unable to connect to the server.");
  console.error(error);
}

   
  };


const onSubmit = async (data: applyJobFormData) => {
  const userId = sessionStorage.getItem("userProfileId");

  if (!userId) {
    toast.error("User Profile not found.");
    return;
  }

  const isValid = await trigger([
    "executiveSummary",
    "skills",
    "currentEmployer",
    "currentRole",
    "joinedOn",
    "freelancer",
    "freelancerLink",
    "cv",
  ]);

  if (!isValid) return;

  const formData = new FormData();

  formData.append("executiveSummary", data.executiveSummary);

  data.skills.forEach((skill) => {
    formData.append("skillNames", skill);
  });

  if (data.currentEmployer) {
    formData.append("currentEmployer", data.currentEmployer);
  }

  if (data.currentRole) {
    formData.append("currentRole", data.currentRole);
  }

  if (data.joinedOn) {
    formData.append("joinedOn", data.joinedOn.toISOString());
  }

  formData.append(
    "isFreelancer",
    data.freelancer === "yes" ? "true" : "false"
  );

  if (data.freelancerLink) {
    formData.append("freelancerProfileLink", data.freelancerLink);
  }

  if (data.cv) {
    formData.append("cvFile", data.cv);
  }

  try {
    debugger
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/UserProfile/step-2?userProfileId=${userId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Something went wrong.");
      return;
    }

    toast.success(result.message || "Application submitted successfully");
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error("Unable to connect to the server.");
  }
};


 
  const params = useParams();
  const jobId = Number(params.jobId);
  useEffect(() => {
  if (!jobId) return;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/UserProfile/jobs/${jobId}`)
    .then((response) => response.json())
    .then((data) => {
      setJobDetails(data);
    })
    .catch((error) => console.error(error));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/UserProfile/Countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error(error));


    fetch(`${process.env.NEXT_PUBLIC_API_URL}/UserProfile/Skills`)
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => console.error(error));

    
}, [jobId]);
useEffect(() => {
  sessionStorage.removeItem("userProfileId");
}, []);


  const existingSkillNames = skills.map((skill) => skill.skillName);
  return (
    <>
      <div className="container pb-8 md:pb-12 2xl:pb-14">
        <div className="w-full max-w-[880px] mx-auto space-y-8">
         
          <h3 className="text-center">{jobDetails?.title}</h3>
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => (
              <>
                <div className="relative w-20 h-20 2xl:w-24 2xl:h-24 mx-auto">
               
                  <label
                    htmlFor="profileImage"
                    className={`w-full h-full rounded-full flex justify-center items-center cursor-pointer overflow-hidden
                      ${
                        errors.profileImage
                          ? "ring-2 ring-red-500 bg-red-50"
                          : "bg-[#999999]"
                      }`}
                  >
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={UserIcon}
                        alt="User"
                        className="w-8 2xl:w-10"
                      />
                    )}
                  </label>

                  {/* Camera Icon */}
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-black" />
                  </label>
                </div>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      field.onChange(file);

                      const imageUrl = URL.createObjectURL(file);
                      setProfileImage(imageUrl);
                    } else {
                      field.onChange(null);
                      setProfileImage(null);
                    }
                  }}
                />
              </>
            )}
          />
          
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-8 w-full"
          >
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={(step) => {
                if (step === 1 && !completedStep1) return;

                setCurrentStep(step);
              }}
            />
            {currentStep === 0 && (
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Full Name<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your full name" {...register("fullName")} className={errors.fullName ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>                   
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Email Address<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your email address" {...register("email")} className={errors.email ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Location (City, State)<span className="text-red-500">*</span>
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your location" {...register("location")} className={errors.location ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Country<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                      <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={countries}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ComboboxInput
                            placeholder="Search country..."
                            className={
                              errors.country
                                ? "border-red-500 bg-red-50"
                                : ""
                            }
                          />

                          <ComboboxContent>
                            <ComboboxEmpty>
                              No country found.
                            </ComboboxEmpty>

                            <ComboboxList>
                              {(country) => (
                                <ComboboxItem
                                  key={country.countryId}
                                  value={country.countryName}
                                >
                                  {country.countryName}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Mobile No<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your Mobile No" {...register("mobileNo")} className={errors.mobileNo ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Gender<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                    <Controller
                       name="gender"
                       control={control}
                       render={({ field }) => (
                        <Select
                         value={field.value}
                         onValueChange={field.onChange}
                        >
                          <SelectTrigger
                              className={
                                errors.gender
                                  ? "border-red-500 bg-red-50 focus:ring-red-500"
                                  : ""
                              }
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    
                  </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Tag Line for your profile<span className="text-red-500">*</span>
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your Tag Line" {...register("tagLine")} className={errors.tagLine ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Executive Summary<span className="text-red-500">*</span></h5>
                  <div className="grow min-w-0">
                    <Textarea placeholder="Enter your executive summary." {...register("executiveSummary")} className={errors.executiveSummary? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Skills (Enter multiple)<span className="text-red-500">*</span>
                  </h5>
                  <div className="grow min-w-0">
                    {/* <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={skills}
                          multiple
                          value={field.value || []}
                          onValueChange={field.onChange}
                          
                        >
                          <ComboboxChips
                              className={
                                errors.skills
                                  ? "border-red-500 bg-red-50"
                                  : ""
                              }
                            >
                            <ComboboxValue>
                              {(field.value || []).map((item) => (
                                <ComboboxChip key={item}>{item}</ComboboxChip>
                              ))}
                            </ComboboxValue>

                            <ComboboxChipsInput
                              placeholder="Type or Select Skills"
                            />
                          </ComboboxChips>

                          <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>

                            <ComboboxList>
                              {(skill) => (
                                <ComboboxItem
                                  key={skill.skillId}
                                  value={skill.skillName}
                                >
                                  {skill.skillName}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    /> */}
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => {
                          const selectedSkills = field.value || [];
                          const newSkill = typedSkill.trim();

                          const skillAlreadyExists = existingSkillNames.some(
                            (skill) => skill.toLowerCase() === newSkill.toLowerCase()
                          );

                          const skillAlreadySelected = selectedSkills.some(
                            (skill) => skill.toLowerCase() === newSkill.toLowerCase()
                          );
                         const showAddSkill =
                            newSkill !== "" && !skillAlreadyExists && !skillAlreadySelected;

                          const dropdownSkills = showAddSkill
                            ? [...existingSkillNames, newSkill]
                            : existingSkillNames;
                          
                          return (
                            <Combobox
                              items={dropdownSkills}
                              multiple
                              value={selectedSkills}
                              onValueChange={(value) => {
                                field.onChange(value);
                                setTypedSkill("");
                              }}
                            >
                              <ComboboxChips
                                className={errors.skills ? "border-red-500 bg-red-50" : ""}
                              >
                                <ComboboxValue>
                                  {selectedSkills.map((skill) => (
                                    <ComboboxChip key={skill}>{skill}</ComboboxChip>
                                  ))}
                                </ComboboxValue>

                                <ComboboxChipsInput
                                  placeholder="Type or select skills"
                                  value={typedSkill}
                                  onChange={(event) => {
                                    setTypedSkill(event.currentTarget.value);
                                  }}
                                 
                                />
                              </ComboboxChips>

                              <ComboboxContent>
                                <ComboboxEmpty>No skills found.</ComboboxEmpty>

                                <ComboboxList>
                                  {(skill) => (
                                    <ComboboxItem key={skill} value={skill}>
                                      {showAddSkill && skill === newSkill
                                        ? `Add "${newSkill}"`
                                        : skill}
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                          );
                        }}
                      />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Current Employer</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your current employer" {...register("currentEmployer")} className={errors.currentEmployer? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Current Role/ Designation
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your current role/designation" {...register("currentRole")} className={errors.currentRole? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Joined on</h5>
                  <div className="grow min-w-0">
                  <Controller
                        name="joinedOn"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <InputGroup
                                className={
                                  errors.joinedOn
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                }
                              >
                                <InputGroupInput
                                  readOnly
                                  value={
                                    field.value
                                      ? format(field.value, "PPP")
                                      : ""
                                  }
                                  placeholder="Pick a date"
                                  className={
                                    errors.joinedOn
                                      ? "bg-red-50 focus-visible:ring-red-500"
                                      : ""
                                  }
                                />

                                <InputGroupAddon align="inline-end">
                                  <CalendarDays className="size-4 opacity-70" />
                                </InputGroupAddon>
                              </InputGroup>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                defaultMonth={field.value}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Open to work as Freelancer
                  </h5>

                  <div className="grow min-w-0">
                    <Controller
                      name="freelancer"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                            value={field.value}
                            onValueChange={(value) => {
                              queueMicrotask(() => {
                                field.onChange(value);

                                if (value === "no") {
                                  setValue("freelancerLink", "", {
                                    shouldDirty: true,
                                    shouldValidate: false,
                                  });

                                  clearErrors("freelancerLink");
                                }
                              });
                            }}
                            className="flex gap-4 mt-1"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="yes" id="yes" />
                              <Label htmlFor="yes">Yes</Label>
                            </div>

                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="no" id="no" />
                              <Label htmlFor="no">No</Label>
                            </div>
                          </RadioGroup>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Profile link from Freelancer.com/ Upwork.com
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="https://www.upwork.com/profile/example" {...register("freelancerLink")} className={errors.freelancerLink? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>
                  </div>
                </div>

               <Controller
                      name="cv"
                      control={control}
                      render={({ field }) => (
                        <>
                          <div className="w-full flex flex-col gap-2 lg:gap-4">
                            <h5 className="lg:basis-1/2 shrink-0">Upload CV</h5>

                            <div className="col-span-4 w-full">
                              <Label
                                  htmlFor="cvUpload"
                                  className={`border border-dashed h-26 cursor-pointer rounded-sm flex flex-col justify-center items-center bg-white hover:bg-light-gray
                                    ${errors.cv ? "border-red-500 bg-red-50" : "border-black/30"}
                                  `}
                                >
                                  {field.value ? (
                                    <>
                                      <Upload className="size-5 mb-2 text-green-600" />
                                      <p className="font-medium">{field.value.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {(field.value.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="size-5 mb-2" />
                                      <span>Click to upload CV</span>
                                      <span className="text-xs text-muted-foreground">
                                        PDF, DOC, or DOCX — maximum 5 MB
                                      </span>
                                    </>
                                  )}

                                  <input
                                    id="cvUpload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];

                                      if (!file) return;

                                      const allowedFormats = [
                                        "application/pdf",
                                        "application/msword",
                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                      ];

                                      const maxSize = 5 * 1024 * 1024;

                                      if (!allowedFormats.includes(file.type)) {
                                        field.onChange(null);
                                        e.target.value = "";
                                        toast.error("Only PDF, DOC and DOCX files are allowed.");
                                        return;
                                      }

                                      if (file.size > maxSize) {
                                        field.onChange(null);
                                        e.target.value = "";
                                        toast.error("CV size cannot be more than 5 MB.");
                                        return;
                                      }

                                      field.onChange(file);
                                      clearErrors("cv");
                                    }}
                                  />
                                </Label>
                            </div>
                          </div>
                        </>
                      )}
                    />
                
              </div>
            )}

            <div className="flex justify-between">
              {currentStep === steps.length - 1 ? (
                <Button variant="gray" onClick={prevStep}>
                  Back
                </Button>
              ) : null}

              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  disabled={!isStepOneValid}
                  className="ml-auto"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyForJob;
