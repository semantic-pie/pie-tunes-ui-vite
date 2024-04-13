import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import { SignUpWrapper } from "@/components/SignUpComponent/SignUpWrapper";
import { LoginWrapper } from "@/components/LoginComponent/LoginWrapper";

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/signup',
  component: SignUpWrapper
})

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/login',
  component: LoginWrapper
})