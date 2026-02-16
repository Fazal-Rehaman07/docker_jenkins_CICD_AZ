"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: ReactNode }) {
  return <>{children}</>
}
