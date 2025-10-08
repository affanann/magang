export default function QnAPage() {
  const qna = [
    { q: "Apakah magang di startup selalu remote?", a: "Tergantung kebijakan masing-masing perusahaan." },
    { q: "Bagaimana cara membuat CV menarik untuk magang?", a: "Fokus pada skill dan pengalaman relevan." },
  ];

  return (
    <div className="min-h-screen p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Q&A Magang</h1>
      <div className="space-y-4">
        {qna.map((item, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-5">
            <p className="font-semibold">{item.q}</p>
            <p className="text-sm text-gray-600 mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
