import { PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react';

export const TestContext = createContext({
  elements: [] as ReactNode[],
});

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within TestProvider');
  }
  return context;
};

export const Head: React.FC<PropsWithChildren> = () => {
  const context = useContext(TestContext);
  if (!context) throw new Error('Head must be used within TestProvider');
  context.elements.push(<title>This is the new page title</title>);
  return null;
};

export const HeadTag = TestContext.Consumer;
