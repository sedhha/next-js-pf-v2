import React from 'react';
import classes from './Analytics.module.scss';
import ImageTrackComponent from './ImageTrack';
import { w3cwebsocket as WS } from 'websocket';

/*
        SESSION_ID,
        SESSION_TIME (TOTAL TIME USER SPENDS ON THE WEBSITE)
        ANALYTICS SPECIFIC
            IF USER VIEWS A SPECIFIC IMAGE OR NOT====================== X
            IF USER CLICKS ON A BUTTON =============================== X
            IF USER GOES TILL THE END OF THE PAGE
*/

type Props = { token: string };

export default function Analytics({ token }: Props) {
  const footerRef = React.useRef(null);

  const userReachedEnd = () => console.log('Website fully viewed');
  const buttonClickedEvent = () => console.log('Button Clicked');

  React.useEffect(() => {
    if (token) {
      const wsClient = new WS('ws://localhost:4000?token=' + token);
      wsClient.onmessage = (message) =>
        console.log(
          'Message from the Server :- ',
          JSON.parse(message.data as string)
        );
      wsClient.onclose = (closeEvent) =>
        console.log('Closed connection from the Server :- ', closeEvent);
      wsClient.onopen = () => {
        wsClient.send(JSON.stringify({ hello: 'Server' }));
      };
      return () => wsClient.close();
    }
  }, [token]);

  React.useEffect(() => {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) userReachedEnd();
      },
      {
        threshold: 1,
      }
    );

    const footerReference = footerRef.current;
    if (footerReference) footerObserver.observe(footerReference);
    return () => {
      if (footerReference) footerObserver.unobserve(footerReference);
    };
  }, []);
  return (
    <div className={classes.Container}>
      <div className={classes.Head}>Head</div>
      <div className={classes.DivContainer}>
        <ImageTrackComponent
          onImageVisibleCallback={() => console.log('Imge is visible')}
          src={'/loading.gif'}
          className={classes.Image}
        />
      </div>
      <br />
      <br />

      <div className={classes.DivContainer}>
        <button className={classes.Button} onClick={buttonClickedEvent}>
          View More
        </button>
      </div>

      <footer className={classes.Footer} ref={footerRef}>
        Thanks For Visiting
      </footer>
    </div>
  );
}
