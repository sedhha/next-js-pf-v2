import React from 'react';
import classes from './HeaderList.module.scss';
const headers = ['About', 'Experience', 'Blog', 'Contact', 'More'];
export default function HeaderList() {
  return (
    <React.Fragment>
      <div className={classes.HeaderList}>
        {headers.map((element, i) => (
          <div
            key={element}
            className={[
              classes.HeaderListElement,
              i === 0 ? classes.HeaderListElementActive : null,
            ].join(' ')}>
            {element}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
