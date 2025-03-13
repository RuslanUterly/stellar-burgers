import { FC } from 'react';
import styles from './root.module.css';

import { AppHeader } from '@components';
import { TRootProps } from './type';

export const Root: FC<TRootProps> = ({ children }) => (
  <div className={styles.root}>
    <AppHeader />
    {children}
  </div>
);
