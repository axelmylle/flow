import {
  parseAsArrayOf,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

import { z } from "zod";

export function useFreelancerSearchParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      freelancerId: parseAsString,
      sort: parseAsArrayOf(parseAsString),
      q: parseAsString,
      statuses: parseAsArrayOf(parseAsString),
      customers: parseAsArrayOf(parseAsString),
      start: parseAsString,
      end: parseAsString,
      selectedCustomerId: parseAsString,
      type: parseAsStringEnum(["details"]),
      currency: parseAsString,
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}
