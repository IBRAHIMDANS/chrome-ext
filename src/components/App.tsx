import React, {useEffect, useState} from "react";
import "./App.scss";
import {Profile} from "../models/profile";

export const App = () => {
  const [state, setState] = useState<Profile>();
  useEffect(() => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, (response: Profile) => {
          return setState(response);
        });

      });
    }
  }, [])

  return (<div className="app">
      <p>{state?.fullName}</p>
      <p>{state?.localisation}</p>
      <p>{state?.title}</p>
      <p>{state?.country}</p>
      <img height={200} width={200} src={state?.imageUrl}/>
  </div>
  );
}

export default App;
