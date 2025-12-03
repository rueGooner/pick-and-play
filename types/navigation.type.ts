export type NavigationItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  match: string;
  exact?: boolean;
};

export type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};
