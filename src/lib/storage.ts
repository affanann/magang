// src/lib/storage.ts
"use client";

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
  ownerId: string; // perusahaan yang buat
};

export type KandidatStatus =
  | "Baru"
  | "Diproses"
  | "Wawancara"
  | "Diterima"
  | "Ditolak";

export type Kandidat = {
  id: string;
  nama: string;
  kampus: string;
  posisi: string;
  status: KandidatStatus;
  jobId: string;
  ownerId: string; // perusahaan pemilik lowongan
};

export type LamaranStatus =
  | "Dikirim"
  | "Diproses"
  | "Wawancara"
  | "Diterima"
  | "Ditolak";

export type Lamaran = {
  id: string;
  jobId: string;
  perusahaan: string;
  posisi: string;
  status: LamaranStatus;
  createdAt: number;
  applicantName: string;
};

// ✅ alias type biar import `Application` aman
export type Application = Lamaran;

const KEY_ROLE = "role";
const KEY_LOGGED = "isLoggedIn";
const KEY_DEMO = "isDemo";
const KEY_UID = "uid";
const KEY_COMPANY_JOBS = "companyJobs";
const KEY_APPS = "myApplications";
const KEY_CANDIDATES = "companyCandidates";

/* =========================
   AUTH / ID
========================= */

export function uid() {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(KEY_UID);
  if (!id) {
    id = `u_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
    localStorage.setItem(KEY_UID, id);
  }
  return id;
}

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(KEY_ROLE) as Role | null) || null;
}

export function setRole(role: Role) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_ROLE, role);
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY_LOGGED) === "true";
}

export function setLoggedIn(v: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LOGGED, v ? "true" : "false");
}

export function setDemo(v: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_DEMO, v ? "true" : "false");
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_LOGGED);
  localStorage.removeItem(KEY_ROLE);
  localStorage.removeItem(KEY_DEMO);
}

/* =========================
   JSON Helpers
========================= */

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================
   Jobs (Perusahaan)
========================= */

export function getCompanyJobs(ownerId: string = uid()): Job[] {
  const all = readJSON<Record<string, Job[]>>(KEY_COMPANY_JOBS, {});
  return all[ownerId] || [];
}

export function setCompanyJobs(jobs: Job[], ownerId: string = uid()) {
  const all = readJSON<Record<string, Job[]>>(KEY_COMPANY_JOBS, {});
  all[ownerId] = jobs;
  writeJSON(KEY_COMPANY_JOBS, all);
}

export function upsertCompanyJob(job: Job, ownerId: string = uid()) {
  const jobs = getCompanyJobs(ownerId);
  const idx = jobs.findIndex((j) => j.id === job.id);
  if (idx >= 0) jobs[idx] = job;
  else jobs.unshift(job);
  setCompanyJobs(jobs, ownerId);
}

/* =========================
   Lamaran (Mahasiswa)
========================= */

export function getMyApplications(): Lamaran[] {
  return readJSON<Lamaran[]>(KEY_APPS, []);
}

export function setMyApplications(apps: Lamaran[]) {
  writeJSON(KEY_APPS, apps);
}

export function addApplication(app: Lamaran) {
  const apps = getMyApplications();
  const exists = apps.some((a) => a.jobId === app.jobId);
  if (!exists) {
    apps.unshift(app);
    setMyApplications(apps);
  }
}

/* =========================
   Kandidat (Perusahaan)
========================= */

export function getCompanyCandidates(ownerId: string = uid()): Kandidat[] {
  const all = readJSON<Record<string, Kandidat[]>>(KEY_CANDIDATES, {});
  return all[ownerId] || [];
}

export function setCompanyCandidates(
  cands: Kandidat[],
  ownerId: string = uid()
) {
  const all = readJSON<Record<string, Kandidat[]>>(KEY_CANDIDATES, {});
  all[ownerId] = cands;
  writeJSON(KEY_CANDIDATES, all);
}

export function seedCompanyCandidatesIfEmpty(ownerId: string = uid()) {
  const existing = getCompanyCandidates(ownerId);
  if (existing.length) return;

  const dummy: Kandidat[] = [
    {
      id: "k1",
      nama: "Raka Pratama",
      kampus: "Universitas Sriwijaya",
      posisi: "UI/UX Intern",
      status: "Baru",
      jobId: "seed",
      ownerId,
    },
    {
      id: "k2",
      nama: "Nabila Putri",
      kampus: "Polsri",
      posisi: "Frontend Intern",
      status: "Diproses",
      jobId: "seed",
      ownerId,
    },
    {
      id: "k3",
      nama: "Dimas Fajar",
      kampus: "Universitas Indonesia",
      posisi: "Data Intern",
      status: "Wawancara",
      jobId: "seed",
      ownerId,
    },
  ];

  setCompanyCandidates(dummy, ownerId);
}

export function updateCandidateStatus(
  id: string,
  status: KandidatStatus,
  ownerId: string = uid()
) {
  const cands = getCompanyCandidates(ownerId).map((c) =>
    c.id === id ? { ...c, status } : c
  );
  setCompanyCandidates(cands, ownerId);
}

/* =========================================================
   ✅ ALIAS EXPORTS (IMPORT LAMA TETAP AMAN)
========================================================= */

export const getApplications = getMyApplications;
export const setApplications = setMyApplications;

export const getJobs = getCompanyJobs;
export const setJobs = setCompanyJobs;

// kalau ada file lama pakai nama ini:
export const updateCandidateStatusById = updateCandidateStatus;
