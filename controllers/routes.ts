import authControllers from "./Auth/auth.controller";
import userControllers from "./User/user.controller";
import branchControllers from "./User/branch.controller";
import assetsControllers from "./User/assets.controller";
import merchandiseControllers from "./User/merchandise.controller";
import productControllers from "./User/product.controller";
import rawMaterialControllers from "./User/rawMaterial.controller";
import serviceControllers from "./User/services.controller";
import allItemsControllers from "./User/allItems.controller";
import accountsBookControllers from './User/accountsBook.controller';
import electronicInvoicingControllers from "./User/electronicInvoicing.controller";
import posInvoicingControllers from "./User/posInvoicing.controller";
import userPlatformControllers from "./User/userPlatform.controller";
import crmClientControllers from "./User/crmClients.controller";
import crmSupplierControllers from "./User/crmSupplier.controller";
import financialIndicatorsControllers from "./User/Indicators/financialIndicators.controller";
import sustainabilityIndicatorsControllers from "./User/Indicators/sustainabilityIndicators.controller";
import marketingIndicatorsControllers from "./User/Indicators/marketingIndicators.controller";
// LANDING
import appointmentControllers from "./Ecopcion/appointment.controller";
import contactUsControllers from "./Ecopcion/contactUs.controller";
import newsletterControllers from "./Ecopcion/newsletter.controller";

function routerApi(app: any) {
    app.use("/api/auth", authControllers);
    app.use("/api/user", userControllers);
    app.use("/api/branch", branchControllers);
    app.use("/api/asset", assetsControllers);
    app.use("/api/merchandise", merchandiseControllers);
    app.use("/api/product", productControllers);
    app.use("/api/raw-material", rawMaterialControllers);
    app.use("/api/service", serviceControllers);
    app.use("/api/all-items", allItemsControllers);
    app.use("/api/accounts-book", accountsBookControllers);
    app.use("/api/electronic-invoicing", electronicInvoicingControllers);
    app.use("/api/pos-invoicing", posInvoicingControllers);
    app.use("/api/user-platform", userPlatformControllers);
    app.use("/api/crm-client", crmClientControllers);
    app.use("/api/crm-supplier", crmSupplierControllers);
    app.use("/api/financial-indicator", financialIndicatorsControllers);
    app.use("/api/sustainability-indicator", sustainabilityIndicatorsControllers);
    app.use("/api/marketing-indicator", marketingIndicatorsControllers); 
    app.use("/api/appointment", appointmentControllers);
    app.use("/api/contact-us", contactUsControllers);
    app.use("/api/newsletter", newsletterControllers);
};

export { routerApi };