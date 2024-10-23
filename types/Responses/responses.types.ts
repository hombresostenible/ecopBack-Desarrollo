import { IUser } from '../UserPanel/users.types';
import { IUserPlatform } from '../UserPanel/06ElectronicPayroll/userPlatform.types';
import { IBranch } from "../UserPanel/02Branch/branch.types";
import { IAssets } from "../UserPanel/03Inventories/01InventoryAssets/assets.types";
import { IMerchandise } from "../UserPanel/03Inventories/02InventoryMerchadises/merchandise.types";
import { IProduct } from "../UserPanel/03Inventories/03InventoryProducts/products.types";
import { IRawMaterial } from "../UserPanel/03Inventories/04InventoryRawMaterals/rawMaterial.types";
import { IService } from '../UserPanel/03Inventories/05InventoryServices/services.types';
import { IAccountsBook } from "../UserPanel/04Accounts/accountsBook.types";
import { ISustainability } from "../UserPanel/09Sustainability/sustainability.types";
import { IElectronicInvoicing } from "../UserPanel/05ElectronicInvoicing/electronicInvoicing.types";
import { IInvoicingPOS } from "../UserPanel/05ElectronicInvoicing/invoicingPOS.types";
import { ICrmClients } from '../UserPanel/07CrmClients/crmClients.types';
import { ICrmSuppliers } from '../UserPanel/08CrmSuppliers/crmSupplier.types';
import { ISalesFunnelCustomerAcq, ISalesFunnelCustomerRet, ISalesFunnelSalesDigital } from "../UserPanel/salesFunnel.types";
import { IContactUs } from "../UserPanel/contactUs.types";
import { IAccountsPayable } from '../UserPanel/accountsPayable.types';
import { IAccountsReceivable } from '../UserPanel/accountsReceivable.types';

