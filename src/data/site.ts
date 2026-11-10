export interface NavItem {
  /** Section element id. */
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'games', label: 'Love Games' },
  { id: 'memories', label: 'Memories' },
  { id: 'promise', label: 'My Promise' },
  { id: 'forever', label: 'Forever' },
];
