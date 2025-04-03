export enum ActionType {
    Edit = "Edit",
    Delete = "Delete",
    Update = "Update",
    Open = "Open",
    Close = "Close",
    Save = "Save",
    Cancel = "Cancel"
}

export enum TableHeader {
    Companies = 'Companies',
     Candidates = 'Candidates',
    Menu = 'Menu'
}

export enum ThemeType {
    Dark = 2,
    Light = 1
}

export enum ThemeMode {
    Dark = "dark",
    Light = "light"
}
export enum InputType {
    InputText = "text",
    InputEmail = "email",
    InputTextArea = "textarea",
    InputRadio = "InputRadio",
    InputCheckBox = "InputCheckBox",
    InputSelect = "Lookup",
    InputDropdownFix = "DropdownFix",
    InputHidden = "hidden",
    InputFile = "file",
    InputDate = "date",
}

export enum IDropDownType {
    city = "city",
    country = "country",
    sector = "sector"
}



export enum ResponseStatus {
    Success = 200,
    BadRequest = 400,
    NotFound = 404
}




export enum SecurityRoleItem {
    Menu = "Menu",
    User = "User",
    Roles = "Roles",
    Departments = "Departments",
    Cities = "Cities",
    Countries = "Countries",
    Companies = "Companies",
    Candidate = "Candidate",
    EmployeeAuthorization = "EmployeeAuthorization",
    Categories = "Categories",
    Employee = "Employee",
    EmployeeTask = "EmployeeTask",
    EmployeeTaskHour = "EmployeeTaskHour",
    EmployeeTaskNotes = "EmployeeTaskNotes",
    Jobs = "Jobs",
    Sectors = "Sectors",
    TaskStatus = "TaskStatus",
    TaskType = "TaskType",
    SalaryRanges = "SalaryRanges",
    JobCandidate = "JobCandidate",
    CheckInOut = "CheckInOut",
    Skill = "Skills",
    QuestionBank = "QuestionBanks"
}

export enum PermissionType {
    Access = "access",
    Add = "add",
    Edit = "update",
    Delete = "delete"
}

