import {
  Navbar,
  Footer,
  Summary
} from "../components";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main className=" bg-primary w-full overflow-hidden font-poppins">
      <header className="paddingX flexCenter">
        <nav className="boxWidth">
          <Navbar />
        </nav>
      </header>
      <section className=" bg-primary flexStart ">
        <section className="boxWidth">
          <Suspense fallback={<div>Loading...</div>}>
            <Summary />
          </Suspense>
        </section>
      </section>
      <section className=" bg-primary paddingX flexStart">
        <section className="boxWidth">

          <Footer />
        </section>
      </section>
    </main>
  );
}
