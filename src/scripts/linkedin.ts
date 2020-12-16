import { Profile } from "../models/profile";

async function getProfileInfo(): Promise<Profile> {
  const fullName = document.querySelectorAll(".pv-top-card--list li")[0];
  const title = document.querySelectorAll(".pv-top-card h2.mt1")[0];
  const localisation = document.querySelectorAll("li.t-16.t-black.t-normal.inline-block")[0];
  // const imageUrl = document.querySelectorAll(".pv-top-card__photo")[0];
  const info = document.querySelectorAll(".pv-about__summary-text")[0];

  const response: Profile = {
    fullName: fullName && fullName.textContent.replace(/\n/, "").trim(),
    title: title && title.textContent.replace(/\n/, "").trim(),
    // imageUrl: imageUrl && imageUrl.getAttribute("src"),
    country: "XXX",
    localisation: localisation && localisation.textContent.replace(/\n/, "").trim(),
    info: info && info.textContent.replace(/\n/, "").trim()
  };

  return response;
}

let profile: Profile;
setTimeout(() => {
  getProfileInfo().then(result => {
    profile = result || profile;
  });
}, 3000);

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getFullName") {
    response(profile);
  }

  return true;
});
