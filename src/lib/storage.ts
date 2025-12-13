export type Role = "mahasiswa" | "perusahaan";

export type JobStatus = "aktif" | "tutup";

export type Job = {
  id: string;
  perusahaan: string;
  posisi: string;
  lokasi: string;
  tanggal: string;
  deskripsi: string;
  status: JobStatus;
};

export type ApplicationStatus =
  | "Dikirim"
  | "Diproses"
  | "Wawancara"
  | "Diterima"
  | "Ditolak";

export type Application = {
  id: string;
  jobId: string;
  perusahaan: string;
  posisi: string;
  tanggal: string;
  status: ApplicationStatus;
};

export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

// ✅ INI YANG KAMU BUTUHIN (biar import getRole nggak error)
export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem("role") as Role | null) ?? null;
}

export function getCompanyJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("companyJobs");
    return raw ? (JSON.parse(raw) as Job[]) : [];
  } catch {
    return [];
  }
}

export function setCompanyJobs(jobs: Job[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("companyJobs", JSON.stringify(jobs));
}

export function getApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("applications");
    return raw ? (JSON.parse(raw) as Application[]) : [];
  } catch {
    return [];
  }
}

export function setApplications(apps: Application[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("applications", JSON.stringify(apps));
}
