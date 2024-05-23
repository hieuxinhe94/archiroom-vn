import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container m-auto">
      <main>{children}</main>
    </div>
  )
}
