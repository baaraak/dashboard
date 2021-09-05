import React from 'react';
import { IconType } from 'react-icons/lib';
import { RiDashboardLine, RiExchangeDollarLine } from 'react-icons/ri';
import { BiCalculator } from 'react-icons/bi';
import { FiTruck } from 'react-icons/fi';
import { BsCardList } from 'react-icons/bs';
import {
  AiOutlineEdit,
  AiOutlineTable,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { FaFileInvoice, FaReceipt } from 'react-icons/fa';
import { Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        {AppRoutes.map((route) => {
          const Component = route.component;
          return (
            <Route path={route.path} key={route.id} exact>
              <Component />
            </Route>
          );
        })}
      </Switch>
    </QueryClientProvider>
  );
};

type RoutesType = {
  id: string;
  name: string;
  path: string;
  icon: IconType;
  component: React.ComponentType;
};

export const AppRoutes: RoutesType[] = [
  {
    id: 'dashboard',
    name: 'דוחות',
    path: '/',
    component: React.lazy(() => import('./dashboard/Dashboard')),
    icon: RiDashboardLine,
  },
  {
    id: 'calculator',
    name: 'מחשבון סופגניות',
    path: '/calculator',
    component: React.lazy(() => import('./calculator/Calculator')),
    icon: BiCalculator,
  },
  {
    id: 'suppliers/order',
    name: 'קבלת סחורה',
    path: '/supplier/order',
    component: React.lazy(() => import('./supplier/Order')),
    icon: FiTruck,
  },
  {
    id: 'suppliers/reports',
    name: 'דוחות סחורה מספקים',
    path: '/supplier/reports',
    component: React.lazy(() => import('./supplier/Reports')),
    icon: BsCardList,
  },
  {
    id: 'plata',
    name: 'עריכת פלטות',
    path: '/plata',
    component: React.lazy(() => import('./plata/Plata')),
    icon: AiOutlineEdit,
  },
  {
    id: 'invoice',
    name: 'יצירת חשבונית חדשה',
    path: '/invoice',
    component: React.lazy(() => import('./invoice/Invoice')),
    icon: FaFileInvoice,
  },
  {
    id: 'order',
    name: 'יצירת הזמנה חדשה',
    path: '/order',
    component: React.lazy(() => import('./order/Order')),
    icon: FaReceipt,
  },
  {
    id: 'users',
    name: 'ניהול משתמשים',
    path: '/users',
    component: React.lazy(() => import('./users/Users')),
    icon: AiOutlineUserAdd,
  },
  {
    id: 'products/exchange',
    name: 'החלפת סחורה',
    path: '/products/exchange',
    component: React.lazy(() => import('./products/Exchange')),
    icon: RiExchangeDollarLine,
  },
  {
    id: 'products/report',
    name: 'ניהול החלפת סחורה',
    path: '/products/reports',
    component: React.lazy(() => import('./products/Reports')),
    icon: AiOutlineTable,
  },
];

export default Routes;
