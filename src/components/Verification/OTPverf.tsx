import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerwo from "../Header/header_wo";
import ConfirmCancel from "./ConfirmCancel";

const OTPverf: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as { phone?: string })?.phone ?? ""; // ensure phone is passed when navigating here

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);

  // OTP digits controlled as array of strings
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  // focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // helper to format timer display
  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // assemble OTP string
  const otp = otpDigits.join("");

  // change handler for each OTP slot
  const handleOtpChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return; // only allow single digit or empty
    const next = [...otpDigits];
    next[idx] = value;
    setOtpDigits(next);

    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      // move focus back
      inputsRef.current[idx - 1]?.focus();
    }
  };

  // Verify OTP handler (uses window.confirmationResult as in your original)
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length < 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }

    const confirmationResult = (window as any).confirmationResult;
    if (!confirmationResult) {
      toast.error("No OTP confirmation found. Please try again.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp); // firebase confirm
      // result.user exists on success
      toast.success("Phone verified successfully ✅");
      setTimeout(() => navigate("/Check", { state: { phone } }), 1400);
    } catch (err) {
      console.error("OTP verification failed:", err);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  // Resend OTP implementation - replace url with your backend or provider
  const resendOtp = async () => {
    if (!phone) {
      toast.error("Phone number not available to resend OTP.");
      return;
    }

    try {
      // Example: POST to your backend which triggers resend via Firebase/Twilio etc.
      const res = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to resend OTP");
      }

      toast.success("OTP resent successfully!");
      setTimeLeft(120);
      setCanResend(false);
      // clear existing digits and focus
      setOtpDigits(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } catch (err: any) {
      console.error("resend error:", err);
      toast.error("Failed to resend OTP");
    }
  };

  const handleClickResend = () => {
    if (!canResend) return;
    resendOtp();
  };

  // Cancel confirm handler passed to ConfirmCancel
  const onCancelConfirmed = () => {
    toast.info("Cancelled. Returning to home...");
    setCancelOpen(false);
    setTimeout(() => navigate("/"), 900);
  };

  return (
    <>
      <Headerwo />
      <div className="flex items-center justify-center font-urbanist h-screen bg-[#ece5e5]">
        <form
          onSubmit={handleOtpSubmit}
          className="flex flex-col bg-white p-5 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-center mb-3 text-[#301934]">
            Verify Your Phone Number
          </h1>
          <h1 className="text-xs text-center mb-4 text-[#301934]">
            Please enter the OTP sent to your registered phone number to complete your verification
          </h1>

          {/* OTP Inputs */}
          <div className="flex flex-col mt-3 ml-2">
            <div className="flex justify-center gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value.trim(), idx)}
                  onKeyDown={(e) => handleKeyDown(e as any, idx)}
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00df9a]"
                  aria-label={`OTP digit ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-row text-xs justify-between text-[#301934] mt-3">
            <p>Remaining Time: {formatTime(timeLeft)}</p>
            <p className="flex flex-row gap-1">
              Didn't get the code?
              <button
                type="button"
                className={`ml-2 ${canResend ? "text-[#00c78c] hover:underline" : "text-gray-400"}`}
                disabled={!canResend}
                onClick={handleClickResend}
              >
                {canResend ? "Resend Code" : "Resend Disabled"}
              </button>
            </p>
          </div>

          <button
            type="submit"
            className="bg-[#00df9a] rounded-full text-white mt-14 py-2 text-xl font-semibold hover:bg-[#00c78c] transition"
          >
            Verify
          </button>

          <button
            type="button" // IMPORTANT: prevent default submit behavior
            onClick={() => setCancelOpen(true)}
            className="bg-white border-2 border-[#00df9a] mt-3 py-2 text-xl text-[#00df9a] font-semibold rounded-full hover:bg-[#00c78c] transition"
          >
            Cancel
          </button>

          {/* ConfirmCancel Modal */}
          <ConfirmCancel open={cancelOpen} onClose={() => setCancelOpen(false)} onConfirm={onCancelConfirmed} />

        </form>

        {/* Toasts */}
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default OTPverf;
