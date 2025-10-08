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
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#0F1A2A]">
      <div className="w-full max-w-md bg-white flex flex-col items-center rounded-t-3xl mt-auto pb-10 pt-8 px-6 text-gray-800">
        <h1 className="text-3xl font-extrabold mb-2 text-[#0F1A2A]">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600 mb-6 text-center">{subtitle}</p>}
        {children}
      </div>
      <div className="text-xs text-gray-400 py-3">By <span className="font-semibold text-white">Hunter Nac</span></div>
    </div>
  );
}
