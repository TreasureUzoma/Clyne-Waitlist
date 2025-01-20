/* eslint-disable */

'use client'

import { useState } from 'react'
import { addToWaitlist } from '@/actions/waitlist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast";
import Confetti from "react-confetti";


export const WaitlistForm = () => {
  const { toast } = useToast();

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>("");

  const validateForm = (): boolean => {
    const formErrors: { fullname?: string[]; email?: string[] } = {};

    if (!fullname.trim()) {
      formErrors.fullname = ["Full Name is required."];
    } else if (fullname.trim().length < 3) {
      formErrors.fullname = ["Full Name must be at least 3 characters."];
    }

    if (!email.trim()) {
      formErrors.email = ["Email is required."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = ["Invalid email address."];
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);

    try {
      const response = await addToWaitlist(formData);

      if (response.error) {
        setErrors(response.error);
        toast({
          title: "Oh Oh",
          description: response.error as string,
          variant: "destructive",
        });
      } else if (response.success) {
        setSuccess(true);
        setFullname("");
        setEmail("");
        toast({
          title: "Hooray!",
          description: response.message,
          variant: "successful"
        });
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
      toast({
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {success && <Confetti 
        width={(window.innerWidth)}
        numberOfPieces={500}
        recycle={false}
        height={(window.innerHeight)}
        colors={["#7900ff", "#93ffd8"]}
      />}
      <form
        onSubmit={handleSubmit}
        className="mt-7 flex flex-col gap-5 max-w-[290px] mx-auto"
      >
        <div>
          <div className="relative">
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors?.fullname && (
            <p className="text-sm text-red-500 mt-1">{errors.fullname[0]}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors?.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="base"
          className="flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>Join Waitlist</>
          )}
        </Button>
      </form>
    </>
  );
};
