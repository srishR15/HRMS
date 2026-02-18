from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Employee as EmployeeModel
from app.schemas import EmployeeCreate, Employee

router = APIRouter()

# -----------------------------
# Get all employees
# -----------------------------
@router.get("/", response_model=List[Employee])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(EmployeeModel).all()
    return employees


# -----------------------------
# Add new employee
# -----------------------------
@router.post("/", response_model=Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    # Check for duplicate email
    existing = db.query(EmployeeModel).filter(EmployeeModel.email == employee.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with email {employee.email} already exists"
        )
    new_employee = EmployeeModel(
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


# -----------------------------
# Delete an employee
# -----------------------------
@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    emp = db.query(EmployeeModel).filter(EmployeeModel.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    db.delete(emp)
    db.commit()
    return
