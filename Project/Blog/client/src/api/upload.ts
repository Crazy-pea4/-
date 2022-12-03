import request from "@/utils/request";

export function uploadAvatar(id: string, file: any) {
  return request({
    url: `/upload/${id}`,
    method: "POST",
    data: file,
  });
}
