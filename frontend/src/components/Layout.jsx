function Layout({ children }) {
  return (
    <div className="flex min-h-svh flex-col bg-base-200 text-base-content">
      nav
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {children}
      </main>
      footer
    </div>
  );
}
export default Layout;
