import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " وکیل هوشمند |  پنل کاربری کوشا گروپ",
  description:"وکیل هوشمند جهت راهنمایی مسائل حقوقی در دبی امارات"
};

const SmartLawyer = () => {
  return (
    <>
      <Breadcrumb pageName="وکیل هوشمند" />

      <div className="space-y-10">
        <div>
          <iframe
            src="https://smart-legal-assistant.vercel.app"
            className="h-dvh w-full border-none"
            title="وکیل هوشمند"
          />
        </div>
      </div>
    </>
  );
};

export default SmartLawyer;
