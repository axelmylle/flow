import {
  Body,
  Button,
  Container,
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

export default function JobSuggestionEmail() {
  return (
    <Html>
      <Preview>Discover Top Freelancers for Your Open Position!</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto font-sans">
          <Container className="border-transparent my-[40px] mx-auto max-w-[600px]">
            <Logo baseUrl={baseUrl} />
            <Heading className="font-normal text-center p-0 my-[30px] mx-0">
              Enhance Your Hiring Process with Our Top Talent!
            </Heading>
            <Section className="mb-4">Hi there,</Section>
            <Section className="mb-4">
              We noticed that your job posting has been active on our platform
              for a while, and we're eager to help you find the perfect match
              for your team. Our platform connects you with exceptional
              freelancers who are ready to contribute to your company's success.
            </Section>
            <Section className="mb-4">
              To assist you further, we've identified a few freelancers whose
              skills and experience align closely with your job requirements:
            </Section>
            <Section className="mb-4">
              {/* Example of suggested freelancers with profile photos (replace with dynamic content) */}
              <ul className="list-none p-0">
                <li className="flex items-center mb-4">
                  <Img
                    src={`${baseUrl}/images/john-doe.jpg`}
                    width="50"
                    height="50"
                    alt="John Doe"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <strong>John Doe</strong> - Expert in Digital Marketing with
                    5+ years experience at top agencies.
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <Img
                    src={`${baseUrl}/images/jane-smith.jpg`}
                    width="50"
                    height="50"
                    alt="Jane Smith"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <strong>Jane Smith</strong> - Seasoned Copywriter with a
                    portfolio of high-conversion landing pages.
                  </div>
                </li>
                <li className="flex items-center mb-4">
                  <Img
                    src={`${baseUrl}/images/alex-johnson.jpg`}
                    width="50"
                    height="50"
                    alt="Alex Johnson"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <strong>Alex Johnson</strong> - Skilled Social Media Manager
                    with a knack for viral content creation.
                  </div>
                </li>
              </ul>
            </Section>
            <Section className="mb-4">
              Additionally, here are some insights into your job posting's
              performance:
              <ul>
                <li>👀 Views: 1200+</li>
                <li>📥 Applications: 45</li>
                <li>⏱️ Time Active: 3 weeks</li>
              </ul>
            </Section>
            <Section className="mb-4">
              To maximize your chances of finding the right candidate, consider
              updating your job description or leveraging our advanced platform
              features.
            </Section>
            <Section className="mb-8">
              We are committed to helping you find the best talent. Feel free to
              reach out if you need any assistance or log in to the platform to
              explore these suggestions further.
            </Section>
            <Section className="mb-6 text-center">
              <Link href={`${baseUrl}/login`}>
                <Button className="bg-black text-white p-4 text-center">
                  Review Suggested Freelancers
                </Button>
              </Link>
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
