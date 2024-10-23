import authControllers from "./Auth/auth.controller";
import userControllers from "./UserPanel/user.controller";
import branchControllers from "./UserPanel/02Branch/branch.controller";
import assetsControllers from "./UserPanel/03Inventories/01InventoryAssets/assets.controller";
import merchandiseControllers from "./UserPanel/03Inventories/02InventoryMerchadises/merchandise.controller";
import productControllers from "./UserPanel/03Inventories/03InventoryProducts/product.controller";
import rawMaterialControllers from "./UserPanel/03Inventories/04InventoryRawMaterals/rawMaterial.controller";
import serviceControllers from "./UserPanel/03Inventories/05InventoryServices/services.controller";
import allItemsControllers from "./UserPanel/03Inventories/allItems.controller";
import accountsBookControllers from './UserPanel/04Accounts/accountsBook.controller';
import electronicInvoicingControllers from "./UserPanel/05ElectronicInvoicing/electronicInvoicing.controller";
import posInvoicingControllers from "./UserPanel/05ElectronicInvoicing/posInvoicing.controller";
import userPlatformControllers from "./UserPanel/06ElectronicPayroll/userPlatform.controller";
import crmClientControllers from "./UserPanel/07CrmClients/crmClients.controller";
import crmSupplierControllers from "./UserPanel/08CrmSuppliers/crmSupplier.controller";
import financialIndicatorsControllers from "./UserPanel/10ReportsAndIndicators/01AccountsAndInventoryIndicators/accountsAndInventoryIndicators.controller";
import sustainabilityIndicatorsControllers from "./UserPanel/10ReportsAndIndicators/03SustainabilityIndicators/sustainabilityIndicators.controller";
import marketingIndicatorsControllers from "./UserPanel/10ReportsAndIndicators/02MarketingIndicators/marketingIndicators.controller";
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