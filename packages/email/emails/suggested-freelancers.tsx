import {
  Body,
  Button,
  Container,
  Font,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import { Logo } from "components/logo";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

const baseAppUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://app.midday.ai"
    : "http://localhost:3000";

export default function JobSuggestionEmail({
  description = "description",
  freelancers = [],
  outro = "outro",
  inviteCode = "inviteCode",
}: {
  description: string;
  freelancers: { avatar_url: string; full_name: string; teaser: string }[];
  outro: string;
  inviteCode: string;
}) {
  return (
    <Html>
      <Preview>Discover Top Freelancers for Your Open Position!</Preview>
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
        <Body className="bg-[#fff] my-auto mx-auto font-sans">
          <Container
            className="border-transparent border-[#E8E7E1] my-[40px] mx-auto p-[20px] max-w-[600px]"
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Logo baseUrl={baseUrl} />
            <Heading className="text-[#121212] text-[21px] font-normal text-center p-0 my-[30px] mx-0">
              Enhance Your Hiring Process with Our Top Talent!
            </Heading>

            <Section className="mb-4">{description}</Section>
            <Section className="mb-4">
              To assist you further, we've identified a few freelancers whose
              skills and experience align closely with your job requirements:
            </Section>
            <Section className="mb-4">
              {/* Example of suggested freelancers with profile photos (replace with dynamic content) */}
              <ul className="list-none p-0">
                {freelancers.map((freelancer) => (
                  <li
                    key={freelancer.full_name}
                    className="flex items-center mb-4"
                  >
                    <Img
                      src={
                        freelancer.avatar_url ?? "https://github.com/shadcn.png"
                      }
                      width="50"
                      height="50"
                      alt={freelancer.full_name}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <strong>{freelancer.full_name}</strong> -{" "}
                      {freelancer.teaser}.
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section className="mb-4">{outro}</Section>
            <Section className="mb-8">
              We are committed to helping you find the best talent. Feel free to
              reach out if you need any assistance or log in to the platform to
              explore these suggestions further.
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-transparent rounded-md text-primary text-[14px] text-[#121212] font-medium no-underline text-center px-6 py-3 border border-solid border-[#121212]"
                href={`${baseAppUrl}/client/invite/${inviteCode}`}
              >
                Explore
              </Button>
            </Section>

            <Hr />
            <Section className="mb-4">
              Thank you for choosing our platform, and we look forward to
              assisting you further!
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
