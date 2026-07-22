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
  const [value, setValue] = useState([]);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Submitted");
  };
   const params = useParams();

  const jobTitle = params.jobTitle as string;
  const jobGuid = params.jobGuid as string;

 
 useEffect(() => {
  if (!jobGuid) return;

  fetch(`https://localhost:7163/api/UserProfile/jobs/${jobGuid}`)
    .then((response) => response.json())
    .then((data) => {
      setJobDetails(data);
    })
    .catch((error) => console.error(error));
}, [jobGuid]);

  return (
    <>
      <div className="container pb-8 md:pb-12 2xl:pb-14">
        <div className="w-full max-w-[880px] mx-auto space-y-8">
          <h3 className="text-center">{jobDetails?.title}</h3>
          <div className=" w-20 h-20 2xl:w-24 2xl:h-24 mx-auto rounded-full bg-[#999999] flex justify-center items-center">
            <Image
              src={UserIcon}
              alt="User"
              className="w-8 2xl:w-10"
            />
          </div>
          
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
                    <Input placeholder="Enter your full name" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Email Address</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your email address" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Location (City, State)
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your location" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Country</h5>
                  <div className="grow min-w-0">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="united-states">
                            United States
                          </SelectItem>
                          <SelectItem value="united-kingdom">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Mobile No</h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your Mobile No" />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">Gender</h5>
                  <div className="grow min-w-0">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row  gap-2 lg:gap-4 ">
                  <h5 className="lg:basis-1/2 shrink-0">
                    Tag Line for your profile
                  </h5>
                  <div className="grow min-w-0">
                    <Input placeholder="Enter your Tag Line" />
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
                      value={value}
                      onValueChange={setValue}
                    >
                      <ComboboxChips>
                        <ComboboxValue>
                          {value.map((item) => (
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
                <Button onClick={handleSubmit}>Submit</Button>
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
