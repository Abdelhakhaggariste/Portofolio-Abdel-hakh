import React, {Suspense, useContext} from "react";
import "./twitter.scss";
import Loading from "../loading/Loading";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import {twitterDetails} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

const renderLoader = () => <Loading />;
const cantDisplayError =
  "<div className='centerContent'><h2>Vous ne parvenez pas à charger ? Vérifier les paramètres de protection de la vie privée</h2></div>";

function timeOut() {
  setTimeout(function () {
    if (!document.getElementById("twitter").innerHTML.includes("iframe")) {
      document.getElementById("twitter").innerHTML = cantDisplayError;
    }
  }, 10000);
}
var widthScreen = window.screen.width;

export default function Twitter() {
  const {isDark} = useContext(StyleContext);

  if (!twitterDetails.display) {
    return null;
  }
  if (!twitterDetails.userName) {
    console.error("Le nom d'utilisateur Twitter pour la section Twitter est manquant");
  }
  if (twitterDetails.userName) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="tw-main-div" id="twitter">
          <div className="centerContent">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName={twitterDetails.userName}
              options={{height: 400, width: {widthScreen}}}
              placeholder={renderLoader()}
              autoHeight={false}
              borderColor="#fff"
              key={isDark ? "1" : "2"}
              theme={isDark ? "dark" : "light"}
              noFooter={true}
              onload={timeOut()}
            />
          </div>
        </div>
      </Suspense>
    );
  } else {
    return null;
  }
}