"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";
// Create a client

const queryClient = getQueryClient();
export function TanstackQueryProvider({ children }: { children: ReactNode }) {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}