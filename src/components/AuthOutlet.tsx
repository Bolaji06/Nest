"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";

const DynamicLoginSignUp = dynamic(
  () => import("@/components/LoginSignUp"),
  { ssr: false }
);

const DynamicForgotPassword = dynamic(
  () => import("@/components/ForgotPassword"),
  { ssr: false }
);

const DynamicNotificationBox = dynamic(
  () => import("@/components/NotificationBox"),
  { ssr: false }
);

const DynamicVerifyPassword = dynamic(
  () => import("@/components/VerifyEmail"),
  { ssr: false }
);

interface IAuthOutletProps {
  setOpenAuthOutlet: (curState: boolean) => void,
}
export default function AuthOutlet({ setOpenAuthOutlet }: IAuthOutletProps) {
  const [showLoginSignUp, setShowLoginSignUp] = useState(true);
  const [showForgotPortal, setShowForgotPortal] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  return (
    <>
     {
      showLoginSignUp && (
        createPortal(<DynamicLoginSignUp 
          setOpenAuthOutlet={setOpenAuthOutlet}
          setShowForgotPortal={setShowForgotPortal}
          setShowLoginSignUp={setShowLoginSignUp}
          />, document.body)
      )
     }

     {
      showForgotPortal && (
        createPortal(<DynamicForgotPassword 
          setShowLoginSignUp={setShowLoginSignUp}
          setOpenAuthOutlet={setOpenAuthOutlet}
          setShowForgotPortal={setShowForgotPortal}
          setEmailNotification={setShowEmailNotification}/>
          , document.body)
      )
     }

     {
      showEmailNotification && (
        createPortal(<DynamicNotificationBox 
          setShowNotification={setShowEmailNotification}
          setOpenAuthOutlet={setOpenAuthOutlet}/>, document.body)
      )
     }

    </>
  );
}
