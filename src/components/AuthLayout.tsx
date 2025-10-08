export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F1A2A] text-white">
      <div className="p-4 text-sm text-gray-300">← Kembali</div>
      <div className="flex-1 bg-white rounded-t-3xl p-6 text-gray-800">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mb-6">{subtitle}</p>}
        {children}
      </div>
      <div className="text-center text-xs text-gray-400 py-3">By Hunter Nae</div>
    </div>
  );
}
