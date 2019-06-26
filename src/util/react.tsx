import React from 'react';

export const withDisplayName = (displayName: string) => (Comp: React.ComponentType<any>) => {
  Comp.displayName = displayName;
  return Comp;
};
