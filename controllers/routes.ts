import userControllers from "./User/user.controller";
import authControllers from "./Auth/auth.controller";
import appointmentControllers from "./Ecopcion/appointment.controller";
import contactUsControllers from "./Ecopcion/contactUs.controller";
import newsletterControllers from "./Ecopcion/newsletter.controller";

function routerApi(app: any) {
    app.use("/api/user", userControllers);
    app.use("/api/auth", authControllers);
    app.use("/api/appointment", appointmentControllers);
    app.use("/api/contactUs", contactUsControllers);
    app.use("/api/newsletter", newsletterControllers);
};

export { routerApi };