import Link from "next/link";
import Image from "next/image"; 
import "./comingSoon.css";

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
     <div className="container-fluid">
      <div className="row main-section">

        <div className="col-lg-7 left-side">

          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>

          <div className="circle-bg"></div>

          <Image
            src="/images/Happy-announcement-cuate.png"
            alt="Coming Soon"
            width={350}
            height={350}
            className="coming-image img-fluid"
          />
        </div>

        <div className="col-lg-5 right-side">

          <div className="logo">
            <span>Recurso</span> <span>World</span>
          </div>

          <div className="rocket">🚀</div>

          <h1 className="main-heading">
            We’re building <br />
            something <span className="highlight">amazing..!</span>
          </h1>

          <p className="sub-text">
            Stay tuned — website coming soon.
          </p>
          <Link href="/careers">
            <button>
              Go to careers page
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}