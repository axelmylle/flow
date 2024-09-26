import { Icons } from "@v1/ui/icons";
import { SimpleTooltipContent, Tooltip } from "@v1/ui/tooltip";
import {
  SELF_SERVE_PAID_PLANS,
  STAGGER_CHILD_VARIANTS,
  cn,
} from "@v1/ui/utils";
import { motion } from "framer-motion";

export function PlanFeatures({
  plan,
  className,
}: {
  plan: string;
  className?: string;
}) {
  const selectedPlan =
    SELF_SERVE_PAID_PLANS.find(
      (p) => p.name.toLowerCase() === plan.toLowerCase(),
    ) ?? SELF_SERVE_PAID_PLANS[0];

  return (
    <motion.div
      variants={{
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className={cn("flex flex-col gap-2", className)}
    >
      {selectedPlan.name.startsWith("Business") && (
        <motion.div
          key="business-plan-feature"
          variants={STAGGER_CHILD_VARIANTS}
          className="text-sm text-gray-500"
        >
          Everything in Pro, plus:
        </motion.div>
      )}
      {selectedPlan.features.map(({ text, footnote }, i) => (
        <motion.div
          key={i}
          variants={STAGGER_CHILD_VARIANTS}
          className="flex items-center space-x-2 text-sm text-gray-500"
        >
          <Icons.CheckCircleFill className="h-5 w-5 text-green-500" />

          {footnote ? (
            <Tooltip
              content={
                typeof footnote === "string" ? (
                  footnote
                ) : (
                  <SimpleTooltipContent {...footnote} />
                )
              }
            >
              <p className="cursor-help text-gray-600 underline decoration-dotted underline-offset-2">
                {text}
              </p>
            </Tooltip>
          ) : (
            <p className="text-gray-600">{text}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
