import { growthService } from "./service";
import type { CreatePost } from "./type";

const updatePost = (params: CreatePost) => {
  return growthService.delete(`/post/${params.tagId}`);
};

export default {
  updatePost,
};
