import api, { extractData } from "@/lib/api";

export async function getProfile(userId) {
  const response = await api.get(`/users/${userId}/profile`);
  return extractData(response);
}

export async function createProfile(userId, profile) {
  const response = await api.post(`/users/${userId}/profile`, profile);
  return extractData(response);
}

export async function updateProfile(userId, profile) {
  const response = await api.put(`/users/${userId}/profile`, profile);
  return extractData(response);
}

export async function getTransactions(userId) {
  const response = await api.get(`/users/${userId}/transactions`);
  return extractData(response) || [];
}

export async function addTransaction(userId, transaction) {
  const response = await api.post(`/users/${userId}/transactions`, transaction);
  return extractData(response);
}

export async function getGoals(userId) {
  const response = await api.get(`/users/${userId}/goals`);
  return extractData(response) || [];
}

export async function createGoal(userId, goal) {
  const response = await api.post(`/users/${userId}/goals`, goal);
  return extractData(response);
}

export async function getAnalysis(userId) {
  const response = await api.get(`/users/${userId}/analysis`);
  return extractData(response);
}

export async function getAssets(userId) {
  const response = await api.get(`/users/${userId}/assets`);
  return extractData(response) || [];
}

export async function getAdvice(userId, query, profile) {
  const response = await api.post("/api/advice", {
    userId,
    query,
    profile,
  });
  return extractData(response);
}

export async function getAdviceHistory(userId) {
  const response = await api.get(`/api/advice/${userId}/history`);
  return extractData(response) || [];
}
