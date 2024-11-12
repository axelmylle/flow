import { Button } from "@gigflow/ui/button";
import { cn } from "@gigflow/ui/cn";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { Icons } from "@gigflow/ui/icons";
import { Label } from "@gigflow/ui/label";
import { RadioGroup, RadioGroupItem } from "@gigflow/ui/radio-group";
import { Wordmark } from "@gigflow/ui/wordmark";
import { ChevronRight } from "lucide-react";
import { useContext, useState } from "react";
import { UserSurveyContext } from ".";

const options = [
  {
    value: "twitter",
    label: "Twitter/X",
    icon: Icons.Twitter,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Icons.Linkedin,
  },
  {
    value: "product-hunt",
    label: "Product Hunt",
    icon: Icons.ProductHunt,
  },
  {
    value: "google",
    label: "Google",
    icon: Icons.Google,
  },
  {
    value: "github",
    label: "GitHub",
    icon: Icons.Github,
  },
  {
    value: "other",
    label: "Other",
    icon: Icons.Globe,
  },
];

export default function SurveyForm({
  onSubmit,
}: {
  onSubmit: (source: string) => void;
}) {
  const { isMobile } = useMediaQuery();

  const [source, setSource] = useState<string | undefined>(undefined);
  const [otherSource, setOtherSource] = useState<string | undefined>(undefined);

  const { status } = useContext(UserSurveyContext);

  return (
    <div className="grid gap-4">
      <Wordmark className="h-8" />
      <p className="text-sm font-medium text-gray-800">
        Where did you hear about Dub?
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (source)
            onSubmit(source === "other" ? otherSource ?? source : source);
        }}
      >
        <RadioGroup
          name="source"
          required
          value={source}
          onValueChange={(value) => {
            setSource(value);
          }}
          className="grid grid-cols-2 gap-3"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "group flex flex-col rounded-md border border-gray-200 bg-white transition-all active:scale-[0.98]",
                source === option.value
                  ? "border-white ring-2 ring-gray-600"
                  : "hover:border-gray-500 hover:ring hover:ring-gray-200 active:ring-2",
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="hidden"
              />
              <Label
                htmlFor={option.value}
                className="flex h-full cursor-pointer select-none items-center gap-2 px-4 py-2 text-gray-600"
              >
                <option.icon
                  className={cn(
                    "h-5 w-5 transition-all group-hover:grayscale-0",
                    {
                      grayscale: source !== option.value,
                      "h-4 w-4": option.value === "twitter",
                      "text-gray-600": option.value === "other",
                    },
                  )}
                />
                <p>{option.label}</p>
                {option.value === "other" && (
                  <div className="flex grow justify-end">
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        source === option.value && "rotate-90",
                      )}
                    />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {source === "other" && (
          <div className="mt-3">
            <label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <input
                  type="text"
                  required
                  maxLength={32}
                  autoFocus={!isMobile}
                  autoComplete="off"
                  className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="Reddit, Indie Hackers, etc."
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                />
              </div>
            </label>
          </div>
        )}
        {source !== undefined && (
          <Button
            className="mt-4 h-9"
            variant="primary"
            type="submit"
            text="Submit"
            loading={status === "loading"}
            disabled={
              status === "success" ||
              !source.length ||
              (source === "other" && !otherSource)
            }
          />
        )}
      </form>
    </div>
  );
}
