import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

import { Logo } from "../components/logo";
import { Footer } from "./components/footer";
import { GetStarted } from "./components/get-started";

interface WelcomeProps {
  fullName: string;
}

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://midday.ai/email"
    : "http://localhost:3000/email";

export const WelcomeEmail = ({ fullName = "Axel Mylle" }: WelcomeProps) => {
  const firstName = fullName.split(" ").at(0);
  const text = `Hi ${firstName}, Welcome to Gigflow! I'm Axel, one of the founders. It's really important to me that you have a great experience ramping up.`;

  return (
    <Html>
      <Tailwind>
        <head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </head>
        <Preview>{text}</Preview>

        <Body className="bg-[#fff] my-auto mx-auto font-sans">
          <Container
            className="border-transparent md:border-[#E8E7E1] my-[40px] mx-auto p-[20px] max-w-[600px]"
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Logo baseUrl={baseUrl} />
            <Heading className="text-[#121212] text-[21px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to Gigflow
            </Heading>

            <br />

            <span className="font-medium">Hi {firstName},</span>
            <Text className="text-[#121212]">
              Welcome to Gigflow! I'm Axel, the founder of Gigflow.
              <br />
              <br />
              Over the past few months, I've been building Gigflow to support
              you and your team in managing gig work with ease. We've
              established the foundational features to get started, and with
              your input, we can make smarter, more impactful improvements to
              meet your business needs.
              <br />
              <br />
              During our beta phase, you might experience a few bugs, but we
              truly value all of your feedback.
              <br />
              <br />
              If you have any questions or suggestions, please feel free to
              reply directly to this email or{" "}
              <Link
                href="https://cal.com/pontus-gigflow/15min"
                className="text-[#121212] underline"
              >
                schedule a call with me
              </Link>
              .
            </Text>

            <br />

            <Img
              src={`${baseUrl}/founders.jpeg`}
              alt="Founders"
              className="my-0 mx-auto block w-full"
            />

            <Text className="text-[#707070]">Best regards, Axel</Text>

            <Img
              src={`${baseUrl}/signature.png`}
              alt="Signature"
              className="block w-full w-[143px] h-[20px]"
            />

            <br />
            <br />

            <GetStarted />

            <br />

            <Footer baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
