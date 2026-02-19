from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class EmployeeBase(BaseModel):
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    employee_id: int
    class Config:
        orm_mode = True


class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    status: str

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int
    class Config:
        orm_mode = True