//INTERFACE DE ERRORES
export class ServiceError extends Error {
    constructor(code: number, message: string, errorMessage?: unknown) {
        super(message);
        this.code = code;
        this.errorMessage = errorMessage;
    };
    code: number;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA PARA LOGIN
export interface ILoginServiceLayerResponse {
    code: number;
    result?: {
        serResult: IUser | IUserPlatform;
        token: string;
    };
    message?: string;
    errorMessage?: string;
}

//INTERFACE DE RESPUESTA USER CON TOKEN
export interface IUserServiceLayerResponse {
    code: number;
    result?: {
        serResult: IUser;
        token: string;
    };
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA USER
export interface IServiceLayerResponseUser {
    code: number;
    result?: IUser;
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA USER APPLICATIONPASSWORD
export interface IServiceLayerResponseApplicationPassword {
    code: number;
    result?: IUser;
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA USERPLATFORM
export interface IServiceLayerResponseUserPlatform {
    code: number;
    result?: IUserPlatform | IUserPlatform[];
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA BRANCH
export interface IServiceLayerResponseBranch {
    code: number,
    result?: IBranch | IBranch[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA BRANCH
export interface IServiceLayerResponseBranchPaginated {
    code: number,
    result?: IBranch | IBranch[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA ASSETS
export interface IServiceLayerResponseAssets {
    code: number,
    result?: IAssets | IAssets[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA ASSETS
export interface IServiceLayerResponseAssetsPaginated {
    code: number,
    result?: IAssets | IAssets[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA MERCHANDISE
export interface IServiceLayerResponseMerchandise {
    code: number,
    result?: IMerchandise | IMerchandise[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA MERCHANDISE
export interface IServiceLayerResponseMerchandisePaginated {
    code: number,
    result?: IMerchandise | IMerchandise[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA PRODUCT
export interface IServiceLayerResponseProduct {
    code: number,
    result?: IProduct | IProduct[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA PRODUCT
export interface IServiceLayerResponseProductPaginated {
    code: number,
    result?: IProduct | IProduct[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA RAWMATERIAL
export interface IServiceLayerResponseRawMaterial {
    code: number,
    result?: IRawMaterial | IRawMaterial[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA RAWMATERIAL
export interface IServiceLayerResponseRawMaterialPaginated {
    code: number,
    result?: IRawMaterial | IRawMaterial[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA SERVICE
export interface IServiceLayerResponseService {
    code: number,
    result?: IService | IService[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA SERVICE
export interface IServiceLayerResponseServicePaginated {
    code: number,
    result?: IService | IService[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA ACCOUNTSBOOK
export interface IServiceLayerResponseAccountsBook {
    code: number,
    result?: IAccountsBook | IAccountsBook[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA ACCOUNTSBOOK
export interface IServiceLayerResponseAccountsBookPaginated {
    code: number,
    result?: IAccountsBook | IAccountsBook[],
    message?: string;
    errorMessage?: unknown,
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//POR DEFINIR
export interface IServiceLayerResponseFinancialIndicators {
    code: number,
    result?: IAccountsBook | IAccountsBook[],
    message?: string;
    errorMessage?: unknown,
};
//POR DEFINIR
export interface IServiceLayerResponseFinancialIndicatorsAccountsPayable {
    code: number,
    result?: IAccountsPayable | IAccountsPayable[],
    message?: string;
    errorMessage?: unknown,
};
//POR DEFINIR
export interface IServiceLayerResponseFinancialIndicatorsAccountsReceivable {
    code: number,
    result?: IAccountsReceivable | IAccountsReceivable[],
    message?: string;
    errorMessage?: unknown,
};
export interface IServiceLayerResponseFinancialIndicatorsPaginated {
    code: number,
    result?: IAccountsBook | IAccountsBook[],
    message?: string;
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
    errorMessage?: unknown,
};

export interface IServiceLayerResponseSustainabilityIndicators {
    code: number,
    result: IAccountsBook | IAccountsBook[];
    message?: string;
    errorMessage?: unknown,
};

export interface IServiceLayerResponseVerifySustainabilityIndicators {
    code: number;
    result: IAccountsBook | null; 
    message?: string;
    errorMessage?: unknown;
}

export interface IServiceLayerResponseSustainability {
    code: number,
    result?: ISustainability | ISustainability[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA ELECTRONICINVOICING
export interface IServiceLayerResponseElectronicInvoicing {
    code: number,
    // result?: IElectronicInvoicing,
    result?: IElectronicInvoicing | IElectronicInvoicing[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA INVOICINGPOS
export interface IServiceLayerResponseInvoicingPOS {
    code: number,
    result?: IInvoicingPOS | IInvoicingPOS[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA CRMCLIENTS
export interface ICrmClientsServiceLayerResponse {
    code: number;
    result?: ICrmClients | ICrmClients[],
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA CRMCLIENTS
export interface ICrmClientsServiceLayerResponsePaginated {
    code: number;
    result?: ICrmClients | ICrmClients[],
    message?: string;
    errorMessage?: unknown;
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA CRMSUPPLIERS
export interface ICrmSuppliersServiceLayerResponse {
    code: number;
    result?: ICrmSuppliers | ICrmSuppliers[],
    message?: string;
    errorMessage?: unknown;
};

//INTERFACE DE RESPUESTA GENERICA PARA CRMSUPPLIERS
export interface ICrmSuppliersServiceLayerResponsePaginated {
    code: number;
    result?: ICrmSuppliers | ICrmSuppliers[],
    message?: string;
    errorMessage?: unknown;
    totalRegisters?: number,
    totalPages?: number,
    currentPage?: number,
};

//INTERFACE DE RESPUESTA GENERICA PARA SALESFUNNERCUSTOMERACQUISITION
export interface IServiceLayerResponseSalesFunnelCustomerAcq {
    code: number,
    result?: ISalesFunnelCustomerAcq | ISalesFunnelCustomerAcq[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA SALESFUNNERCUSTOMERRETENTION
export interface IServiceLayerResponseSalesFunnelCustomerRet {
    code: number,
    result?: ISalesFunnelCustomerRet | ISalesFunnelCustomerRet[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA SALESFUNNERCUSTOMERDIGITAL
export interface IServiceLayerResponseSalesFunnelCustomerDigital {
    code: number,
    result?: ISalesFunnelSalesDigital | ISalesFunnelSalesDigital[],
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA RETORNAR PRODUCTOS POR CODIGO DE BARRAS O POR NOMBRE
export interface IServiceLayerResponseItemByBarCodeOrName {
    code: number,
    result?: {
        serResult: IAssets | IMerchandise | IProduct | IRawMaterial | IService,
        token: string;
    };
    message?: string;
    errorMessage?: unknown,
};

//INTERFACE DE RESPUESTA GENERICA PARA RETORNAR PRODUCTOS POR CODIGO DE BARRAS O POR NOMBRE
export interface IServiceLayerResponseAllItems {
    code: number,
    result?: {
        serResult: IAssets | IMerchandise | IProduct | IRawMaterial | IService,
        token: string;
    };
    message?: string;
    errorMessage?: unknown,
};

// INTERFACE DE RESPUESTA PARA CONTACTANOS
export interface IServiceLayerResponseContactUs {
    code: number;
    result?: IContactUs;
    message?: string;
    errorMessage?: unknown;
};