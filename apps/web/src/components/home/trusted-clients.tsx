import React from "react";
import { Container } from "../container";

function TrustedClients() {
  return (
    <Container>
      <div className="my-10">
        <p className="mx-auto max-w-sm text-balance text-center text-gray-600 sm:max-w-xl sm:text-lg">
          Giving superpowers to modern teams at world-class companies
        </p>
        <a
          className="mx-auto mt-8 grid w-full max-w-screen-lg grid-cols-2 items-center px-5 md:grid-cols-6 md:px-0"
          href="/customers"
        >
          <img
            src="https://assets.dub.co/clients/vercel.svg"
            alt="VERCEL"
            width="520"
            height="182"
            className="h-12 grayscale transition-all hover:grayscale-0 md:h-20"
          />
          <img
            src="https://assets.dub.co/clients/prisma.svg"
            alt="PRISMA"
            width="520"
            height="182"
            className="h-12 grayscale transition-all hover:grayscale-0 md:h-20"
          />
        </a>
      </div>
    </Container>
  );
}

export default TrustedClients;
