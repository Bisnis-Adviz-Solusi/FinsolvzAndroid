export interface UserRouteItem {
  _id: string;
  name: string;
  email?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "CLIENT";
}

export interface CompanyRouteItem {
  _id: string;
  name: string;
  user?: string[];
}

export type RootStackParamList = {
  Login: undefined;
  HomePage: {
    openModal?: boolean;
    selectedUser?: UserRouteItem;
    openCompanyModal?: boolean;
    selectedCompany?: CompanyRouteItem;
  } | undefined;

  SearchPage: undefined;
  CreateReport: undefined;
  ClientHomePage: undefined;
  BSPLPage: { reportId: string; companyId: string; reportType: string }
  Revenue: {
    reportId: string;
    selectedCompany: string | null;
  };
};
