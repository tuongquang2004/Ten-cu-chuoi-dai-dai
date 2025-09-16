"use client"

import { useState } from "react"

export function useSource() {
    const [source, setSource]=useState<object[]>([]);

    return {source, setSource};
}