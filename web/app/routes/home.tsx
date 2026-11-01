import type { Route } from "./+types/home";
import { HomeHero } from "~/components/home/hero";
import { Statement } from "~/components/home/statement";
import { ServicesBento } from "~/components/home/services-bento";
import { ProductShowcase } from "~/components/home/product-showcase";
import { Process } from "~/components/home/process";
import { Principles } from "~/components/home/principles";
import { Stack } from "~/components/home/stack";
import { CtaBand } from "~/components/cta-band";
import { pageMeta, site } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({ description: site.description, path: "/" });
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <Statement />
      <ServicesBento />
      <ProductShowcase />
      <Process />
      <Principles />
      <Stack />
      <CtaBand />
    </>
  );
}
