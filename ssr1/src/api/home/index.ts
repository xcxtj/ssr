import { http } from "@/utils/http";
import type { IResultOr, IRoomListParams } from "@/api/interface";

export function fetchRoomList(params: IRoomListParams): Promise<IResultOr> {
  return http.httpRequestGet(`/api/room/room/getRoomList?cityCode=hz`, params);
}
