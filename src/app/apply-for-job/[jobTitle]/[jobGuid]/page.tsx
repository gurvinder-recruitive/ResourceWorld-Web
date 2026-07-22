"use client";
import React, { useEffect, useState } from "react";
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
import { Upload, CalendarDays } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { Controller, useForm} from "react-hook-form";
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
  const [profileImage, setProfileImage] = useState<string | null>(null);

 

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
     }
  })

   const nextStep = async () => {
    const isValid = await trigger([
      "fullName",
      "email",
      "location",
      "country",
      "mobileNo",
      "gender",
      "tagLine",

    ]);

    if (!isValid) return;

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
    for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    try{
      const userId = sessionStorage.getItem("userId");
      if (!userId) {

      const response = await fetch(
        "https://localhost:7163/api/UserProfile/step-1",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      sessionStorage.setItem("userId", result.userGuid);
    } else {

      await fetch(
        `https://localhost:7163/api/UserProfile/step-1/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
  );
}


    } catch (error) {
    console.error(error);
  }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };


  const onSubmit = (data: applyJobFormData) => {
     alert(data);
  };
 
   const params = useParams();

  const jobTitle = params.jobTitle as string;
  const jobId = Number(params.jobId);
 
 useEffect(() => {
  if (!jobId) return;

  fetch(`https://localhost:7163/api/UserProfile/jobs/${jobId}`)
    .then((response) => response.json())
    .then((data) => {
      setJobDetails(data);
    })
    .catch((error) => console.error(error));

    fetch("https://localhost:7163/api/UserProfile/Countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error(error));
}, [jobId]);

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
                  <label
                    htmlFor="profileImage"
                    className="w-20 h-20 2xl:w-24 2xl:h-24 mx-auto rounded-full bg-[#999999] flex justify-center items-center cursor-pointer overflow-hidden"
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
              onStepChange={setCurrentStep}
            />
            {currentStep === 0 && (
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Full Name</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your full name" {...register("fullName")} className={errors.fullName ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""}/>                   
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Email Address</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your email address" {...register("email")} className={errors.email ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Location (City, State)
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your location" {...register("location")} className={errors.location ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Country</h5>
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
                  <h5 className="lg:basis-1/2 shrink-0">Mobile No</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your Mobile No" {...register("mobileNo")} className={errors.mobileNo ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : ""} />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Gender</h5>
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
                    Tag Line for your profile
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
                  <h5 className="lg:basis-1/2 shrink-0">Executive Summary</h5>
                  <div className="grow min-w-0">
                    <Textarea placeholder="Enter your executive summary." />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Skills (Enter multiple)
                  </h5>
                  <div className="grow min-w-0">
                    <Combobox
                      items={skills}
                      multiple
                      value={selectedSkills}
                      onValueChange={setSelectedSkills}
                    >
                      <ComboboxChips>
                        <ComboboxValue>
                          {selectedSkills.map((item) => (
                            <ComboboxChip key={item}>{item}</ComboboxChip>
                          ))}
                        </ComboboxValue>
                        <ComboboxChipsInput placeholder="Type or Select Skills" />
                      </ComboboxChips>
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Current Employer</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your current employer" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Current Role/ Designation
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your current role/designation" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Joined on</h5>
                  <div className="grow min-w-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <InputGroup>
                          <InputGroupInput
                            readOnly
                            value={date ? format(date, "PPP") : ""}
                            placeholder="Pick a date"
                          />
                          <InputGroupAddon align="inline-end">
                            <CalendarDays className="size-4 opacity-70" />
                          </InputGroupAddon>
                        </InputGroup>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          defaultMonth={date}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Open to work as Freelancer
                  </h5>
                  <div className="grow min-w-0">
                    <RadioGroup defaultValue="yes" className="flex gap-4 mt-1">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label
                          htmlFor="yes"
                          className="text-999 peer-data-[state=checked]:text-222"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="no" id="no" />
                        <Label
                          htmlFor="no"
                          className="text-999 peer-data-[state=checked]:text-222"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Profile link from Freelancer.com/ Upwork.com
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your profile link" />
                  </div>
                </div>

                <div className="w-full flex flex-col  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Upload CV</h5>
                  <div className="col-span-4 w-full ">
                    <Label
                      htmlFor="imgUpload"
                      className="border text-light border-dashed border-black/30 h-26 cursor-pointer rounded-sm flex flex-col shrink-0 justify-center text-222 items-center bg-white hover:bg-light-gray"
                    >
                      <Upload className="size-5 mr-2" />
                      Click to upload or drag and drop
                      <input type="file" id="imgUpload" className="hidden" />
                    </Label>
                  </div>
                </div>
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
