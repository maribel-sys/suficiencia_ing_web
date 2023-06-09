import { base_url } from './base_url';
export const getImage = (image_path: String) => {
    return base_url + "/" + image_path;
}