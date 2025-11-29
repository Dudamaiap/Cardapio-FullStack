import axios, { AxiosError } from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { FoodData } from "../interface/FoodData";

// Remova o /food da URL base
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface UseFoodDataReturn {
  data: FoodData[];
  isLoading: boolean;
  error: AxiosError | null;
  isError: boolean;
  refetch: () => Promise<UseQueryResult<FoodData[]>>;
}

const fetchData = async (): Promise<FoodData[]> => {
  try {
    const response = await axios.get<FoodData[]>(`${API_URL}/food`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

export function useFoodData(): UseFoodDataReturn {
  const { 
    data = [], 
    isLoading, 
    error, 
    isError, 
    refetch 
  } = useQuery<FoodData[], AxiosError>({
    queryKey: ["food-data"],
    queryFn: fetchData,
    retry: 2
  });

  return { data, isLoading, error, isError, refetch };
}