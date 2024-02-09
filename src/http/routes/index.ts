import { FastifyInstance } from "fastify";

import { authRoute } from "./auth.route";
import { checkinRoute } from "./checkin.route";
import { gymRoute } from "./gym.route";
import { userRoute } from "./user.route";

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/gyms",
    route: gymRoute,
  },
  {
    path: "/checkins",
    route: checkinRoute,
  },
];

// const devRoutes = [
//   {
//     path: "/docs",
//     route: docsRoute,
//   },
// ];

export async function appRoutes(app: FastifyInstance) {
  defaultRoutes.forEach((route) => {
    app.register(route.route, { prefix: route.path });
  });

  // if (env.NODE_ENV === "development") {
  //   devRoutes.forEach((route) => {
  //     app.register(route.route, { prefix: route.path });
  //   });
  // }
}
