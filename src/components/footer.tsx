const routes = [
  {
    name: "Terms & Conditions",
    path: "/terms-conditions",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between h-16 border-t border-white/10 px-3 sm:px-9 text-xs text-white/25">
      <small className="text-xs">Copyright &copy; 2021</small>
      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map((route) => (
          <li key={route.path}>
            <a href={route.path}>{route.name}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
