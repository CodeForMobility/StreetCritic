import { selectAppState } from "@/features/map/appSlice";
import { useSelector } from "react-redux";
import { FluentBundle, FluentResource } from "@fluent/bundle";

const resourceDe = new FluentResource(`
-brand-name = Foo 3000
welcome = Welcome, {$name}, to {-brand-name}!
sign-up = Registrieren
`);

const resourceEn = new FluentResource(`
abort = Abort
dismiss = Dismiss
discard = Discard
previous = Previous
next = Next
submit = Submit
continue = Continue
sign-up = Sign up
log-in = Log in
no = No
yes = Yes

title = Title

authentication-required = Authentication required
please-login-first = You have to login first or sign up for a StreetCritic account.

add-way-title = Add a new bicycle way
add-way-intro = Select a start and a stop of the new way for bicyclist by clicking on the map.
add-way-info = Currently, there is a limit in the length of the way. You will notice that. Also, there are some usability problems which have high priority and will be solved shortly.

routing-title = Routing
routing-intro = Click on the map to add waypoints or search for locations below.
routing-experimental = Routing is still in the experimental phase. New features will be added, and any issues will be addressed over time.
routing-calculated-route = Calculated route:

reviews = Reviews
reviews-empty = No reviews yet. Be the first to add one!

form-submitted-success-title = Submission Successful
form-submitted-success-body = Your message has been successfully submitted.

form-submitted-error-title = Submission Failed
form-submitted-error-body = There was an error while submitting your message. Please try again later.

way-create-form-intro = Provide a title for the route, e.g., 'Southern Main Street to Market Place.' Use the local name and language.
way-create-form-about-to-submit = You can now submit your new route. If needed, feel free to go back to a previous step before finalizing your submission.
way-create-form-discard-way-confirm = Are you sure to discard your new way?

way-rating-tag-roomy = Roomy
way-rating-tag-paved = Well paved
way-rating-tag-little_traffic = Little traffic
way-rating-tag-few_stops = Few stops
way-rating-tag-green = Green
way-rating-tag-nice_surroundings = Nice surroundings
way-rating-tag-quiet = Quiet
way-rating-tag-clean = Clean
way-rating-tag-little_motorized_traffic = Little motorized traffic
way-rating-tag-good_infrastructure = Good infrastructure

`);

export default function useLocalize() {
  const appState = useSelector(selectAppState);

  return (id: string) => {
    const bundle = new FluentBundle(appState.locale);
    const _errors = bundle.addResource(
      appState.locale == "de" ? resourceDe : resourceEn,
    );
    const welcome = bundle.getMessage(id);
    let text = "";
    if (welcome?.value) {
      text = bundle.formatPattern(welcome.value, { name: "Anna" });
    }
    return text;
  };
}
