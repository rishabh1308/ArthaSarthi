"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnalysis,
  getAssets,
  getGoals,
  getProfile,
  getTransactions,
  createGoal,
  addTransaction,
  updateProfile,
  createProfile,
} from "@/services/financeService";

export function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: Boolean(userId),
    retry: false,
  });
}

export function useAnalysis(userId) {
  return useQuery({
    queryKey: ["analysis", userId],
    queryFn: () => getAnalysis(userId),
    enabled: Boolean(userId),
  });
}

export function useTransactions(userId) {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId),
    enabled: Boolean(userId),
  });
}

export function useGoals(userId) {
  return useQuery({
    queryKey: ["goals", userId],
    queryFn: () => getGoals(userId),
    enabled: Boolean(userId),
  });
}

export function useAssets(userId) {
  return useQuery({
    queryKey: ["assets", userId],
    queryFn: () => getAssets(userId),
    enabled: Boolean(userId),
  });
}

export function useCreateTransaction(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addTransaction(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
      queryClient.invalidateQueries({ queryKey: ["analysis", userId] });
      queryClient.invalidateQueries({ queryKey: ["assets", userId] });
    },
  });
}

export function useCreateGoal(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createGoal(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
    },
  });
}

export function useSaveProfile(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, exists }) => {
      if (exists) {
        return updateProfile(userId, data);
      }
      return createProfile(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["analysis", userId] });
    },
  });
}

export function useDashboardData(userId) {
  const profile = useProfile(userId);
  const analysis = useAnalysis(userId);
  const transactions = useTransactions(userId);
  const goals = useGoals(userId);
  const assets = useAssets(userId);

  const isLoading =
    profile.isLoading ||
    analysis.isLoading ||
    transactions.isLoading ||
    goals.isLoading ||
    assets.isLoading;

  return {
    profile: profile.data,
    analysis: analysis.data,
    transactions: transactions.data || [],
    goals: goals.data || [],
    assets: assets.data || [],
    isLoading,
    refetchAll: () => {
      profile.refetch();
      analysis.refetch();
      transactions.refetch();
      goals.refetch();
      assets.refetch();
    },
  };
}
