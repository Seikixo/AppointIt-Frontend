import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen justify-center items-center w-full relative bg-black p-4">
      {/* Indigo Cosmos Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 w-full h-full justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
