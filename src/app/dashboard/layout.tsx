import React, { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div>nav</div>
      {children}
    </section>
  );
};

