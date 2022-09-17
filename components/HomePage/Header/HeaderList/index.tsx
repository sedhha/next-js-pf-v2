import { toggleNavBar } from '@/redux-slices/ui.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import { HiViewList } from 'react-icons/hi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import classes from './HeaderList.module.scss';
const headers = ['About', 'Experience', 'Blog', 'Contact', 'More'];
export default function HeaderList() {
  const { darkMode, routes, activeRoute, showNavBar } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();
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
        {showNavBar ? (
          <IoCloseCircleOutline
            className={classes.ViewListIcon}
            onClick={() => dispatch(toggleNavBar())}
          />
        ) : (
          <HiViewList
            className={classes.ViewListIcon}
            onClick={() => dispatch(toggleNavBar())}
          />
        )}
        {showNavBar && (
          <div
            className={[
              classes.RouterListDropDown,
              darkMode ? classes.RouterListDropDown_Dark : null,
            ].join(' ')}>
            {routes.map((element) => {
              const isActive = element.routeName === activeRoute;
              return (
                <label
                  key={element.routeName}
                  className={[
                    classes.RouterListDropDown_Elements,
                    isActive
                      ? darkMode
                        ? classes.RouterListDropDown_Elements_Dark
                        : classes.RouterListDropDown_Elements_Active
                      : null,
                  ].join(' ')}>
                  {element.routeDisplay}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
