import ReactGA from 'react-ga4';

export const trackSubmitCode = (userId) => {
  ReactGA.event({
    category: 'Code Submit',
    action: 'click',
    label: `userId-${userId}`,
    // label: 'your label', // optional
    // value: 99, // optional, must be a number
    // nonInteraction: true, // optional, true/false
    // transport: 'xhr', // optional, beacon/xhr/image
  });
};

export const trackCheckoutGift = (userId) => {
  ReactGA.event({
    category: 'Gift checkout',
    action: 'click',
    label: `userId-${userId}`,
  });
};

