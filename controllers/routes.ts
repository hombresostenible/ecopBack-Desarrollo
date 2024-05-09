import userControllers from "./User/user.controller";
import authControllers from "./Auth/auth.controller";

function routerApi(app: any) {
    app.use("/api/user", userControllers);
    app.use("/api/auth", authControllers);
};

export { routerApi };