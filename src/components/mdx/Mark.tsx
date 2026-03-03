export function Mark({ children }: { children: React.ReactNode }) {
  return <span className="bg-yellow-200 dark:bg-yellow-500/20 py-[0.75] px-1 rounded">{children}</span>;
}
