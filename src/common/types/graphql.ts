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
  /** The `JSON` scalar type represents JSON values as specified by ECMA-404 */
  JSON: { input: any; output: any; }
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

export enum AxleType {
  Drive = 'DRIVE',
  Front = 'FRONT',
  Tag = 'TAG',
  Trailer = 'TRAILER'
}

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

export type CreateTireEventDto = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  kmAtEvent?: InputMaybe<Scalars['Int']['input']>;
  tireId: Scalars['Int']['input'];
  type: TireEventType;
};

export type CreateTireInspectionDto = {
  inspectionDate?: InputMaybe<Scalars['DateTime']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  tireId: Scalars['Int']['input'];
  treadDepth?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateTirePositionDto = {
  axleId: Scalars['Int']['input'];
  isDual: Scalars['Boolean']['input'];
  positionKey: Scalars['String']['input'];
  side: TireSide;
};

export type CreateTireRecapDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  kmAtRecap?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  recapType?: InputMaybe<Scalars['String']['input']>;
  tireId: Scalars['Int']['input'];
};

export type CreateTireRotationDto = {
  fromEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromPosition?: InputMaybe<TirePosition>;
  kmAtRotation?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rotationDate?: InputMaybe<Scalars['DateTime']['input']>;
  tireId: Scalars['Int']['input'];
  toEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  toPosition?: InputMaybe<TirePosition>;
};

export enum Currency {
  Ars = 'ARS',
  Eur = 'EUR',
  Usd = 'USD'
}

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

