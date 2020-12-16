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

  return (<div className="app" style={{display: 'flex'}}>
      <div style={{marginRight: "10px"}}>
        {/*{state.imageUrl && <img height={200} width={200} src={state?.imageUrl}/>}*/}
      </div>
      <div>
        <p>Full name: {state?.fullName}</p>
        <p>Titre: {state?.title}</p>
        <p>Localisation: {state?.localisation}</p>
        <p>infos: {state?.info}</p>
      </div>
    </div>
  );
}

export default App;
