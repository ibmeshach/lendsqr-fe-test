import { useQuery } from "react-query";
import { request } from "../utils/axios-utils";

const getAllUsersRequest = () => {
  return request({ url: `/data` });
};

export const useGetAllUsers = (onError: any, onSuccess: any) => {
  return useQuery(["getAllUsers"], getAllUsersRequest, {
    onError,
    onSuccess,
    enabled: true,
  });
};
