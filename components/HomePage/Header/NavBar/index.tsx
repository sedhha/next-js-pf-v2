import { toggleNavBar } from '@/redux-slices/ui.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import { HiViewList } from 'react-icons/hi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import classes from './NavBar.module.scss';

export default function NavBar() {
  const { showNavBar, darkMode, routes, activeRoute } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();
  return (
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
  );
}
