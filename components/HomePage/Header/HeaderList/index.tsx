import React from 'react';
import classes from './HeaderList.module.scss';
const headers = ['About', 'Experience', 'Blog', 'Contact', 'More'];

type Props = {
  darkMode: boolean;
};
export default function HeaderList({ darkMode }: Props) {
  return (
    <React.Fragment>
      <div className={classes.HeaderList}>
        {headers.map((element, i) => (
          <div
            key={element}
            className={[
              classes.HeaderListElement,
              i === 0
                ? [
                    classes.HeaderListElementActive,
                    darkMode ? classes.HeaderListElementActive_dark : null,
                  ].join(' ')
                : null,
            ].join(' ')}>
            {element}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
