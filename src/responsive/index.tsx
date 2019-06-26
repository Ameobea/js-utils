import React from 'react';
import MediaQuery, { MediaQueryProps } from 'react-responsive';

import { withDisplayName } from '../util';
import { Without } from '../types';

export const ResponsiveStyler: React.FC<{
  styler: (matches: boolean) => React.CSSProperties | undefined;
  [key: string]: any;
}> = ({ children, styler, ...props }) => (
  <MediaQuery {...props}>{matches => <div style={styler(matches)}>{children}</div>}</MediaQuery>
);

export function Responsive<
  ResponsiveProps extends { [key: string]: any },
  Props extends { [key: string]: any }
>({
  getProps,
  ...mediaQueryProps
}: { getProps: (matches: boolean) => ResponsiveProps } & MediaQueryProps) {
  return (
    Component: React.ComponentType<Props & ResponsiveProps>
  ): React.ComponentType<Without<Props, 'mobile'> & ResponsiveProps> =>
    withDisplayName('Responsive')(({ ...props }: Props) => (
      <MediaQuery {...mediaQueryProps}>
        {matches => <Component {...props} {...getProps(matches)} />}
      </MediaQuery>
    ));
}

export const withMobileProp = ({ ...mediaQueryProps }: MediaQueryProps) =>
  function WithMobileProp<Props extends { [key: string]: any }>(
    Component: React.ComponentType<Props & { mobile: boolean }>
  ): React.ComponentType<Without<Props, 'mobile'>> {
    return withDisplayName('WithMobileProp')(({ ...props }: Props) => (
      <MediaQuery {...mediaQueryProps}>
        {mobile => <Component {...props} mobile={mobile} />}
      </MediaQuery>
    ));
  };

export const withMobileOrDesktop = ({ ...mediaQueryProps }: MediaQueryProps) =>
  function WithMobileOrDesktop<Props extends { [key: string]: any }>(
    MobileComponent: React.ComponentType<Props>,
    DesktopComponent: React.ComponentType<Props>
  ): React.ComponentType<Without<Props, 'mobile'>> {
    return withDisplayName('Responsive')(({ ...props }) => (
      <MediaQuery {...mediaQueryProps}>
        {mobile => (mobile ? <MobileComponent {...props} /> : <DesktopComponent {...props} />)}
      </MediaQuery>
    ));
  };
