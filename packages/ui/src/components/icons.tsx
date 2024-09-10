import { Check, Copy, Loader2, LogOut } from "lucide-react";
import type { SVGProps } from "react";
import { cn } from "../utils";

export const Icons = {
  SignOut: LogOut,
  Copy,
  Check,
  Loader: Loader2,
  Globe: function Globe(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <ellipse
            cx="9"
            cy="9"
            fill="none"
            rx="7.25"
            ry="3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <ellipse
            cx="9"
            cy="9"
            fill="none"
            rx="3"
            ry="7.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="9"
            cy="9"
            fill="none"
            r="7.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    );
  },
  Github: function Github({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
        className={className}
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  },
  ProductHunt: function ProductHunt({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26.245 26.256"
        width="64"
        height="64"
        className={className}
      >
        <path
          d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128"
          fill="#ff6055"
        />
        <path
          d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595"
          fill="#fff"
        />
      </svg>
    );
  },
  Twitter: function Twitter({ className }: { className?: string }) {
    return (
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("p-px", className)}
      >
        <path
          stroke="currentColor"
          d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
        />
      </svg>
    );
  },
  expandingArrow: function ExpandingArrow({
    className,
  }: { className?: string }) {
    return (
      <div className="group relative flex items-center">
        <svg
          className={cn(
            "absolute h-4 w-4 transition-all group-hover:translate-x-1 group-hover:opacity-0",
            className,
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
          ></path>
        </svg>
        <svg
          className={`${
            className ? className : "h-4 w-4"
          } absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
          ></path>
        </svg>
      </div>
    );
  },
  CircleDotted: function CircleDotted(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <circle
            cx="3.873"
            cy="14.127"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle cx="1.75" cy="9" fill="currentColor" r=".75" stroke="none" />
          <circle
            cx="3.873"
            cy="3.873"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="6.226"
            cy="15.698"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="2.302"
            cy="11.774"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="2.302"
            cy="6.226"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="6.226"
            cy="2.302"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle cx="9" cy="1.75" fill="currentColor" r=".75" stroke="none" />
          <circle cx="9" cy="16.25" fill="currentColor" r=".75" stroke="none" />
          <circle
            cx="14.127"
            cy="14.127"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle cx="16.25" cy="9" fill="currentColor" r=".75" stroke="none" />
          <circle
            cx="14.127"
            cy="3.873"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="11.774"
            cy="15.698"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="15.698"
            cy="11.774"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="15.698"
            cy="6.226"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
          <circle
            cx="11.774"
            cy="2.302"
            fill="currentColor"
            r=".75"
            stroke="none"
          />
        </g>
      </svg>
    );
  },
  ThreeDots: function ThreeDots({ className }: { className: string }) {
    return (
      <svg
        fill="none"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        className={className}
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    );
  },
  CheckCircleFill: function CheckCircleFill({
    className,
  }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
          fill="currentColor"
        />
        <path d="M8 11.8571L10.5 14.3572L15.8572 9" stroke="white" />
      </svg>
    );
  },
  Google: function Google({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        className={className}
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
      </svg>
    );
  },
  Linkedin: function LinkedIn({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={cn("text-[#0077b5]", className)}
      >
        <path
          fill="currentColor"
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        />
      </svg>
    );
  },
  InputPassword: function InputPassword(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <path
            d="M7.75,13.25H3.75c-1.105,0-2-.895-2-2V6.75c0-1.105,.895-2,2-2H14.25c1.105,0,2,.895,2,2v.25"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12.25,12.25v-2c0-.828,.672-1.5,1.5-1.5h0c.828,0,1.5,.672,1.5,1.5v2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle cx="5.5" cy="9" fill="currentColor" r="1" stroke="none" />
          <circle cx="9" cy="9" fill="currentColor" r="1" stroke="none" />
          <rect
            height="4"
            width="6"
            fill="none"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x="10.75"
            y="12.25"
          />
        </g>
      </svg>
    );
  },
  ExpandingArrow: function ExpandingArrow({
    className,
  }: { className?: string }) {
    return (
      <div className="group relative flex items-center">
        <svg
          className={cn(
            "absolute h-4 w-4 transition-all group-hover:translate-x-1 group-hover:opacity-0",
            className,
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
          ></path>
        </svg>
        <svg
          className={`${
            className ? className : "h-4 w-4"
          } absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
          ></path>
        </svg>
      </div>
    );
  },
  LoadingSpinner: function LoadingSpinner({
    className,
  }: { className?: string }) {
    return (
      <div className={cn("h-5 w-5", className)}>
        <div
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
          }}
          className={cn("loading-spinner", "h-5 w-5", className)}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                animationDelay: `${-1.2 + 0.1 * i}s`,
                background: "gray",
                position: "absolute",
                borderRadius: "1rem",
                width: "30%",
                height: "8%",
                left: "-10%",
                top: "-4%",
                transform: `rotate(${30 * i}deg) translate(120%)`,
              }}
              className="animate-spinner"
            />
          ))}
        </div>
      </div>
    );
  },
};
