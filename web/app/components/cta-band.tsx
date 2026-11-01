import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Container, Accent } from "~/components/section";
import { Reveal } from "~/components/motion";
import { Magnetic, Parallax } from "~/components/fx";
import { Art } from "~/components/art";

export function CtaBand({
  title = (
    <>
      Have a project <Accent>in mind?</Accent>
    </>
  ),
  body = "Share what you need. You'll get a clear reply on scope, approach and next steps, with no obligation.",
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <Container className="py-20 sm:py-28">
      <Reveal className="stage bg-grain relative isolate overflow-hidden rounded-[32px] border border-white/10">
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 w-[70%] sm:w-[55%]"
        >
          <Parallax offset={40} className="h-full">
            <Art
              name="cta"
              sizes="(min-width: 640px) 55vw, 70vw"
              className="h-full object-cover object-left opacity-90"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e10] via-[#0b0e10]/70 to-transparent" />
        </div>
        <div className="max-w-xl px-6 py-14 sm:px-14 sm:py-20">
          <h2 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl">
            {title}
          </h2>
          <p className="text-muted mt-5 text-lg leading-relaxed">{body}</p>
          <Magnetic className="mt-9">
            <Link
              to="/contact"
              viewTransition
              className="group bg-brand text-on-brand hover:bg-brand-hover inline-flex h-14 items-center gap-2 rounded-full px-7 text-base font-semibold transition-colors"
            >
              Start a project
              <ArrowUpRight
                className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </Container>
  );
}
