import { AvailableRoutes } from '@/constants/routes';

export interface IRoute {
  routeName: AvailableRoutes;
  routeDisplay: string;
}

export type IRoutes = IRoute[];
