import { http } from "@/utils/http";
import type { IResultOr, IRoomDetailParams } from "@/api/interface";

export const fetchRoomDetail = (params: IRoomDetailParams): Promise<IResultOr> => {
  return http.httpRequestGet("/api/room/room/getRoomDetail", params);
};
