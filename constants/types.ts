export type check = {
  key: string;
  label: string;
  status: boolean;
};

export type RefSrc = {
  id: string;
  name: string;
  isActive: boolean;
};

export type FormProps = {
  label: string;
  buttonLabel: string;
  statusCheckbox?: {
    className?: string;
    current: boolean;
    onChange: (checked: boolean) => void;
  };
  action: "" | "add" | "edit";
};

export type JobNumberRow = {
  jobnumber: string;
  level: number;
  name: string;
  startdate: string;
  enddate: string;
  isActive: boolean;
  description: string;
  customer: string;
  contact: string;
  other: string;
  completed: string;
};

export type TileItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export type PaymentMethod = {
  id: string;
  name: string;
  type: string;
  code: string;
  isActive: boolean;
};

export type ShippingMethod = {
  id: string;
  name: string;
  isActive: boolean;
};
