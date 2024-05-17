import authControllers from "./Auth/auth.controller";
import appointmentControllers from "./Ecopcion/appointment.controller";
import contactUsControllers from "./Ecopcion/contactUs.controller";
import newsletterControllers from "./Ecopcion/newsletter.controller";
import accountsBookControllers from './User/accountsBook.controller';
import assetsControllers from "./User/assets.controller";
import branchControllers from "./User/branch.controller";
import cRMClientsControllers from "./User/crmClients.controller";
import cRMSupplierControllers from "./User/crmSupplier.controller";
import electronicInvoicingControllers from "./User/electronicInvoicing.controller";
import invoicingPOSControllers from "./User/invoicingPOS.controller";
import merchandiseControllers from "./User/merchandise.controller";
import productControllers from "./User/product.controller";
import rawMaterialControllers from "./User/rawMaterial.controller";
import serviceControllers from "./User/services.controller";
import userControllers from "./User/user.controller";
import userPlatformControllers from "./User/userPlatform.controller";
import financialIndicatorsControllers from "./User/Indicators/financialIndicators.controller";
import sustainabilityIndicatorsControllers from "./User/Indicators/sustainabilityIndicators.controller";
import marketingIndicatorsControllers from "./User/Indicators/marketingIndicators.controller";

function routerApi(app: any) {
    app.use("/api/auth", authControllers);
    app.use("/api/appointment", appointmentControllers);
    app.use("/api/newsletter", newsletterControllers);
    app.use("/api/contactUs", contactUsControllers);

    app.use("/api/accountsBook", accountsBookControllers);
    app.use("/api/assets", assetsControllers);
    app.use("/api/branch", branchControllers);
    app.use("/api/crmClients", cRMClientsControllers);
    app.use("/api/cRMSuppliers", cRMSupplierControllers);
    app.use("/api/electronicInvoicing", electronicInvoicingControllers);
    app.use("/api/electronicInvoicing", invoicingPOSControllers);
    app.use("/api/merchandise", merchandiseControllers);
    app.use("/api/product", productControllers);
    app.use("/api/rawMaterial", rawMaterialControllers);
    app.use("/api/services", serviceControllers);
    app.use("/api/user", userControllers);
    app.use("/api/userPlatform", userPlatformControllers);

    app.use("/api/financialIndicators", financialIndicatorsControllers);
    app.use("/api/sustainabilityIndicators", sustainabilityIndicatorsControllers);
    app.use("/api/marketingIndicators", marketingIndicatorsControllers);
};

export { routerApi };