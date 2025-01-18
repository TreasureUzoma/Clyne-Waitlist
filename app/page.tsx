import { WaitlistForm } from "@/components/web/Form";
import { Badge } from "@/components/web/HeroBadge"

const page = () => {
  return (
    <>
      <main className="min-h-screen flex_center p-4">
        <section className="max-w-xl text-center">
          <Badge />
          <h1 className="font-extrabold text-3xl md:text-6xl tracking-[-1px] md:tracking-[-4px]">
            Join the waitlist!
          </h1>
          <p className="font-medium mt-4 text-[0.88rem] md:text-base px-1">
            Stay ahead  of the curve and be notified as soon as Clyne launches!
          </p>
          <WaitlistForm />
        </section>
      </main>
    </>
  );
}

export default page