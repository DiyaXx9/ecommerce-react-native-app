import AsyncStorage from "@react-native-async-storage/async-storage";
import { Address } from "../redux/addressSlice";

const KEY = "ADDRESSES";

export const saveAddresses = async (addresses: Address[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(addresses));
};

export const getAddresses = async (): Promise<Address[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};