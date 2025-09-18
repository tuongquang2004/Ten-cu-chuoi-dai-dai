import {
  Exchange,
  Job,
  Payment,
  Referral,
  Shipping,
  Comment,
  Tag,
} from "@/public/assets/icons";
import { ROUTES } from "@/constants/routes";

export type TileItemData = {
  label: string;
  icon: React.ReactNode;
  href?: string;
};

export const manageTiles: TileItemData[] = [
  {
    label: "Referral Sources",
    icon: <Referral />,
    href: ROUTES.REFERRAL_SOURCES,
  },
  {
    label: "Shipping Methods",
    icon: <Shipping />,
    href: ROUTES.SHIPPING_METHODS,
  },
  {
    label: "Payment Methods",
    icon: <Payment />,
    href: ROUTES.PAYMENT_METHODS,
  },
  {
    label: "Job Numbers",
    icon: <Job />,
    href: ROUTES.JOB_NUMBERS,
  },
  {
    label: "Exchange Rates",
    icon: <Exchange />,
    href: "/",
  },
  {
    label: "Comments",
    icon: <Comment />,
    href: ROUTES.COMMENTS,
  },
  {
    label: "Special Pricing Schedule",
    icon: <Tag />,
    href: "/",
  },
];

export type check = {
  key: string,
  label: string,
  status: boolean
}

export type RefSrc = {
  id: string,
  source: string,
  isActive: boolean
}

export type FormProps = {
  label: string,
  buttonLabel: string,
  statusCheckbox?: {
    className?: string,
    current: boolean,
    onChange: (checked: boolean) => void;
  }
  action: '' | 'add' | 'edit'
}

export const defaultRefSrc = {
  id: "",
  isActive: true,
  source: "",
}

export const defaultForm: FormProps = {
  label: "Form",
  buttonLabel: "Submit",
  action: ""
}

export type JobNumberRow = {
  jobnumber: string;
  level: number,
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

export type CommentRow = {
  comment: string;
  isActive: boolean;
};