import { AppHeader } from "./AppHeader";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
