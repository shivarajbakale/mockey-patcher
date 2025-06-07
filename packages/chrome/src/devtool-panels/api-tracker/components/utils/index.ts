import type { RequestMetadata } from "../../api-tracker";
import type { FilterCriteria } from "../../store/requests";

const getFilteredRequests = (
  requests: RequestMetadata[],
  filterCriteria: FilterCriteria,
) => {
  return requests.filter((request) => {
    const url = new URL(request.url);
    const matchesOrigin =
      filterCriteria.selectedOrigins.size === 0 ||
      filterCriteria.selectedOrigins.has(url.origin);
    const matchesSubstring = request.url
      .toLowerCase()
      .includes(filterCriteria.urlSubstring.toLowerCase());
    const matchesDuration =
      filterCriteria.maxDuration <= 0 ||
      (request.duration >= filterCriteria.minDuration &&
        request.duration <= filterCriteria.maxDuration);
    return matchesSubstring && matchesDuration && matchesOrigin;
  });
};

export { getFilteredRequests };
