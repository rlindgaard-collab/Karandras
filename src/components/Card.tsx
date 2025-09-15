import { ReactNode } from "react"

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-emerald-900/40 bg-gray-900/90 shadow-lg backdrop-blur ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 border-b border-gray-800 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-emerald-400 ${className}`}>{children}</h3>
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 text-gray-300 ${className}`}>{children}</div>
}
