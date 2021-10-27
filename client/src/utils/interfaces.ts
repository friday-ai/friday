/**
 * Interface for array with key/value pair
 */
export interface KVArr<T> {
  [Key: string]: T;
}

export interface SVGProps {
  className?: string;
  width?: string;
  height?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface SceneType {
  id: string;
  icon: string;
  name: string;
  description: string;
  status: string;
  errorMessage?: string;
}
