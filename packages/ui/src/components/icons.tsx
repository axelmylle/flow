import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  FileIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  CircleX,
  Clock,
  CogIcon,
  Copy,
  DollarSign,
  FilterIcon,
  FoldersIcon,
  Info,
  Laptop,
  Loader2,
  LogOut,
  LucidePlugZap,
  MapPin,
  Plus,
  RefreshCcw,
  Repeat,
  SearchIcon,
  Star,
  Users2Icon,
  X,
} from "lucide-react";
import type { SVGProps } from "react";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { cn } from "../utils";

export const Icons = {
  SignOut: LogOut,
  Copy,
  Search: SearchIcon,
  Filter: FilterIcon,
  TrendingUp: MdTrendingUp,
  TrendingDown: MdTrendingDown,
  Time: Clock,
  ArrowRightAlt: ArrowRight,
  Repeat: Repeat,
  Add: Plus,
  Clear: X,
  MoreHoriz: DotsHorizontalIcon,
  Transactions2: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M23.333 16.667H5V20h18.333v-3.333Zm0-6.667H5v3.333h18.333V10ZM5 26.667h11.667v-3.334H5v3.334Zm19 10 4.333-4.334 4.334 4.334L35 34.333 30.667 30 35 25.667l-2.333-2.334-4.334 4.334L24 23.333l-2.333 2.334L26 30l-4.333 4.333L24 36.667Z"
      />
    </svg>
  ),
  Tune: CogIcon,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  Category: FoldersIcon,
  Status: CircleDot,
  Info: Info,
  CalendarMonth: Calendar,
  MoreVertical: DotsVerticalIcon,
  Attachments: FileIcon,
  Accounts: Users2Icon,
  Plus: Plus,
  Briefcase,
  MapPin,
  AI: MagicWandIcon,
  Reconnect: LucidePlugZap,
  Refresh: RefreshCcw,
  Error: CircleX,
  ArrowBack: ArrowLeft,
  AlertCircle: AlertCircle,
  DollarSign: DollarSign,
  Star: Star,
  Cards: function Cards(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <rect
            height="10.5"
            width="8.5"
            fill="none"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x="1.75"
            y="1.75"
          />
          <path
            d="M13,5.258l2.283,.6c.534,.141,.853,.688,.712,1.222l-2.292,8.703c-.141,.534-.688,.853-1.222,.712l-6.491-1.71"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    );
  },
  Tag: function Tag(props: SVGProps<SVGSVGElement>) {
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
            d="M3.25,2.25h4.922c.53,0,1.039,.211,1.414,.586l5.75,5.75c.781,.781,.781,2.047,0,2.828l-3.922,3.922c-.781,.781-2.047,.781-2.828,0L2.836,9.586c-.375-.375-.586-.884-.586-1.414V3.25c0-.552,.448-1,1-1Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <circle
            cx="6.25"
            cy="6.25"
            fill="currentColor"
            r="1.25"
            stroke="none"
          />
        </g>
      </svg>
    );
  },
  Magic: function Magic({ className }: { className: string }) {
    return (
      <svg
        width="469"
        height="469"
        viewBox="0 0 469 469"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className={className}
      >
        <path
          d="M237.092 62.3004L266.754 71.4198C267.156 71.5285 267.51 71.765 267.765 72.0934C268.02 72.4218 268.161 72.8243 268.166 73.2399C268.172 73.6555 268.042 74.0616 267.796 74.3967C267.55 74.7318 267.201 74.9777 266.803 75.097L237.141 84.3145C236.84 84.4058 236.566 84.5699 236.344 84.7922C236.121 85.0146 235.957 85.2883 235.866 85.5893L226.747 115.252C226.638 115.653 226.401 116.008 226.073 116.263C225.745 116.517 225.342 116.658 224.926 116.664C224.511 116.669 224.105 116.539 223.77 116.293C223.435 116.047 223.189 115.699 223.069 115.301L213.852 85.6383C213.761 85.3374 213.597 85.0636 213.374 84.8412C213.152 84.6189 212.878 84.4548 212.577 84.3635L182.914 75.2441C182.513 75.1354 182.158 74.8989 181.904 74.5705C181.649 74.2421 181.508 73.8396 181.503 73.424C181.497 73.0084 181.627 72.6023 181.873 72.2672C182.119 71.9321 182.467 71.6863 182.865 71.5669L212.528 62.3494C212.829 62.2582 213.103 62.0941 213.325 61.8717C213.547 61.6494 213.712 61.3756 213.803 61.0747L222.922 31.4121C223.031 31.0109 223.267 30.656 223.596 30.4013C223.924 30.1465 224.327 30.0057 224.742 30.0002C225.158 29.9946 225.564 30.1247 225.899 30.3706C226.234 30.6165 226.48 30.9649 226.599 31.363L235.817 61.0257C235.908 61.3266 236.072 61.6003 236.295 61.8227C236.517 62.0451 236.791 62.2091 237.092 62.3004Z"
          fill="currentColor"
        />
        <path
          d="M155.948 155.848L202.771 168.939C203.449 169.131 204.045 169.539 204.47 170.101C204.895 170.663 205.125 171.348 205.125 172.052C205.125 172.757 204.895 173.442 204.47 174.004C204.045 174.566 203.449 174.974 202.771 175.166L155.899 188.06C155.361 188.209 154.87 188.496 154.475 188.891C154.079 189.286 153.793 189.777 153.644 190.316L140.553 237.138C140.361 237.816 139.953 238.413 139.391 238.838C138.829 239.262 138.144 239.492 137.44 239.492C136.735 239.492 136.05 239.262 135.488 238.838C134.927 238.413 134.519 237.816 134.327 237.138L121.432 190.267C121.283 189.728 120.997 189.237 120.601 188.842C120.206 188.446 119.715 188.16 119.177 188.011L72.3537 174.92C71.676 174.728 71.0795 174.32 70.6547 173.759C70.2299 173.197 70 172.512 70 171.807C70 171.103 70.2299 170.418 70.6547 169.856C71.0795 169.294 71.676 168.886 72.3537 168.694L119.226 155.799C119.764 155.65 120.255 155.364 120.65 154.969C121.046 154.573 121.332 154.082 121.481 153.544L134.572 106.721C134.764 106.043 135.172 105.447 135.734 105.022C136.295 104.597 136.981 104.367 137.685 104.367C138.389 104.367 139.075 104.597 139.637 105.022C140.198 105.447 140.606 106.043 140.798 106.721L153.693 153.593C153.842 154.131 154.128 154.622 154.524 155.018C154.919 155.413 155.41 155.699 155.948 155.848Z"
          fill="currentColor"
        />
        <path
          d="M386.827 289.992C404.33 292.149 403.84 305.828 386.876 307.299C346.623 310.829 298.869 316.271 282.199 360.005C274.844 379.192 269.942 403.2 267.49 432.029C267.427 432.846 267.211 433.626 266.856 434.319C266.501 435.012 266.015 435.602 265.431 436.05C254.988 444.041 251.212 434.186 250.183 425.606C239.2 332.353 214.588 316.909 124.668 306.122C123.892 306.031 123.151 305.767 122.504 305.35C121.857 304.933 121.322 304.375 120.942 303.72C116.399 295.679 119.324 291.038 129.718 289.796C224.688 278.47 236.062 262.83 250.183 169.331C252.177 156.355 257.259 154.083 265.431 162.516C266.51 163.593 267.202 165.099 267.392 166.782C279.257 258.564 293.328 278.617 386.827 289.992Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  CircleXmark: function Xmark(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x1="14"
            x2="4"
            y1="4"
            y2="14"
          />
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x1="4"
            x2="14"
            y1="4"
            y2="14"
          />
        </g>
      </svg>
    );
  },
  Magnifier: function Magnifier(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x1="15.25"
            x2="11.285"
            y1="15.25"
            y2="11.285"
          />
          <circle
            cx="7.75"
            cy="7.75"
            fill="none"
            r="5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    );
  },
  Check,
  Loader: Loader2,
  Laptop: Laptop,
  Clock: Clock,
  Calendar: Calendar,
  Building: Building,
  ChevronDown: ChevronDown,
  Globe2: function Globe2(props: SVGProps<SVGSVGElement>) {
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
            d="M16.25,8.25h-3.517c-.157-3.641-1.454-7.25-3.733-7.25s-3.576,3.609-3.733,7.25H1.75v1.5h3.517c.157,3.641,1.454,7.25,3.733,7.25s3.576-3.609,3.733-7.25h3.517v-1.5ZM9,2.5c.858,0,2.079,2.216,2.233,5.75H6.767c.154-3.534,1.375-5.75,2.233-5.75Zm0,13c-.858,0-2.079-2.216-2.233-5.75h4.467c-.154,3.534-1.375,5.75-2.233,5.75Z"
            fill="currentColor"
          />
          <path
            d="M9,17c-4.411,0-8-3.589-8-8S4.589,1,9,1s8,3.589,8,8-3.589,8-8,8Zm0-14.5c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5,6.5-2.916,6.5-6.5-2.916-6.5-6.5-6.5Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  },
  GridPlus: function GridPlus(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="18"
        width="18"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="currentColor">
          <rect
            height="4.5"
            width="4.5"
            fill="none"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x="2.75"
            y="2.75"
          />
          <rect
            height="4.5"
            width="4.5"
            fill="none"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x="10.75"
            y="2.75"
          />
          <rect
            height="4.5"
            width="4.5"
            fill="none"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x="2.75"
            y="10.75"
          />
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x1="13"
            x2="13"
            y1="10.25"
            y2="15.25"
          />
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            x1="15.5"
            x2="10.5"
            y1="12.75"
            y2="12.75"
          />
        </g>
      </svg>
    );
  },
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
