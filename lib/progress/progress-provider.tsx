'use client';

import { AppProgressProvider } from '@bprogress/next';

const ProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppProgressProvider
            height="3px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting


        >
            {children}

        </AppProgressProvider>
    );
};

export default ProgressProviders;