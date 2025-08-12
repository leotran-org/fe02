import MEDIA_TYPES from "../constants/mediaTypes"; // or { MEDIA_TYPES }

export default function validateMedia(form) {
  const e = {};
  if (!form.title?.trim()) e.title = "Vui lòng nhập tiêu đề";
  if (!MEDIA_TYPES.includes(form.type)) e.type = "Loại media không hợp lệ";
  if (!form.src?.trim()) e.src = "Vui lòng nhập nguồn (src)";
  if (!form.thumb?.trim()) e.thumb = "Vui lòng nhập thumbnail";
  return { isValid: Object.keys(e).length === 0, errors: e };
}

