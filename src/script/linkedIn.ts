
import { Profile } from "../models/profile";

async function getProfileInfo(): Promise<Profile> {
  const fullName = document.querySelectorAll(".pv-top-card--list li")[0];

  const profile: Profile = {
    fullName: fullName.textContent as string,
    title: "XXX",
    country: "XXX"
  };

  return profile;
}

let profile: Profile;
getProfileInfo().then(result => {
  profile = result || profile;
});

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getFullName") {
    response(getProfileInfo);
  }

  return true;
});
