import Logo from "@/assets/logo.svg";
import LaunchingSoon from '@/assets/images/launching.svg'
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // <div>
    //   <h1>Home Page</h1>
      
    //   <br/>
    //   <Link href="/careers">
    //     <button>
    //       Careers
    //     </button>
    //   </Link>
    //   <br />
    //   <Link href="/apply-for-job">
    //     <button>
    //       Apply for Jobs
    //     </button>
    //   </Link>
    // </div>
    <>
    <div className='w-full h-[100dvh] grid lg:grid-cols-7'>
        <div className="w-full h-[100dvh] hidden lg:flex lg:col-span-4 bg-[#f7dede] justify-center">
          <Image src={LaunchingSoon} alt="Launching soon" priority />
        </div>
        <div className='w-full lg:col-span-3 bg-[#f3f3f3] flex justify-center items-center p-8 xl:p-16'>
            <div className='w-full space-y-14 xl:space-y-18'>
                <div className='w-full'><Image src={Logo} alt="Logo" className='xl:w-72' /></div>
                <div className='w-full space-y-4'>
                    <div className='w-full text-lg xl:text-2xl 2xl:text-3xl'>🚀</div>
                    <h1 className='xl:text-5xl 2xl:text-6xl'>We’re building <br/> something <span className='text-primary'>amazing..!</span></h1>
                    <p className='xl:text-lg 2xl:text-2xl'>Stay tuned — website coming soon.</p>
                     <Link href="/careers">
                        <button>
                           Go to careers page
                        </button>
                      </Link>
                      <br />
                </div>

            </div>
        </div>
    </div>
    
    </>
  );
}