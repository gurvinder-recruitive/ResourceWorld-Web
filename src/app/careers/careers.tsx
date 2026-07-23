"use client";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoMobile from "@/assets/m-logo.svg";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";  
import { createSlug } from "@/utils/createSlug";  
import { toast } from "react-toastify";
type CareersProps = {
  initialJobId?: number;
};

const Careers = ({ initialJobId }: CareersProps) => {
  const [viewJobs, setViewJobs] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(
  initialJobId ?? null
);
 const [jobs, setJobs] = useState<any[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);
  const handleViewJobs = (jobId: number) => {
    setViewJobs(true);
    setActiveItem(jobId);
    router.push(`/careers/${jobId}`);
    setTimeout(() => {
      if (detailsRef.current) {
        const headerHeight = window.innerWidth >= 1536 ? 88 : 72;

        const y =
          detailsRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  const handleBack = () => {
    setViewJobs(false);
     setActiveItem(null);
  };

  const router = useRouter(); 
  
  const handleApply = () => { 
    if(!selectedJob) return;
    const jobSlug = createSlug(selectedJob.title);
    router.push(`/apply-for-job/${jobSlug}/${selectedJob.jobId}`); 
  }

  useEffect(() => {
    console.log(
 `${process.env.NEXT_PUBLIC_API_URL}/UserProfile/jobs`
);
  const fetchJobs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/UserProfile/jobs`
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to load jobs.");
        return;
      }

      setJobs(data);

      if (data.length > 0) {
        const jobExists = data.some(
          (job: any) => job.jobId === initialJobId
        );

        if (jobExists) {
          setActiveItem(initialJobId!);
        } else {
          setActiveItem(data[0].jobId);
        }
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Unable to connect to the server.");
    }
  };

  fetchJobs();

}, [initialJobId]);

const selectedJob = jobs.find(
  (job: any) => job.jobId === activeItem
);

  return (
    <>
      <div className="container ">
        <div className="space-y-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-14 border-b pb-8">
            <div className="w-full space-y-2 self-center">
              <h3>We're Building Something Big.</h3>
              <h3> Come Build It With Us.</h3>
              <h2>Join the Team Behind Recurso.World</h2>
            </div>
            <div className="col-span-2 space-y-4">
              <p>
                Recurso.World is building a next-generation platform that helps
                professionals connect with colleagues, employers, freelance
                agencies, and clients across the globe. As we prepare for our
                launch, we're assembling a passionate team to turn this vision
                into reality.
              </p>
              <p>
                We're currently hiring talented professionals in <span className="fi fi-in "></span> <span className="font-medium">India,</span> <span className="fi fi-pk"></span> <span className="font-medium">Pakistan</span>, and the <span className="fi fi-ae"></span> <span className="font-medium">UAE</span> across multiple roles, including <span className="font-medium">Program
                Managers, Software Developers, UI/UX Designers, Social Media &
                Digital Marketing Specialists, QA Engineers, and Product
                Professionals.</span>
              </p>
              <p>
                If you're excited about creating products that empower millions
                of professionals worldwide, we'd love to hear from you. Join us
                and help shape the future of work.
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-14 ">
            <div
              className={`flex-col bg-light-gray lg:sticky lg:top-[72px] 2xl:top-[88px] overflow-hidden  h-[calc(100dvh-128px)] lg:h-[calc(100dvh-72px)] 2xl:lg:h-[calc(100dvh-88px)]  lg:pb-19 ${viewJobs ? "hidden lg:flex" : "flex"}`}
            >
              <div className="flex justify-between items-center px-4 py-5 border-b">
                <h3>Current Job Openings</h3>
              </div>
              <ScrollArea className="w-full h-full ">
                {jobs.map((job:any)=>(
                <div
                  key={job.jobId}  
                  onClick={() => handleViewJobs(job.jobId)}
                  className={`w-full min-w-0 p-4 flex flex-col gap-2 border-b group hover:bg-light-blue cursor-pointer ${activeItem === job.jobId  ? "bg-light-blue" : ""}`}
                >
                  <div className="flex gap-3 w-full justify-between">
                    <div className="flex gap-2 min-w-0 grow">
                      <div className="shrink-0">
                            <Image
                              src={LogoMobile}
                              alt="Logo"
                              className="w-7 mt-2"
                            />
                      </div>
                      <div className="flex flex-col">
                        <h5>{job.title}</h5>
                        <h6>Experience: {job.experience}</h6>
                        <h6>{job.location}  </h6>
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap self-center">
                      <Badge
                        variant="successOutline"
                        size="md"
                        className="text-success visible xl:invisible group-hover:visible"
                      >
                        Apply
                      </Badge>
                    </div>
                  </div>
                </div>   
                ))}
                
                {/* <div
                  onClick={() => handleViewJobs("item2")}
                  className={`w-full min-w-0 p-4 flex flex-col gap-2 border-b group hover:bg-light-blue cursor-pointer ${activeItem === "item2" ? "bg-light-blue" : ""}`}
                >
                  <div className="flex gap-3 w-full justify-between">
                    <div className="flex gap-2 min-w-0 grow">
                      <div className="shrink-0">
                            <Image
                              src={LogoMobile}
                              alt="Logo"
                              className="w-7 mt-2"
                            />
                      </div>
                      <div className="flex flex-col">
                        <h5>Graphic Designer</h5>
                        <h6>Experience: 1-3 years</h6>
                        <h6>India Bengaluru/Delhi</h6>
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap self-center">
                      <Badge
                        variant="successOutline"
                        size="md"
                        className="text-success visible xl:invisible group-hover:visible"
                      >
                        Apply
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleViewJobs("item3")}
                  className={`w-full min-w-0 p-4 flex flex-col gap-2 border-b group hover:bg-light-blue cursor-pointer ${activeItem === "item3" ? "bg-light-blue" : ""}`}
                >
                  <div className="flex gap-3 w-full justify-between">
                    <div className="flex gap-2 min-w-0 grow">
                      <div className="shrink-0">
                        <Image
                          src={LogoMobile}
                          alt="Logo"
                          className="w-7 mt-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5>Wordpress Developer</h5>
                        <h6>Experience: 2-4 years</h6>
                        <h6>India Delhi/Pune</h6>
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap self-center">
                      <Badge
                        variant="successOutline"
                        size="md"
                        className="text-success visible xl:invisible group-hover:visible"
                      >
                        Apply
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleViewJobs("item4")}
                  className={`w-full min-w-0 p-4 flex flex-col gap-2 border-b group hover:bg-light-blue cursor-pointer ${activeItem === "item4" ? "bg-light-blue" : ""}`}
                >
                  <div className="flex gap-3 w-full justify-between">
                    <div className="flex gap-2 min-w-0 grow">
                      <div className="shrink-0">
                        <Image
                          src={LogoMobile}
                          alt="Logo"
                          className="w-7 mt-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5>Email Marketing Executive</h5>
                        <h6>Experience: 1-4 year</h6>
                        <h6>United Arab Emirates</h6>
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap self-center">
                      <Badge
                        variant="successOutline"
                        size="md"
                        className="text-success visible xl:invisible group-hover:visible"
                      >
                        Apply
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleViewJobs("item5")}
                  className={`w-full min-w-0 p-4 flex flex-col gap-2 border-b group hover:bg-light-blue cursor-pointer ${activeItem === "item5" ? "bg-light-blue" : ""}`}
                >
                  <div className="flex gap-3 w-full justify-between">
                    <div className="flex gap-2 min-w-0 grow">
                      <div className="shrink-0">
                        <Image
                          src={LogoMobile}
                          alt="Logo"
                          className="w-7 mt-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5>IT Project Manager / Coordinator</h5>
                        <h6>Experience: 4-6 years</h6>
                        <h6>India/ Pakistan</h6>
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap self-center">
                      <Badge
                        variant="successOutline"
                        size="md"
                        className="text-success visible xl:invisible group-hover:visible"
                      >
                        Apply
                      </Badge>
                    </div>
                  </div>
                </div> */}
              </ScrollArea>
            </div>
            <div
              ref={detailsRef}
              className={`col-span-1 lg:col-span-2 flex gap-2 lg:pt-5 pb-8 overflow-hidden ${viewJobs ? "flex" : "hidden lg:flex"}`}
            >
              <Button
                variant="link"
                onClick={handleBack}
                className="p-0  lg:hidden "
              >
                <ChevronLeft className="size-8 text-222" />
              </Button>{" "}
              {selectedJob?.jobId === 2 && (
                <div className="w-full space-y-6">
                  <h3>Website Designer RW-IND003</h3>
                  <div className="space-y-0.5">
                    <h6>Experience: 2-4 years in the Industry</h6>
                    <h6>
                      Working Hours: 10:00 AM to 7:00 PM (India Time Zone)
                    </h6>
                    <h6>
                      Location: India (preferably from
                      Bengaluru/Delhi/Gurgaon/Pune)
                    </h6>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" size="md">Full Time</Badge>{" "}
                      <Badge variant="outline" size="md">Remote</Badge>{" "}
                      <Badge variant="outline" size="md">Direct Hire</Badge>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Required Skills:</h4>
                    <p>
                      Adobe Photoshop/ Adobe Illustrator / Figma/ Canva/ UI/UX
                      Design Usability
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Job Description: </h4>
                    <p>
                      The ideal candidate should have an eye for clean and
                      artful web design. They should also have superior user
                      interface design skills. The candidate should be able to
                      translate high-level requirements into interaction flows
                      and artifacts. They should be able to transform them into
                      beautiful, intuitive, and functional designs.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Responsibilities </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Execute all visual design stages from concept to final
                        hand-off to engineering{" "}
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Conceptualize original website design ideas that bring
                        simplicity and user friendliness to complex roadblocks
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Create wireframes, storyboards, user flows, process
                        flows and site maps to communicate interaction and
                        design ideas
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Present and defend designs and key deliverables to peers
                        and executive level stakeholders{" "}
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Establish and promote design guidelines, best practices
                        and standards{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Requirements: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Minimum 2Y of proven work experience as a Web Designer
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Demonstrable web design skills with a strong portfolio
                        using Adobe Photoshop/ Adobe Illustrator / Figma/ Canva
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Proficiency in Photoshop, Illustrator or other visual
                        design and wire-framing tools
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Proficiency in HTML, CSS and JavaScript for rapid
                        prototyping
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Understanding about UI/UX Design Usability
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Experience designing in any front-end technology like
                        angular.js, Vue JS or react.js (optional)
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Excellent visual design skills with sensitivity to
                        user-system interaction
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ability to solve problems creatively and effectively
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Up-to-date with the latest Web trends, techniques and
                        technologies
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-end">
                    <Button variant="accent" className="w-full sm:w-auto" onClick={handleApply}> Apply </Button>
                  </div>
                </div>
              )}
              {selectedJob?.jobId === 3 && (
                <div className="w-full space-y-6">
                  <h3>Graphic Designer RW-IND004</h3>
                  <div className="space-y-0.5">
                    <h6>Experience: 1-3 years in the Industry</h6>
                    <h6>
                      Working Hours: 10:00 AM to 7:00 PM (India Time Zone)
                    </h6>
                    <h6>
                      Location: India (preferably from
                      Bengaluru/Delhi/Gurgaon/Pune)
                    </h6>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" size="md">Full Time</Badge>{" "}
                      <Badge variant="outline" size="md">Remote</Badge>{" "}
                      <Badge variant="outline" size="md">Direct Hire</Badge>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Required Skills:</h4>
                    <p>
                      Adobe Photoshop/ Adobe Illustrator / Figma/ Canvas/
                      Digital Marketing
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Job Description: </h4>
                    <div className="space-y-2">
                      <p>
                        We are seeking a full-time Graphic Designer with 1–3
                        years of professional experience to join our Creative
                        team.
                      </p>
                      <p>
                        You will be responsible for shaping the brand’s visual
                        presence across Social Media, Digital performance
                        marketing and various brand assets.
                      </p>
                      <p>
                        The ideal candidate is detail-oriented, conceptually
                        strong, and skilled across digital design, print media,
                        and social marketing communication.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Responsibilities </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Design B2B & B2C marketing materials including
                        brochures, presentations, social media creatives, case
                        studies and email campaigns.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Create sales enablement assets such as pitch decks,
                        product sheets, and proposal templates.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Design high-quality creatives for social media, paid
                        advertisements, email marketing and website assets.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Maintain brand consistency across all digital and print
                        materials.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Collaborate with Marketing, Sales, and Content teams.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Revise designs based on feedback and project
                        requirements.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                   <h4> Requirements: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Minimum 1.5Y of proven work experience as a Graphic
                        Designer
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Demonstrable Graphic design skills with a strong
                        portfolio using Adobe Photoshop/ Adobe Illustrator /
                        Figma/ Canvas
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Proficiency in Photoshop, Illustrator or other visual
                        design and wire-framing tools
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Understanding about UI/UX Design Usability
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Understanding about UI/UX Design Usability
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Excellent visual design skills with sensitivity to
                        user-system interaction
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ability to solve problems creatively and effectively
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Up-to-date with the latest social media trends,
                        techniques and technologies
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Good to have: Motion graphics experience (After Effects)
                      </li>
                    </ul>
                  </div>
                   <div className="w-full flex justify-end">
                    <Button variant="accent" className="w-full sm:w-auto" onClick={handleApply}>
                      Apply
                    </Button>
                  </div>
                </div>
              )}
              {selectedJob?.jobId === 4 && (
                <div className="w-full space-y-6">
                  <h3>Wordpress Developer RW-IND005</h3>
                  <div className="space-y-0.5">
                    <h6>Experience: 2-4 years in the Industry</h6>
                    <h6>
                      Working Hours: 10:00 AM to 7:00 PM (India Time Zone)
                    </h6>
                    <h6>
                      Location: India (preferably from Delhi/Gurgaon/Pune)
                    </h6>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" size="md">Full Time</Badge>{" "}
                      <Badge variant="outline" size="md">Remote</Badge>{" "}
                      <Badge variant="outline" size="md">Direct Hire</Badge>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Required Skills:</h4>
                    <p>Wordpress/ MySQL / HTML/ CSS/ JavaScript/ PHP</p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Job Description: </h4>
                    <p>
                      We are looking for a talented WordPress Developer to join
                      our team. The ideal candidate should have strong expertise
                      in developing and integrating WordPress Custom theme and
                      producing a robust admin panel for our corporate website
                      to handle load of 10K users.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Responsibilities </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Design and develop custom WordPress websites using
                        Elementor, Divi, and WPBakery or similar tools.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Customize themes and templates to match our brand
                        requirements.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Optimize websites for speed, responsiveness, and SEO
                        best practices.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Troubleshoot and fix WordPress-related issues, including
                        plugins and theme conflicts.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Collaborate with designers and team members for smooth
                        project execution
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Implement animations, interactions, and modern design
                        elements.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Work with ACF (Advanced Custom Fields) and custom post
                        types when needed.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ensure cross-browser compatibility and mobile
                        responsiveness.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Perform website updates, security checks, and
                        maintenance.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Stay updated with the latest WordPress tools and best
                        practices
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                   <h4> Requirements: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Minimum 2+ years of professional WordPress development
                        experience
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Strong knowledge of HTML, CSS, JavaScript, PHP and MySQL
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Experience in WordPress theme and plugin customization
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Understanding of website speed optimization and SEO
                        practices
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ability to handle frontend and backend development
                        independently
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Basic knowledge of hosting environments and server setup
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Strong problem-solving skills and attention to detail
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Experience with PHP Laravel framework is a plus
                      </li>
                    </ul>
                  </div>
                   <div className="w-full flex justify-end">
                    <Button variant="accent" className="w-full sm:w-auto" onClick={handleApply}>
                      Apply
                    </Button>
                  </div>
                </div>
              )}
              {selectedJob?.jobId === 5 && (
                <div className="w-full space-y-6">
                  <h3>Email Marketing Executive RW-UAE006</h3>
                  <div className="space-y-0.5">
                    <h6>Experience: 1-4 years in the Industry</h6>
                    <h6>Number of positions: 2</h6>
                    <h6>
                      Working Hours: 8:00 AM to 5:00 PM (UAE Time Zone i.e. GST)
                    </h6>
                    <h6>Location: United Arab Emirates</h6>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" size="md">Full Time</Badge>{" "}
                      <Badge variant="outline" size="md">Remote</Badge>{" "}
                      <Badge variant="outline" size="md">Direct Hire</Badge>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Required Skills:</h4>
                    <p>
                      Lead generation/ Marketing / HTML/ HTML/ Google Analytics/
                      HubSpot/ Mailchimp
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Job Description: </h4>
                    <p>
                      Recurso.World is looking for a results-driven Email
                      Marketing Executive to plan, execute, and optimize
                      high-performing email campaigns. The ideal candidate
                      should have a strong understanding of B2B & B2C lead
                      generation, email automation, and performance marketing,
                      along with the ability to create compelling content that
                      drives engagement and conversions.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Responsibilities </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Develop and execute email marketing campaigns aligned
                        with business goals
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Build and manage email marketing workflows, automation,
                        and segmentation strategies
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Generate and nurture high-quality B2C leads through
                        targeted campaigns
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Write persuasive and engaging email copy that improves
                        open rates and click-through rates
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Conduct A/B testing on subject lines, content, and
                        layouts to optimize campaign performance
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Monitor, analyze, and report on campaign metrics such as
                        open rates, CTR, conversions, and ROI
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Maintain email list hygiene and ensure compliance with
                        data protection regulations
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Collaborate with design, content, and performance
                        marketing teams to improve campaign effectiveness
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Implement SEO strategies to improve website traffic and
                        search engine rankings.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                   <h4> Requirements: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Minimum 6 months to 2 years of hands-on experience in
                        email marketing
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Proven experience in lead generation and nurturing
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Strong copywriting skills with attention to detail
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Analytical mindset with the ability to interpret data
                        and optimize campaigns
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Experience with email marketing tools and CRM platforms
                        (such as Mailchimp, HubSpot, or similar)
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Understanding of email deliverability, segmentation, and
                        automation best practices
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-0.5">
                    <h4> Preferred Skills </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Experience with marketing automation tools and customer
                        journey mapping
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Must have knowledge of HTML/CSS for email template
                        customization
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Familiarity with analytics tools such as Google
                        Analytics
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ability to manage multiple campaigns and meet deadlines
                        in a fast-paced environment
                      </li>
                    </ul>
                  </div>
                   <div className="w-full flex justify-end">
                    <Button variant="accent" className="w-full sm:w-auto" onClick={handleApply}>
                      Apply
                    </Button>
                  </div>
                </div>
              )}
              {selectedJob?.jobId ===6 && (
                <div className="w-full space-y-6">
                  <h3>IT Project Manager / Coordinator RW-IND007</h3>
                  <div className="space-y-0.5">
                    <h6>Experience: 4-6 years in the Industry</h6>
                    <h6> Number of positions: 2 </h6>
                    <h6>
                      {" "}
                      Working Hours: 10:00 AM to 7:00 PM (India Time Zone)
                    </h6>
                    <h6>Location: Bengaluru/Delhi, India or Pakistan</h6>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" size="md">Full Time</Badge>{" "}
                      <Badge variant="outline" size="md">Remote</Badge>{" "}
                      <Badge variant="outline" size="md">Direct Hire</Badge>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Required Skills:</h4>
                    <p>
                      Agile/ Jira/ Trello Board/ Scrum/ Analysis & Communication
                      skills
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Job Description: </h4>
                    <p>
                      As a Digital Product Manager, you will be at the forefront
                      of shaping and delivering innovative digital solutions
                      that address both conventional and complex business
                      challenges. You will manage the entire product SDLC
                      lifecycle, collaborating closely with business
                      stakeholders to identify opportunities, ensure compliance
                      with key deliverables, and support the development of
                      robust business cases for digital initiatives. Your role
                      will require you to articulate and present digital
                      concepts to senior stakeholders, drive value creation
                      post-implementation, and plan targeted communications to
                      maximize impact.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4> Key responsibilities include: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Product Strategy and Vision
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Define and communicate a compelling product vision and
                        roadmap using Agile Methodology aligned with company
                        goals.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Product Lifecycle Management
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Guide products through the entire lifecycle, from
                        ideation, design, development, launch, and ongoing
                        improvements.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Collaborate with cross-functional teams, including
                        engineering, design, marketing, and sales, to deliver
                        quality products on time.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Gather, prioritize, and prioritise the Sprint planning
                        and manage Product Backlog. Identify product
                        improvements and opportunities for growth.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Serve as the primary point of contact for
                        product-related updates, collaborating with stakeholders
                        to ensure alignment and clarity.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Present product strategies, status updates, and results
                        to stakeholders, gathering feedback and making informed
                        adjustments as needed.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Agile Development and Prioritization
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Work closely with development teams to implement an
                        agile product development process, establishing clear
                        priorities and timelines.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Create, prioritize, and manage product backlogs,
                        translating requirements into epics, user stories, and
                        acceptance criteria.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Metrics and Performance Analysis
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Establish product performance metrics (KPIs), monitor
                        progress, and assess success post-launch.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Utilize data analytics to inform feature prioritization,
                        usability, and customer satisfaction.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                   <h4> Requirements: </h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Bachelor’s degree in Computer Science, Business,
                        Engineering, or related field (MBA or equivalent is a
                        plus).
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        2-5 years of experience in product management, ideally
                        within software or tech-driven environments.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Strong understanding of agile methodologies and product
                        lifecycle management.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Proven track record of managing product roadmaps and
                        delivering successful software products.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Excellent analytical skills with experience leveraging
                        data to make strategic product decisions.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Exceptional communication, collaboration, and project
                        management skills.
                      </li>
                      <li className=" text-base 2xl:text-xl font-normal text-444">
                        Ability to balance technical knowledge with business
                        acumen and user-centered design principles.
                      </li>
                    </ul>
                  </div>
                   <div className="w-full flex justify-end">
                    <Button variant="accent" className="w-full sm:w-auto" onClick={handleApply}>
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
