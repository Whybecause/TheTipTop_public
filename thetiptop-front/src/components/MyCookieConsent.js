import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Cookies from 'js-cookie';

function MyCookieConsent() {
  const handleAcceptCookie = () => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(`G-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`);
    }
  };

  const handleDeclineCookie = () => {
    // Remove google analytics cookies
    Cookies.remove('_ga');
    Cookies.remove(`_ga_${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`);
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue('cookie-consent');
    if (isConsent === 'true') {
      handleAcceptCookie();
    }
  }, []);

  return (
    <CookieConsent
      location="bottom"
      cookieName="cookie-consent"
      enableDeclineButton
      declineButtonText="Refuser"
      buttonStyle={{ background: 'green', color: 'white' }}
      buttonText="Accepter"
      onDecline={handleDeclineCookie}
      onAccept={handleAcceptCookie}
    >
    Ce site utilise des cookies
    pour améliorer l&apos;expérience utilisateur.
    </CookieConsent>
  );
}

export default MyCookieConsent;
