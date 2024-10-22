import authControllers from "./Auth/auth.controller";
import userControllers from "./UserPanel/user.controller";
import branchControllers from "./UserPanel/02Branch/branch.controller";
import assetsControllers from "./UserPanel/03Inventories/01InventoryAssets/assets.controller";
import merchandiseControllers from "./UserPanel/03Inventories/02InventoryMerchadises/merchandise.controller";
import productControllers from "./UserPanel/03Inventories/03InventoryProducts/product.controller";
import rawMaterialControllers from "./UserPanel/03Inventories/04InventoryRawMaterals/rawMaterial.controller";
import serviceControllers from "./UserPanel/03Inventories/05InventoryServices/services.controller";
import allItemsControllers from "./UserPanel/allItems.controller";
import accountsBookControllers from './UserPanel/accountsBook.controller';
import electronicInvoicingControllers from "./UserPanel/electronicInvoicing.controller";
import posInvoicingControllers from "./UserPanel/posInvoicing.controller";
import userPlatformControllers from "./UserPanel/userPlatform.controller";
import crmClientControllers from "./UserPanel/crmClients.controller";
import crmSupplierControllers from "./UserPanel/crmSupplier.controller";
import financialIndicatorsControllers from "./UserPanel/Indicators/financialIndicators.controller";
import sustainabilityIndicatorsControllers from "./UserPanel/Indicators/sustainabilityIndicators.controller";
import marketingIndicatorsControllers from "./UserPanel/Indicators/marketingIndicators.controller";
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