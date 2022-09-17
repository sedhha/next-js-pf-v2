import React from 'react';
import { HiViewList } from 'react-icons/hi';
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
      <div className={classes.ViewList}>
        <HiViewList className={classes.ViewListIcon} />
      </div>
    </React.Fragment>
  );
}
