export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*", "/insights/:path*", "/reports/:path*", "/team/:path*", "/settings/:path*"],
};
