import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const router = [
  {
    path: '/pseudo',
    element: lazy(() => import('./pages/Pseudo')),
  },
  {
    path: '/shadow-root',
    element: lazy(() => import('./pages/ShadowRoot')),
  },
  {
    path: '/open-print',
    element: lazy(() => import('./pages/OpenPrint')),
  },
  {
    path: '/image-filter',
    element: lazy(() => import('./pages/ImageFilter')),
  },
  {
    path: '/document-hidden',
    element: lazy(() => import('./pages/DocumentHidden')),
  },
  {
    path: '/blob-image',
    element: lazy(() => import('./pages/BlobImage')),
  },
  {
    path: '/browser',
    element: lazy(() => import('./pages/Browser')),
  },
  {
    path: '/',
    element: lazy(() => import('./pages/Home')),
  },
];

export default createBrowserRouter(
  router.map((i) => ({ ...i, element: React.createElement(i.element) }))
);
