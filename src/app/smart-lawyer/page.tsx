import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: " وکیل هوشمند",
};

const SmartLawyer = () => {
  return (
    <>
      <Breadcrumb pageName="وکیل هوشمند" />

      <div className="space-y-10">
       
      <div>
                  <iframe
            src="https://smart-legal-assistant.vercel.app" // آدرس سایت مورد نظر
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="وکیل هوشمند"
          />
        </div>
      </div>
    </>
  );
};

export default SmartLawyer;
