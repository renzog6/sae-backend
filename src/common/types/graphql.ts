import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  apartment?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  company?: Maybe<Company>;
  floor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  reference?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type AddressFilterInput = {
  cityId?: InputMaybe<Scalars['Int']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
};

export type Brand = {
  __typename?: 'Brand';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BusinessCategory = {
  __typename?: 'BusinessCategory';
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  subCategories?: Maybe<Array<BusinessSubCategory>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BusinessSubCategory = {
  __typename?: 'BusinessSubCategory';
  businessCategoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type City = {
  __typename?: 'City';
  addresses?: Maybe<Array<Address>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  province?: Maybe<Province>;
};

export type Company = {
  __typename?: 'Company';
  businessCategory?: Maybe<BusinessCategory>;
  businessCategoryId?: Maybe<Scalars['Float']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  cuit: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type: ContactType;
  value: Scalars['String']['output'];
};

export type ContactFilterInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
};

export enum ContactType {
  Email = 'EMAIL',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Other = 'OTHER',
  Phone = 'PHONE',
  Telegram = 'TELEGRAM',
  Whatsapp = 'WHATSAPP'
}

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  provinces?: Maybe<Array<Province>>;
};

export type CreateAddressInput = {
  apartment?: InputMaybe<Scalars['String']['input']>;
  cityId: Scalars['Int']['input'];
  companyId?: InputMaybe<Scalars['Int']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCityInput = {
  name: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  provinceId: Scalars['Int']['input'];
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  type: ContactType;
  value: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  category?: Maybe<EmployeeCategory>;
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  employeeCode: Scalars['String']['output'];
  hireDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  person?: Maybe<Person>;
  personId: Scalars['Int']['output'];
  position?: Maybe<EmployeePosition>;
  status: EmployeeStatus;
};

export type EmployeeCategory = {
  __typename?: 'EmployeeCategory';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmployeePosition = {
  __typename?: 'EmployeePosition';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum EmployeeStatus {
  Active = 'ACTIVE',
  Suspended = 'SUSPENDED',
  Terminated = 'TERMINATED'
}

export type Equipment = {
  __typename?: 'Equipment';
  category?: Maybe<EquipmentCategory>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  chassis?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  fuelType?: Maybe<FuelType>;
  id: Scalars['Int']['output'];
  internalCode?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  licensePlate?: Maybe<Scalars['String']['output']>;
  model?: Maybe<EquipmentModel>;
  modelId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  observation?: Maybe<Scalars['String']['output']>;
  status: EquipmentStatus;
  type?: Maybe<EquipmentType>;
  typeId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type EquipmentCategory = {
  __typename?: 'EquipmentCategory';
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type EquipmentFilterInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  modelId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EquipmentStatus>;
  typeId?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type EquipmentModel = {
  __typename?: 'EquipmentModel';
  brand?: Maybe<Brand>;
  brandId?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<EquipmentType>;
  typeId?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export enum EquipmentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Maintenance = 'MAINTENANCE',
  Retired = 'RETIRED',
  Sold = 'SOLD'
}

export type EquipmentType = {
  __typename?: 'EquipmentType';
  category?: Maybe<EquipmentCategory>;
  categoryId: Scalars['Int']['output'];
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum FuelType {
  Cng = 'CNG',
  Diesel = 'DIESEL',
  Electric = 'ELECTRIC',
  Gasoline = 'GASOLINE',
  Hybrid = 'HYBRID',
  Lpg = 'LPG',
  None = 'NONE'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type HistoryLog = {
  __typename?: 'HistoryLog';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<Employee>;
  employeeId?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId?: Maybe<Scalars['Int']['output']>;
  eventDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['Int']['output']>;
  severity: SeverityLevel;
  title: Scalars['String']['output'];
  type: HistoryType;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum HistoryType {
  CompanyEvent = 'COMPANY_EVENT',
  CompanyReminder = 'COMPANY_REMINDER',
  EmployeeAchievement = 'EMPLOYEE_ACHIEVEMENT',
  EmployeeHire = 'EMPLOYEE_HIRE',
  EmployeeIllness = 'EMPLOYEE_ILLNESS',
  EmployeeWarning = 'EMPLOYEE_WARNING',
  EquipmentAccident = 'EQUIPMENT_ACCIDENT',
  EquipmentMaintenance = 'EQUIPMENT_MAINTENANCE',
  EquipmentRepair = 'EQUIPMENT_REPAIR',
  GeneralNote = 'GENERAL_NOTE',
  PersonalEvent = 'PERSONAL_EVENT',
  VacationAssigned = 'VACATION_ASSIGNED',
  VacationTaken = 'VACATION_TAKEN'
}

export type Inspection = {
  __typename?: 'Inspection';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<Employee>;
  employeeId: Scalars['Int']['output'];
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  inspectionTypeId: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum MaritalStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createCity: City;
  createContact: Contact;
  deleteAddress: Address;
  deleteCity: City;
  deleteContact: Contact;
  hardDeleteAddress: Address;
  hardDeleteBrand: Brand;
  hardDeleteBusinessCategory: BusinessCategory;
  hardDeleteBusinessSubCategory: BusinessSubCategory;
  hardDeleteCity: City;
  hardDeleteCompany: Company;
  hardDeleteContact: Contact;
  hardDeleteCountry: Country;
  hardDeleteEmployee: Employee;
  hardDeleteEmployeeCategory: EmployeeCategory;
  hardDeleteEmployeePosition: EmployeePosition;
  hardDeleteEquipment: Equipment;
  hardDeleteEquipmentCategory: EquipmentCategory;
  hardDeleteEquipmentModel: EquipmentModel;
  hardDeleteEquipmentType: EquipmentType;
  hardDeleteHistoryLog: HistoryLog;
  hardDeleteInspection: Inspection;
  hardDeletePerson: Person;
  hardDeleteProvince: Province;
  hardDeleteTire: Tire;
  hardDeleteTireModel: TireModel;
  hardDeleteTireSize: TireSize;
  hardDeleteUnit: Unit;
  removeAddress: Address;
  removeBrand: Brand;
  removeBusinessCategory: BusinessCategory;
  removeBusinessSubCategory: BusinessSubCategory;
  removeCity: City;
  removeCompany: Company;
  removeContact: Contact;
  removeCountry: Country;
  removeEmployee: Employee;
  removeEmployeeCategory: EmployeeCategory;
  removeEmployeePosition: EmployeePosition;
  removeEquipment: Equipment;
  removeEquipmentCategory: EquipmentCategory;
  removeEquipmentModel: EquipmentModel;
  removeEquipmentType: EquipmentType;
  removeHistoryLog: HistoryLog;
  removeInspection: Inspection;
  removePerson: Person;
  removeProvince: Province;
  removeTire: Tire;
  removeTireModel: TireModel;
  removeTireSize: TireSize;
  removeUnit: Unit;
  restoreAddress: Address;
  restoreBrand: Brand;
  restoreBusinessCategory: BusinessCategory;
  restoreBusinessSubCategory: BusinessSubCategory;
  restoreCity: City;
  restoreCompany: Company;
  restoreContact: Contact;
  restoreCountry: Country;
  restoreEmployee: Employee;
  restoreEmployeeCategory: EmployeeCategory;
  restoreEmployeePosition: EmployeePosition;
  restoreEquipment: Equipment;
  restoreEquipmentCategory: EquipmentCategory;
  restoreEquipmentModel: EquipmentModel;
  restoreEquipmentType: EquipmentType;
  restoreHistoryLog: HistoryLog;
  restoreInspection: Inspection;
  restorePerson: Person;
  restoreProvince: Province;
  restoreTire: Tire;
  restoreTireModel: TireModel;
  restoreTireSize: TireSize;
  restoreUnit: Unit;
  updateAddress: Address;
  updateCity: City;
  updateContact: Contact;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeletePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreCountryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestorePersonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};


export type MutationUpdateCityArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCityInput;
};


export type MutationUpdateContactArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContactInput;
};

export type PaginatedAddress = {
  __typename?: 'PaginatedAddress';
  data: Array<Address>;
  meta: PaginationMeta;
};

export type PaginatedBrand = {
  __typename?: 'PaginatedBrand';
  data: Array<Brand>;
  meta: PaginationMeta;
};

export type PaginatedBusinessCategory = {
  __typename?: 'PaginatedBusinessCategory';
  data: Array<BusinessCategory>;
  meta: PaginationMeta;
};

export type PaginatedBusinessSubCategory = {
  __typename?: 'PaginatedBusinessSubCategory';
  data: Array<BusinessSubCategory>;
  meta: PaginationMeta;
};

export type PaginatedCity = {
  __typename?: 'PaginatedCity';
  data: Array<City>;
  meta: PaginationMeta;
};

export type PaginatedCompany = {
  __typename?: 'PaginatedCompany';
  data: Array<Company>;
  meta: PaginationMeta;
};

export type PaginatedContact = {
  __typename?: 'PaginatedContact';
  data: Array<Contact>;
  meta: PaginationMeta;
};

export type PaginatedCountry = {
  __typename?: 'PaginatedCountry';
  data: Array<Country>;
  meta: PaginationMeta;
};

export type PaginatedEmployee = {
  __typename?: 'PaginatedEmployee';
  data: Array<Employee>;
  meta: PaginationMeta;
};

export type PaginatedEmployeeCategory = {
  __typename?: 'PaginatedEmployeeCategory';
  data: Array<EmployeeCategory>;
  meta: PaginationMeta;
};

export type PaginatedEmployeePosition = {
  __typename?: 'PaginatedEmployeePosition';
  data: Array<EmployeePosition>;
  meta: PaginationMeta;
};

export type PaginatedEquipment = {
  __typename?: 'PaginatedEquipment';
  data: Array<Equipment>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentCategory = {
  __typename?: 'PaginatedEquipmentCategory';
  data: Array<EquipmentCategory>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentModel = {
  __typename?: 'PaginatedEquipmentModel';
  data: Array<EquipmentModel>;
  meta: PaginationMeta;
};

export type PaginatedEquipmentType = {
  __typename?: 'PaginatedEquipmentType';
  data: Array<EquipmentType>;
  meta: PaginationMeta;
};

export type PaginatedHistoryLog = {
  __typename?: 'PaginatedHistoryLog';
  data: Array<HistoryLog>;
  meta: PaginationMeta;
};

export type PaginatedInspection = {
  __typename?: 'PaginatedInspection';
  data: Array<Inspection>;
  meta: PaginationMeta;
};

export type PaginatedPerson = {
  __typename?: 'PaginatedPerson';
  data: Array<Person>;
  meta: PaginationMeta;
};

export type PaginatedProvince = {
  __typename?: 'PaginatedProvince';
  data: Array<Province>;
  meta: PaginationMeta;
};

export type PaginatedTire = {
  __typename?: 'PaginatedTire';
  data: Array<Tire>;
  meta: PaginationMeta;
};

export type PaginatedTireModel = {
  __typename?: 'PaginatedTireModel';
  data: Array<TireModel>;
  meta: PaginationMeta;
};

export type PaginatedTireSize = {
  __typename?: 'PaginatedTireSize';
  data: Array<TireSize>;
  meta: PaginationMeta;
};

export type PaginatedUnit = {
  __typename?: 'PaginatedUnit';
  data: Array<Unit>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Person = {
  __typename?: 'Person';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  contacts?: Maybe<Array<Contact>>;
  cuil?: Maybe<Scalars['String']['output']>;
  dni: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<MaritalStatus>;
  status: PersonStatus;
};

export enum PersonStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Province = {
  __typename?: 'Province';
  cities?: Maybe<Array<City>>;
  country?: Maybe<Country>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAddresses: PaginatedAddress;
  findAllAddresss: Array<Address>;
  findAllBrands: PaginatedBrand;
  findAllBusinessCategories: PaginatedBusinessCategory;
  findAllBusinessCategorys: Array<BusinessCategory>;
  findAllBusinessSubCategories: PaginatedBusinessSubCategory;
  findAllBusinessSubCategorys: Array<BusinessSubCategory>;
  findAllCitys: Array<City>;
  findAllCompanies: PaginatedCompany;
  findAllCompanys: Array<Company>;
  findAllContacts: Array<Contact>;
  findAllCountrys: Array<Country>;
  findAllEmployeeCategories: PaginatedEmployeeCategory;
  findAllEmployeeCategorys: Array<EmployeeCategory>;
  findAllEmployeePositions: PaginatedEmployeePosition;
  findAllEmployees: PaginatedEmployee;
  findAllEquipment: PaginatedEquipment;
  findAllEquipmentCategories: PaginatedEquipmentCategory;
  findAllEquipmentCategorys: Array<EquipmentCategory>;
  findAllEquipmentModels: PaginatedEquipmentModel;
  findAllEquipmentTypes: PaginatedEquipmentType;
  findAllEquipments: Array<Equipment>;
  findAllHistoryLogs: PaginatedHistoryLog;
  findAllInspections: PaginatedInspection;
  findAllPersons: PaginatedPerson;
  findAllProvinces: Array<Province>;
  findAllTireModels: PaginatedTireModel;
  findAllTireSizes: PaginatedTireSize;
  findAllTires: PaginatedTire;
  findAllUnits: PaginatedUnit;
  findCities: PaginatedCity;
  findContacts: PaginatedContact;
  findCountries: PaginatedCountry;
  findOneAddress: Address;
  findOneBrand: Brand;
  findOneBusinessCategory: BusinessCategory;
  findOneBusinessSubCategory: BusinessSubCategory;
  findOneCity: City;
  findOneCompany: Company;
  findOneContact: Contact;
  findOneCountry: Country;
  findOneEmployee: Employee;
  findOneEmployeeCategory: EmployeeCategory;
  findOneEmployeePosition: EmployeePosition;
  findOneEquipment: Equipment;
  findOneEquipmentCategory: EquipmentCategory;
  findOneEquipmentModel: EquipmentModel;
  findOneEquipmentType: EquipmentType;
  findOneHistoryLog: HistoryLog;
  findOneInspection: Inspection;
  findOnePerson: Person;
  findOneProvince: Province;
  findOneTire: Tire;
  findOneTireModel: TireModel;
  findOneTireSize: TireSize;
  findOneUnit: Unit;
  findProvinces: PaginatedProvince;
};


export type QueryFindAddressesArgs = {
  filter?: InputMaybe<AddressFilterInput>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllAddresssArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBrandsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessSubCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllBusinessSubCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCitysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCompaniesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCompanysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllContactsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllCountrysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeeCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeeCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeePositionsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEmployeesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentArgs = {
  filter?: InputMaybe<EquipmentFilterInput>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentCategorysArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentModelsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentTypesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllEquipmentsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllHistoryLogsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllInspectionsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllPersonsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTireModelsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTireSizesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTiresArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllUnitsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCitiesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindContactsArgs = {
  filter?: InputMaybe<ContactFilterInput>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCountriesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindOneAddressArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBusinessCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneBusinessSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneContactArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneCountryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeeCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEmployeePositionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneHistoryLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOnePersonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneProvinceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUnitArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};

export enum SeverityLevel {
  Critical = 'CRITICAL',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type Tire = {
  __typename?: 'Tire';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastRecapAt?: Maybe<Scalars['DateTime']['output']>;
  lastRecapId?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<TireModel>;
  modelId: Scalars['Int']['output'];
  position?: Maybe<TirePosition>;
  recapCount?: Maybe<Scalars['Int']['output']>;
  serialNumber: Scalars['String']['output'];
  status: TireStatus;
  totalKm?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TireModel = {
  __typename?: 'TireModel';
  brand?: Maybe<Brand>;
  brandId: Scalars['Int']['output'];
  construction?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  loadIndex?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  plyRating?: Maybe<Scalars['String']['output']>;
  size?: Maybe<TireSize>;
  sizeId: Scalars['Int']['output'];
  speedSymbol?: Maybe<Scalars['String']['output']>;
  treadPattern?: Maybe<Scalars['String']['output']>;
};

export enum TirePosition {
  Dd = 'DD',
  Di = 'DI',
  E1D = 'E1D',
  E1Dd = 'E1DD',
  E1Di = 'E1DI',
  E1I = 'E1I',
  E1Id = 'E1ID',
  E1Ii = 'E1II',
  E2D = 'E2D',
  E2Dd = 'E2DD',
  E2Di = 'E2DI',
  E2I = 'E2I',
  E2Id = 'E2ID',
  E2Ii = 'E2II',
  E3D = 'E3D',
  E3Dd = 'E3DD',
  E3Di = 'E3DI',
  E3I = 'E3I',
  E3Id = 'E3ID',
  E3Ii = 'E3II',
  E4D = 'E4D',
  E4Dd = 'E4DD',
  E4Di = 'E4DI',
  E4I = 'E4I',
  E4Id = 'E4ID',
  E4Ii = 'E4II',
  Spare = 'SPARE',
  Unknown = 'UNKNOWN'
}

export type TireSize = {
  __typename?: 'TireSize';
  aspectRatio?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  information?: Maybe<Scalars['String']['output']>;
  mainCode: Scalars['String']['output'];
  rimDiameter?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum TireStatus {
  Discarded = 'DISCARDED',
  InStock = 'IN_STOCK',
  InUse = 'IN_USE',
  Recap = 'RECAP',
  UnderRepair = 'UNDER_REPAIR'
}

export type Unit = {
  __typename?: 'Unit';
  abbreviation: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type UpdateAddressInput = {
  apartment?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  provinceId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateContactInput = {
  information?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContactType>;
  value?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressFilterInput: AddressFilterInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Brand: ResolverTypeWrapper<Brand>;
  BusinessCategory: ResolverTypeWrapper<BusinessCategory>;
  BusinessSubCategory: ResolverTypeWrapper<BusinessSubCategory>;
  City: ResolverTypeWrapper<City>;
  Company: ResolverTypeWrapper<Company>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactFilterInput: ContactFilterInput;
  ContactType: ContactType;
  Country: ResolverTypeWrapper<Country>;
  CreateAddressInput: CreateAddressInput;
  CreateCityInput: CreateCityInput;
  CreateContactInput: CreateContactInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeCategory: ResolverTypeWrapper<EmployeeCategory>;
  EmployeePosition: ResolverTypeWrapper<EmployeePosition>;
  EmployeeStatus: EmployeeStatus;
  Equipment: ResolverTypeWrapper<Equipment>;
  EquipmentCategory: ResolverTypeWrapper<EquipmentCategory>;
  EquipmentFilterInput: EquipmentFilterInput;
  EquipmentModel: ResolverTypeWrapper<EquipmentModel>;
  EquipmentStatus: EquipmentStatus;
  EquipmentType: ResolverTypeWrapper<EquipmentType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FuelType: FuelType;
  Gender: Gender;
  HistoryLog: ResolverTypeWrapper<HistoryLog>;
  HistoryType: HistoryType;
  Inspection: ResolverTypeWrapper<Inspection>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MaritalStatus: MaritalStatus;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaginatedAddress: ResolverTypeWrapper<PaginatedAddress>;
  PaginatedBrand: ResolverTypeWrapper<PaginatedBrand>;
  PaginatedBusinessCategory: ResolverTypeWrapper<PaginatedBusinessCategory>;
  PaginatedBusinessSubCategory: ResolverTypeWrapper<PaginatedBusinessSubCategory>;
  PaginatedCity: ResolverTypeWrapper<PaginatedCity>;
  PaginatedCompany: ResolverTypeWrapper<PaginatedCompany>;
  PaginatedContact: ResolverTypeWrapper<PaginatedContact>;
  PaginatedCountry: ResolverTypeWrapper<PaginatedCountry>;
  PaginatedEmployee: ResolverTypeWrapper<PaginatedEmployee>;
  PaginatedEmployeeCategory: ResolverTypeWrapper<PaginatedEmployeeCategory>;
  PaginatedEmployeePosition: ResolverTypeWrapper<PaginatedEmployeePosition>;
  PaginatedEquipment: ResolverTypeWrapper<PaginatedEquipment>;
  PaginatedEquipmentCategory: ResolverTypeWrapper<PaginatedEquipmentCategory>;
  PaginatedEquipmentModel: ResolverTypeWrapper<PaginatedEquipmentModel>;
  PaginatedEquipmentType: ResolverTypeWrapper<PaginatedEquipmentType>;
  PaginatedHistoryLog: ResolverTypeWrapper<PaginatedHistoryLog>;
  PaginatedInspection: ResolverTypeWrapper<PaginatedInspection>;
  PaginatedPerson: ResolverTypeWrapper<PaginatedPerson>;
  PaginatedProvince: ResolverTypeWrapper<PaginatedProvince>;
  PaginatedTire: ResolverTypeWrapper<PaginatedTire>;
  PaginatedTireModel: ResolverTypeWrapper<PaginatedTireModel>;
  PaginatedTireSize: ResolverTypeWrapper<PaginatedTireSize>;
  PaginatedUnit: ResolverTypeWrapper<PaginatedUnit>;
  PaginationMeta: ResolverTypeWrapper<PaginationMeta>;
  Person: ResolverTypeWrapper<Person>;
  PersonStatus: PersonStatus;
  Province: ResolverTypeWrapper<Province>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SeverityLevel: SeverityLevel;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tire: ResolverTypeWrapper<Tire>;
  TireModel: ResolverTypeWrapper<TireModel>;
  TirePosition: TirePosition;
  TireSize: ResolverTypeWrapper<TireSize>;
  TireStatus: TireStatus;
  Unit: ResolverTypeWrapper<Unit>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCityInput: UpdateCityInput;
  UpdateContactInput: UpdateContactInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressFilterInput: AddressFilterInput;
  Boolean: Scalars['Boolean']['output'];
  Brand: Brand;
  BusinessCategory: BusinessCategory;
  BusinessSubCategory: BusinessSubCategory;
  City: City;
  Company: Company;
  Contact: Contact;
  ContactFilterInput: ContactFilterInput;
  Country: Country;
  CreateAddressInput: CreateAddressInput;
  CreateCityInput: CreateCityInput;
  CreateContactInput: CreateContactInput;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  EmployeeCategory: EmployeeCategory;
  EmployeePosition: EmployeePosition;
  Equipment: Equipment;
  EquipmentCategory: EquipmentCategory;
  EquipmentFilterInput: EquipmentFilterInput;
  EquipmentModel: EquipmentModel;
  EquipmentType: EquipmentType;
  Float: Scalars['Float']['output'];
  HistoryLog: HistoryLog;
  Inspection: Inspection;
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  PaginatedAddress: PaginatedAddress;
  PaginatedBrand: PaginatedBrand;
  PaginatedBusinessCategory: PaginatedBusinessCategory;
  PaginatedBusinessSubCategory: PaginatedBusinessSubCategory;
  PaginatedCity: PaginatedCity;
  PaginatedCompany: PaginatedCompany;
  PaginatedContact: PaginatedContact;
  PaginatedCountry: PaginatedCountry;
  PaginatedEmployee: PaginatedEmployee;
  PaginatedEmployeeCategory: PaginatedEmployeeCategory;
  PaginatedEmployeePosition: PaginatedEmployeePosition;
  PaginatedEquipment: PaginatedEquipment;
  PaginatedEquipmentCategory: PaginatedEquipmentCategory;
  PaginatedEquipmentModel: PaginatedEquipmentModel;
  PaginatedEquipmentType: PaginatedEquipmentType;
  PaginatedHistoryLog: PaginatedHistoryLog;
  PaginatedInspection: PaginatedInspection;
  PaginatedPerson: PaginatedPerson;
  PaginatedProvince: PaginatedProvince;
  PaginatedTire: PaginatedTire;
  PaginatedTireModel: PaginatedTireModel;
  PaginatedTireSize: PaginatedTireSize;
  PaginatedUnit: PaginatedUnit;
  PaginationMeta: PaginationMeta;
  Person: Person;
  Province: Province;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Tire: Tire;
  TireModel: TireModel;
  TireSize: TireSize;
  Unit: Unit;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCityInput: UpdateCityInput;
  UpdateContactInput: UpdateContactInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  apartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  floor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  neighborhood?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type BrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['Brand'] = ResolversParentTypes['Brand']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type BusinessCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessCategory'] = ResolversParentTypes['BusinessCategory']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subCategories?: Resolver<Maybe<Array<ResolversTypes['BusinessSubCategory']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type BusinessSubCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessSubCategory'] = ResolversParentTypes['BusinessSubCategory']> = {
  businessCategoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  addresses?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['Province']>, ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  businessCategory?: Resolver<Maybe<ResolversTypes['BusinessCategory']>, ParentType, ContextType>;
  businessCategoryId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  businessName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  cuit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ContactType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provinces?: Resolver<Maybe<Array<ResolversTypes['Province']>>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  category?: Resolver<Maybe<ResolversTypes['EmployeeCategory']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  employeeCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hireDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  personId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['EmployeePosition']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EmployeeStatus'], ParentType, ContextType>;
};

export type EmployeeCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeCategory'] = ResolversParentTypes['EmployeeCategory']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type EmployeePositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeePosition'] = ResolversParentTypes['EmployeePosition']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  category?: Resolver<Maybe<ResolversTypes['EquipmentCategory']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  chassis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  engine?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fuelType?: Resolver<Maybe<ResolversTypes['FuelType']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  internalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  licensePlate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['EquipmentModel']>, ParentType, ContextType>;
  modelId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EquipmentStatus'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EquipmentType']>, ParentType, ContextType>;
  typeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type EquipmentCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentCategory'] = ResolversParentTypes['EquipmentCategory']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type EquipmentModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentModel'] = ResolversParentTypes['EquipmentModel']> = {
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
  brandId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EquipmentType']>, ParentType, ContextType>;
  typeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type EquipmentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentType'] = ResolversParentTypes['EquipmentType']> = {
  category?: Resolver<Maybe<ResolversTypes['EquipmentCategory']>, ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type HistoryLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryLog'] = ResolversParentTypes['HistoryLog']> = {
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  employeeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  equipmentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  eventDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  personId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  severity?: Resolver<ResolversTypes['SeverityLevel'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['HistoryType'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type InspectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inspection'] = ResolversParentTypes['Inspection']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  equipmentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inspectionTypeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'input'>>;
  createCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationCreateCityArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  deleteAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationDeleteAddressArgs, 'id'>>;
  deleteCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationDeleteCityArgs, 'id'>>;
  deleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  hardDeleteAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationHardDeleteAddressArgs, 'id'>>;
  hardDeleteBrand?: Resolver<ResolversTypes['Brand'], ParentType, ContextType, RequireFields<MutationHardDeleteBrandArgs, 'id'>>;
  hardDeleteBusinessCategory?: Resolver<ResolversTypes['BusinessCategory'], ParentType, ContextType, RequireFields<MutationHardDeleteBusinessCategoryArgs, 'id'>>;
  hardDeleteBusinessSubCategory?: Resolver<ResolversTypes['BusinessSubCategory'], ParentType, ContextType, RequireFields<MutationHardDeleteBusinessSubCategoryArgs, 'id'>>;
  hardDeleteCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationHardDeleteCityArgs, 'id'>>;
  hardDeleteCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationHardDeleteCompanyArgs, 'id'>>;
  hardDeleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationHardDeleteContactArgs, 'id'>>;
  hardDeleteCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationHardDeleteCountryArgs, 'id'>>;
  hardDeleteEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationHardDeleteEmployeeArgs, 'id'>>;
  hardDeleteEmployeeCategory?: Resolver<ResolversTypes['EmployeeCategory'], ParentType, ContextType, RequireFields<MutationHardDeleteEmployeeCategoryArgs, 'id'>>;
  hardDeleteEmployeePosition?: Resolver<ResolversTypes['EmployeePosition'], ParentType, ContextType, RequireFields<MutationHardDeleteEmployeePositionArgs, 'id'>>;
  hardDeleteEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentArgs, 'id'>>;
  hardDeleteEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentCategoryArgs, 'id'>>;
  hardDeleteEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentModelArgs, 'id'>>;
  hardDeleteEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentTypeArgs, 'id'>>;
  hardDeleteHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<MutationHardDeleteHistoryLogArgs, 'id'>>;
  hardDeleteInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<MutationHardDeleteInspectionArgs, 'id'>>;
  hardDeletePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationHardDeletePersonArgs, 'id'>>;
  hardDeleteProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<MutationHardDeleteProvinceArgs, 'id'>>;
  hardDeleteTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<MutationHardDeleteTireArgs, 'id'>>;
  hardDeleteTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<MutationHardDeleteTireModelArgs, 'id'>>;
  hardDeleteTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<MutationHardDeleteTireSizeArgs, 'id'>>;
  hardDeleteUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<MutationHardDeleteUnitArgs, 'id'>>;
  removeAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationRemoveAddressArgs, 'id'>>;
  removeBrand?: Resolver<ResolversTypes['Brand'], ParentType, ContextType, RequireFields<MutationRemoveBrandArgs, 'id'>>;
  removeBusinessCategory?: Resolver<ResolversTypes['BusinessCategory'], ParentType, ContextType, RequireFields<MutationRemoveBusinessCategoryArgs, 'id'>>;
  removeBusinessSubCategory?: Resolver<ResolversTypes['BusinessSubCategory'], ParentType, ContextType, RequireFields<MutationRemoveBusinessSubCategoryArgs, 'id'>>;
  removeCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationRemoveCityArgs, 'id'>>;
  removeCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationRemoveCompanyArgs, 'id'>>;
  removeContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationRemoveContactArgs, 'id'>>;
  removeCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationRemoveCountryArgs, 'id'>>;
  removeEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationRemoveEmployeeArgs, 'id'>>;
  removeEmployeeCategory?: Resolver<ResolversTypes['EmployeeCategory'], ParentType, ContextType, RequireFields<MutationRemoveEmployeeCategoryArgs, 'id'>>;
  removeEmployeePosition?: Resolver<ResolversTypes['EmployeePosition'], ParentType, ContextType, RequireFields<MutationRemoveEmployeePositionArgs, 'id'>>;
  removeEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentArgs, 'id'>>;
  removeEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentCategoryArgs, 'id'>>;
  removeEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentModelArgs, 'id'>>;
  removeEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentTypeArgs, 'id'>>;
  removeHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<MutationRemoveHistoryLogArgs, 'id'>>;
  removeInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<MutationRemoveInspectionArgs, 'id'>>;
  removePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationRemovePersonArgs, 'id'>>;
  removeProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<MutationRemoveProvinceArgs, 'id'>>;
  removeTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<MutationRemoveTireArgs, 'id'>>;
  removeTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<MutationRemoveTireModelArgs, 'id'>>;
  removeTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<MutationRemoveTireSizeArgs, 'id'>>;
  removeUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<MutationRemoveUnitArgs, 'id'>>;
  restoreAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationRestoreAddressArgs, 'id'>>;
  restoreBrand?: Resolver<ResolversTypes['Brand'], ParentType, ContextType, RequireFields<MutationRestoreBrandArgs, 'id'>>;
  restoreBusinessCategory?: Resolver<ResolversTypes['BusinessCategory'], ParentType, ContextType, RequireFields<MutationRestoreBusinessCategoryArgs, 'id'>>;
  restoreBusinessSubCategory?: Resolver<ResolversTypes['BusinessSubCategory'], ParentType, ContextType, RequireFields<MutationRestoreBusinessSubCategoryArgs, 'id'>>;
  restoreCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationRestoreCityArgs, 'id'>>;
  restoreCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationRestoreCompanyArgs, 'id'>>;
  restoreContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationRestoreContactArgs, 'id'>>;
  restoreCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<MutationRestoreCountryArgs, 'id'>>;
  restoreEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationRestoreEmployeeArgs, 'id'>>;
  restoreEmployeeCategory?: Resolver<ResolversTypes['EmployeeCategory'], ParentType, ContextType, RequireFields<MutationRestoreEmployeeCategoryArgs, 'id'>>;
  restoreEmployeePosition?: Resolver<ResolversTypes['EmployeePosition'], ParentType, ContextType, RequireFields<MutationRestoreEmployeePositionArgs, 'id'>>;
  restoreEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentArgs, 'id'>>;
  restoreEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentCategoryArgs, 'id'>>;
  restoreEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentModelArgs, 'id'>>;
  restoreEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentTypeArgs, 'id'>>;
  restoreHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<MutationRestoreHistoryLogArgs, 'id'>>;
  restoreInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<MutationRestoreInspectionArgs, 'id'>>;
  restorePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationRestorePersonArgs, 'id'>>;
  restoreProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<MutationRestoreProvinceArgs, 'id'>>;
  restoreTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<MutationRestoreTireArgs, 'id'>>;
  restoreTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<MutationRestoreTireModelArgs, 'id'>>;
  restoreTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<MutationRestoreTireSizeArgs, 'id'>>;
  restoreUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<MutationRestoreUnitArgs, 'id'>>;
  updateAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'id' | 'input'>>;
  updateCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationUpdateCityArgs, 'id' | 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'id' | 'input'>>;
};

export type PaginatedAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedAddress'] = ResolversParentTypes['PaginatedAddress']> = {
  data?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedBrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedBrand'] = ResolversParentTypes['PaginatedBrand']> = {
  data?: Resolver<Array<ResolversTypes['Brand']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedBusinessCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedBusinessCategory'] = ResolversParentTypes['PaginatedBusinessCategory']> = {
  data?: Resolver<Array<ResolversTypes['BusinessCategory']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedBusinessSubCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedBusinessSubCategory'] = ResolversParentTypes['PaginatedBusinessSubCategory']> = {
  data?: Resolver<Array<ResolversTypes['BusinessSubCategory']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedCityResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedCity'] = ResolversParentTypes['PaginatedCity']> = {
  data?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedCompany'] = ResolversParentTypes['PaginatedCompany']> = {
  data?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedContact'] = ResolversParentTypes['PaginatedContact']> = {
  data?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedCountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedCountry'] = ResolversParentTypes['PaginatedCountry']> = {
  data?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEmployee'] = ResolversParentTypes['PaginatedEmployee']> = {
  data?: Resolver<Array<ResolversTypes['Employee']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEmployeeCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEmployeeCategory'] = ResolversParentTypes['PaginatedEmployeeCategory']> = {
  data?: Resolver<Array<ResolversTypes['EmployeeCategory']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEmployeePositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEmployeePosition'] = ResolversParentTypes['PaginatedEmployeePosition']> = {
  data?: Resolver<Array<ResolversTypes['EmployeePosition']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEquipment'] = ResolversParentTypes['PaginatedEquipment']> = {
  data?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEquipmentCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEquipmentCategory'] = ResolversParentTypes['PaginatedEquipmentCategory']> = {
  data?: Resolver<Array<ResolversTypes['EquipmentCategory']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEquipmentModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEquipmentModel'] = ResolversParentTypes['PaginatedEquipmentModel']> = {
  data?: Resolver<Array<ResolversTypes['EquipmentModel']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedEquipmentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedEquipmentType'] = ResolversParentTypes['PaginatedEquipmentType']> = {
  data?: Resolver<Array<ResolversTypes['EquipmentType']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedHistoryLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedHistoryLog'] = ResolversParentTypes['PaginatedHistoryLog']> = {
  data?: Resolver<Array<ResolversTypes['HistoryLog']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedInspectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedInspection'] = ResolversParentTypes['PaginatedInspection']> = {
  data?: Resolver<Array<ResolversTypes['Inspection']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedPersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedPerson'] = ResolversParentTypes['PaginatedPerson']> = {
  data?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedProvinceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedProvince'] = ResolversParentTypes['PaginatedProvince']> = {
  data?: Resolver<Array<ResolversTypes['Province']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedTireResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTire'] = ResolversParentTypes['PaginatedTire']> = {
  data?: Resolver<Array<ResolversTypes['Tire']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedTireModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTireModel'] = ResolversParentTypes['PaginatedTireModel']> = {
  data?: Resolver<Array<ResolversTypes['TireModel']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedTireSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTireSize'] = ResolversParentTypes['PaginatedTireSize']> = {
  data?: Resolver<Array<ResolversTypes['TireSize']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginatedUnitResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedUnit'] = ResolversParentTypes['PaginatedUnit']> = {
  data?: Resolver<Array<ResolversTypes['Unit']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['PaginationMeta'], ParentType, ContextType>;
};

export type PaginationMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationMeta'] = ResolversParentTypes['PaginationMeta']> = {
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  birthDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType>;
  cuil?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dni?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maritalStatus?: Resolver<Maybe<ResolversTypes['MaritalStatus']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PersonStatus'], ParentType, ContextType>;
};

export type ProvinceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Province'] = ResolversParentTypes['Province']> = {
  cities?: Resolver<Maybe<Array<ResolversTypes['City']>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findAddresses?: Resolver<ResolversTypes['PaginatedAddress'], ParentType, ContextType, RequireFields<QueryFindAddressesArgs, 'skip' | 'take'>>;
  findAllAddresss?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryFindAllAddresssArgs, 'skip' | 'take'>>;
  findAllBrands?: Resolver<ResolversTypes['PaginatedBrand'], ParentType, ContextType, RequireFields<QueryFindAllBrandsArgs, 'skip' | 'take'>>;
  findAllBusinessCategories?: Resolver<ResolversTypes['PaginatedBusinessCategory'], ParentType, ContextType, RequireFields<QueryFindAllBusinessCategoriesArgs, 'skip' | 'take'>>;
  findAllBusinessCategorys?: Resolver<Array<ResolversTypes['BusinessCategory']>, ParentType, ContextType, RequireFields<QueryFindAllBusinessCategorysArgs, 'skip' | 'take'>>;
  findAllBusinessSubCategories?: Resolver<ResolversTypes['PaginatedBusinessSubCategory'], ParentType, ContextType, RequireFields<QueryFindAllBusinessSubCategoriesArgs, 'skip' | 'take'>>;
  findAllBusinessSubCategorys?: Resolver<Array<ResolversTypes['BusinessSubCategory']>, ParentType, ContextType, RequireFields<QueryFindAllBusinessSubCategorysArgs, 'skip' | 'take'>>;
  findAllCitys?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryFindAllCitysArgs, 'skip' | 'take'>>;
  findAllCompanies?: Resolver<ResolversTypes['PaginatedCompany'], ParentType, ContextType, RequireFields<QueryFindAllCompaniesArgs, 'skip' | 'take'>>;
  findAllCompanys?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryFindAllCompanysArgs, 'skip' | 'take'>>;
  findAllContacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryFindAllContactsArgs, 'skip' | 'take'>>;
  findAllCountrys?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryFindAllCountrysArgs, 'skip' | 'take'>>;
  findAllEmployeeCategories?: Resolver<ResolversTypes['PaginatedEmployeeCategory'], ParentType, ContextType, RequireFields<QueryFindAllEmployeeCategoriesArgs, 'skip' | 'take'>>;
  findAllEmployeeCategorys?: Resolver<Array<ResolversTypes['EmployeeCategory']>, ParentType, ContextType, RequireFields<QueryFindAllEmployeeCategorysArgs, 'skip' | 'take'>>;
  findAllEmployeePositions?: Resolver<ResolversTypes['PaginatedEmployeePosition'], ParentType, ContextType, RequireFields<QueryFindAllEmployeePositionsArgs, 'skip' | 'take'>>;
  findAllEmployees?: Resolver<ResolversTypes['PaginatedEmployee'], ParentType, ContextType, RequireFields<QueryFindAllEmployeesArgs, 'skip' | 'take'>>;
  findAllEquipment?: Resolver<ResolversTypes['PaginatedEquipment'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentArgs, 'skip' | 'take'>>;
  findAllEquipmentCategories?: Resolver<ResolversTypes['PaginatedEquipmentCategory'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentCategoriesArgs, 'skip' | 'take'>>;
  findAllEquipmentCategorys?: Resolver<Array<ResolversTypes['EquipmentCategory']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentCategorysArgs, 'skip' | 'take'>>;
  findAllEquipmentModels?: Resolver<ResolversTypes['PaginatedEquipmentModel'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentModelsArgs, 'skip' | 'take'>>;
  findAllEquipmentTypes?: Resolver<ResolversTypes['PaginatedEquipmentType'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentTypesArgs, 'skip' | 'take'>>;
  findAllEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentsArgs, 'skip' | 'take'>>;
  findAllHistoryLogs?: Resolver<ResolversTypes['PaginatedHistoryLog'], ParentType, ContextType, RequireFields<QueryFindAllHistoryLogsArgs, 'skip' | 'take'>>;
  findAllInspections?: Resolver<ResolversTypes['PaginatedInspection'], ParentType, ContextType, RequireFields<QueryFindAllInspectionsArgs, 'skip' | 'take'>>;
  findAllPersons?: Resolver<ResolversTypes['PaginatedPerson'], ParentType, ContextType, RequireFields<QueryFindAllPersonsArgs, 'skip' | 'take'>>;
  findAllProvinces?: Resolver<Array<ResolversTypes['Province']>, ParentType, ContextType, RequireFields<QueryFindAllProvincesArgs, 'skip' | 'take'>>;
  findAllTireModels?: Resolver<ResolversTypes['PaginatedTireModel'], ParentType, ContextType, RequireFields<QueryFindAllTireModelsArgs, 'skip' | 'take'>>;
  findAllTireSizes?: Resolver<ResolversTypes['PaginatedTireSize'], ParentType, ContextType, RequireFields<QueryFindAllTireSizesArgs, 'skip' | 'take'>>;
  findAllTires?: Resolver<ResolversTypes['PaginatedTire'], ParentType, ContextType, RequireFields<QueryFindAllTiresArgs, 'skip' | 'take'>>;
  findAllUnits?: Resolver<ResolversTypes['PaginatedUnit'], ParentType, ContextType, RequireFields<QueryFindAllUnitsArgs, 'skip' | 'take'>>;
  findCities?: Resolver<ResolversTypes['PaginatedCity'], ParentType, ContextType, RequireFields<QueryFindCitiesArgs, 'skip' | 'take'>>;
  findContacts?: Resolver<ResolversTypes['PaginatedContact'], ParentType, ContextType, RequireFields<QueryFindContactsArgs, 'skip' | 'take'>>;
  findCountries?: Resolver<ResolversTypes['PaginatedCountry'], ParentType, ContextType, RequireFields<QueryFindCountriesArgs, 'skip' | 'take'>>;
  findOneAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryFindOneAddressArgs, 'id'>>;
  findOneBrand?: Resolver<ResolversTypes['Brand'], ParentType, ContextType, RequireFields<QueryFindOneBrandArgs, 'id'>>;
  findOneBusinessCategory?: Resolver<ResolversTypes['BusinessCategory'], ParentType, ContextType, RequireFields<QueryFindOneBusinessCategoryArgs, 'id'>>;
  findOneBusinessSubCategory?: Resolver<ResolversTypes['BusinessSubCategory'], ParentType, ContextType, RequireFields<QueryFindOneBusinessSubCategoryArgs, 'id'>>;
  findOneCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<QueryFindOneCityArgs, 'id'>>;
  findOneCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryFindOneCompanyArgs, 'id'>>;
  findOneContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<QueryFindOneContactArgs, 'id'>>;
  findOneCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType, RequireFields<QueryFindOneCountryArgs, 'id'>>;
  findOneEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<QueryFindOneEmployeeArgs, 'id'>>;
  findOneEmployeeCategory?: Resolver<ResolversTypes['EmployeeCategory'], ParentType, ContextType, RequireFields<QueryFindOneEmployeeCategoryArgs, 'id'>>;
  findOneEmployeePosition?: Resolver<ResolversTypes['EmployeePosition'], ParentType, ContextType, RequireFields<QueryFindOneEmployeePositionArgs, 'id'>>;
  findOneEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<QueryFindOneEquipmentArgs, 'id'>>;
  findOneEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<QueryFindOneEquipmentCategoryArgs, 'id'>>;
  findOneEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<QueryFindOneEquipmentModelArgs, 'id'>>;
  findOneEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<QueryFindOneEquipmentTypeArgs, 'id'>>;
  findOneHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<QueryFindOneHistoryLogArgs, 'id'>>;
  findOneInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<QueryFindOneInspectionArgs, 'id'>>;
  findOnePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<QueryFindOnePersonArgs, 'id'>>;
  findOneProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<QueryFindOneProvinceArgs, 'id'>>;
  findOneTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<QueryFindOneTireArgs, 'id'>>;
  findOneTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<QueryFindOneTireModelArgs, 'id'>>;
  findOneTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<QueryFindOneTireSizeArgs, 'id'>>;
  findOneUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<QueryFindOneUnitArgs, 'id'>>;
  findProvinces?: Resolver<ResolversTypes['PaginatedProvince'], ParentType, ContextType, RequireFields<QueryFindProvincesArgs, 'skip' | 'take'>>;
};

export type TireResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tire'] = ResolversParentTypes['Tire']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastRecapAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastRecapId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['TireModel']>, ParentType, ContextType>;
  modelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['TirePosition']>, ParentType, ContextType>;
  recapCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TireStatus'], ParentType, ContextType>;
  totalKm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type TireModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireModel'] = ResolversParentTypes['TireModel']> = {
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
  brandId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  construction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loadIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plyRating?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['TireSize']>, ParentType, ContextType>;
  sizeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  speedSymbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treadPattern?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TireSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireSize'] = ResolversParentTypes['TireSize']> = {
  aspectRatio?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rimDiameter?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type UnitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Unit'] = ResolversParentTypes['Unit']> = {
  abbreviation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  BusinessCategory?: BusinessCategoryResolvers<ContextType>;
  BusinessSubCategory?: BusinessSubCategoryResolvers<ContextType>;
  City?: CityResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Employee?: EmployeeResolvers<ContextType>;
  EmployeeCategory?: EmployeeCategoryResolvers<ContextType>;
  EmployeePosition?: EmployeePositionResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  EquipmentCategory?: EquipmentCategoryResolvers<ContextType>;
  EquipmentModel?: EquipmentModelResolvers<ContextType>;
  EquipmentType?: EquipmentTypeResolvers<ContextType>;
  HistoryLog?: HistoryLogResolvers<ContextType>;
  Inspection?: InspectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedAddress?: PaginatedAddressResolvers<ContextType>;
  PaginatedBrand?: PaginatedBrandResolvers<ContextType>;
  PaginatedBusinessCategory?: PaginatedBusinessCategoryResolvers<ContextType>;
  PaginatedBusinessSubCategory?: PaginatedBusinessSubCategoryResolvers<ContextType>;
  PaginatedCity?: PaginatedCityResolvers<ContextType>;
  PaginatedCompany?: PaginatedCompanyResolvers<ContextType>;
  PaginatedContact?: PaginatedContactResolvers<ContextType>;
  PaginatedCountry?: PaginatedCountryResolvers<ContextType>;
  PaginatedEmployee?: PaginatedEmployeeResolvers<ContextType>;
  PaginatedEmployeeCategory?: PaginatedEmployeeCategoryResolvers<ContextType>;
  PaginatedEmployeePosition?: PaginatedEmployeePositionResolvers<ContextType>;
  PaginatedEquipment?: PaginatedEquipmentResolvers<ContextType>;
  PaginatedEquipmentCategory?: PaginatedEquipmentCategoryResolvers<ContextType>;
  PaginatedEquipmentModel?: PaginatedEquipmentModelResolvers<ContextType>;
  PaginatedEquipmentType?: PaginatedEquipmentTypeResolvers<ContextType>;
  PaginatedHistoryLog?: PaginatedHistoryLogResolvers<ContextType>;
  PaginatedInspection?: PaginatedInspectionResolvers<ContextType>;
  PaginatedPerson?: PaginatedPersonResolvers<ContextType>;
  PaginatedProvince?: PaginatedProvinceResolvers<ContextType>;
  PaginatedTire?: PaginatedTireResolvers<ContextType>;
  PaginatedTireModel?: PaginatedTireModelResolvers<ContextType>;
  PaginatedTireSize?: PaginatedTireSizeResolvers<ContextType>;
  PaginatedUnit?: PaginatedUnitResolvers<ContextType>;
  PaginationMeta?: PaginationMetaResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Province?: ProvinceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tire?: TireResolvers<ContextType>;
  TireModel?: TireModelResolvers<ContextType>;
  TireSize?: TireSizeResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
};

