export default function LowonganPage() {
  const jobs = [
    { title: "UI/UX Designer", company: "Tokopedia", location: "Jakarta" },
    { title: "Data Analyst Intern", company: "Gojek", location: "Bandung" },
  ];

  return (
    <div className="min-h-screen p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Lowongan Magang</h1>
      <div className="space-y-4">
        {jobs.map((j, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-5">
            <h2 className="font-semibold text-lg">{j.title}</h2>
            <p className="text-sm text-gray-600">{j.company} • {j.location}</p>
            <button className="mt-3 bg-[#F59E0B] text-white px-4 py-2 rounded-md text-sm hover:bg-[#d78909]">
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
