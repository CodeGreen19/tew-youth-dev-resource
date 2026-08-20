'use client';

import { AppProgressProvider } from '@bprogress/next';

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-999">
            <AppProgressProvider
                height="4px"
                color="var(--primary)"
                options={{ showSpinner: false }}
                shallowRouting


            >
                {children}

            </AppProgressProvider>
        </div>
    );
};

export default ProgressProviders;