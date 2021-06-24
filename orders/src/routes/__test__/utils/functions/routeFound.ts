import { Error, Errors } from "./types";

// expects and destructures res.body.
const routeFound = ({ errors }: Errors) => {
  // initialized as true in case there are no errors or the
  // forEach/isFound reassignment gets skipped for any reason.
  let isFound = true;

  // covers cases where there is more than one error or non-route related 404
  // response status.
  errors?.forEach((error: Error) => {
    if (error?.message === `Route not found.`) {
      isFound = false;
    }
  });

  return isFound;
};

export default routeFound;
