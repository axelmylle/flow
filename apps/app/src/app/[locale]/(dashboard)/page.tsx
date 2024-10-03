import { SignOut } from "@/components/auth/sign-out";
import { getI18n } from "@/locales/server";

import { Button } from "@v1/ui/button";
import PageClient from "./page-client";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const t = await getI18n();

  return (
    <div className="flex flex-col items-center justify-center">
      <PageClient />
      <div className="flex flex-col items-center justify-center gap-4">
        sdf
        {/* <p>{t("welcome", { name: data?.user?.email })}</p> */}
        {/* <div className="flex w-full relative">
          <div className="group relative w-full max-w-2xl h-48 overflow-hidden rounded-2xl border border-gray-200 bg-white/40 p-6 shadow-md shadow-gray-400/10 backdrop-blur-sm transition-all duration-75 hover:bg-white">
            <div className="flex flex-col gap-2 z-10 relative">
              <h3 className="text-xl font-semibold text-gray-800">
                Freelance Front-end Developer
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <p>🏢 Remote (US-based preferred)</p>
                <p>🕒 20-30 hours/week</p>
                <p>💼 3-6 month contract</p>
                <p>💰 $50-$75/hour DOE</p>
              </div>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                Seeking an experienced React developer for a cutting-edge web
                app. Strong TypeScript and responsive design skills required.
              </p>
              <div className="mt-4">
                <Button variant="outline">See more details</Button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-8 z-0 w-1/3 opacity-10">
              <svg
                className="h-[222px] w-[222px]"
                viewBox="0 0 222 222"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fill="#00AEEF"
                    d="M102.5,70c19.3,0,35-15.7,35-35c0-19.3-15.7-35-35-35s-35,15.7-35,35C67.5,54.3,83.2,70,102.5,70"
                  />
                  <path
                    fill="#00AEEF"
                    d="M128.3,63.3c-6.7,7.2-18.4,14.5-33.5,14.5c-11.7,0-21.8-4.5-28.2-9.6C28.4,72.2,0,77.8,0,77.8v15.5l202.7,0
		V61.4C202.7,61.4,168,61.2,128.3,63.3"
                  />
                  <polyline
                    fill="#003665"
                    points="24.1,138.6 24.1,157.4 0,157.4 0,107.3 24.1,107.3 24.1,129.8 24.2,129.8 38.4,107.3 67.3,107.3 
		46.1,133.2 66.1,157.4 38.5,157.4 24.2,138.6 24.1,138.6 	"
                  />
                  <path
                    fill="#003665"
                    d="M71.2,107.3h48.7c12.6,0,16.8,4.9,16.8,12.6c0,8.6-7.7,12.3-15.5,12.7v0.1c8.1,0.6,15.9,1.5,15.9,11.7
		c0,6.6-4.1,13.1-18.1,13.1H71.2V107.3 M95.3,147.2h12.6c4.7,0,6.3-1.9,6.3-4.8c0-2.9-1.6-4.9-6.3-4.9H95.3L95.3,147.2z M95.3,128.5
		h12c4.6,0,6.5-1.9,6.5-4.8c0-3.3-1.8-4.9-6.1-4.9H95.3L95.3,128.5z"
                  />
                  <path
                    fill="#003665"
                    d="M202.7,155.3c-5.7,1.7-13.2,2.8-19.8,2.8c-23.8,0-41.3-6.8-41.3-26.5c0-17.8,17-25.5,40.1-25.5
		c6.4,0,14.6,0.7,21,2.8l0,17.2c-4.7-2.9-9.5-4.7-16.3-4.7c-8.8,0-17.7,4.4-17.7,10.7c0,6.3,8.8,10.7,17.7,10.7
		c6.7,0,11.5-1.8,16.3-4.6L202.7,155.3"
                  />
                </g>
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 h-40 w-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 216 174"
                fill="none"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_i_1_362)">
                  <path
                    d="M76 86.5H74.5C70.634 86.5 67.5 89.634 67.5 93.5V93.5C67.5 97.366 70.634 100.5 74.5 100.5H76M83 86.5H85.5C89.366 86.5 92.5 89.634 92.5 93.5V93.5C92.5 97.366 89.366 100.5 85.5 100.5H83M84 93.5H76"
                    stroke="url(#paint0_radial_1_362)"
                  ></path>
                </g>
                <mask id="path-2-inside-1_1_362" fill="white">
                  <path d="M-4 70H216V118H-4V70Z"></path>
                </mask>
                <path
                  d="M-4 70.75H216V69.25H-4V70.75ZM216 117.25H-4V118.75H216V117.25Z"
                  fill="url(#paint1_linear_1_362)"
                  fill-opacity="0.1"
                  mask="url(#path-2-inside-1_1_362)"
                ></path>
                <mask id="path-4-inside-2_1_362" fill="white">
                  <path d="M56 0H104V220H56V0Z"></path>
                </mask>
                <path
                  d="M103.25 0V220H104.75V0H103.25ZM56.75 220V0H55.25V220H56.75Z"
                  fill="url(#paint2_linear_1_362)"
                  fill-opacity="0.1"
                  mask="url(#path-4-inside-2_1_362)"
                ></path>
                <defs>
                  <filter
                    id="filter0_i_1_362"
                    x="56"
                    y="70"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset></feOffset>
                    <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.05 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_1_362"
                    ></feBlend>
                  </filter>
                  <radialGradient
                    id="paint0_radial_1_362"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(68 87) rotate(48.3665) scale(18.0624)"
                  >
                    <stop stop-color="#1F2937"></stop>
                    <stop
                      offset="1"
                      stop-color="#1F2937"
                      stop-opacity="0.5"
                    ></stop>
                  </radialGradient>
                  <linearGradient
                    id="paint1_linear_1_362"
                    x1="-4"
                    y1="94"
                    x2="216"
                    y2="94"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1F2937" stop-opacity="0"></stop>
                    <stop offset="0.201835" stop-color="#1F2937"></stop>
                    <stop offset="0.53211" stop-color="#1F2937"></stop>
                    <stop
                      offset="1"
                      stop-color="#1F2937"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1_362"
                    x1="80"
                    y1="0"
                    x2="80"
                    y2="220"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1F2937" stop-opacity="0"></stop>
                    <stop offset="0.28" stop-color="#1F2937"></stop>
                    <stop offset="0.53" stop-color="#1F2937"></stop>
                    <stop
                      offset="0.825"
                      stop-color="#1F2937"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="group relative w-full max-w-2xl h-48 overflow-hidden rounded-2xl border border-gray-200 bg-white/40 p-6 shadow-md shadow-gray-400/10 backdrop-blur-sm transition-all duration-75 hover:bg-white">
            <div className="flex flex-col gap-2 z-10 relative">
              <h3 className="text-xl font-semibold text-gray-800">
                Freelance Front-end Developer
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <p>🏢 Remote (US-based preferred)</p>
                <p>🕒 20-30 hours/week</p>
                <p>💼 3-6 month contract</p>
                <p>💰 $50-$75/hour DOE</p>
              </div>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                Seeking an experienced React developer for a cutting-edge web
                app. Strong TypeScript and responsive design skills required.
              </p>
              <div className="mt-4">
                <Button variant="outline">See more details</Button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-8 z-0 w-1/3 opacity-10">
              <svg
                className="h-[222px] w-[222px]"
                viewBox="0 0 222 222"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="111" cy="111" r="111" fill="#0D1117"></circle>
                <path
                  d="M111.001 44C72.8976 44 42 74.7556 42 112.696C42 143.048 61.7708 168.798 89.1868 177.882C92.6352 178.518 93.9013 176.392 93.9013 174.577C93.9013 172.939 93.8373 167.528 93.8076 161.787C74.6115 165.943 70.5609 153.682 70.5609 153.682C67.4222 145.742 62.8997 143.63 62.8997 143.63C56.6393 139.367 63.3716 139.454 63.3716 139.454C70.3004 139.939 73.9488 146.534 73.9488 146.534C80.103 157.036 90.0906 154 94.0281 152.244C94.6474 147.804 96.4356 144.774 98.4089 143.058C83.0829 141.321 66.972 135.431 66.972 109.108C66.972 101.608 69.6674 95.4801 74.0814 90.6693C73.3649 88.939 71.0031 81.952 74.7498 72.4896C74.7498 72.4896 80.544 70.6433 93.7299 79.5312C99.2339 78.0091 105.137 77.2458 111.001 77.2196C116.864 77.2458 122.772 78.0091 128.286 79.5312C141.456 70.6433 147.242 72.4896 147.242 72.4896C150.998 81.952 148.635 88.939 147.919 90.6693C152.343 95.4801 155.02 101.608 155.02 109.108C155.02 135.493 138.878 141.303 123.513 143.004C125.988 145.136 128.194 149.316 128.194 155.725C128.194 164.917 128.114 172.315 128.114 174.577C128.114 176.405 129.356 178.547 132.853 177.873C160.254 168.779 180 143.038 180 112.696C180 74.7556 149.107 44 111.001 44ZM67.843 141.859C67.691 142.201 67.1517 142.303 66.6603 142.069C66.1599 141.844 65.8788 141.379 66.041 141.037C66.1896 140.685 66.73 140.587 67.2294 140.823C67.731 141.047 68.0166 141.517 67.843 141.859ZM71.237 144.874C70.9079 145.178 70.2646 145.037 69.8282 144.557C69.3768 144.078 69.2923 143.438 69.6259 143.129C69.9653 142.826 70.5892 142.968 71.0416 143.447C71.493 143.931 71.5809 144.567 71.237 144.874ZM73.5655 148.732C73.1427 149.024 72.4514 148.75 72.0241 148.139C71.6013 147.529 71.6013 146.796 72.0332 146.502C72.4617 146.209 73.1427 146.473 73.5758 147.079C73.9974 147.7 73.9974 148.433 73.5655 148.732ZM77.5034 153.2C77.1252 153.615 76.3196 153.504 75.73 152.937C75.1267 152.383 74.9588 151.597 75.3381 151.182C75.7209 150.766 76.531 150.883 77.1252 151.445C77.7239 151.998 77.9067 152.789 77.5034 153.2ZM82.5928 154.708C82.4259 155.246 81.6501 155.491 80.8685 155.262C80.0881 155.027 79.5774 154.397 79.7351 153.853C79.8973 153.311 80.6766 153.056 81.4639 153.301C82.2431 153.535 82.755 154.161 82.5928 154.708ZM88.3847 155.348C88.4041 155.915 87.7414 156.384 86.921 156.395C86.096 156.413 85.4287 155.954 85.4196 155.397C85.4196 154.825 86.0674 154.359 86.8924 154.346C87.7128 154.33 88.3847 154.785 88.3847 155.348ZM94.0746 155.131C94.1729 155.684 93.6027 156.251 92.788 156.403C91.987 156.548 91.2455 156.207 91.1438 155.659C91.0444 155.092 91.6248 154.525 92.4247 154.378C93.2405 154.237 93.9706 154.569 94.0746 155.131Z"
                  fill="url(#paint0_radial_39_32)"
                ></path>
                <defs>
                  <radialGradient
                    id="paint0_radial_39_32"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(42 44) rotate(44.1575) scale(192.354 192.312)"
                  >
                    <stop stop-color="white" stop-opacity="0.77"></stop>
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0.1"
                    ></stop>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 h-40 w-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 216 174"
                fill="none"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_i_1_362)">
                  <path
                    d="M76 86.5H74.5C70.634 86.5 67.5 89.634 67.5 93.5V93.5C67.5 97.366 70.634 100.5 74.5 100.5H76M83 86.5H85.5C89.366 86.5 92.5 89.634 92.5 93.5V93.5C92.5 97.366 89.366 100.5 85.5 100.5H83M84 93.5H76"
                    stroke="url(#paint0_radial_1_362)"
                  ></path>
                </g>
                <mask id="path-2-inside-1_1_362" fill="white">
                  <path d="M-4 70H216V118H-4V70Z"></path>
                </mask>
                <path
                  d="M-4 70.75H216V69.25H-4V70.75ZM216 117.25H-4V118.75H216V117.25Z"
                  fill="url(#paint1_linear_1_362)"
                  fill-opacity="0.1"
                  mask="url(#path-2-inside-1_1_362)"
                ></path>
                <mask id="path-4-inside-2_1_362" fill="white">
                  <path d="M56 0H104V220H56V0Z"></path>
                </mask>
                <path
                  d="M103.25 0V220H104.75V0H103.25ZM56.75 220V0H55.25V220H56.75Z"
                  fill="url(#paint2_linear_1_362)"
                  fill-opacity="0.1"
                  mask="url(#path-4-inside-2_1_362)"
                ></path>
                <defs>
                  <filter
                    id="filter0_i_1_362"
                    x="56"
                    y="70"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset></feOffset>
                    <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.05 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_1_362"
                    ></feBlend>
                  </filter>
                  <radialGradient
                    id="paint0_radial_1_362"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(68 87) rotate(48.3665) scale(18.0624)"
                  >
                    <stop stop-color="#1F2937"></stop>
                    <stop
                      offset="1"
                      stop-color="#1F2937"
                      stop-opacity="0.5"
                    ></stop>
                  </radialGradient>
                  <linearGradient
                    id="paint1_linear_1_362"
                    x1="-4"
                    y1="94"
                    x2="216"
                    y2="94"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1F2937" stop-opacity="0"></stop>
                    <stop offset="0.201835" stop-color="#1F2937"></stop>
                    <stop offset="0.53211" stop-color="#1F2937"></stop>
                    <stop
                      offset="1"
                      stop-color="#1F2937"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1_362"
                    x1="80"
                    y1="0"
                    x2="80"
                    y2="220"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1F2937" stop-opacity="0"></stop>
                    <stop offset="0.28" stop-color="#1F2937"></stop>
                    <stop offset="0.53" stop-color="#1F2937"></stop>
                    <stop
                      offset="0.825"
                      stop-color="#1F2937"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div> */}
        <SignOut />
      </div>
    </div>
  );
}
