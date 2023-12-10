export const REGEX = {
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  avatar: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff)$/,
  price: /^\d+(\.\d{2})?$/,
  description: /[\w\d+\s*/-]+/,
  images: /(?:https?:\/\/)?\S+/
}