export type EmployeeVacation = {
  __typename?: 'EmployeeVacation';
  days: Scalars['Int']['output'];
  employee?: Maybe<Employee>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  type: VacationType;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Equipment = {
  __typename?: 'Equipment';
  axles?: Maybe<Array<EquipmentAxle>>;
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
  maintenances?: Maybe<Array<EquipmentMaintenance>>;
  model?: Maybe<EquipmentModel>;
  modelId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  observation?: Maybe<Scalars['String']['output']>;
  status: EquipmentStatus;
  transactions?: Maybe<Array<EquipmentTransaction>>;
  type?: Maybe<EquipmentType>;
  typeId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type EquipmentAxle = {
  __typename?: 'EquipmentAxle';
  axleType: AxleType;
  description?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  tirePositions?: Maybe<Array<TirePositionConfig>>;
  wheelCount: Scalars['Int']['output'];
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

export type EquipmentMaintenance = {
  __typename?: 'EquipmentMaintenance';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  technician?: Maybe<Scalars['String']['output']>;
  type: MaintenanceType;
  updatedAt: Scalars['DateTime']['output'];
  warranty?: Maybe<Scalars['Boolean']['output']>;
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

export type EquipmentTransaction = {
  __typename?: 'EquipmentTransaction';
  amount: Scalars['Float']['output'];
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  equipment?: Maybe<Equipment>;
  equipmentId: Scalars['Int']['output'];
  exchangeRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  transactionDate: Scalars['DateTime']['output'];
  type: EquipmentTransactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum EquipmentTransactionType {
  Purchase = 'PURCHASE',
  Sale = 'SALE'
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

export enum MaintenanceType {
  AccidentRepair = 'ACCIDENT_REPAIR',
  Corrective = 'CORRECTIVE',
  Preventive = 'PREVENTIVE',
  RoutineCheck = 'ROUTINE_CHECK'
}

export enum MaritalStatus {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type MountTireDto = {
  equipmentId?: InputMaybe<Scalars['Int']['input']>;
  kmAtStart?: InputMaybe<Scalars['Int']['input']>;
  mountDate?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  positionConfigId: Scalars['Int']['input'];
  tireId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createCity: City;
  createContact: Contact;
  createEmployeeVacation: EmployeeVacation;
  createEquipment: Equipment;
  createEquipmentAxle: EquipmentAxle;
  createEquipmentCategory: EquipmentCategory;
  createEquipmentMaintenance: EquipmentMaintenance;
  createEquipmentModel: EquipmentModel;
  createEquipmentTransaction: EquipmentTransaction;
  createEquipmentType: EquipmentType;
  createHistoryLog: HistoryLog;
  createInspection: Inspection;
  createTire: Tire;
  createTireEvent: TireEvent;
  createTireInspection: TireInspection;
  createTireModel: TireModel;
  createTirePosition: TirePositionConfig;
  createTireRecap: TireRecap;
  createTireRotation: TireRotation;
  createTireSize: TireSize;
  createUnit: Unit;
  createUser: User;
  deleteAddress: Address;
  deleteCity: City;
  deleteContact: Contact;
  hardDeleteAddress?: Maybe<Address>;
  hardDeleteBrand?: Maybe<Brand>;
  hardDeleteBusinessCategory?: Maybe<BusinessCategory>;
  hardDeleteBusinessSubCategory?: Maybe<BusinessSubCategory>;
  hardDeleteCity?: Maybe<City>;
  hardDeleteCompany?: Maybe<Company>;
  hardDeleteContact?: Maybe<Contact>;
  hardDeleteCountry?: Maybe<Country>;
  hardDeleteEmployee?: Maybe<Employee>;
  hardDeleteEmployeeCategory?: Maybe<EmployeeCategory>;
  hardDeleteEmployeePosition?: Maybe<EmployeePosition>;
  hardDeleteEmployeeVacation?: Maybe<EmployeeVacation>;
  hardDeleteEquipment?: Maybe<Equipment>;
  hardDeleteEquipmentAxle?: Maybe<EquipmentAxle>;
  hardDeleteEquipmentCategory?: Maybe<EquipmentCategory>;
  hardDeleteEquipmentMaintenance?: Maybe<EquipmentMaintenance>;
  hardDeleteEquipmentModel?: Maybe<EquipmentModel>;
  hardDeleteEquipmentTransaction?: Maybe<EquipmentTransaction>;
  hardDeleteEquipmentType?: Maybe<EquipmentType>;
  hardDeleteHistoryLog?: Maybe<HistoryLog>;
  hardDeleteInspection?: Maybe<Inspection>;
  hardDeletePerson?: Maybe<Person>;
  hardDeleteProvince?: Maybe<Province>;
  hardDeleteTire?: Maybe<Tire>;
  hardDeleteTireModel?: Maybe<TireModel>;
  hardDeleteTireSize?: Maybe<TireSize>;
  hardDeleteUnit?: Maybe<Unit>;
  hardDeleteUser?: Maybe<User>;
  mountTire: TireAssignment;
  registerTireEvent: TireEvent;
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
  removeEmployeeVacation: EmployeeVacation;
  removeEquipment: Equipment;
  removeEquipmentAxle: EquipmentAxle;
  removeEquipmentCategory: EquipmentCategory;
  removeEquipmentMaintenance: EquipmentMaintenance;
  removeEquipmentModel: EquipmentModel;
  removeEquipmentTransaction: EquipmentTransaction;
  removeEquipmentType: EquipmentType;
  removeHistoryLog: HistoryLog;
  removeInspection: Inspection;
  removePerson: Person;
  removeProvince: Province;
  removeTire: Tire;
  removeTireEvent: Scalars['Boolean']['output'];
  removeTireInspection: Scalars['Boolean']['output'];
  removeTireModel: TireModel;
  removeTirePosition: Scalars['Boolean']['output'];
  removeTireRecap: Scalars['Boolean']['output'];
  removeTireRotation: Scalars['Boolean']['output'];
  removeTireSize: TireSize;
  removeUnit: Unit;
  removeUser: User;
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
  restoreEmployeeVacation: EmployeeVacation;
  restoreEquipment: Equipment;
  restoreEquipmentAxle: EquipmentAxle;
  restoreEquipmentCategory: EquipmentCategory;
  restoreEquipmentMaintenance: EquipmentMaintenance;
  restoreEquipmentModel: EquipmentModel;
  restoreEquipmentTransaction: EquipmentTransaction;
  restoreEquipmentType: EquipmentType;
  restoreHistoryLog: HistoryLog;
  restoreInspection: Inspection;
  restorePerson: Person;
  restoreProvince: Province;
  restoreTire: Tire;
  restoreTireModel: TireModel;
  restoreTireSize: TireSize;
  restoreUnit: Unit;
  restoreUser: User;
  unmountTire: Scalars['Boolean']['output'];
  updateAddress: Address;
  updateCity: City;
  updateContact: Contact;
  updateEmployeeVacation: EmployeeVacation;
  updateEquipment: Equipment;
  updateEquipmentAxle: EquipmentAxle;
  updateEquipmentCategory: EquipmentCategory;
  updateEquipmentMaintenance: EquipmentMaintenance;
  updateEquipmentModel: EquipmentModel;
  updateEquipmentTransaction: EquipmentTransaction;
  updateEquipmentType: EquipmentType;
  updateHistoryLog: HistoryLog;
  updateInspection: Inspection;
  updateLastLogin: Scalars['Boolean']['output'];
  updateTire: Tire;
  updateTireInspection: TireInspection;
  updateTireModel: TireModel;
  updateTirePosition: TirePositionConfig;
  updateTireRecap: TireRecap;
  updateTireRotation: TireRotation;
  updateTireSize: TireSize;
  updateUnit: Unit;
  updateUser: User;
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


export type MutationCreateTireEventArgs = {
  input: CreateTireEventDto;
};


export type MutationCreateTireInspectionArgs = {
  input: CreateTireInspectionDto;
};


export type MutationCreateTirePositionArgs = {
  input: CreateTirePositionDto;
};


export type MutationCreateTireRecapArgs = {
  input: CreateTireRecapDto;
};


export type MutationCreateTireRotationArgs = {
  input: CreateTireRotationDto;
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


export type MutationHardDeleteEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationHardDeleteEquipmentTransactionArgs = {
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


export type MutationHardDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMountTireArgs = {
  input: MountTireDto;
};


export type MutationRegisterTireEventArgs = {
  data?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  kmAtEvent?: InputMaybe<Scalars['Int']['input']>;
  tireId: Scalars['Int']['input'];
  type: TireEventType;
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


export type MutationRemoveEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEquipmentTransactionArgs = {
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


export type MutationRemoveTireEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTirePositionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireRecapArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireRotationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUnitArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
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


export type MutationRestoreEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRestoreEquipmentTransactionArgs = {
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


export type MutationRestoreUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUnmountTireArgs = {
  input: UnmountTireDto;
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


export type MutationUpdateLastLoginArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUpdateTireInspectionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireInspectionDto;
};


export type MutationUpdateTirePositionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTirePositionDto;
};


export type MutationUpdateTireRecapArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireRecapDto;
};


export type MutationUpdateTireRotationArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTireRotationDto;
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

export type PaginatedTireInspection = {
  __typename?: 'PaginatedTireInspection';
  data: Array<TireInspection>;
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
  findAllEmployeeVacations: Array<EmployeeVacation>;
  findAllEmployees: PaginatedEmployee;
  findAllEquipment: PaginatedEquipment;
  findAllEquipmentAxles: Array<EquipmentAxle>;
  findAllEquipmentCategories: PaginatedEquipmentCategory;
  findAllEquipmentCategorys: Array<EquipmentCategory>;
  findAllEquipmentMaintenances: Array<EquipmentMaintenance>;
  findAllEquipmentModels: PaginatedEquipmentModel;
  findAllEquipmentTransactions: Array<EquipmentTransaction>;
  findAllEquipmentTypes: PaginatedEquipmentType;
  findAllEquipments: Array<Equipment>;
  findAllHistoryLogs: Array<HistoryLog>;
  findAllInspections: Array<Inspection>;
  findAllPersons: PaginatedPerson;
  findAllProvinces: Array<Province>;
  findAllTireEvents: Array<TireEvent>;
  findAllTireInspections: PaginatedTireInspection;
  findAllTireModels: PaginatedTireModel;
  findAllTirePositions: Array<TirePositionConfig>;
  findAllTireRecaps: Array<TireRecap>;
  findAllTireRotations: Array<TireRotation>;
  findAllTireSizes: PaginatedTireSize;
  findAllTires: PaginatedTire;
  findAllUnits: PaginatedUnit;
  findAllUsers: Array<User>;
  findCities: PaginatedCity;
  findContacts: PaginatedContact;
  findCountries: PaginatedCountry;
  findOneAddress?: Maybe<Address>;
  findOneBrand?: Maybe<Brand>;
  findOneBusinessCategory?: Maybe<BusinessCategory>;
  findOneBusinessSubCategory?: Maybe<BusinessSubCategory>;
  findOneCity?: Maybe<City>;
  findOneCompany?: Maybe<Company>;
  findOneContact?: Maybe<Contact>;
  findOneCountry?: Maybe<Country>;
  findOneEmployee?: Maybe<Employee>;
  findOneEmployeeCategory?: Maybe<EmployeeCategory>;
  findOneEmployeePosition?: Maybe<EmployeePosition>;
  findOneEmployeeVacation?: Maybe<EmployeeVacation>;
  findOneEquipment?: Maybe<Equipment>;
  findOneEquipmentAxle?: Maybe<EquipmentAxle>;
  findOneEquipmentCategory?: Maybe<EquipmentCategory>;
  findOneEquipmentMaintenance?: Maybe<EquipmentMaintenance>;
  findOneEquipmentModel?: Maybe<EquipmentModel>;
  findOneEquipmentTransaction?: Maybe<EquipmentTransaction>;
  findOneEquipmentType?: Maybe<EquipmentType>;
  findOneHistoryLog?: Maybe<HistoryLog>;
  findOneInspection?: Maybe<Inspection>;
  findOnePerson?: Maybe<Person>;
  findOneProvince?: Maybe<Province>;
  findOneTire?: Maybe<Tire>;
  findOneTireEvent?: Maybe<TireEvent>;
  findOneTireInspection?: Maybe<TireInspection>;
  findOneTireModel?: Maybe<TireModel>;
  findOneTirePosition?: Maybe<TirePositionConfig>;
  findOneTireRotation?: Maybe<TireRotation>;
  findOneTireSize?: Maybe<TireSize>;
  findOneUnit?: Maybe<Unit>;
  findOneUser?: Maybe<User>;
  findOpenTireAssignments: Array<TireAssignment>;
  findOpenTireAssignmentsByEquipment: Array<TireAssignment>;
  findProvinces: PaginatedProvince;
  findTireAssignmentsByTire: Array<TireAssignment>;
  findTireEventsByTire: Array<TireEvent>;
  findTireEventsByTireAndType: Array<TireEvent>;
  findTireInspectionsByTire: Array<TireInspection>;
  findTireRecapsByTire: Array<TireRecap>;
  findTireRotationsByTire: Array<TireRotation>;
  findUserByEmail?: Maybe<User>;
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


export type QueryFindAllEmployeeVacationsArgs = {
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


export type QueryFindAllEquipmentAxlesArgs = {
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


export type QueryFindAllEquipmentMaintenancesArgs = {
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


export type QueryFindAllEquipmentTransactionsArgs = {
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


export type QueryFindAllTireInspectionsArgs = {
  query?: InputMaybe<TireInspectionsQueryDto>;
};


export type QueryFindAllTireModelsArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindAllTirePositionsArgs = {
  axleId?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryFindAllUsersArgs = {
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


export type QueryFindOneEmployeeVacationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentAxleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentMaintenanceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneEquipmentTransactionArgs = {
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


export type QueryFindOneTireEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireModelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTirePositionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireRotationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTireSizeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUnitArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOpenTireAssignmentsByEquipmentArgs = {
  equipmentId: Scalars['Int']['input'];
};


export type QueryFindProvincesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindTireAssignmentsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireEventsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireEventsByTireAndTypeArgs = {
  tireId: Scalars['Int']['input'];
  type: TireEventType;
};


export type QueryFindTireInspectionsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireRecapsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindTireRotationsByTireArgs = {
  tireId: Scalars['Int']['input'];
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum SeverityLevel {
  Critical = 'CRITICAL',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type Tire = {
  __typename?: 'Tire';
  assignments?: Maybe<Array<TireAssignment>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<TireEvent>>;
  id: Scalars['Int']['output'];
  inspections?: Maybe<Array<TireInspection>>;
  isActive: Scalars['Boolean']['output'];
  lastRecapAt?: Maybe<Scalars['DateTime']['output']>;
  lastRecapId?: Maybe<Scalars['Int']['output']>;
  model?: Maybe<TireModel>;
  modelId: Scalars['Int']['output'];
  position?: Maybe<TirePosition>;
  recapCount?: Maybe<Scalars['Int']['output']>;
  recaps?: Maybe<Array<TireRecap>>;
  rotations?: Maybe<Array<TireRotation>>;
  serialNumber: Scalars['String']['output'];
  status: TireStatus;
  totalKm?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TireAssignment = {
  __typename?: 'TireAssignment';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  kmAtEnd?: Maybe<Scalars['Int']['output']>;
  kmAtStart?: Maybe<Scalars['Int']['output']>;
  positionConfig?: Maybe<TirePositionConfig>;
  positionConfigId: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
};

export type TireEvent = {
  __typename?: 'TireEvent';
  description?: Maybe<Scalars['String']['output']>;
  eventDate: Scalars['DateTime']['output'];
  eventType: TireEventType;
  id: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum TireEventType {
  Assignment = 'ASSIGNMENT',
  Discard = 'DISCARD',
  Inspection = 'INSPECTION',
  Other = 'OTHER',
  Recap = 'RECAP',
  Rotation = 'ROTATION',
  Unassignment = 'UNASSIGNMENT'
}

export type TireInspection = {
  __typename?: 'TireInspection';
  id: Scalars['Int']['output'];
  inspectionDate: Scalars['DateTime']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  treadDepth?: Maybe<Scalars['Float']['output']>;
};

export type TireInspectionsQueryDto = {
  equipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minPressure?: InputMaybe<Scalars['Float']['input']>;
  minTreadDepth?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
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

export type TirePositionConfig = {
  __typename?: 'TirePositionConfig';
  assignments?: Maybe<Array<TireAssignment>>;
  axle?: Maybe<EquipmentAxle>;
  axleId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDual: Scalars['Boolean']['output'];
  positionKey: Scalars['String']['output'];
  side: TireSide;
};

export type TireRecap = {
  __typename?: 'TireRecap';
  cost?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  kmAtRecap?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recapDate: Scalars['DateTime']['output'];
  recapNumber: Scalars['Int']['output'];
  recapType?: Maybe<Scalars['String']['output']>;
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
};

export type TireRotation = {
  __typename?: 'TireRotation';
  fromEquipmentId?: Maybe<Scalars['Int']['output']>;
  fromPosition?: Maybe<TirePosition>;
  id: Scalars['Int']['output'];
  kmAtRotation?: Maybe<Scalars['Int']['output']>;
  rotationDate: Scalars['DateTime']['output'];
  tire?: Maybe<Tire>;
  tireId: Scalars['Int']['output'];
  toEquipmentId?: Maybe<Scalars['Int']['output']>;
  toPosition?: Maybe<TirePosition>;
};

export enum TireSide {
  Inner = 'INNER',
  Left = 'LEFT',
  Outer = 'OUTER',
  Right = 'RIGHT'
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

export type UnmountTireDto = {
  assignmentId: Scalars['Int']['input'];
  kmAtEnd?: InputMaybe<Scalars['Int']['input']>;
  newStatus?: InputMaybe<TireStatus>;
  note?: InputMaybe<Scalars['String']['input']>;
  unmountDate?: InputMaybe<Scalars['DateTime']['input']>;
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

export type UpdateTireInspectionDto = {
  inspectionDate?: InputMaybe<Scalars['DateTime']['input']>;
  observation?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  treadDepth?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateTirePositionDto = {
  axleId?: InputMaybe<Scalars['Int']['input']>;
  isDual?: InputMaybe<Scalars['Boolean']['input']>;
  positionKey?: InputMaybe<Scalars['String']['input']>;
  side?: InputMaybe<TireSide>;
};

export type UpdateTireRecapDto = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  kmAtRecap?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  recapType?: InputMaybe<Scalars['String']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTireRotationDto = {
  fromEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  fromPosition?: InputMaybe<TirePosition>;
  kmAtRotation?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rotationDate?: InputMaybe<Scalars['DateTime']['input']>;
  tireId?: InputMaybe<Scalars['Int']['input']>;
  toEquipmentId?: InputMaybe<Scalars['Int']['input']>;
  toPosition?: InputMaybe<TirePosition>;
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  preferences?: Maybe<Scalars['JSON']['output']>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export enum VacationType {
  Assigned = 'ASSIGNED',
  Taken = 'TAKEN'
}



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
  AxleType: AxleType;
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
  CreateTireEventDto: CreateTireEventDto;
  CreateTireInspectionDto: CreateTireInspectionDto;
  CreateTirePositionDto: CreateTirePositionDto;
  CreateTireRecapDto: CreateTireRecapDto;
  CreateTireRotationDto: CreateTireRotationDto;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeCategory: ResolverTypeWrapper<EmployeeCategory>;
  EmployeePosition: ResolverTypeWrapper<EmployeePosition>;
  EmployeeStatus: EmployeeStatus;
  EmployeeVacation: ResolverTypeWrapper<EmployeeVacation>;
  Equipment: ResolverTypeWrapper<Equipment>;
  EquipmentAxle: ResolverTypeWrapper<EquipmentAxle>;
  EquipmentCategory: ResolverTypeWrapper<EquipmentCategory>;
  EquipmentFilterInput: EquipmentFilterInput;
  EquipmentMaintenance: ResolverTypeWrapper<EquipmentMaintenance>;
  EquipmentModel: ResolverTypeWrapper<EquipmentModel>;
  EquipmentStatus: EquipmentStatus;
  EquipmentTransaction: ResolverTypeWrapper<EquipmentTransaction>;
  EquipmentTransactionType: EquipmentTransactionType;
  EquipmentType: ResolverTypeWrapper<EquipmentType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FuelType: FuelType;
  Gender: Gender;
  HistoryLog: ResolverTypeWrapper<HistoryLog>;
  HistoryType: HistoryType;
  Inspection: ResolverTypeWrapper<Inspection>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  MaintenanceType: MaintenanceType;
  MaritalStatus: MaritalStatus;
  MountTireDto: MountTireDto;
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
  PaginatedPerson: ResolverTypeWrapper<PaginatedPerson>;
  PaginatedProvince: ResolverTypeWrapper<PaginatedProvince>;
  PaginatedTire: ResolverTypeWrapper<PaginatedTire>;
  PaginatedTireInspection: ResolverTypeWrapper<PaginatedTireInspection>;
  PaginatedTireModel: ResolverTypeWrapper<PaginatedTireModel>;
  PaginatedTireSize: ResolverTypeWrapper<PaginatedTireSize>;
  PaginatedUnit: ResolverTypeWrapper<PaginatedUnit>;
  PaginationMeta: ResolverTypeWrapper<PaginationMeta>;
  Person: ResolverTypeWrapper<Person>;
  PersonStatus: PersonStatus;
  Province: ResolverTypeWrapper<Province>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Role: Role;
  SeverityLevel: SeverityLevel;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tire: ResolverTypeWrapper<Tire>;
  TireAssignment: ResolverTypeWrapper<TireAssignment>;
  TireEvent: ResolverTypeWrapper<TireEvent>;
  TireEventType: TireEventType;
  TireInspection: ResolverTypeWrapper<TireInspection>;
  TireInspectionsQueryDto: TireInspectionsQueryDto;
  TireModel: ResolverTypeWrapper<TireModel>;
  TirePosition: TirePosition;
  TirePositionConfig: ResolverTypeWrapper<TirePositionConfig>;
  TireRecap: ResolverTypeWrapper<TireRecap>;
  TireRotation: ResolverTypeWrapper<TireRotation>;
  TireSide: TireSide;
  TireSize: ResolverTypeWrapper<TireSize>;
  TireStatus: TireStatus;
  Unit: ResolverTypeWrapper<Unit>;
  UnmountTireDto: UnmountTireDto;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCityInput: UpdateCityInput;
  UpdateContactInput: UpdateContactInput;
  UpdateTireInspectionDto: UpdateTireInspectionDto;
  UpdateTirePositionDto: UpdateTirePositionDto;
  UpdateTireRecapDto: UpdateTireRecapDto;
  UpdateTireRotationDto: UpdateTireRotationDto;
  User: ResolverTypeWrapper<User>;
  VacationType: VacationType;
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
  CreateTireEventDto: CreateTireEventDto;
  CreateTireInspectionDto: CreateTireInspectionDto;
  CreateTirePositionDto: CreateTirePositionDto;
  CreateTireRecapDto: CreateTireRecapDto;
  CreateTireRotationDto: CreateTireRotationDto;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  EmployeeCategory: EmployeeCategory;
  EmployeePosition: EmployeePosition;
  EmployeeVacation: EmployeeVacation;
  Equipment: Equipment;
  EquipmentAxle: EquipmentAxle;
  EquipmentCategory: EquipmentCategory;
  EquipmentFilterInput: EquipmentFilterInput;
  EquipmentMaintenance: EquipmentMaintenance;
  EquipmentModel: EquipmentModel;
  EquipmentTransaction: EquipmentTransaction;
  EquipmentType: EquipmentType;
  Float: Scalars['Float']['output'];
  HistoryLog: HistoryLog;
  Inspection: Inspection;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  MountTireDto: MountTireDto;
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
  PaginatedPerson: PaginatedPerson;
  PaginatedProvince: PaginatedProvince;
  PaginatedTire: PaginatedTire;
  PaginatedTireInspection: PaginatedTireInspection;
  PaginatedTireModel: PaginatedTireModel;
  PaginatedTireSize: PaginatedTireSize;
  PaginatedUnit: PaginatedUnit;
  PaginationMeta: PaginationMeta;
  Person: Person;
  Province: Province;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Tire: Tire;
  TireAssignment: TireAssignment;
  TireEvent: TireEvent;
  TireInspection: TireInspection;
  TireInspectionsQueryDto: TireInspectionsQueryDto;
  TireModel: TireModel;
  TirePositionConfig: TirePositionConfig;
  TireRecap: TireRecap;
  TireRotation: TireRotation;
  TireSize: TireSize;
  Unit: Unit;
  UnmountTireDto: UnmountTireDto;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCityInput: UpdateCityInput;
  UpdateContactInput: UpdateContactInput;
  UpdateTireInspectionDto: UpdateTireInspectionDto;
  UpdateTirePositionDto: UpdateTirePositionDto;
  UpdateTireRecapDto: UpdateTireRecapDto;
  UpdateTireRotationDto: UpdateTireRotationDto;
  User: User;
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

export type EmployeeVacationResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeVacation'] = ResolversParentTypes['EmployeeVacation']> = {
  days?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['VacationType'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  axles?: Resolver<Maybe<Array<ResolversTypes['EquipmentAxle']>>, ParentType, ContextType>;
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
  maintenances?: Resolver<Maybe<Array<ResolversTypes['EquipmentMaintenance']>>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['EquipmentModel']>, ParentType, ContextType>;
  modelId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EquipmentStatus'], ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<ResolversTypes['EquipmentTransaction']>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EquipmentType']>, ParentType, ContextType>;
  typeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type EquipmentAxleResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentAxle'] = ResolversParentTypes['EquipmentAxle']> = {
  axleType?: Resolver<ResolversTypes['AxleType'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  equipmentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tirePositions?: Resolver<Maybe<Array<ResolversTypes['TirePositionConfig']>>, ParentType, ContextType>;
  wheelCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type EquipmentCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentCategory'] = ResolversParentTypes['EquipmentCategory']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type EquipmentMaintenanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentMaintenance'] = ResolversParentTypes['EquipmentMaintenance']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  equipmentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  technician?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MaintenanceType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  warranty?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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

export type EquipmentTransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentTransaction'] = ResolversParentTypes['EquipmentTransaction']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  equipmentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EquipmentTransactionType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'input'>>;
  createCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationCreateCityArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  createEmployeeVacation?: Resolver<ResolversTypes['EmployeeVacation'], ParentType, ContextType>;
  createEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  createEquipmentAxle?: Resolver<ResolversTypes['EquipmentAxle'], ParentType, ContextType>;
  createEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType>;
  createEquipmentMaintenance?: Resolver<ResolversTypes['EquipmentMaintenance'], ParentType, ContextType>;
  createEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType>;
  createEquipmentTransaction?: Resolver<ResolversTypes['EquipmentTransaction'], ParentType, ContextType>;
  createEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType>;
  createHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType>;
  createInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType>;
  createTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType>;
  createTireEvent?: Resolver<ResolversTypes['TireEvent'], ParentType, ContextType, RequireFields<MutationCreateTireEventArgs, 'input'>>;
  createTireInspection?: Resolver<ResolversTypes['TireInspection'], ParentType, ContextType, RequireFields<MutationCreateTireInspectionArgs, 'input'>>;
  createTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType>;
  createTirePosition?: Resolver<ResolversTypes['TirePositionConfig'], ParentType, ContextType, RequireFields<MutationCreateTirePositionArgs, 'input'>>;
  createTireRecap?: Resolver<ResolversTypes['TireRecap'], ParentType, ContextType, RequireFields<MutationCreateTireRecapArgs, 'input'>>;
  createTireRotation?: Resolver<ResolversTypes['TireRotation'], ParentType, ContextType, RequireFields<MutationCreateTireRotationArgs, 'input'>>;
  createTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType>;
  createUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deleteAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationDeleteAddressArgs, 'id'>>;
  deleteCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationDeleteCityArgs, 'id'>>;
  deleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  hardDeleteAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MutationHardDeleteAddressArgs, 'id'>>;
  hardDeleteBrand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<MutationHardDeleteBrandArgs, 'id'>>;
  hardDeleteBusinessCategory?: Resolver<Maybe<ResolversTypes['BusinessCategory']>, ParentType, ContextType, RequireFields<MutationHardDeleteBusinessCategoryArgs, 'id'>>;
  hardDeleteBusinessSubCategory?: Resolver<Maybe<ResolversTypes['BusinessSubCategory']>, ParentType, ContextType, RequireFields<MutationHardDeleteBusinessSubCategoryArgs, 'id'>>;
  hardDeleteCity?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType, RequireFields<MutationHardDeleteCityArgs, 'id'>>;
  hardDeleteCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationHardDeleteCompanyArgs, 'id'>>;
  hardDeleteContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationHardDeleteContactArgs, 'id'>>;
  hardDeleteCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MutationHardDeleteCountryArgs, 'id'>>;
  hardDeleteEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationHardDeleteEmployeeArgs, 'id'>>;
  hardDeleteEmployeeCategory?: Resolver<Maybe<ResolversTypes['EmployeeCategory']>, ParentType, ContextType, RequireFields<MutationHardDeleteEmployeeCategoryArgs, 'id'>>;
  hardDeleteEmployeePosition?: Resolver<Maybe<ResolversTypes['EmployeePosition']>, ParentType, ContextType, RequireFields<MutationHardDeleteEmployeePositionArgs, 'id'>>;
  hardDeleteEmployeeVacation?: Resolver<Maybe<ResolversTypes['EmployeeVacation']>, ParentType, ContextType, RequireFields<MutationHardDeleteEmployeeVacationArgs, 'id'>>;
  hardDeleteEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentArgs, 'id'>>;
  hardDeleteEquipmentAxle?: Resolver<Maybe<ResolversTypes['EquipmentAxle']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentAxleArgs, 'id'>>;
  hardDeleteEquipmentCategory?: Resolver<Maybe<ResolversTypes['EquipmentCategory']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentCategoryArgs, 'id'>>;
  hardDeleteEquipmentMaintenance?: Resolver<Maybe<ResolversTypes['EquipmentMaintenance']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentMaintenanceArgs, 'id'>>;
  hardDeleteEquipmentModel?: Resolver<Maybe<ResolversTypes['EquipmentModel']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentModelArgs, 'id'>>;
  hardDeleteEquipmentTransaction?: Resolver<Maybe<ResolversTypes['EquipmentTransaction']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentTransactionArgs, 'id'>>;
  hardDeleteEquipmentType?: Resolver<Maybe<ResolversTypes['EquipmentType']>, ParentType, ContextType, RequireFields<MutationHardDeleteEquipmentTypeArgs, 'id'>>;
  hardDeleteHistoryLog?: Resolver<Maybe<ResolversTypes['HistoryLog']>, ParentType, ContextType, RequireFields<MutationHardDeleteHistoryLogArgs, 'id'>>;
  hardDeleteInspection?: Resolver<Maybe<ResolversTypes['Inspection']>, ParentType, ContextType, RequireFields<MutationHardDeleteInspectionArgs, 'id'>>;
  hardDeletePerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MutationHardDeletePersonArgs, 'id'>>;
  hardDeleteProvince?: Resolver<Maybe<ResolversTypes['Province']>, ParentType, ContextType, RequireFields<MutationHardDeleteProvinceArgs, 'id'>>;
  hardDeleteTire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType, RequireFields<MutationHardDeleteTireArgs, 'id'>>;
  hardDeleteTireModel?: Resolver<Maybe<ResolversTypes['TireModel']>, ParentType, ContextType, RequireFields<MutationHardDeleteTireModelArgs, 'id'>>;
  hardDeleteTireSize?: Resolver<Maybe<ResolversTypes['TireSize']>, ParentType, ContextType, RequireFields<MutationHardDeleteTireSizeArgs, 'id'>>;
  hardDeleteUnit?: Resolver<Maybe<ResolversTypes['Unit']>, ParentType, ContextType, RequireFields<MutationHardDeleteUnitArgs, 'id'>>;
  hardDeleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationHardDeleteUserArgs, 'id'>>;
  mountTire?: Resolver<ResolversTypes['TireAssignment'], ParentType, ContextType, RequireFields<MutationMountTireArgs, 'input'>>;
  registerTireEvent?: Resolver<ResolversTypes['TireEvent'], ParentType, ContextType, RequireFields<MutationRegisterTireEventArgs, 'description' | 'tireId' | 'type'>>;
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
  removeEmployeeVacation?: Resolver<ResolversTypes['EmployeeVacation'], ParentType, ContextType, RequireFields<MutationRemoveEmployeeVacationArgs, 'id'>>;
  removeEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentArgs, 'id'>>;
  removeEquipmentAxle?: Resolver<ResolversTypes['EquipmentAxle'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentAxleArgs, 'id'>>;
  removeEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentCategoryArgs, 'id'>>;
  removeEquipmentMaintenance?: Resolver<ResolversTypes['EquipmentMaintenance'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentMaintenanceArgs, 'id'>>;
  removeEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentModelArgs, 'id'>>;
  removeEquipmentTransaction?: Resolver<ResolversTypes['EquipmentTransaction'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentTransactionArgs, 'id'>>;
  removeEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<MutationRemoveEquipmentTypeArgs, 'id'>>;
  removeHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<MutationRemoveHistoryLogArgs, 'id'>>;
  removeInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<MutationRemoveInspectionArgs, 'id'>>;
  removePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationRemovePersonArgs, 'id'>>;
  removeProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<MutationRemoveProvinceArgs, 'id'>>;
  removeTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<MutationRemoveTireArgs, 'id'>>;
  removeTireEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTireEventArgs, 'id'>>;
  removeTireInspection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTireInspectionArgs, 'id'>>;
  removeTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<MutationRemoveTireModelArgs, 'id'>>;
  removeTirePosition?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTirePositionArgs, 'id'>>;
  removeTireRecap?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTireRecapArgs, 'id'>>;
  removeTireRotation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTireRotationArgs, 'id'>>;
  removeTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<MutationRemoveTireSizeArgs, 'id'>>;
  removeUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<MutationRemoveUnitArgs, 'id'>>;
  removeUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'id'>>;
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
  restoreEmployeeVacation?: Resolver<ResolversTypes['EmployeeVacation'], ParentType, ContextType, RequireFields<MutationRestoreEmployeeVacationArgs, 'id'>>;
  restoreEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentArgs, 'id'>>;
  restoreEquipmentAxle?: Resolver<ResolversTypes['EquipmentAxle'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentAxleArgs, 'id'>>;
  restoreEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentCategoryArgs, 'id'>>;
  restoreEquipmentMaintenance?: Resolver<ResolversTypes['EquipmentMaintenance'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentMaintenanceArgs, 'id'>>;
  restoreEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentModelArgs, 'id'>>;
  restoreEquipmentTransaction?: Resolver<ResolversTypes['EquipmentTransaction'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentTransactionArgs, 'id'>>;
  restoreEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType, RequireFields<MutationRestoreEquipmentTypeArgs, 'id'>>;
  restoreHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType, RequireFields<MutationRestoreHistoryLogArgs, 'id'>>;
  restoreInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType, RequireFields<MutationRestoreInspectionArgs, 'id'>>;
  restorePerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationRestorePersonArgs, 'id'>>;
  restoreProvince?: Resolver<ResolversTypes['Province'], ParentType, ContextType, RequireFields<MutationRestoreProvinceArgs, 'id'>>;
  restoreTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType, RequireFields<MutationRestoreTireArgs, 'id'>>;
  restoreTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType, RequireFields<MutationRestoreTireModelArgs, 'id'>>;
  restoreTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType, RequireFields<MutationRestoreTireSizeArgs, 'id'>>;
  restoreUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType, RequireFields<MutationRestoreUnitArgs, 'id'>>;
  restoreUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRestoreUserArgs, 'id'>>;
  unmountTire?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnmountTireArgs, 'input'>>;
  updateAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'id' | 'input'>>;
  updateCity?: Resolver<ResolversTypes['City'], ParentType, ContextType, RequireFields<MutationUpdateCityArgs, 'id' | 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'id' | 'input'>>;
  updateEmployeeVacation?: Resolver<ResolversTypes['EmployeeVacation'], ParentType, ContextType>;
  updateEquipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  updateEquipmentAxle?: Resolver<ResolversTypes['EquipmentAxle'], ParentType, ContextType>;
  updateEquipmentCategory?: Resolver<ResolversTypes['EquipmentCategory'], ParentType, ContextType>;
  updateEquipmentMaintenance?: Resolver<ResolversTypes['EquipmentMaintenance'], ParentType, ContextType>;
  updateEquipmentModel?: Resolver<ResolversTypes['EquipmentModel'], ParentType, ContextType>;
  updateEquipmentTransaction?: Resolver<ResolversTypes['EquipmentTransaction'], ParentType, ContextType>;
  updateEquipmentType?: Resolver<ResolversTypes['EquipmentType'], ParentType, ContextType>;
  updateHistoryLog?: Resolver<ResolversTypes['HistoryLog'], ParentType, ContextType>;
  updateInspection?: Resolver<ResolversTypes['Inspection'], ParentType, ContextType>;
  updateLastLogin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateLastLoginArgs, 'userId'>>;
  updateTire?: Resolver<ResolversTypes['Tire'], ParentType, ContextType>;
  updateTireInspection?: Resolver<ResolversTypes['TireInspection'], ParentType, ContextType, RequireFields<MutationUpdateTireInspectionArgs, 'id' | 'input'>>;
  updateTireModel?: Resolver<ResolversTypes['TireModel'], ParentType, ContextType>;
  updateTirePosition?: Resolver<ResolversTypes['TirePositionConfig'], ParentType, ContextType, RequireFields<MutationUpdateTirePositionArgs, 'id' | 'input'>>;
  updateTireRecap?: Resolver<ResolversTypes['TireRecap'], ParentType, ContextType, RequireFields<MutationUpdateTireRecapArgs, 'id' | 'input'>>;
  updateTireRotation?: Resolver<ResolversTypes['TireRotation'], ParentType, ContextType, RequireFields<MutationUpdateTireRotationArgs, 'id' | 'input'>>;
  updateTireSize?: Resolver<ResolversTypes['TireSize'], ParentType, ContextType>;
  updateUnit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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

export type PaginatedTireInspectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTireInspection'] = ResolversParentTypes['PaginatedTireInspection']> = {
  data?: Resolver<Array<ResolversTypes['TireInspection']>, ParentType, ContextType>;
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
  findAllEmployeeVacations?: Resolver<Array<ResolversTypes['EmployeeVacation']>, ParentType, ContextType, RequireFields<QueryFindAllEmployeeVacationsArgs, 'skip' | 'take'>>;
  findAllEmployees?: Resolver<ResolversTypes['PaginatedEmployee'], ParentType, ContextType, RequireFields<QueryFindAllEmployeesArgs, 'skip' | 'take'>>;
  findAllEquipment?: Resolver<ResolversTypes['PaginatedEquipment'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentArgs, 'skip' | 'take'>>;
  findAllEquipmentAxles?: Resolver<Array<ResolversTypes['EquipmentAxle']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentAxlesArgs, 'skip' | 'take'>>;
  findAllEquipmentCategories?: Resolver<ResolversTypes['PaginatedEquipmentCategory'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentCategoriesArgs, 'skip' | 'take'>>;
  findAllEquipmentCategorys?: Resolver<Array<ResolversTypes['EquipmentCategory']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentCategorysArgs, 'skip' | 'take'>>;
  findAllEquipmentMaintenances?: Resolver<Array<ResolversTypes['EquipmentMaintenance']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentMaintenancesArgs, 'skip' | 'take'>>;
  findAllEquipmentModels?: Resolver<ResolversTypes['PaginatedEquipmentModel'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentModelsArgs, 'skip' | 'take'>>;
  findAllEquipmentTransactions?: Resolver<Array<ResolversTypes['EquipmentTransaction']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentTransactionsArgs, 'skip' | 'take'>>;
  findAllEquipmentTypes?: Resolver<ResolversTypes['PaginatedEquipmentType'], ParentType, ContextType, RequireFields<QueryFindAllEquipmentTypesArgs, 'skip' | 'take'>>;
  findAllEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<QueryFindAllEquipmentsArgs, 'skip' | 'take'>>;
  findAllHistoryLogs?: Resolver<Array<ResolversTypes['HistoryLog']>, ParentType, ContextType, RequireFields<QueryFindAllHistoryLogsArgs, 'skip' | 'take'>>;
  findAllInspections?: Resolver<Array<ResolversTypes['Inspection']>, ParentType, ContextType, RequireFields<QueryFindAllInspectionsArgs, 'skip' | 'take'>>;
  findAllPersons?: Resolver<ResolversTypes['PaginatedPerson'], ParentType, ContextType, RequireFields<QueryFindAllPersonsArgs, 'skip' | 'take'>>;
  findAllProvinces?: Resolver<Array<ResolversTypes['Province']>, ParentType, ContextType, RequireFields<QueryFindAllProvincesArgs, 'skip' | 'take'>>;
  findAllTireEvents?: Resolver<Array<ResolversTypes['TireEvent']>, ParentType, ContextType>;
  findAllTireInspections?: Resolver<ResolversTypes['PaginatedTireInspection'], ParentType, ContextType, Partial<QueryFindAllTireInspectionsArgs>>;
  findAllTireModels?: Resolver<ResolversTypes['PaginatedTireModel'], ParentType, ContextType, RequireFields<QueryFindAllTireModelsArgs, 'skip' | 'take'>>;
  findAllTirePositions?: Resolver<Array<ResolversTypes['TirePositionConfig']>, ParentType, ContextType, Partial<QueryFindAllTirePositionsArgs>>;
  findAllTireRecaps?: Resolver<Array<ResolversTypes['TireRecap']>, ParentType, ContextType>;
  findAllTireRotations?: Resolver<Array<ResolversTypes['TireRotation']>, ParentType, ContextType>;
  findAllTireSizes?: Resolver<ResolversTypes['PaginatedTireSize'], ParentType, ContextType, RequireFields<QueryFindAllTireSizesArgs, 'skip' | 'take'>>;
  findAllTires?: Resolver<ResolversTypes['PaginatedTire'], ParentType, ContextType, RequireFields<QueryFindAllTiresArgs, 'skip' | 'take'>>;
  findAllUnits?: Resolver<ResolversTypes['PaginatedUnit'], ParentType, ContextType, RequireFields<QueryFindAllUnitsArgs, 'skip' | 'take'>>;
  findAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryFindAllUsersArgs, 'skip' | 'take'>>;
  findCities?: Resolver<ResolversTypes['PaginatedCity'], ParentType, ContextType, RequireFields<QueryFindCitiesArgs, 'skip' | 'take'>>;
  findContacts?: Resolver<ResolversTypes['PaginatedContact'], ParentType, ContextType, RequireFields<QueryFindContactsArgs, 'skip' | 'take'>>;
  findCountries?: Resolver<ResolversTypes['PaginatedCountry'], ParentType, ContextType, RequireFields<QueryFindCountriesArgs, 'skip' | 'take'>>;
  findOneAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryFindOneAddressArgs, 'id'>>;
  findOneBrand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<QueryFindOneBrandArgs, 'id'>>;
  findOneBusinessCategory?: Resolver<Maybe<ResolversTypes['BusinessCategory']>, ParentType, ContextType, RequireFields<QueryFindOneBusinessCategoryArgs, 'id'>>;
  findOneBusinessSubCategory?: Resolver<Maybe<ResolversTypes['BusinessSubCategory']>, ParentType, ContextType, RequireFields<QueryFindOneBusinessSubCategoryArgs, 'id'>>;
  findOneCity?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryFindOneCityArgs, 'id'>>;
  findOneCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryFindOneCompanyArgs, 'id'>>;
  findOneContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryFindOneContactArgs, 'id'>>;
  findOneCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryFindOneCountryArgs, 'id'>>;
  findOneEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryFindOneEmployeeArgs, 'id'>>;
  findOneEmployeeCategory?: Resolver<Maybe<ResolversTypes['EmployeeCategory']>, ParentType, ContextType, RequireFields<QueryFindOneEmployeeCategoryArgs, 'id'>>;
  findOneEmployeePosition?: Resolver<Maybe<ResolversTypes['EmployeePosition']>, ParentType, ContextType, RequireFields<QueryFindOneEmployeePositionArgs, 'id'>>;
  findOneEmployeeVacation?: Resolver<Maybe<ResolversTypes['EmployeeVacation']>, ParentType, ContextType, RequireFields<QueryFindOneEmployeeVacationArgs, 'id'>>;
  findOneEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentArgs, 'id'>>;
  findOneEquipmentAxle?: Resolver<Maybe<ResolversTypes['EquipmentAxle']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentAxleArgs, 'id'>>;
  findOneEquipmentCategory?: Resolver<Maybe<ResolversTypes['EquipmentCategory']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentCategoryArgs, 'id'>>;
  findOneEquipmentMaintenance?: Resolver<Maybe<ResolversTypes['EquipmentMaintenance']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentMaintenanceArgs, 'id'>>;
  findOneEquipmentModel?: Resolver<Maybe<ResolversTypes['EquipmentModel']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentModelArgs, 'id'>>;
  findOneEquipmentTransaction?: Resolver<Maybe<ResolversTypes['EquipmentTransaction']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentTransactionArgs, 'id'>>;
  findOneEquipmentType?: Resolver<Maybe<ResolversTypes['EquipmentType']>, ParentType, ContextType, RequireFields<QueryFindOneEquipmentTypeArgs, 'id'>>;
  findOneHistoryLog?: Resolver<Maybe<ResolversTypes['HistoryLog']>, ParentType, ContextType, RequireFields<QueryFindOneHistoryLogArgs, 'id'>>;
  findOneInspection?: Resolver<Maybe<ResolversTypes['Inspection']>, ParentType, ContextType, RequireFields<QueryFindOneInspectionArgs, 'id'>>;
  findOnePerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryFindOnePersonArgs, 'id'>>;
  findOneProvince?: Resolver<Maybe<ResolversTypes['Province']>, ParentType, ContextType, RequireFields<QueryFindOneProvinceArgs, 'id'>>;
  findOneTire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType, RequireFields<QueryFindOneTireArgs, 'id'>>;
  findOneTireEvent?: Resolver<Maybe<ResolversTypes['TireEvent']>, ParentType, ContextType, RequireFields<QueryFindOneTireEventArgs, 'id'>>;
  findOneTireInspection?: Resolver<Maybe<ResolversTypes['TireInspection']>, ParentType, ContextType, RequireFields<QueryFindOneTireInspectionArgs, 'id'>>;
  findOneTireModel?: Resolver<Maybe<ResolversTypes['TireModel']>, ParentType, ContextType, RequireFields<QueryFindOneTireModelArgs, 'id'>>;
  findOneTirePosition?: Resolver<Maybe<ResolversTypes['TirePositionConfig']>, ParentType, ContextType, RequireFields<QueryFindOneTirePositionArgs, 'id'>>;
  findOneTireRotation?: Resolver<Maybe<ResolversTypes['TireRotation']>, ParentType, ContextType, RequireFields<QueryFindOneTireRotationArgs, 'id'>>;
  findOneTireSize?: Resolver<Maybe<ResolversTypes['TireSize']>, ParentType, ContextType, RequireFields<QueryFindOneTireSizeArgs, 'id'>>;
  findOneUnit?: Resolver<Maybe<ResolversTypes['Unit']>, ParentType, ContextType, RequireFields<QueryFindOneUnitArgs, 'id'>>;
  findOneUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryFindOneUserArgs, 'id'>>;
  findOpenTireAssignments?: Resolver<Array<ResolversTypes['TireAssignment']>, ParentType, ContextType>;
  findOpenTireAssignmentsByEquipment?: Resolver<Array<ResolversTypes['TireAssignment']>, ParentType, ContextType, RequireFields<QueryFindOpenTireAssignmentsByEquipmentArgs, 'equipmentId'>>;
  findProvinces?: Resolver<ResolversTypes['PaginatedProvince'], ParentType, ContextType, RequireFields<QueryFindProvincesArgs, 'skip' | 'take'>>;
  findTireAssignmentsByTire?: Resolver<Array<ResolversTypes['TireAssignment']>, ParentType, ContextType, RequireFields<QueryFindTireAssignmentsByTireArgs, 'tireId'>>;
  findTireEventsByTire?: Resolver<Array<ResolversTypes['TireEvent']>, ParentType, ContextType, RequireFields<QueryFindTireEventsByTireArgs, 'tireId'>>;
  findTireEventsByTireAndType?: Resolver<Array<ResolversTypes['TireEvent']>, ParentType, ContextType, RequireFields<QueryFindTireEventsByTireAndTypeArgs, 'tireId' | 'type'>>;
  findTireInspectionsByTire?: Resolver<Array<ResolversTypes['TireInspection']>, ParentType, ContextType, RequireFields<QueryFindTireInspectionsByTireArgs, 'tireId'>>;
  findTireRecapsByTire?: Resolver<Array<ResolversTypes['TireRecap']>, ParentType, ContextType, RequireFields<QueryFindTireRecapsByTireArgs, 'tireId'>>;
  findTireRotationsByTire?: Resolver<Array<ResolversTypes['TireRotation']>, ParentType, ContextType, RequireFields<QueryFindTireRotationsByTireArgs, 'tireId'>>;
  findUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryFindUserByEmailArgs, 'email'>>;
};

export type TireResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tire'] = ResolversParentTypes['Tire']> = {
  assignments?: Resolver<Maybe<Array<ResolversTypes['TireAssignment']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['TireEvent']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inspections?: Resolver<Maybe<Array<ResolversTypes['TireInspection']>>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastRecapAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastRecapId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['TireModel']>, ParentType, ContextType>;
  modelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['TirePosition']>, ParentType, ContextType>;
  recapCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  recaps?: Resolver<Maybe<Array<ResolversTypes['TireRecap']>>, ParentType, ContextType>;
  rotations?: Resolver<Maybe<Array<ResolversTypes['TireRotation']>>, ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TireStatus'], ParentType, ContextType>;
  totalKm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type TireAssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireAssignment'] = ResolversParentTypes['TireAssignment']> = {
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kmAtEnd?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  kmAtStart?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  positionConfig?: Resolver<Maybe<ResolversTypes['TirePositionConfig']>, ParentType, ContextType>;
  positionConfigId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType>;
  tireId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type TireEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireEvent'] = ResolversParentTypes['TireEvent']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventType?: Resolver<ResolversTypes['TireEventType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType>;
  tireId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type TireInspectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireInspection'] = ResolversParentTypes['TireInspection']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  inspectionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pressure?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType>;
  tireId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  treadDepth?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
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

export type TirePositionConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['TirePositionConfig'] = ResolversParentTypes['TirePositionConfig']> = {
  assignments?: Resolver<Maybe<Array<ResolversTypes['TireAssignment']>>, ParentType, ContextType>;
  axle?: Resolver<Maybe<ResolversTypes['EquipmentAxle']>, ParentType, ContextType>;
  axleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isDual?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  positionKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  side?: Resolver<ResolversTypes['TireSide'], ParentType, ContextType>;
};

export type TireRecapResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireRecap'] = ResolversParentTypes['TireRecap']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kmAtRecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recapDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  recapNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recapType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType>;
  tireId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type TireRotationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TireRotation'] = ResolversParentTypes['TireRotation']> = {
  fromEquipmentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fromPosition?: Resolver<Maybe<ResolversTypes['TirePosition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kmAtRotation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rotationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tire?: Resolver<Maybe<ResolversTypes['Tire']>, ParentType, ContextType>;
  tireId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toEquipmentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  toPosition?: Resolver<Maybe<ResolversTypes['TirePosition']>, ParentType, ContextType>;
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

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastLoginAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  EmployeeVacation?: EmployeeVacationResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  EquipmentAxle?: EquipmentAxleResolvers<ContextType>;
  EquipmentCategory?: EquipmentCategoryResolvers<ContextType>;
  EquipmentMaintenance?: EquipmentMaintenanceResolvers<ContextType>;
  EquipmentModel?: EquipmentModelResolvers<ContextType>;
  EquipmentTransaction?: EquipmentTransactionResolvers<ContextType>;
  EquipmentType?: EquipmentTypeResolvers<ContextType>;
  HistoryLog?: HistoryLogResolvers<ContextType>;
  Inspection?: InspectionResolvers<ContextType>;
  JSON?: GraphQLScalarType;
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
  PaginatedPerson?: PaginatedPersonResolvers<ContextType>;
  PaginatedProvince?: PaginatedProvinceResolvers<ContextType>;
  PaginatedTire?: PaginatedTireResolvers<ContextType>;
  PaginatedTireInspection?: PaginatedTireInspectionResolvers<ContextType>;
  PaginatedTireModel?: PaginatedTireModelResolvers<ContextType>;
  PaginatedTireSize?: PaginatedTireSizeResolvers<ContextType>;
  PaginatedUnit?: PaginatedUnitResolvers<ContextType>;
  PaginationMeta?: PaginationMetaResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Province?: ProvinceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tire?: TireResolvers<ContextType>;
  TireAssignment?: TireAssignmentResolvers<ContextType>;
  TireEvent?: TireEventResolvers<ContextType>;
  TireInspection?: TireInspectionResolvers<ContextType>;
  TireModel?: TireModelResolvers<ContextType>;
  TirePositionConfig?: TirePositionConfigResolvers<ContextType>;
  TireRecap?: TireRecapResolvers<ContextType>;
  TireRotation?: TireRotationResolvers<ContextType>;
  TireSize?: TireSizeResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

