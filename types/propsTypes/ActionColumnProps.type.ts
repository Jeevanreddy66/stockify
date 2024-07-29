import type { ModelType } from "@/lib";

export type ActionColumnPropsType = {
  row: any;
  model: ModelType;
  editEndpoint: string;
  id: string | undefined;
};
