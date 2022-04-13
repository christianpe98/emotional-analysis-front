import { RouteName } from "./../router/router.const";

export default function auth({ store, next, to }) {
  if (!store.getters.getUsername) to(RouteName.HOME);
  return next();
}
