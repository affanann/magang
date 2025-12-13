export type Role = "mahasiswa" | "perusahaan";

export type Job = {
  id: string;
  perusahaan: string;
  posisi: string;
  lokasi: string;
  tanggal: string;
  deskripsi: string;
  status: "aktif" | "tutup";
};

export type Application = {
  id: string;
  jobId: string;
  perusahaan: string;
  posisi: string;
  tanggal: string;
  status: "Dikirim" | "Diproses" | "Wawancara" | "Diterima" | "Ditolak";
};

export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getRole(): Role | null {
  return (localStorage.getItem("role") as Role | null) ?? null;
}

export function getCompanyJobs(): Job[] {
  try {
    const raw = localStorage.getItem("companyJobs");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCompanyJobs(jobs: Job[]) {
  localStorage.setItem("companyJobs", JSON.stringify(jobs));
}

export function getApplications(): Application[] {
  try {
    const raw = localStorage.getItem("applications");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setApplications(apps: Application[]) {
  localStorage.setItem("applications", JSON.stringify(apps));
}
